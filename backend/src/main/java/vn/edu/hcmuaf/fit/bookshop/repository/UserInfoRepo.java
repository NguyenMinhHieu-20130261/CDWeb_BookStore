package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.UserInformation;

import java.util.Optional;

public interface UserInfoRepo extends JpaRepository<UserInformation, Long> {

    Optional<UserInformation> findByUser_Id(Integer userId);
    Optional<UserInformation> findByUser_Username(String username);
}