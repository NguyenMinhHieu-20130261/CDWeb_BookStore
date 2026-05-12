package vn.edu.hcmuaf.fit.bookshop.service;

import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;

public interface UserInfoService {

    UserInformation getInfoByUserId(Integer userId);

}