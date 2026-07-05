package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import vn.edu.hcmuaf.fit.bookshop.dto.user.AdminUpdateUserRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.UserService;

@Slf4j
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
        log.debug("Lấy danh sách user: page={}, perPage={}", page, perPage);
        return userRepo.findAll(PageRequest.of(page, perPage));
    }
    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    //admin
    @Override
    public User getUserById(Integer id) {
        log.debug("Lấy user id={}", id);
        return userRepo.findById(id)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy user id={}", id);
                return new RuntimeException("Không tìm thấy user");
            });
    }

    @Override
    public User createUser(User user) {
        log.info("Tạo user mới: username={}, email={}", user.getUsername(), user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        if (user.getIsLocked() == null) {
            user.setIsLocked(false);
        }
        User saved = userRepo.save(user);
        log.info("Tạo user thành công: id={}, username={}", saved.getId(), saved.getUsername());
        return saved;
    }

    @Override
    public User updateUserAdmin(Integer id, AdminUpdateUserRequest request) {
        log.info("Admin cập nhật user id={}", id);
        User oldUser = getUserById(id);

        if (request.getIsLocked() != null) {
            log.info("Cập nhật trạng thái khóa user id={}: {}", id, request.getIsLocked());
            oldUser.setIsLocked(request.getIsLocked());
        }

        if (request.getRoleId() != null) {
            Role role = roleRepo.findById(request.getRoleId())
                    .orElseThrow(() -> {
                        log.warn("Không tìm thấy role id={}", request.getRoleId());
                        return new RuntimeException("Không tìm thấy role");
                    });
            log.info("Cập nhật role user id={} -> roleId={}", id, request.getRoleId());
            oldUser.setRole(role);
        }
        oldUser.setUpdatedAt(new Date());
        User saved = userRepo.save(oldUser);

        log.info("Cập nhật user thành công: id={}", saved.getId());
        return saved;
    }

    @Override
    public void deleteUser(Integer id) {
        log.warn("Admin xóa user id={}", id);

        User user = getUserById(id);
        userRepo.delete(user);

        log.info("Đã xóa user id={}", id);
    }
}