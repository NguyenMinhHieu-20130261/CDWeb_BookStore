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

        throw err;
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