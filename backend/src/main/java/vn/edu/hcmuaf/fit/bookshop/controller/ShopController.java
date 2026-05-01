package vn.edu.hcmuaf.fit.bookshop.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class ShopController {

    @PostMapping("/signin")
    public Object login(@RequestBody Map<String, String> user) {
        String username = user.get("username");
        String password = user.get("password");

        if ("admin".equals(username) && "123".equals(password)) {
            return Map.of(
                "username", username,
                "token", "fake-jwt-token"
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("Invalid username or password");
    }
}