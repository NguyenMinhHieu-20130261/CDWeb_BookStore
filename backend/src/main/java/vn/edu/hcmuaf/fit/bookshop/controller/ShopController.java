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
        Map<String, Object> res = new HashMap<>();
            res.put("username", user.getUsername());    
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
}