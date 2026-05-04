package vn.edu.hcmuaf.fit.bookshop.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Date;
import java.util.HashMap;

import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.entity.EnumRole;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepository;
import vn.edu.hcmuaf.fit.bookshop.service.EmailService;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepository;

@RestController
@RequestMapping("/api/auth")
public class ShopController {    
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;
        
    // LOGIN
    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        String username = req.get("username");
        String password = req.get("password");
        User user = userRepository.findByUsername(username)
                .orElse(null);
        //check locked
        if (user.getIsLocked() != null && user.getIsLocked()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Tài khoản đã bị khóa");
        }
        if (user == null || !encoder.matches(password, user.getPassword())) {
        // if (user == null || !password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sai username hoặc password");
        }
        // TODO: tạo JWT token
        String jwtToken = "fake-jwt-token-for-" + user.getUsername();
        Map<String, Object> res = new HashMap<>();
            res.put("username", user.getUsername());    
        if (user.getRole() != null) {
            res.put("role", user.getRole().getDescription().name());
            res.put("token", jwtToken);
        }
        return ResponseEntity.ok(res);
    }

    // REGISTER
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody Map<String, String> req) {

        String username = req.get("username");
        String password = req.get("password");
        String email = req.get("email");

        if (username == null || password == null || email == null || username.isEmpty() || password.isEmpty() || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Mọi miền cần phải có giá trị hợp lệ");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username đã tồn tại");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email đã được sử dụng");
        }

        Role role = roleRepository.findByDescription(EnumRole.USER)
           .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));
        User user = new User();
        user.setUsername(username);
        // user.setPassword(password);
        user.setPassword(encoder.encode(password));
        user.setEmail(email);
        user.setRole(role);
        user.setCreatedAt(new Date());
        user.setIsLocked(false);
        userRepository.save(user);

        Map<String, Object> res = new HashMap<>();
            res.put("message", "Đăng ký thành công");
            res.put("username", username);
            res.put("email", email);

            if (user.getRole() != null) {
                res.put("role", user.getRole().getDescription().name());
            }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(res);
    }
   @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> req) {
        String email = req.get("email");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Email không tồn tại");
        }

        // tạo OTP 6 số
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);
        Date otpExpired = new Date(System.currentTimeMillis() + 5 * 60 * 1000); // OTP  
        // lưu OTP vào database
        user.setOtp(otp);
        user.setOtpExpired(otpExpired);
        userRepository.save(user);

        // gửi mail thật
        emailService.sendOTP(email, otp);

        return ResponseEntity.ok("OTP đã gửi về email");
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !otp.equals(user.getOtp())) {
            return ResponseEntity.badRequest().body("OTP không đúng");
        }

        if (user.getOtpExpired().before(new Date())) {
            return ResponseEntity.badRequest().body("OTP đã hết hạn");
        }

        return ResponseEntity.ok("OTP hợp lệ");
    }
    @PostMapping("/forgot-password")
        public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
            String email = req.get("email");
            String otp = req.get("otp");
            String newPassword = req.get("newPassword");

            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null || !otp.equals(user.getOtp())) {
                return ResponseEntity.badRequest().body("OTP không đúng");
            }

            if (user.getOtpExpired().before(new Date())) {
                return ResponseEntity.badRequest().body("OTP đã hết hạn");
            }
            user.setPassword(encoder.encode(newPassword));
            // xóa OTP sau khi đổi mật khẩu thành công
            user.setOtp(null);
            user.setOtpExpired(null);
            userRepository.save(user);

            return ResponseEntity.ok("Đổi mật khẩu thành công");
        }
    }