
import {createBrowserRouter} from "react-router-dom";
import {Home} from "../components/Pages/Home/Home";
import BlogDetail from "../components/Pages/BlogDetail/BlogDetail";
import BookDetail from "../components/Pages/BookDetail/BookDetail";
import {Contact} from "../components/Pages/Contact/Contact";
import Cart from "../components/Pages/ShoppingCart/Cart";
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
            path: "listbooks",
            // element: <ListBooks/>,
        }, {
            path: "bookdetail",
            element: <BookDetail/>,
        }, {
            path: "listblogs",
            // element: <ListBlog/>,
        }, {
            path: "blogdetail",
            element: <BlogDetail/>,
        }, {
            path: "contact",
            element: <Contact/>,
        }, {
            path: "cart",
            element: <Cart/>,
        }
    ]
}]);