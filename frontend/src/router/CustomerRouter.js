import {Route, Routes} from "react-router-dom";
import {Home} from "../customer/page/home/Home";
import Contact from "../customer/page/contact/Contact";
import Cart from "../customer/page/shopping-cart/Cart";
import BlogList from "../customer/page/blog-list/BlogList";
import BlogDetail from "../customer/page/blog-detail/BlogDetail";
import Checkout from "../customer/page/checkout/Checkout";
import ProductList from "../customer/page/product-list/ProductList";
import ProductDetail from "../customer/page/product-detail/ProductDetail";
import SignIn from "../customer/page/sign-in/SignIn";
import SignUp from "../customer/page/sign-up/SignUp";
import NotFound from "../customer/page/not-found/NotFound";
import ForgotPassword from "../customer/page/forgot-password/ForgotPassword";
import {Header} from "../customer/components/layout/Header";
import {Footer} from "../customer/components/layout/Footer";

import UserAccount from "../customer/page/user-account/UserAccount";
import UserAddress from "../customer/page/user-address/UserAddress";
import AddNewAddress from "../customer/page/user-address/AddNewAddress";
import UpdateAddress from "../customer/page/user-address/UpdateAddress";
import UserOrders from "../customer/page/user-orders/UserOrders";
import UserWishlist from "../customer/page/user-wishlist/UserWishlist";

const CustomerRouter = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                {/* đăng nhập user */}
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                {/* product */}
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/product-list/all" element={<ProductList />} />
                <Route path="/product-list/:categoryId" element={<ProductList />} />
                <Route path="/product-detail/:slug" element={<ProductDetail/>}/>
                <Route path="/product-detail/:id" element={<ProductDetail/>}/>
                {/* blog */}
                <Route path="/blog-list/:cateId" element={<BlogList/>}/>
                <Route path="/blog-detail/:slug" element={<BlogDetail/>}/> 
                {/* another */}
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
                {/* checkout */}
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/check-out" element={<Checkout/>}/>
                {/* user */}
                <Route path="/user/info" element={<UserAccount/>}/>
                <Route path="/user/address" element={<UserAddress/>}/>
                <Route path="/user/address/add" element={<AddNewAddress/>}/>
                <Route path="/user/address/update/:id" element={<UpdateAddress/>}/>
                <Route path="/user/order" element={<UserOrders/>}/>
                <Route path="/user/wishlist" element={<UserWishlist/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}
export default CustomerRouter;