import {
    loginFailure,loginStart,loginSuccess,
    registerFailure,registerStart,registerSuccess,
    logoutStart,logoutFailure,logoutSuccess,
    changePasswordStart,changePasswordFailure,changePasswordSuccess,
    sendEmailStart,sendEmailSuccess,sendEmailFailure,
    verifyOtpStart,verifyOtpSuccess,verifyOtpFailure
} from "./AuthSlice";

import api from "../service/ApiService";
// LOGIN
export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await api.sendData(
            "/auth/signin",
            user
        );
        console.log("LOGIN RESPONSE:", res);
        console.log("TOKEN:", res.token);
        if (!res.token) {
            throw new Error("Backend không trả về token");
        }
        localStorage.setItem(
            "user",
            JSON.stringify(res)
        );
        localStorage.setItem(
            "token",
            res.token
        );
        dispatch(loginSuccess(res));
        return res;
    } catch (err) {
        dispatch(loginFailure());
        console.log("Login failed");
        console.log(err.response?.data);
        throw err;
    }
};
export const logoutUser = async (dispatch) => {
    // dispatch action logoutStart để cập nhật state khi bắt đầu đăng xuất
    dispatch(logoutStart());
    try {
        // Gọi API đăng xuất người dùng
        await api.sendData("/auth/logout", {});
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Cập nhật state trong Redux
        dispatch(logoutSuccess());
    } catch (err) {
        console.log("Logout failed")
        console.log("DATA:", err.response?.data);
        dispatch(logoutFailure());
        throw err; // Ném lỗi để component có thể xử lý và hiển thị thông báo lỗi
    }
};

// REGISTER
export const registerUser = async (user, dispatch, navigate) => {

    dispatch(registerStart());

    try {

        const res = await api.sendData(
            "/auth/signup",
            user
        );

        dispatch(registerSuccess(res));

        navigate("/sign-in");

    } catch (err) {

        dispatch(registerFailure());

        console.log(err.response?.data);

        return {
            success: false,
            message: err.response?.data || "Đăng ký thất bại"
        };
    }
};


// SEND EMAIL
export const sendEmail = async (data,dispatch) => {
    dispatch(sendEmailStart());
    try {
        const res = await api.sendData(
            "/auth/send-email",
            data
        );
        dispatch(sendEmailSuccess());
        return res;
    } catch (err) {
        dispatch(sendEmailFailure());
        console.log(err);
        console.log(err.response);
        console.log(err.response?.data);
        throw err;
    }
};


// VERIFY OTP
export const verifyOtp = async (data, dispatch) => {
    dispatch(verifyOtpStart());
      try {

        const res = await api.sendData(
            "/auth/verify-otp",
            data
        );

        dispatch(verifyOtpSuccess());

        return res;

    } catch (err) {

        dispatch(verifyOtpFailure());

        console.log(err.response?.data);

        throw err;
    }
};


// CHANGE PASSWORD
export const changePassword = async (
    data,
    dispatch
) => {

    dispatch(changePasswordStart());

    try {

        const res = await api.sendData(
            "/auth/forgot-password",
            data
        );

        dispatch(changePasswordSuccess());

        return res;

    } catch (err) {

        dispatch(changePasswordFailure());

        console.log(err.response?.data);

        throw err;
    }
};
//SIGNUP OTP
export const sendRegisterOtp = async (data, dispatch) => {
    dispatch(registerStart());

    try {
        const res = await api.sendData(
            "/auth/signup/send-otp",
            data
        );

        dispatch(registerSuccess(res));

        return {
            success: true,
            message: res
        };
    } catch (err) {
        dispatch(registerFailure());

        console.log(err.response?.data);

        return {
            success: false,
            message:
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message || "Gửi OTP thất bại"
        };
    }
};
export const verifyRegisterOtp = async (data, dispatch) => {
    dispatch(registerStart());

    try {
        const res = await api.sendData(
            "/auth/signup/verify",
            data
        );

        dispatch(registerSuccess(res));

        return {
            success: true,
            message: res
        };
    } catch (err) {
        dispatch(registerFailure());

        console.log(err.response?.data);

        return {
            success: false,
            message:
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message || "Xác thực OTP thất bại"
        };
    }
};