import '@fortawesome/fontawesome-free/css/all.min.css';
import "./customer/assets/css/bootstrap-select.min.css";
import "./customer/assets/css/style.css";
import "./customer/assets/css/animate.css";
// import "./admin/assets/css/index.scss"
// import "./admin/assets/fonts/material.css"
// import "./admin/assets/fonts/feather.css"
// import "./admin/assets/fonts/fontawesome.css"
import './App.css';
import {Route, Routes} from "react-router-dom";
// import AdminRouter from "./router/AdminRouter";
import CustomerRouter from "./router/CustomerRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./Store/AuthSlice";

function InitAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch(loginSuccess(JSON.parse(user)));
        }
    }, [dispatch]);

    return null;
}

function App() {
    return (
        <div>
            <InitAuth />
            <Routes>
                {/* <Route path='/admin/*' element={<AdminRouter/>}></Route> */}
                <Route path='/*' element={<CustomerRouter/>}></Route>
                {console.log(process.env.REACT_APP_API_URL)}
            </Routes>
        </div>
    );
}

export default App;
