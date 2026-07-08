package vn.edu.hcmuaf.fit.bookshop.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Value;
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
import vn.edu.hcmuaf.fit.bookshop.entity.RegisterOtp;
import vn.edu.hcmuaf.fit.bookshop.entity.Token;
import vn.edu.hcmuaf.fit.bookshop.entity.TokenType;

import vn.edu.hcmuaf.fit.bookshop.dto.auth.LoginRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.auth.RegisterRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.auth.RegisterVerifyRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.auth.SendEmailRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.auth.VerifyOtpRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.auth.ForgotPasswordRequest;

import vn.edu.hcmuaf.fit.bookshop.jwt.JwtUtils;

import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.OtpVerificationRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.RegisterOtpRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.TokenRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepo;

import vn.edu.hcmuaf.fit.bookshop.service.EmailService;

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

    @Autowired
    private RegisterOtpRepo registerOtpRepo;

    // LOGIN
    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String username = req.getUsername();
        String password = req.getPassword();
        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (username == null || password == null ||
                username.trim().isEmpty() || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username và password không được để trống");
        }

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
    //forgot pass otp 
    //Sentmail
    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody SendEmailRequest req) {
        String email = req.getEmail();

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email không được để trống");
        }
        email = email.trim();

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
        public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest req) {

        String email = req.getEmail();
        String otp = req.getOtp();

        if (email == null || otp == null ||
                email.trim().isEmpty() || otp.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email và OTP không được để trống");
        }
        email = email.trim();
        otp = otp.trim();

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
        public ResponseEntity<?> resetPassword( @RequestBody ForgotPasswordRequest req) {
        String email = req.getEmail();
        String otp = req.getOtp();
        String newPassword = req.getNewPassword();

        if (email == null || otp == null || newPassword == null ||
                email.trim().isEmpty() || otp.trim().isEmpty() || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email, OTP và mật khẩu mới không được để trống");
        }
        email = email.trim();
        otp = otp.trim();
        newPassword = newPassword.trim();

        User user = userRepository.findByEmail(email)
                .orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("Email không tồn tại");
        }
        Optional<OtpVerification> otpData =
            otpVerificationRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId() );
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
        user.setPassword( encoder.encode(newPassword) );
        userRepository.save(user);
        //GỬI MAIL THÀNH CÔNG
        try {
            emailService.sendPasswordChanged(
                user.getEmail(),
                user.getUsername()
            );
        } catch (Exception e) {
            System.out.println("Gửi mail đổi mật khẩu thất bại: " + e.getMessage());
        }
        // xóa OTP sau khi đổi pass
        otpVerificationRepository.deleteByUserId(user.getId());

        return ResponseEntity.ok(
                "Đổi mật khẩu thành công"
        );
    }
    //Signup otp 
    @PostMapping("/signup/send-otp")
    public ResponseEntity<?> sendRegisterOtp(@RequestBody RegisterRequest req) {
        String username = req.getUsername();
        String email = req.getEmail();
        String password = req.getPassword();

        if (username == null || email == null || password == null ||
                username.trim().isEmpty() || email.trim().isEmpty() || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Vui lòng nhập đầy đủ thông tin");
        }

        username = username.trim();
        email = email.trim();

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username đã tồn tại");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email đã được sử dụng");
        }

        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        Date otpExpired = new Date(System.currentTimeMillis() + 5 * 60 * 1000);

        registerOtpRepo.deleteByEmail(email);

        RegisterOtp registerOtp = RegisterOtp.builder()
                .username(username)
                .email(email)
                .password(encoder.encode(password))
                .otpCode(otp)
                .expiredAt(otpExpired)
                .build();

        registerOtpRepo.save(registerOtp);

        emailService.sendRegisterOTP(email, otp);

        return ResponseEntity.ok("OTP đã gửi");
    }
    @PostMapping("/signup/verify")
    public ResponseEntity<?> verifyRegisterOtp(@RequestBody RegisterVerifyRequest req) {
        String username = req.getUsername().trim();
        String email = req.getEmail().trim();
        String otp = req.getOtp().trim();

        Optional<RegisterOtp> otpData =
        registerOtpRepo.findTopByEmailOrderByCreatedAtDesc(email);

        if (otpData.isEmpty())
            return ResponseEntity.badRequest().body("Không tìm thấy OTP");

        RegisterOtp data = otpData.get();

        if (!data.getOtpCode().equals(otp))
            return ResponseEntity.badRequest().body("OTP không đúng");

        if (data.getExpiredAt().before(new Date())) {
            registerOtpRepo.deleteByEmail(email);
            return ResponseEntity.badRequest().body("OTP đã hết hạn");
        }

        Role role = roleRepository.findByDescription(EnumRole.USER)
        .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));

        if (userRepository.findByUsername(data.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username đã tồn tại");
        }

        if (userRepository.findByEmail(data.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email đã được sử dụng");
        }

        User user = new User();

        user.setUsername(data.getUsername());
        user.setEmail(data.getEmail());
        user.setPassword(data.getPassword());
        user.setRole(role);
        user.setCreatedAt(new Date());
        user.setIsLocked(false);

        userRepository.save(user);

        registerOtpRepo.deleteByEmail(email);
        //GỬI MAIL THÀNH CÔNG
        try {
            emailService.sendRegisterSuccess(email, username);
        } catch (Exception e) {
            System.out.println("Gửi email chào mừng thất bại: " + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
    }
}