import axios from 'axios';
import {loginFailure, loginStart, loginSuccess,
    registerFailure, registerStart, registerSuccess} from "./AuthSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/api/auth/signin", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
        console.log("Login success")
    } catch (err) {
        dispatch(loginFailure());
        console.log("Login failed")
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:8080/api/auth/signup", user);
        dispatch(registerSuccess(res.data));
        navigate("/sign-in");
        console.log("Register success")
    } catch (err) {
        dispatch(registerFailure());
        console.log("Register failed")
        console.log("REGISTER ERROR:", err.response?.status);
        console.log("DATA:", err.response?.data);
    }
}