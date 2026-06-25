package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.dto.user.AdminUpdateUserRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

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
    public User updateUserAdmin(Integer id, AdminUpdateUserRequest request) {
        User oldUser = getUserById(id);

        if (request.getIsLocked() != null) {
            oldUser.setIsLocked(request.getIsLocked());
        }

        if (request.getRoleId() != null) {
            Role role = roleRepo.findById(request.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy role"));

            oldUser.setRole(role);
        }

        oldUser.setUpdatedAt(new Date());

        return userRepo.save(oldUser);
    }
    @Override
    public void deleteUser(Integer id) {
        User user = getUserById(id);
        userRepo.delete(user);
    }
}