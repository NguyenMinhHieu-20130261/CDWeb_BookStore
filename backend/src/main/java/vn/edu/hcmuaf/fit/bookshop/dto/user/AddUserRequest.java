package vn.edu.hcmuaf.fit.bookshop.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String username;
    private String password;
    private String email;
    private Integer roleId;

    private String avatar;
    private String fullName;
    private String phone;
    private Boolean locked;
    private Boolean isSocial;
}