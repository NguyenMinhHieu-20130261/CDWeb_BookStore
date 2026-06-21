package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<User> getAllUsers(int page, int perPage) {
        return userRepo.findAll(PageRequest.of(page, perPage));
    }
    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    //admin
    @Override
    public User getUserById(Integer id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
    }

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        if (user.getIsLocked() == null) {
            user.setIsLocked(false);
        }
        return userRepo.save(user);
    }
    @Override
    public User updateUser(Integer id, User user) {
        User oldUser = getUserById(id);

        oldUser.setUsername(user.getUsername());
        oldUser.setEmail(user.getEmail());
        oldUser.setIsLocked(user.getIsLocked());
        oldUser.setRole(user.getRole());
        oldUser.setUpdatedAt(new Date());

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            oldUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepo.save(oldUser);
    }
    @Override
    public void deleteUser(Integer id) {
        User user = getUserById(id);
        userRepo.delete(user);
    }
}