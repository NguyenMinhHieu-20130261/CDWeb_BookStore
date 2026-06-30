package vn.edu.hcmuaf.fit.bookshop.dto.auth;

import lombok.Data;

@Data
public class RegisterVerifyRequest {
    private String username;
    private String email;
    private String password;
    private String otp;
}