package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;
import vn.edu.hcmuaf.fit.bookshop.repository.UserInfoRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserInfoService;
import vn.edu.hcmuaf.fit.bookshop.service.ValidationService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepo userInfoRepo;

    @Autowired
    private ValidationService validationService;

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
    UserInformation existingInfo = getInfoByUserId(userId);
        if (existingInfo == null) {
            throw new RuntimeException("Không tìm thấy thông tin người dùng");
        }
        existingInfo.setFullName(userInfo.getFullName());
        existingInfo.setPhoneNumber(userInfo.getPhoneNumber());
        existingInfo.setGender(userInfo.getGender());
        existingInfo.setBirthday(userInfo.getBirthday());
        existingInfo.setAvatar(userInfo.getAvatar());
        log.info("User '{}' đăng nhập thành công", existingInfo.getUser().getUsername());
        return userInfoRepo.save(existingInfo);
    }
}