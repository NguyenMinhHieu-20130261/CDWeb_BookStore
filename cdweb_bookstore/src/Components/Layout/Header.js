
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
                                            +84 765 999 111 </span>
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
                    //                data-unfold-type="css-animation" data-unfold-overlay="{
                    //     &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                    //     &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                    //     &quot;animationSpeed&quot;: 100
                    // }"
                     data-unfold-animation-in="fadeInLeft" data-unfold-animation-out="fadeOutLeft"
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
                                <a id="sidebarNavToggler-my_account" href="../Pages/Login.html" role="button"
                                   aria-controls="registerLoginForm" aria-haspopup="true" aria-expanded="false"
                                   data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   data-unfold-target="#registerLoginForm"
                        //            data-unfold-type="css-animation" data-unfold-overlay="{
                        //     &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                        //     &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                        //     &quot;animationSpeed&quot;: 500
                        // }"
                         data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight"
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
                                <a id="sidebarNavToggler-my_cart" href="../Pages/Shoping-cart.html" role="button"
                                   aria-controls="offcanvasCart" aria-haspopup="true" aria-expanded="false"
                                   data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   data-unfold-target="#offcanvasCart"
                                   data-unfold-type="css-animation" data-unfold-overlay="{
                            &quot;className&quot;: &quot;u-sidebar-bg-overlay&quot;,
                            &quot;background&quot;: &quot;rgba(0, 0, 0, .7)&quot;,
                            &quot;animationSpeed&quot;: 500
                        }" 
                        data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight"
                                   data-unfold-duration="500" className="d-block nav-link text-dark ml-4">
                                    <div
                                        className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                    <span
                                        className="position-absolute width-16 height-16 rounded-circle d-flex align-items-center justify-content-center font-size-n9 left-0 top-0 ml-n2 mt-n1 text-white bg-dark">
                                        <span className="cart-contents-count">
                                            0
                                        </span> </span>
                                        <i className="fa-solid fa-cart-shopping font-size-5 text-dark"></i>
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
                                <ul id="menu-primary-menu" className="nav">
                                    <li id="menu-item-169"
                                        className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children dropdown has-children active menu-item-169 nav-item d-flex align-items-center">
                                        <a title="Home" href="../Pages/Home.html"
                                           className=" nav-link link-black-100 mx-3 px-0 py-3 font-weight-medium">Trang
                                            chủ</a>
                                    </li>
                                    <li id="menu-item-188"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown has-children menu-item-188 nav-item d-flex align-items-center">
                                        <a title="Shop" href="../Pages/List-Book.html" id="menu-item-dropdown-188"
                                           aria-haspopup="true" aria-expanded="false" data-unfold-type="css-animation"
                                           data-unfold-event="hover"
                                           data-unfold-target="#menu-item-dropdown-content-188"
                                           data-unfold-duration="200"
                                           data-unfold-animation-in="slideInUp" data-unfold-animation-out="fadeOut"
                                           data-unfold-hide-on-scroll="true"
                                           className="dropdown-toggle nav-link link-black-100 mx-3 px-0 py-3 font-weight-medium"
                                           data-unfold-delay="50">Danh mục</a>
                                        <ul className="dropdown-menu dropdown-unfold rounded-0 border-gray-900 font-size-2"
                                            id="menu-item-dropdown-content-188" aria-labelledby="menu-item-dropdown-188"
                                            role="menu">
                                            <li id="menu-item-190"
                                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown has-children menu-item-190 nav-item position-relative">
                                                <a title="Shop List" href="#" id="menu-item-dropdown-190"
                                                   aria-haspopup="true" aria-expanded="false"
                                                   data-unfold-type="css-animation" data-unfold-event="hover"
                                                   data-unfold-target="#menu-item-dropdown-content-190"
                                                   data-unfold-duration="200" data-unfold-animation-in="slideInUp"
                                                   data-unfold-animation-out="fadeOut" data-unfold-hide-on-scroll="true"
                                                   className="dropdown-toggle dropdown-item dropdown-item__sub-menu d-flex align-items-center justify-content-between link-black-100"
                                                   data-unfold-delay="100">Danh mục sách</a>
                                                <ul className="dropdown-menu dropdown-unfold rounded-0 border-gray-900 dropdown-sub-menu"
                                                    id="menu-item-dropdown-content-190"
                                                    aria-labelledby="menu-item-dropdown-190" role="menu">
                                                    <li id="menu-item-2877"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-2877 nav-item">
                                                        <a title="Shop List v1"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v1"
                                                           className="dropdown-item link-black-100">Shop List v1</a>
                                                    </li>
                                                    <li id="menu-item-196"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-196 nav-item">
                                                        <a title="Shop List v2"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v2/"
                                                           className="dropdown-item link-black-100">Shop List v2</a>
                                                    </li>
                                                    <li id="menu-item-197"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-197 nav-item">
                                                        <a title="Shop List v3"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v3/"
                                                           className="dropdown-item link-black-100">Shop List v3</a>
                                                    </li>
                                                    <li id="menu-item-198"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-198 nav-item">
                                                        <a title="Shop List v4"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v4/"
                                                           className="dropdown-item link-black-100">Shop List v4</a>
                                                    </li>
                                                    <li id="menu-item-199"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-199 nav-item">
                                                        <a title="Shop List v5"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v5/"
                                                           className="dropdown-item link-black-100">Shop List v5</a>
                                                    </li>
                                                    <li id="menu-item-201"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-201 nav-item">
                                                        <a title="Shop List v6"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v6/"
                                                           className="dropdown-item link-black-100">Shop List v6</a>
                                                    </li>
                                                    <li id="menu-item-204"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-204 nav-item">
                                                        <a title="Shop List v7"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v7/"
                                                           className="dropdown-item link-black-100">Shop List v7</a>
                                                    </li>
                                                    <li id="menu-item-205"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-205 nav-item">
                                                        <a title="Shop List v8"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v8/"
                                                           className="dropdown-item link-black-100">Shop List v8</a>
                                                    </li>
                                                    <li id="menu-item-206"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-206 nav-item">
                                                        <a title="Shop List v9"
                                                           href="https://bookworm.madrasthemes.com/shop/style-v9/"
                                                           className="dropdown-item link-black-100">Shop List v9</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-2575"
                                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2575 nav-item">
                                                <a title="Shop Store Location"
                                                   href="https://bookworm.madrasthemes.com/store-locator/"
                                                   className="dropdown-item link-black-100">Văn phòng phẩm</a></li>
                                        </ul>
                                    </li>
                                    <li id="menu-item-169"
                                        className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children dropdown has-children active menu-item-169 nav-item d-flex align-items-center">
                                        <a title="Home" href="../Pages/Blog-list.html"
                                           className=" nav-link link-black-100 mx-3 px-0 py-3 font-weight-medium">Tin
                                            tức</a>
                                    </li>
                                    <li id="menu-item-169"
                                        className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children dropdown has-children active menu-item-169 nav-item d-flex align-items-center">
                                        <a title="Home" href="../Pages/Contact.html"
                                           className=" nav-link link-black-100 mx-3 px-0 py-3 font-weight-medium">Liên
                                            hệ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}