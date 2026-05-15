package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;
import vn.edu.hcmuaf.fit.bookshop.repository.UserInfoRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserInfoService;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepo userInfoRepo;

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
}