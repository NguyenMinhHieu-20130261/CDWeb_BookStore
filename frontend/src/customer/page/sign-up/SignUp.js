import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import {registerUser} from "../../../Store/ApiRequest";
import ValidateService from "../../../service/ValidateService";
import {useDispatch} from "react-redux";
import { sendRegisterOtp, verifyRegisterOtp } from "../../../Store/ApiRequest";

const SignUp = () => {
    const location = useLocation();
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");

    const [step, setStep] = React.useState(1);
    const [otp, setOtp] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSendRegisterOtp = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const usernameError = ValidateService.validateUsername(username);
        const emailError = ValidateService.validateEmail(email);
        const passwordError = ValidateService.validatePassword(password);

        if (usernameError || emailError || passwordError) {
            setErrorMessage(usernameError || emailError || passwordError);
            setLoading(false);
            return;
        }
        if (password !== repeatPassword) {
            setErrorMessage("Mật khẩu nhập lại không trùng khớp!");
            setLoading(false);
            return;
        }
        try {
            const result = await sendRegisterOtp({ username, email, password }, dispatch);
            if (!result.success) {
                setErrorMessage(result.message);
                return;
            }
            setStep(2);
        } catch (err) {
            setErrorMessage(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message || "Gửi OTP thất bại"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const result = await verifyRegisterOtp({ username, email, otp }, dispatch);
            if (!result.success) {
                setErrorMessage(result.message);
                return;
            }
            alert("Đăng ký thành công!");
            navigate("/sign-in");
        } catch (err) {
            setErrorMessage(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message || "OTP không đúng hoặc đã hết hạn"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Breadcrumb location={location}/>
            <div className="content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="form-block">
                                        <div className="mb-4">
                                            <h3>Đăng ký</h3>
                                        </div>
                                        {step === 1 && (
                                            <form onSubmit={handleSendRegisterOtp}>
                                                <div className="form-group first">
                                                <p> Tên đăng nhập</p>
                                                <input type="text" className="form-control" id="username"
                                                       name="username" required
                                                       onChange={e => setUsername(e.target.value)}/>
                                                </div>
                                                <div className="form-group mb-4">
                                                    <p> Email</p>
                                                    <input type="email" className="form-control" id="email" name="email"
                                                        required
                                                        onChange={e => setEmail(e.target.value)}/>
                                                </div>
                                                <div className="form-group mb-4">
                                                    <p>Mật khẩu</p>
                                                    <input type="password" className="form-control" id="password" required
                                                        onChange={e => setPassword(e.target.value)}/>
                                                </div>
                                                <div className="form-group last mb-4">
                                                    <p>Nhập lại mật khẩu</p>
                                                    <input type="password" className="form-control" id="re-password"
                                                        name="re-password" required
                                                        onChange={e => setRepeatPassword(e.target.value)}/>
                                                </div>
                                                {errorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {errorMessage}
                                                    </div>
                                                )}
                                                <span
                                                    className="d-block text-center my-4 text-muted">Bạn đã có tài khoản?{" "}
                                                    <Link
                                                        to={"/sign-in"}
                                                        style={{width: "60px", color: "#6c757d"}}>Đăng nhập
                                                    </Link> 
                                                </span>
                                                <button className="button_login" type="submit" disabled={loading}>
                                                    {loading ? "Đang gửi OTP..." : "Gửi OTP"}
                                                </button>
                                            </form>
                                        )}

                                        {step === 2 && (
                                            <form onSubmit={handleVerifyRegister}>
                                                <p>Nhập OTP</p>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={otp}
                                                    onChange={e => setOtp(e.target.value)}
                                                    required
                                                />

                                                {errorMessage && (
                                                    <div className="alert alert-danger">{errorMessage}</div>
                                                )}

                                                <button className="button_login" type="submit" disabled={loading}>
                                                    {loading ? "Đang xác nhận..." : "Xác nhận đăng ký"}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SignUp;