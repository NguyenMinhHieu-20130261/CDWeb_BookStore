import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import React from "react";
import {useNavigate} from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../../../Store/AuthSlice";


export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parentCategories, setParentCategories] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    // lấy user từ redux store
    const user = useSelector(state => state.auth.login.currentUser);
    // kiểm tra nếu có user trong localStorage thì cập nhật vào redux store
    React.useEffect(() => {
         // Kiểm tra nếu có user trong localStorage thì cập nhật vào redux store
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            dispatch(loginSuccess(JSON.parse(storedUser)));
        }
        // Load danh mục từ API
        const loadData = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/category/all");

                const data = await res.json();
                // console.log("CATEGORY API RESPONSE:", data);
                setCategories(data);
                // Lọc ra danh mục cha
                const parents = data.filter(c => c.parentId === null);
                setParentCategories(parents);

            } catch (error) {
                console.error("Load category error:", error);
            }
        };

        loadData();
    }, []);
    // hàm logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logoutSuccess());   
        navigate("/home");
        // Load lại trang để cập nhật giao diện sau khi logout
        window.location.reload();
    };
    // Lấy danh mục con
    const getChildren = (parentId) => {
        const children = categories.filter(c =>
            Number(c.parentId) === Number(parentId)
        );
        // console.log("Parent:", parentId);
        // console.log("All categories:", categories);
        // console.log("Children:", children);
        // console.log(categories[0])
        return children;
    };
    return (
        <header id="site-header" className="site-header site-header__v12 mb-7 pb-1">
            <div className="masthead">
                <div className="bg-punch-light">
                    <div className="container py-3 py-md-4">
                        <div className="d-flex align-items-center position-relative flex-wrap">
                            <div className="d-none d-xl-flex align-items-center mt-3 mt-md-0 mr-md-auto">
                                <Link to="mailto:info@bookworm.com" className="mr-4 mb-4 mb-md-0">
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
                                </Link>
                                <Link to="tel:+1246-345-0695">
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
                                </Link>
                            </div>
                            <div className="offcanvas-toggler d-xl-none mr-4">
                                <Link id="offcanvasNavToggler" to="javascript:;" role="button"
                                   className="cat-menu text-dark" aria-controls="offcanvasNav" aria-haspopup="true"
                                   aria-expanded="false" data-unfold-event="click" data-unfold-hide-on-scroll="false"
                                   dadata-unfold-animation-in="fadeInLeft" data-unfold-animation-out="fadeOutLeft"
                                   data-unfold-duration="100">
                                    <svg width="20px" height="18px">
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,-0.000 L20.000,-0.000 L20.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,8.000 L15.000,8.000 L15.000,10.000 L-0.000,10.000 L-0.000,8.000 Z"/>
                                        <path fill-rule="evenodd" fill="rgb(25, 17, 11)"
                                              d="M-0.000,16.000 L20.000,16.000 L20.000,18.000 L-0.000,18.000 L-0.000,16.000 Z"/>
                                    </svg>
                                </Link>
                            </div>
                            <div className="site-branding pr-md-7 mx-md-0">
                                <h1 className="beta site-title site-title text-uppercase font-weight-bold font-size-5 m-0 ">
                                    <Link to="/home" rel="home">GoldLeaf</Link>
                                </h1>
                            </div>
                            {/* User Area */}
                            <div className="d-flex align-items-center ml-auto header-icons-links">
                                {user?(
                                        <>
                                            <Link id="sidebarNavToggler-my_account">
                                                <div
                                                    className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                                    <i className="fa-solid fa-user font-size-5 text-dark"></i>
                                                    <div className="ml-2 d-none d-lg-block text-dark">
                                            <span className="text-secondary-gray-1090 font-size-1">
                                                Xin chào </span>
                                                        <div>{user.username}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                            {/* Logout buttpn */}
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    marginLeft: "10px",
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    color: "red"
                                                }}
                                            >
                                                Đăng xuất
                                            </button>
                                        </>
                                   ):(
                                        <>
                                            <Link id="sidebarNavToggler-my_account" to="/sign-in">
                                                <div
                                                    className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                                    <i className="fa-solid fa-user font-size-5 text-dark"></i>
                                                    <div className="ml-2 d-none d-lg-block text-dark">
                                            <span className="text-secondary-gray-1090 font-size-1">
                                                Đăng nhập </span>
                                                        <div>Tài khoản</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    )}
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
                                        {/* <li><Link to={"/product-list"}>Danh mục sách</Link>
                                            <ul className="header__menu__dropdown">
                                                <li><Link to="">Hài kịch</Link>
                                                    <ul className="header__menu__dropdown__level2">
                                                        <li><Link to={""}>Hài Việt</Link></li>
                                                        <li><Link to={""}>Hài Trung</Link></li>
                                                        <li><Link to={""}>Hài Hàn</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link to={""}>Hành động</Link></li>
                                                <li><Link to={""}>Tình cảm</Link></li>
                                            </ul>
                                        </li> */}
                                        <li>
                                            <Link to={"/product-list"}>Danh mục sách</Link>
                                            <ul className="header__menu__dropdown">
                                                {parentCategories.map(parent => {
                                                    const children = getChildren(parent.id);

                                                    return (
                                                        <li key={parent.id}>
                                                            <Link to={`/category/${parent.id}`}>
                                                                {parent.name}
                                                            </Link>
                                                            {children.length > 0 && (
                                                                <ul className="header__menu__dropdown__level2">
                                                                    {children.map(child => (
                                                                        <li key={child.id}>
                                                                            <Link to={`/category/${child.id}`}>
                                                                                {child.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                        <li><Link to={"/blog-list"}>Tin Tức</Link></li>
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