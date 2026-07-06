package vn.edu.hcmuaf.fit.bookshop.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import vn.edu.hcmuaf.fit.bookshop.dto.vnpay.VnPayCreateRequest;
import vn.edu.hcmuaf.fit.bookshop.service.OrderService;
import vn.edu.hcmuaf.fit.bookshop.service.VnPayService;

@RestController
@RequestMapping("/api/payments/vnpay")
@RequiredArgsConstructor
public class VnPayController {

    private final VnPayService vnPayService;
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody VnPayCreateRequest request,
                                           HttpServletRequest httpRequest) {
        String paymentUrl = vnPayService.createPaymentUrl(request, httpRequest);
        return ResponseEntity.ok(Map.of("paymentUrl", paymentUrl));
    }

    @GetMapping("/return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> params) {
        boolean valid = vnPayService.verifyPayment(params);

        String orderIdStr = params.get("vnp_TxnRef");
        Integer orderId = Integer.parseInt(orderIdStr);

        String frontendUrl = System.getenv("FRONTEND_URL");
        if (frontendUrl == null || frontendUrl.isBlank()) {
            frontendUrl = "http://localhost:3000";
        }

        String responseCode = params.get("vnp_ResponseCode");
        String paymentStatus;

        if (!valid) {
            paymentStatus = "invalid";
            orderService.updatePaymentFailed(orderId);
        } else if ("00".equals(responseCode)) {
            paymentStatus = "success";
            orderService.clearCartAfterPaymentSuccess(orderId);
        } else if ("24".equals(responseCode)) {
            paymentStatus = "cancel";
            orderService.updatePaymentFailed(orderId);
        } else if ("15".equals(responseCode)) {
            paymentStatus = "timeout";
            orderService.updatePaymentFailed(orderId);
        } else {
            paymentStatus = "failed";
            orderService.updatePaymentFailed(orderId);
        }

        String redirectUrl = frontendUrl
                + "/payment-result?status="
                + paymentStatus
                + "&orderId="
                + orderId;

        return ResponseEntity.status(302)
                .header("Location", redirectUrl)
                .build();
    }

    @GetMapping("/ipn")
    public ResponseEntity<?> ipn(@RequestParam Map<String, String> params) {
        boolean valid = vnPayService.verifyPayment(params);

        if (!valid) {
            return ResponseEntity.ok(Map.of(
                    "RspCode", "97",
                    "Message", "Invalid signature"
            ));
        }

        // TODO: update trạng thái order ở đây

        return ResponseEntity.ok(Map.of(
                "RspCode", "00",
                "Message", "Confirm Success"
        ));
    }
}