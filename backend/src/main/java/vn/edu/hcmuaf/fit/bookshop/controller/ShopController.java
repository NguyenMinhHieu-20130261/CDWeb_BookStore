package vn.edu.hcmuaf.fit.bookshop.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;
import java.util.Date;
import java.util.HashMap;

import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.entity.EnumRole;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import vn.edu.hcmuaf.fit.bookshop.entity.OtpVerification;
import vn.edu.hcmuaf.fit.bookshop.entity.Token;
import vn.edu.hcmuaf.fit.bookshop.entity.TokenType;

import vn.edu.hcmuaf.fit.bookshop.jwt.JwtUtils;

import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.OtpVerificationRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.TokenRepo;

import vn.edu.hcmuaf.fit.bookshop.service.EmailService;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepo;

@RestController
@RequestMapping("/api/auth")
public class ShopController {    
@Autowired
private BCryptPasswordEncoder encoder;

@Autowired
private UserRepo userRepository;

@Autowired
private RoleRepo roleRepository;

@Autowired
private EmailService emailService;

@Autowired
private OtpVerificationRepo otpVerificationRepository;

@Autowired
private JwtUtils jwtUtils;

@Autowired
private TokenRepo tokenRepo;

// LOGIN
@PostMapping("/signin")
public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
    String username = req.get("username");
    String password = req.get("password");
    User user = userRepository.findByUsername(username)
            .orElse(null);
    // check user tồn tại ko? 
    if (user == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Sai username hoặc password");
    }
    // check tài khoản có bị locked?
    if (user.getIsLocked() != null && user.getIsLocked()) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Tài khoản đã bị khóa");
    }
    // check password
    if (!encoder.matches(password, user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Sai username hoặc password");
    }

    String jwtToken = jwtUtils.generateJwtToken(user);
    Token token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
        tokenRepo.save(token);
        // trả về thông tin user và token
        Map<String, Object> res = new HashMap<>();
        res.put("id", user.getId());
        res.put("username", user.getUsername());
        res.put("email", user.getEmail());
        res.put("token", jwtToken);
        if (user.getRole() != null) {
                res.put("role", user.getRole().getDescription().name());
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
//LOGOUT
@PostMapping("/logout")
public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.badRequest().body("Token không hợp lệ");
    }

    String jwt = authHeader.substring(7);

    tokenRepo.findByToken(jwt).ifPresent(token -> {
        token.setExpired(true);
        token.setRevoked(true);
        tokenRepo.save(token);
    });
    return ResponseEntity.ok("Đăng xuất thành công");
}
//Sentmail
@PostMapping("/send-email")
public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> req) {
    String email = req.get("email");

    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Email không tồn tại");
    }
    // xóa OTP cũ
    otpVerificationRepository.deleteByUserId(user.getId());

    // tạo OTP
    String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

    Date otpExpired = new Date(System.currentTimeMillis() + 5 * 60 * 1000);

    OtpVerification otpVerification = OtpVerification.builder()
            .otpCode(otp)
            .expiredAt(otpExpired)
            .user(user)
            .build();
    otpVerificationRepository.save(otpVerification);

    emailService.sendOTP(email, otp);

    // boolean sent = emailService.sendOTP(email, otp);
    
    // if (!sent) {
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body("Gửi email thất bại");
    // }
    System.out.println("OTP for " + email + ": " + otp);
    return ResponseEntity.ok("OTP đã gửi về email");
}
@PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
        @RequestBody Map<String, String> req) {

    String email = req.get("email").trim();
    String otp = req.get("otp").trim();

    User user = userRepository.findByEmail(email)
            .orElse(null);

    if (user == null) {
        return ResponseEntity.badRequest()
                .body("Email không tồn tại");
    }

    Optional<OtpVerification> otpData =
        otpVerificationRepository
                .findTopByUserIdOrderByCreatedAtDesc(
                        user.getId()
                );

    if (otpData.isEmpty()) {
        return ResponseEntity.badRequest()
                .body("Không tìm thấy OTP");
    }

    if (!otpData.get().getOtpCode().equals(otp.trim())) {
        return ResponseEntity.badRequest()
                .body("OTP không đúng");
    }
    if (otpData.get()
        .getExpiredAt()
        .before(new Date())) {

    return ResponseEntity.badRequest()
            .body("OTP đã hết hạn");
    }
    System.out.println("INPUT OTP: " + otp);
    System.out.println("DB OTP: " + otpData.get().getOtpCode());
    return ResponseEntity.ok("OTP hợp lệ");
}

@PostMapping("/forgot-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody Map<String, String> req) {

        String email = req.get("email").trim();
        String otp = req.get("otp").trim();
        String newPassword = req.get("newPassword").trim();

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("Email không tồn tại");
        }

        Optional<OtpVerification> otpData =
                otpVerificationRepository
                        .findTopByUserIdOrderByCreatedAtDesc(
                                user.getId()
                        );

        if (otpData.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Không tìm thấy OTP");
        }

        // check OTP
        if (!otpData.get()
                .getOtpCode()
                .equals(otp)) {

            return ResponseEntity.badRequest()
                    .body("OTP không đúng");
        }

        // check hết hạn
        if (otpData.get()
                .getExpiredAt()
                .before(new Date())) {

            return ResponseEntity.badRequest()
                    .body("OTP đã hết hạn");
        }

        user.setPassword(
                encoder.encode(newPassword)
        );

        userRepository.save(user);

        // xóa OTP sau khi đổi pass
        otpVerificationRepository
                .deleteByUserId(user.getId());

        return ResponseEntity.ok(
                "Đổi mật khẩu thành công"
        );
    }
}