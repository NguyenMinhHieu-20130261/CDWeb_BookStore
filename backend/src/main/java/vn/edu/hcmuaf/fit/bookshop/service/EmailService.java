package vn.edu.hcmuaf.fit.bookshop.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public boolean sendOTP(String toEmail, String otp) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Reset mật khẩu GoldLeaf");
            message.setText("OTP của bạn là: " + otp);
            mailSender.send(message);
            return true;
    }
}