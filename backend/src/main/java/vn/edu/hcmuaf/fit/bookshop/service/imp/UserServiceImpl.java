package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public Page<User> getAllUsers(int page, int perPage) {
        return userRepo.findAll(PageRequest.of(page, perPage));
    }

    @Override
    public User getUserById(int id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
}