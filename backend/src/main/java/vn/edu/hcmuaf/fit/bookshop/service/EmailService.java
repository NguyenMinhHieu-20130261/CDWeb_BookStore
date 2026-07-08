package vn.edu.hcmuaf.fit.bookshop.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailService {

    // @Autowired
    // private JavaMailSender mailSender;

    @Value("${brevo.api-key}")
    private String brevoApiKey;

    @Value("${brevo.sender-email}")
    private String senderEmail;

    @Value("${brevo.sender-name}")
    private String senderName;

    private final RestTemplate restTemplate = new RestTemplate();

    private boolean sendEmail(String toEmail, String subject, String htmlContent) {
        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", brevoApiKey);

        Map<String, Object> sender = new HashMap<>();
        sender.put("name", senderName);
        sender.put("email", senderEmail);

        Map<String, Object> to = new HashMap<>();
        to.put("email", toEmail);

        Map<String, Object> body = new HashMap<>();
        body.put("sender", sender);
        body.put("to", List.of(to));
        body.put("subject", subject);
        body.put("htmlContent", htmlContent);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    new HttpEntity<>(body, headers),
                    String.class
            );

            return response.getStatusCode().is2xxSuccessful();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Không thể gửi mail qua Brevo API: " + e.getMessage(), e);
        }
    }
    //pass otp
    public boolean sendOTP(String toEmail, String otp) {
        String html = """
            <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:30px;">
                <div style="max-width:520px; margin:auto; background:white; border-radius:14px; padding:28px;">
                    <h2 style="color:#2f5d3a;">GoldLeaf BookStore</h2>
                    <p>Bạn đang yêu cầu đặt lại mật khẩu.</p>
                    <p>Mã OTP của bạn là:</p>
                    <div style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#2f5d3a; background:#eef7f0; padding:16px; text-align:center; border-radius:10px;">
                        %s
                    </div>
                    <p>Mã này có hiệu lực trong 5 phút. Không chia sẻ mã này với người khác.</p>
                </div>
            </div>
            """.formatted(otp);

        return sendEmail(toEmail, "Mã OTP đặt lại mật khẩu GoldLeaf", html);
    }
    //forgot pass
    public boolean sendPasswordChanged(String toEmail, String username) {
        String html = """
            <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                <div style="max-width:540px;margin:auto;background:white;border-radius:14px;padding:30px;">
                    <h2 style="color:#2f5d3a;">Đổi mật khẩu thành công</h2>
                    <p>Xin chào <b>%s</b>,</p>
                    <p>Mật khẩu tài khoản GoldLeaf của bạn đã được thay đổi thành công.</p>
                    <p><b>Email:</b> %s</p>
                </div>
            </div>
            """.formatted(username, toEmail);

        return sendEmail(toEmail, "Mật khẩu GoldLeaf đã được thay đổi", html);
    }
    //register
    public boolean sendRegisterOTP(String toEmail, String otp) {
        String html = """
            <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                <div style="max-width:520px;margin:auto;background:white;border-radius:14px;padding:28px;">
                    <h2 style="color:#2f5d3a;">GoldLeaf BookStore</h2>
                    <p>Cảm ơn bạn đã đăng ký tài khoản tại GoldLeaf.</p>
                    <p>Vui lòng nhập mã OTP bên dưới để hoàn tất đăng ký:</p>
                    <div style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#2f5d3a;background:#eef7f0;padding:16px;text-align:center;border-radius:10px;">
                        %s
                    </div>
                    <p>Mã OTP có hiệu lực trong 5 phút.</p>
                </div>
            </div>
            """.formatted(otp);

        return sendEmail(toEmail, "Xác thực đăng ký tài khoản GoldLeaf", html);
    }
    //register success
    public boolean sendRegisterSuccess(String toEmail, String username) {
        String html = """
            <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                <div style="max-width:540px;margin:auto;background:white;border-radius:14px;padding:30px;">
                    <h2 style="color:#2f5d3a;">Đăng ký thành công</h2>
                    <p>Xin chào <b>%s</b>,</p>
                    <p>Tài khoản GoldLeaf BookStore của bạn đã được tạo thành công.</p>
                    <p><b>Email đăng ký:</b> %s</p>
                </div>
            </div>
            """.formatted(username, toEmail);

        return sendEmail(toEmail, "Chào mừng bạn đến với GoldLeaf BookStore", html);
    }
    //change pass user 
    public boolean sendChangePasswordOTP(String toEmail, String username, String otp) {
        String html = """
            <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                <div style="max-width:540px;margin:auto;background:white;border-radius:14px;padding:30px;">
                    <h2 style="color:#2f5d3a;">GoldLeaf BookStore</h2>
                    <p>Xin chào <b>%s</b>,</p>
                    <p>Bạn đang yêu cầu đổi mật khẩu tài khoản.</p>
                    <p>Mã OTP của bạn là:</p>
                    <div style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#2f5d3a;background:#eef7f0;padding:16px;text-align:center;border-radius:10px;">
                        %s
                    </div>
                    <p>Mã này có hiệu lực trong 5 phút.</p>
                </div>
            </div>
            """.formatted(username, otp);

        return sendEmail(toEmail, "Mã OTP đổi mật khẩu GoldLeaf", html);
    }
}