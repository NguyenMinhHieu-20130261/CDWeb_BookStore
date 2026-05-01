import {Route, Routes} from "react-router-dom";
import {Home} from "../customer/page/home/Home";
import {BlogDetail} from "../customer/page/blog-detail/BlogDetail";
import Contact from "../customer/page/contact/Contact";
import Cart from "../customer/page/shopping-cart/Cart";
import BlogList from "../customer/page/blog-list/BlogList";
import ProductList from "../customer/page/product-list/ProductList";
import Checkout from "../customer/page/checkout/Checkout";
import ProductDetail from "../customer/page/product-detail/ProductDetail";
import SignIn from "../customer/page/sign-in/SignIn";
import SignUp from "../customer/page/sign-up/SignUp";

import {Header} from "../customer/components/layout/Header";
import {Footer} from "../customer/components/layout/Footer";

const CustomerRouter = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/product-list" element={<ProductList/>}/>
                <Route path="/product-detail" element={<ProductDetail/>}/>
                <Route path="/blog-list" element={<BlogList/>}/>
                <Route path="/blog-detail" element={<BlogDetail/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}
export default CustomerRouter;