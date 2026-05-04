import React from "react";
import {Link ,useNavigate} from "react-router-dom";
import {changePassword,sendEmail, verifyOtp} from "../../../Store/ApiRequest";
import { useDispatch } from "react-redux";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [step, setStep] = React.useState(1); // 1: nhập email, 2: nhập otp
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendEmail({ email }, dispatch);
            setMessage("OTP đã được gửi về email");
            setStep(2);
        } catch (err) {
            setMessage("Gửi OTP thất bại");
        } finally {
            setLoading(false);
        }
    };
    const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await verifyOtp({ email, otp });
        await changePassword({
            email,
            otp,
            newPassword
        });
        setMessage("Đổi mật khẩu thành công");
        navigate("/sign-in"); 
    } catch (err) {
        setMessage(err.response?.data || "OTP sai hoặc lỗi");
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block">
                                    <div className="mb-4">
                                        <h3>Quên mật khẩu</h3>
                                        {message && (
                                            <div style={{
                                                color: "red",
                                                textAlign: "center",
                                                marginBottom: "10px"
                                            }}>
                                                {message}
                                            </div>
                                        )}
                                    </div>
                                     {step === 1 && (
                                        <form onSubmit={handleSendOTP}>
                                            <div className="form-group first">
                                                <p className="inline-text">Nhập Email</p>
                                                <input
                                                    type="email"
                                                    id="username"
                                                    className="form-control"
                                                    placeholder="Nhập email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style ={{padding: "2px 10px"}} 
                                                    required
                                                />
                                                
                                            </div>
                                            <button className="button_forgot d-block mx-auto"
                                            style={{border: "none"}}
                                            disabled={loading}>
                                                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                                            </button>
                                            <Link to={"/sign-in"} className="d-block text-center my-4 text-muted"
                                              style={{textDecoration: "none !important"}}> Trở lại đăng nhập</Link>
                                        </form>
                                    )}
                                    {step === 2 && (
                                        <form onSubmit={handleResetPassword}>
                                            <div className="form-group first">
                                                <p className="inline-text">Nhập OTP</p>
                                                 <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    style ={{padding: "2px 10px"}} 
                                                    required
                                                />
                                                <p>Mật khẩu mới</p>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Nhập mật khẩu mới"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button className="button_forgot d-block mx-auto"
                                            style={{border: "none"}}
                                            disabled={loading}
                                            >
                                                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                                            </button>
                                            <Link to={"/sign-in"} className="d-block text-center my-4 text-muted"
                                              style={{textDecoration: "none"}}> Trở lại đăng nhập</Link>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;