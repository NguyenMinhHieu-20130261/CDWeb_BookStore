
import {createBrowserRouter} from "react-router-dom";
import {Home} from "../components/Pages/home/Home";
import BlogDetail from "../components/Pages/blog-detail/BlogDetail";
import BlogList from "../components/Pages/blog-list/BlogList";
import ProductDetail from "../components/Pages/product-detail/ProductDetail";
import ProductList from "../components/Pages/product-list/ProductList";
import {Contact} from "../components/Pages/contact/Contact";
import Cart from "../components/Pages/shopping-cart/Cart";
import Checkout from "../components/Pages/Checkout/Checkout";
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
        }, {
            path: "productlist",
            element: <ProductList/>,
        }, {
            path: "productdetail",
            element: <ProductDetail/>,
        }, {
            path: "bloglist",
            element: <BlogList/>,
        }, {
            path: "blogdetail",
            element: <BlogDetail/>,
        }, {
            path: "contact",
            element: <Contact/>,
        }, {
            path: "cart",
            element: <Cart/>,
        }, {
            path: "checkout",
            element: <Checkout/>,
        // }, {
        //     path: "aboutus",
        //     element: <AboutUs/>,
        // }, {
        //     path: "Login",
        //     element: <Login/>,
        // }, {
        //     path: "SignUp",
        //     element: <SignUp/>,
        }
    ]
}]);