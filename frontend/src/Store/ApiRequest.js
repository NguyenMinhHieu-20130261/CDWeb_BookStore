import {loginFailure, loginStart, loginSuccess,
    registerFailure, registerStart, registerSuccess} from "./AuthSlice";
import api from "../service/ApiService";

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await api.sendData("/auth/signin", user);
        localStorage.setItem("token", res.token);
        dispatch(loginSuccess(res));
        return res;
    } catch (error) {
        dispatch(loginFailure());
        throw error;
    }
};
        
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await api.sendData("/auth/signup", user);
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