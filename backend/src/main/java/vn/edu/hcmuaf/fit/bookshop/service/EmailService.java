package vn.edu.hcmuaf.fit.bookshop.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    //pass otp
    public boolean sendOTP(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Mã OTP đặt lại mật khẩu GoldLeaf");

            String html = """
                <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:30px;">
                    <div style="max-width:520px; margin:auto; background:white; border-radius:14px; padding:28px; box-shadow:0 4px 18px rgba(0,0,0,0.08);">
                        <h2 style="color:#2f5d3a; margin-top:0;">GoldLeaf BookStore</h2>

                        <p style="font-size:16px; color:#333;">
                            Bạn đang yêu cầu đặt lại mật khẩu.
                        </p>

                        <p style="font-size:15px; color:#555;">
                            Mã OTP của bạn là:
                        </p>

                        <div style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#2f5d3a; background:#eef7f0; padding:16px; text-align:center; border-radius:10px;">
                            %s
                        </div>

                        <p style="font-size:14px; color:#666; margin-top:24px;">
                            Mã này có hiệu lực trong 5 phút. Không chia sẻ mã này với người khác.
                        </p>

                        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">

                        <p style="font-size:12px; color:#999;">
                            Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
                        </p>
                    </div>
                </div>
                """.formatted(otp);

            helper.setText(html, true);

            mailSender.send(message);
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException("Không thể tạo email HTML", e);
        }
    }
    //pass mail
    public boolean sendPasswordChanged(String toEmail, String username) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Mật khẩu GoldLeaf đã được thay đổi");

            String html = """
                <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                    <div style="max-width:540px;margin:auto;background:white;
                                border-radius:14px;padding:30px;
                                box-shadow:0 4px 18px rgba(0,0,0,0.08);">

                        <h2 style="color:#2f5d3a;margin-top:0;">
                            Đổi mật khẩu thành công
                        </h2>

                        <p style="font-size:16px;color:#333;">
                            Xin chào <b>%s</b>,
                        </p>

                        <p style="font-size:15px;color:#555;">
                            Mật khẩu tài khoản GoldLeaf của bạn đã được thay đổi thành công.
                        </p>

                        <div style="background:#eef7f0;
                                    padding:16px;
                                    border-radius:10px;
                                    margin:20px 0;">

                            <b>Email:</b> %s
                        </div>

                        <p style="font-size:14px;color:#666;">
                            Nếu chính bạn thực hiện thao tác này thì không cần làm gì thêm.
                        </p>

                        <div style="background:#fff3cd;
                                    border-left:4px solid #ffc107;
                                    padding:14px;
                                    margin-top:18px;">

                            <b>Không phải bạn?</b><br>
                            Hãy đăng nhập và đổi mật khẩu ngay hoặc liên hệ quản trị viên.
                        </div>

                        <hr style="margin:28px 0;">

                        <p style="font-size:12px;color:#999;">
                            GoldLeaf BookStore - Cảm ơn bạn đã sử dụng dịch vụ.
                        </p>

                    </div>
                </div>
                """.formatted(username, toEmail);

            helper.setText(html, true);

            mailSender.send(message);
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException("Không gửi được email", e);
        }
    }
    //register otp
    public boolean sendRegisterOTP(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Xác thực đăng ký tài khoản GoldLeaf");

            String html = """
                <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                    <div style="max-width:520px;margin:auto;background:white;border-radius:14px;padding:28px;box-shadow:0 4px 18px rgba(0,0,0,0.08);">
                        <h2 style="color:#2f5d3a;margin-top:0;">GoldLeaf BookStore</h2>

                        <p style="font-size:16px;color:#333;">
                            Cảm ơn bạn đã đăng ký tài khoản tại GoldLeaf.
                        </p>

                        <p style="font-size:15px;color:#555;">
                            Vui lòng nhập mã OTP bên dưới để hoàn tất đăng ký:
                        </p>

                        <div style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#2f5d3a;background:#eef7f0;padding:16px;text-align:center;border-radius:10px;">
                            %s
                        </div>

                        <p style="font-size:14px;color:#666;margin-top:24px;">
                            Mã OTP có hiệu lực trong 5 phút.
                        </p>

                        <p style="font-size:12px;color:#999;margin-top:24px;">
                            Nếu bạn không thực hiện đăng ký, hãy bỏ qua email này.
                        </p>
                    </div>
                </div>
                """.formatted(otp);

            helper.setText(html, true);
            mailSender.send(message);
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException("Không thể gửi OTP đăng ký", e);
        }
    }
    //register mail
    public boolean sendRegisterSuccess(String toEmail, String username) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Chào mừng bạn đến với GoldLeaf BookStore");

            String html = """
                <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:30px;">
                    <div style="max-width:540px;margin:auto;background:white;border-radius:14px;padding:30px;box-shadow:0 4px 18px rgba(0,0,0,0.08);">
                        <h2 style="color:#2f5d3a;margin-top:0;">Đăng ký thành công</h2>

                        <p style="font-size:16px;color:#333;">
                            Xin chào <b>%s</b>,
                        </p>

                        <p style="font-size:15px;color:#555;">
                            Tài khoản GoldLeaf BookStore của bạn đã được tạo thành công.
                        </p>

                        <div style="background:#eef7f0;padding:16px;border-radius:10px;margin:22px 0;">
                            <p style="margin:0;color:#2f5d3a;font-weight:bold;">
                                Email đăng ký: %s
                            </p>
                        </div>

                        <p style="font-size:14px;color:#666;">
                            Bây giờ bạn có thể đăng nhập để mua sách, theo dõi đơn hàng và nhận ưu đãi mới nhất.
                        </p>

                        <p style="font-size:13px;color:#999;margin-top:24px;">
                            Cảm ơn bạn đã sử dụng GoldLeaf!
                        </p>
                    </div>
                </div>
                """.formatted(username, toEmail);

            helper.setText(html, true);
            mailSender.send(message);
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException("Không thể gửi email đăng ký thành công", e);
        }
    }
}