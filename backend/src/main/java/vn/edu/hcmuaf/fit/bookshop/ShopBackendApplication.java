package vn.edu.hcmuaf.fit.bookshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
public class ShopBackendApplication {
    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        SpringApplication.run(ShopBackendApplication.class, args);
        System.out.println("Server is running on http://localhost:8080");
        System.out.println(TimeZone.getDefault());
    }
}
