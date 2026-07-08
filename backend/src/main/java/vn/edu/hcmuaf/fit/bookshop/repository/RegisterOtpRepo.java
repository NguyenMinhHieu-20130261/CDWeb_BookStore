package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import vn.edu.hcmuaf.fit.bookshop.entity.RegisterOtp;

import java.util.Optional;

public interface RegisterOtpRepo extends JpaRepository<RegisterOtp, Integer> {
    Optional<RegisterOtp> findTopByEmailOrderByCreatedAtDesc(String email);

    @Transactional
    @Modifying
    void deleteByEmail(String email);
}