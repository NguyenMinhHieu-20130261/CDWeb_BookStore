import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header id="site-header" className="site-header site-header__v12 mb-7 pb-1">
            <div className="masthead">
                <div className="bg-punch-light">
                    <div className="container py-3 py-md-4">
                        <div className="d-flex align-items-center position-relative flex-wrap">
                            <div className="d-none d-xl-flex align-items-center mt-3 mt-md-0 mr-md-auto">
                                <a href="mailto:info@bookworm.com" className="mr-4 mb-4 mb-md-0">
                                    <div className="d-flex align-items-center text-dark font-size-2 text-lh-sm">
                                        <i className="fa-regular fa-circle-question font-size-5 mt-2 mr-1"></i>
                                        <div className="ml-2">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            goldleaf@gmail.com </span>
                                            <div className="h6 mb-0">
                                                Gửi mail ngay!
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="tel:+1246-345-0695">
                                    <div className="d-flex align-items-center text-dark font-size-2 text-lh-sm">
                                        <i className="fa-solid fa-phone font-size-5 mt-2 mr-1"></i>
                                        <div className="ml-2">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            +84 909067623 </span>
                                            <div className="h6 mb-0">
                                                Gọi không tốn phí
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="offcanvas-toggler d-xl-none mr-4">
                                <a id="offcanvasNavToggler" href="javascript:;" role="button"
                                   className="cat-menu text-dark" aria-controls="offcanvasNav" aria-haspopup="true"
                                   aria-expanded="false" data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   data-unfold-target="#offcanvasNav"
                                   data-unfold-type="css-animation" data-unfold-overlay="{
                        &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                        &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                        &quot;animationSpeed&quot;: 100
                    }" data-unfold-animation-in="fadeInLeft" data-unfold-animation-out="fadeOutLeft"
                                   data-unfold-duration="100">
                                    <svg width="20px" height="18px">
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,-0.000 L20.000,-0.000 L20.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,8.000 L15.000,8.000 L15.000,10.000 L-0.000,10.000 L-0.000,8.000 Z"/>
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,16.000 L20.000,16.000 L20.000,18.000 L-0.000,18.000 L-0.000,16.000 Z"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="site-branding pr-md-7 mx-md-0">
                                <h1 className="beta site-title site-title text-uppercase font-weight-bold font-size-5 m-0 ">
                                    <a href="" rel="home">GoldLeaf</a></h1>
                            </div>
                            <div className="d-flex align-items-center ml-auto header-icons-links">
                                <a id="sidebarNavToggler-my_account" href="../pages/Login.html" role="button"
                                   aria-controls="registerLoginForm" aria-haspopup="true" aria-expanded="false"
                                   data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   data-unfold-target="#registerLoginForm"
                                   data-unfold-type="css-animation" data-unfold-overlay="{
                            &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                            &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                            &quot;animationSpeed&quot;: 500
                        }" data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight"
                                   data-unfold-duration="500">
                                    <div
                                        className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                        <i className="fa-solid fa-user font-size-5 text-dark"></i>
                                        <div className="ml-2 d-none d-lg-block text-dark">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            Đăng nhập </span>
                                            <div>Tài khoản</div>
                                        </div>
                                    </div>
                                </a>
                                <a id="sidebarNavToggler-my_cart" href="../pages/Shoping-cart.html" role="button"
                                   aria-controls="offcanvasCart" aria-haspopup="true" aria-expanded="false"
                                   data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   data-unfold-target="#offcanvasCart"
                                   data-unfold-type="css-animation" data-unfold-overlay="{
                            &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                            &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                            &quot;animationSpeed&quot;: 500
                        }" data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight"
                                   data-unfold-duration="500" className="d-block nav-link text-dark ml-4">
                                    <div
                                        className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                    <span
                                        className="position-absolute width-16 height-16 rounded-circle d-flex align-items-center justify-content-center font-size-n9 left-0 top-0 ml-n2 mt-n1 text-white bg-dark">
                                        <span className="cart-contents-count">
                                            0
                                        </span> </span>
                                        <Link to={"/cart"}>
                                        <i className="fa-solid fa-cart-shopping font-size-5 text-dark"></i>
                                        </Link>
                                        <div className="ml-2 d-none d-lg-block text-dark">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            Giỏ hàng </span>
                                            <div><span className="cart-contents-total">
                                                <span className="woocommerce-Price-amount amount"><span
                                                    className="woocommerce-Price-currencySymbol">&#036;</span>0.00</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-bottom py-1 d-none d-xl-block">
                    <div className="container">
                        <div className="d-md-flex align-items-center position-relative">
                            <div className="site-navigation mx-auto">
                                <nav className="header__menu">
                                    <ul>
                                        <li><Link to={"/home"}>Trang Chủ</Link></li>
                                        <li><a href="">Danh mục sách</a>
                                            <ul className="header__menu__dropdown">
                                                <li><a href="">Hài kịch</a>
                                                    <ul className="header__menu__dropdown__level2">
                                                        <li><Link to={""}>Hài Việt</Link></li>
                                                        <li><Link to={""}>Hài Trung</Link></li>
                                                        <li><Link to={""}>Hài Hàn</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link to={""}>Hành động</Link></li>
                                                <li><Link to={""}>Tình cảm</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to={"/listblogs"}>Tin Tức</Link></li>
                                        <li><Link to={"/contact"}>Liên Hệ</Link></li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}