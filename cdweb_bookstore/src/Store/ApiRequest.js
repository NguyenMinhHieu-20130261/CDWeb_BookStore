import axios from 'axios';
import {loginFailure, loginStart, loginSuccess} from "./AuthSlice";

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