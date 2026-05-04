import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login:{
            currentUser: null,
            isFetching: false,
            error: false
        },
        register:{
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false
        },
        changePassword: {
            isFetching: false,
            error: false
        },
        sendEmail: {
            isFetching: false,
            error: false
        }

    },
    reducers: {
        // Login
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        }, 
        // Register
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        // Logout
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.logout.isFetching = false;
            state.logout.currentUser = null;
            state.logout.error = false;
        },
        logoutFailure: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        // Change Password
            changePasswordStart: (state) => {
            state.changePassword.isFetching = true;
        }, 
        changePasswordSuccess: (state, action) => { 
            state.changePassword.isFetching = false;
            state.changePassword.error = false;
        },
        changePasswordFailure: (state) => {
            state.changePassword.isFetching = false;
            state.changePassword.error = true;
        },
        // Send Email
            sendEmailStart: (state) => {
            state.sendEmail.isFetching = true;
        },
        sendEmailSuccess: (state, action) => { 
            state.sendEmail.isFetching = false;
            state.sendEmail.error = false;
        },
        sendEmailFailure: (state) => {
            state.sendEmail.isFetching = false;
            state.sendEmail.error = true;
    }
    }
});
export const {loginStart, loginSuccess, loginFailure,
     registerStart, registerSuccess, registerFailure,
     logoutStart, logoutSuccess, logoutFailure,
     changePasswordStart, changePasswordSuccess, changePasswordFailure,
     sendEmailStart, sendEmailSuccess, sendEmailFailure
 } = authSlice.actions;

export default authSlice.reducer;