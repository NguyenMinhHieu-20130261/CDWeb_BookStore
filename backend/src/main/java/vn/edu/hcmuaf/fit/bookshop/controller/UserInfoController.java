package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;
import vn.edu.hcmuaf.fit.bookshop.service.UserInfoService;

@RestController
@RequestMapping("/api/userinfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/{userId}")
    public UserInformation getUserInfo(@PathVariable Integer userId) {

        return userInfoService.getInfoByUserId(userId);
    }
     @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUserInfo(
        @PathVariable Integer userId,
        @RequestBody UserInformation userInfo
    ) {
        return ResponseEntity.ok(
                userInfoService.updateUserInfo(userId, userInfo)
        );
    }
}