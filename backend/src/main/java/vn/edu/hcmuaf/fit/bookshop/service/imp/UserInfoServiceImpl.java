package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;
import vn.edu.hcmuaf.fit.bookshop.repository.UserInfoRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;
import vn.edu.hcmuaf.fit.bookshop.service.UserInfoService;
import vn.edu.hcmuaf.fit.bookshop.service.ValidationService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepo userInfoRepo;

    @Autowired
    private SystemLogService systemLogService;

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserInformation getInfoByUserId(Integer userId) {

        return userInfoRepo.findByUser_Id(userId)
                .orElse(null);
    }

     @Override
    public UserInformation getInfoByUserName(String userName) {

        return userInfoRepo.findByUser_Username(userName)
                .orElse(null);
    }
    @Override
    public UserInformation updateUserInfo(Integer userId, UserInformation userInfo) {
        UserInformation existingInfo = userInfoRepo.findByUser_Id(userId)
                .orElse(new UserInformation());

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        existingInfo.setUser(user);
        existingInfo.setFullName(userInfo.getFullName());
        existingInfo.setPhoneNumber(userInfo.getPhoneNumber());
        existingInfo.setGender(userInfo.getGender());
        existingInfo.setBirthday(userInfo.getBirthday());
        existingInfo.setAvatar(userInfo.getAvatar());

        systemLogService.saveLog(
                "UPDATE_USER_INFO",
                "INFO",
                "Người dùng đã cập nhật thông tin user id = " + userId,
                null,
                "USER"
        );

        return userInfoRepo.save(existingInfo);
    }
}