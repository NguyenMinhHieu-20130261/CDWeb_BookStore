package vn.edu.hcmuaf.fit.bookshop.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepository;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepository;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/auth")
public class ShopController {    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    // private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); 
    
    // LOGIN
    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        String username = req.get("username");
        String password = req.get("password");

        User user = userRepository.findByUsername(username)
                .orElse(null);

        // if (user == null || !encoder.matches(password, user.getPassword())) {
        if (user == null || !password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sai username hoặc password");
        }

        return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "role", user.getRole().getName()
        ));
    }

    // REGISTER
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody Map<String, String> req) {

        String username = req.get("username");
        String password = req.get("password");
        String email = req.get("email");

        if (username == null || password == null || email == null || username.isEmpty() || password.isEmpty() || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("All fields are required");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username đã tồn tại");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email đã được sử dụng");
        }

        Role role = roleRepository.findByName("USER")
            .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "message", "Đăng ký thành công",
                        "username", username,
                        "email", email,
                        "role", "USER"
                ));
    }
}