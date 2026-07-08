package vn.edu.hcmuaf.fit.bookshop.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vn.edu.hcmuaf.fit.bookshop.service.PromotionService;

@Component
public class PromotionScheduler {

    @Autowired
    private PromotionService promotionService;

    // Quét mỗi 60 giây (60000 ms) để tự động cập nhật các mã giảm giá đã quá hạn
    @Scheduled(fixedRate = 3600000)
    public void autoUpdateExpiredPromotions() {
        try {
            promotionService.updateExpiredPromotions();
        } catch (Exception e) {
            // Ghi log lỗi nếu cần thiết nhưng không làm gián đoạn hệ thống
        }
    }
}
