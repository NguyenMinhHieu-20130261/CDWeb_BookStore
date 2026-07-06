package vn.edu.hcmuaf.fit.bookshop.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import vn.edu.hcmuaf.fit.bookshop.vnpay.VnPayConfig;
import vn.edu.hcmuaf.fit.bookshop.dto.vnpay.VnPayCreateRequest;

import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VnPayService {

    private final VnPayConfig config;

    public String createPaymentUrl(VnPayCreateRequest request, HttpServletRequest httpRequest) {
        String vnpTxnRef = String.valueOf(request.getOrderId());
        String ipAddress = httpRequest.getRemoteAddr();

        Map<String, String> params = new TreeMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", config.getTmnCode());
        params.put("vnp_Amount", String.valueOf(request.getAmount() * 100));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", vnpTxnRef);
        params.put("vnp_OrderInfo", request.getOrderInfo());
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", config.getReturnUrl());
        params.put("vnp_IpAddr", ipAddress);
        params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));

        String queryUrl = buildQuery(params);
        String hashData = buildHashData(params);
        String secureHash = hmacSHA512(config.getHashSecret(), hashData);

        return config.getPayUrl() + "?" + queryUrl + "&vnp_SecureHash=" + secureHash;
    }

    public boolean verifyPayment(Map<String, String> params) {
        String secureHash = params.get("vnp_SecureHash");

        Map<String, String> filtered = new TreeMap<>(params);
        filtered.remove("vnp_SecureHash");
        filtered.remove("vnp_SecureHashType");

        String hashData = buildHashData(filtered);
        String calculatedHash = hmacSHA512(config.getHashSecret(), hashData);

        return calculatedHash.equalsIgnoreCase(secureHash);
    }

    private String buildQuery(Map<String, String> params) {
        return params.entrySet().stream()
                .map(e -> urlEncode(e.getKey()) + "=" + urlEncode(e.getValue()))
                .collect(Collectors.joining("&"));
    }

    private String buildHashData(Map<String, String> params) {
        return params.entrySet().stream()
                .map(e -> urlEncode(e.getKey()) + "=" + urlEncode(e.getValue()))
                .collect(Collectors.joining("&"));
    }

    private String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.US_ASCII);
    }

    private String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder hash = new StringBuilder();
            for (byte b : bytes) {
                hash.append(String.format("%02x", b));
            }
            return hash.toString();
        } catch (Exception e) {
            throw new RuntimeException("Cannot generate HMAC SHA512", e);
        }
    }
}