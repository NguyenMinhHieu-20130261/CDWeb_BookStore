package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
}