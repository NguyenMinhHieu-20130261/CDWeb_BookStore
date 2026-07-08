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
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;
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

    @Autowired
    private SystemLogService systemLogService;

    @Override
    public Page<User> getAllUsers(int page, int perPage, String sort, String order) {
        log.debug("Lấy danh sách user: page={}, perPage={}, sort={}, order={}", page, perPage, sort, order);
        org.springframework.data.domain.Sort.Direction direction = "DESC".equalsIgnoreCase(order)
                ? org.springframework.data.domain.Sort.Direction.DESC
                : org.springframework.data.domain.Sort.Direction.ASC;
        return userRepo.findAll(PageRequest.of(page, perPage, org.springframework.data.domain.Sort.by(direction, sort)));
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
        systemLogService.saveLog(
                "CREATE_USER",
                "INFO",
                "Người dùng tạo user có id = " + saved.getId() + ", username = " + saved.getUsername(),
                null,
                "ADMIN"
        );
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
        systemLogService.saveLog(
                "UPDATE_USER",
                "INFO",
                "Admin đã cập nhật user có id = " + id + ", username = " + oldUser.getUsername(),
                null,
                "ADMIN"
        );
        return saved;
    }

    @Override
    public void deleteUser(Integer id) {
        log.warn("Admin xóa user id={}", id);

        User user = getUserById(id);
        userRepo.delete(user);

        systemLogService.saveLog(
                "DELETE_USER",
                "INFO",
                "Admin đã xóa user có id = " + id + ", username = " + user.getUsername(),
                null,
                "ADMIN"
        );
        log.info("Đã xóa user id={}", id);
    }
}