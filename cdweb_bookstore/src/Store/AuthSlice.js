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
            state.success = true;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.success = false;
        }
    }
});
export const {loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure} = authSlice.actions;

export default authSlice.reducer;