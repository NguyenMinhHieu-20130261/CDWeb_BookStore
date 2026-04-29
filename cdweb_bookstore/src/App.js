import '@fortawesome/fontawesome-free/css/all.min.css';
import "./customer/assets/css/bootstrap-select.min.css";
import "./customer/assets/css/style.css";
import "./customer/assets/css/animate.css";
import './App.css';
import {Route, Routes} from "react-router-dom";
// import AdminRouter from "./router/AdminRouter";
import CustomerRouter from "./router/CustomerRouter";


function App() {
    return (
        <div>
            <Routes>
                <Route path='/*' element={<CustomerRouter/>}></Route>
                {/* <Route path='/admin/*' element={<AdminRouter/>}></Route> */}
            </Routes>
        </div>
    );
}

export default App;
