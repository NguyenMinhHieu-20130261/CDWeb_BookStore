package vn.edu.hcmuaf.fit.bookshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ShopBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopBackendApplication.class, args);
        System.out.println("Server is running on http://localhost:8080");
        // System.out.println(new BCryptPasswordEncoder().encode("123123"));
    }
}
