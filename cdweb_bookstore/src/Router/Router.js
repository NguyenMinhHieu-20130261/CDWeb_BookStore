
import {createBrowserRouter} from "react-router-dom";
import {Home} from "../Components/Pages/Home/Home";
import App from "../App";

export const webRouter = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children: [
        {
            path: "",
            element: <Home/>
        }, {
            path: "home",
            element: <Home/>,
        }]
}]);