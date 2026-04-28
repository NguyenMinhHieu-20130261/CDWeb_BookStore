import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import {Header} from "./components/layout/Header";
import {Footer} from "./components/layout/Footer";
import {Outlet} from "react-router-dom";
import "./assets/css/style.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap-select.min.css";


function App() {
  return (
      <div>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  );
}

export default App;
