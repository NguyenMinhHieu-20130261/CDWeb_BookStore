package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.OtpVerification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface OtpVerificationRepo extends JpaRepository<OtpVerification, Integer> {
        
        Optional<OtpVerification> findTopByUserIdOrderByCreatedAtDesc(Integer userId);

        Optional<OtpVerification> findByUserIdAndOtpCode(Integer userId,String otpCode);

        // Xóa OTP cũ khi tạo mới OTP cho cùng một user
        @Transactional
        @Modifying
        void deleteByUserId(Integer userId);

        Optional<OtpVerification> findTopByEmailOrderByCreatedAtDesc(String email);
        void deleteByEmail(String email);
}