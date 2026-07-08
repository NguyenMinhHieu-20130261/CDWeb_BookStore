import React, { useState } from "react";
import api from "../../../../service/ApiService";

const ChangePasswordPopup = ({ email, onClose }) => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {
            setMessage("Không tìm thấy email tài khoản");
            return;
        }
        setLoading(true);
        try {
            await api.sendData("/auth/change-password/send-otp", { email });
            setMessage("OTP đã được gửi về email");
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data || "Gửi OTP thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu nhập lại không khớp");
            return;
        }

        setLoading(true);
        try {
            await api.sendData("/auth/verify-otp", { email, otp });

            await api.sendData("/auth/forgot-password", {
                email,
                otp,
                newPassword
            });

            setMessage("Đổi mật khẩu thành công");

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setMessage(err.response?.data || "OTP sai hoặc lỗi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-popup-overlay">
            <div className="password-popup">
                <button type="button" className="password-popup-close" onClick={onClose}>
                    ×
                </button>

                <h4>Đổi mật khẩu</h4>

                {message && (
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",
                            color: message.includes("thành công") ? "green" : "red"
                        }}
                    >
                        {message}
                    </div>
                )}

                {step === 1 && (
                    <>
                        <p>Email nhận OTP</p>
                        <input className="form-control mb-3" value={email} readOnly />

                        <button
                            type="button"
                            className="button_forgot d-block mx-auto"
                            style={{ border: "none" }}
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Gửi OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <form onSubmit={handleChangePassword}>
                        <p>Nhập OTP</p>
                        <input
                            className="form-control mb-3"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <p>Mật khẩu mới</p>
                        <input
                            type="password"
                            className="form-control mb-3"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <p>Nhập lại mật khẩu</p>
                        <input
                            type="password"
                            className="form-control mb-3"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="button_forgot d-block mx-auto mb-3"
                            style={{ border: "none" }}
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Gửi lại OTP"}
                        </button>

                        <button
                            type="submit"
                            className="button_forgot d-block mx-auto"
                            style={{ border: "none" }}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChangePasswordPopup;