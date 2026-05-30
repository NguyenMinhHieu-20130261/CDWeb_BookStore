import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import React from "react";
import {useNavigate} from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../../../Store/AuthSlice";
import { SearchBar } from "../general/SearchComponents";
import "../../assets/css/style-search.css"
import "../../assets/css/style-cart.css"
import api from "../../../service/ApiService"
import {logoutUser} from "../../../Store/ApiRequest";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parentCategories, setParentCategories] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    // lấy user từ redux store
    const user = useSelector(state => state.auth.login.currentUser);
    // kiểm tra nếu có user trong localStorage thì cập nhật vào redux store
    React.useEffect(() => {
        // Load danh mục từ API
        const loadData = async () => {
            try {
                const data = await api.fetchData("/category/all");
                setCategories(data);
                // console.log("categories123", data);
                // Lọc ra danh mục cha
                const parents = data.filter(c => c.parentId === null);
                // console.log("parents", parents);
                setParentCategories(parents);
            } catch (error) {
                console.error("Load category error:", error);
            }
        };
        loadData();
    }, []);
    // hàm logout
    const handleLogout = async(e) => {
        try{
            const res = await logoutUser(user, dispatch);
            dispatch(logoutSuccess());   
            navigate("/");
            window.location.reload();
        } catch (error){
            console.log(error); 
        }
    };
    // Lấy danh mục con
    const getChildren = (parentId) => {
        const children = categories.filter(c =>
            Number(c.parentId) === Number(parentId)
        );
        return children;
    };
    return (
        <header id="site-header" className="site-header site-header__v12 mb-7 pb-1">
            <div className="masthead">
                <div className="bg-punch-light">
                    <div className="container py-3 py-md-4">
                        <div className="d-flex align-items-center position-relative flex-wrap">
                            <div className="d-none d-xl-flex align-items-center mt-3 mt-md-0 mr-md-auto">
                                {!isSearchOpen && (
                                    <>
                                        <Link to="mailto:info@bookworm.com" className="mr-4 mb-4 mb-md-0">
                                            <div className="d-flex align-items-center text-dark font-size-2 text-lh-sm">
                                                <i className="fa-regular fa-circle-question font-size-5 mt-2 mr-1"></i>
                                                <div className="ml-2">
                                                <span className="text-secondary-gray-1090 font-size-1">
                                                    goldleaf@gmail.com </span>
                                                    <div className="h6 mb-0">
                                                        Gửi mail ngay!
                                                    </div>a
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="/">
                                            <div className="d-flex align-items-center text-dark font-size-2 text-lh-sm">
                                                <i className="fa-solid fa-phone font-size-5 mt-2 mr-1"></i>
                                                <div className="ml-2">
                                                    <span className="text-secondary-gray-1090 font-size-1">
                                                        +84 909067623
                                                    </span>
                                                    <div className="h6 mb-0">
                                                        Gọi không tốn phí
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                <SearchBar onToggle={setIsSearchOpen} />
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
                                            <Link id="sidebarNavToggler-my_account" to="/user/info">
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
                            {/* Cart Area */}
                            <Link id="sidebarNavToggler-my_cart" to="/cart"
                                  className="d-block nav-link text-dark ml-4">
                                <div
                                    className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                    <span
                                        className="position-absolute width-16 height-16 rounded-circle d-flex align-items-center justify-content-center font-size-n9 left-0 top-0 ml-n2 mt-n1 text-white bg-dark">
                                        <span className="cart-contents-count">
                                            0
                                        </span> </span>
                                    <div >
                                        <i className="fa-solid fa-cart-shopping font-size-5 text-dark"></i>
                                    </div>
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
                            </Link>
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
                                        <li>
                                            <Link to={`/product-list`}>Danh mục sách</Link>
                                            <ul className="header__menu__dropdown">
                                                {parentCategories.map(parent => {
                                                    const children = getChildren(parent.id);
                                                    return (
                                                        <li key={parent.id}>
                                                            <Link 
                                                                to={`/product-list/${parent.id}`}
                                                                state={{
                                                                    title: parent.name,
                                                                    categoryName: parent.name,
                                                                    categoryLink: `/product-list/${parent.id}`
                                                                }}
                                                            >
                                                                {parent.name}
                                                            </Link>
                                                            {children.length > 0 && (
                                                                <ul className="header__menu__dropdown__level2">
                                                                    {children.map(child => (
                                                                        <li key={child.id}>
                                                                            <Link 
                                                                                to={`/product-list/${child.id}`}
                                                                                state={{
                                                                                    title: child.name,
                                                                                    categoryName: child.name,
                                                                                    categoryLink: `/product-list/${child.id}`
                                                                                }}
                                                                            >
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
                                        <li><Link to={"/blog-list/all"}>Tin Tức</Link></li>
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