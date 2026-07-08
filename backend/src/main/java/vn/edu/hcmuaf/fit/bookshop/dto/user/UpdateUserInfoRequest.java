package vn.edu.hcmuaf.fit.bookshop.dto.user;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoRequest {
    private String fullName;
    private String phoneNumber;
    private String gender;
    private LocalDate birthday;
    private String avatar;
}