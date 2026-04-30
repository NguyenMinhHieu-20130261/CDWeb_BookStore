import '@fortawesome/fontawesome-free/css/all.min.css';
import "./customer/assets/css/bootstrap-select.min.css";
import "./customer/assets/css/style.css";
import "./customer/assets/css/animate.css";
import "./admin/assets/css/index.scss"
import "./admin/assets/fonts/material.css"
import "./admin/assets/fonts/feather.css"
import "./admin/assets/fonts/fontawesome.css"

import './App.css';
import {Route, Routes} from "react-router-dom";
import AdminRouter from "./router/AdminRouter";
import CustomerRouter from "./router/CustomerRouter";


function App() {
    return (
        <div>
            <Routes>
                <Route path='/admin/*' element={<AdminRouter/>}></Route>
                <Route path='/*' element={<CustomerRouter/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
