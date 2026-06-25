package vn.edu.hcmuaf.fit.bookshop.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateUserRequest {
    private Integer roleId;
    private Boolean isLocked;
}