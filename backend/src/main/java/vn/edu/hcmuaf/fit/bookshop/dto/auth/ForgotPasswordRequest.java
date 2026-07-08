package vn.edu.hcmuaf.fit.bookshop.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordRequest {
    private String email;
    private String otp;
    private String newPassword;
}