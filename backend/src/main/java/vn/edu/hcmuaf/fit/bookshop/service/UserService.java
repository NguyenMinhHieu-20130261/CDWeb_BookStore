package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.fit.bookshop.entity.User;

import java.util.Optional;

public interface UserService {
    Page<User> getAllUsers(int page, int perPage);

    User getUserById(int id);

    Optional<User> getUserByUsername(String username);
}