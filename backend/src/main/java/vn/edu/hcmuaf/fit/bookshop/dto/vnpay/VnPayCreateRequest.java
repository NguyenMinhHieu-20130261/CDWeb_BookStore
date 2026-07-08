package vn.edu.hcmuaf.fit.bookshop.dto.vnpay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VnPayCreateRequest {
    private Long orderId;
    private Long amount;
    private String orderInfo;
}