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
import vn.edu.hcmuaf.fit.bookshop.service.VnPayService;

@RestController
@RequestMapping("/api/payments/vnpay")
@RequiredArgsConstructor
public class VnPayController {

    private final VnPayService vnPayService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody VnPayCreateRequest request,
                                           HttpServletRequest httpRequest) {
        String paymentUrl = vnPayService.createPaymentUrl(request, httpRequest);
        return ResponseEntity.ok(Map.of("paymentUrl", paymentUrl));
    }

    @GetMapping("/return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> params) {
        boolean valid = vnPayService.verifyPayment(params);

        if (!valid) {
            return ResponseEntity.badRequest().body("Sai chữ ký VNPay");
        }

        String responseCode = params.get("vnp_ResponseCode");

        if ("00".equals(responseCode)) {
            return ResponseEntity.ok("Thanh toán thành công");
        }

        return ResponseEntity.badRequest().body("Thanh toán thất bại");
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