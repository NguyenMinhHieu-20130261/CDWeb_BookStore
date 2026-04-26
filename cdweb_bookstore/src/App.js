// import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import {Header} from "./Components/Layout/Header";
import {Footer} from "./Components/Layout/Footer";
import {Outlet} from "react-router-dom";
import "./assets/CSS/style.css";
import "./assets/CSS/animate.css";
import "./assets/CSS/bootstrap-select.min.css";


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
