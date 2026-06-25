package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;

import vn.edu.hcmuaf.fit.bookshop.dto.user.AdminUpdateUserRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

import java.util.Optional;

public interface UserService {
    Page<User> getAllUsers(int page, int perPage);
    Optional<User> getUserByUsername(String username);
    //admin
    User getUserById(Integer id);
    User createUser(User user);
    User updateUserAdmin(Integer id, AdminUpdateUserRequest request);
    void deleteUser(Integer id);
}