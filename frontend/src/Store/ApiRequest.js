import {loginFailure, loginStart, loginSuccess,
    registerFailure, registerStart, registerSuccess
    ,logoutStart,logoutFailure,logoutSuccess
    ,changePasswordStart,changePasswordFailure,changePasswordSuccess
    ,sendEmailStart, sendEmailSuccess, sendEmailFailure
} from "./AuthSlice";
import api from "../service/ApiService";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try{
        // Gọi API đăng nhập người dùng
        const res = await axios.post(
        `${baseURL}/auth/signin`,
        user
    );
    // Lưu thông tin người dùng và token vào localStorage
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    // Cập nhật state trong Redux
    dispatch(loginSuccess(res.data));

    return res.data;
    } catch (err) {
        dispatch(loginFailure());
        console.log("Login failed")
        console.log("DATA:", err.response?.data);
        throw err; // Ném lỗi để component có thể xử lý và hiển thị thông báo lỗi
    }
};
        
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        // Gọi API đăng ký người dùng
        const res = await api.sendData(`${baseURL}/auth/signup`, user);
        // Cập nhật state trong Redux
        dispatch(registerSuccess(res.data));
        navigate("/sign-in");
        console.log("Register success")
    } catch (err) {
        dispatch(registerFailure());
        console.log("Register failed")
        console.log("DATA:", err.response?.data);
        throw err; // Ném lỗi để component có thể xử lý và hiển thị thông báo lỗi
    }
}
export const logoutUser = async (user, dispatch) => {
    // dispatch action logoutStart để cập nhật state khi bắt đầu đăng xuất
    dispatch(logoutStart());
    try {
    // Gọi API đăng xuất người dùng
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
export const sendEmail = async (data, dispatch) => {
    dispatch(sendEmailStart());
    // Gọi API gửi email OTP
    try {
        const res = await axios.post(
            `${baseURL}/auth/send-email`,
            data
        );
        dispatch(sendEmailSuccess());
        return res.data;
    } catch (err) {
        dispatch(sendEmailFailure());
        console.log("Send email failed");
        console.log("DATA:", err.response?.data);
        throw err;
    }
};
export const verifyOtp = async (data) => {
    return await axios.post(`${baseURL}/auth/verify-otp`, data);
};
export const changePassword = async (data, dispatch) => {
    // Gọi API đổi mật khẩu
    dispatch(changePasswordStart());
    try {
        const res = await axios.post(
            `${baseURL}/auth/forgot-password`,
            data
        );
        dispatch(changePasswordSuccess());
        return res.data;
    } catch (err) {
        dispatch(changePasswordFailure());
        console.log("Change password failed");
        console.log("DATA:", err.response?.data);
        throw err;
    }
};