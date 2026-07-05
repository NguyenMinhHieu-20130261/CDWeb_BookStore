import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import React,{useState}from "react";
import {useNavigate} from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../../../Store/AuthSlice";
import { SearchBar } from "../general/SearchComponents";
import "../../assets/css/style-search.css"
import "../../assets/css/style-cart.css"
import api from "../../../service/ApiService"
import {logoutUser} from "../../../Store/ApiRequest";
import FormatCurrency from "../../../utils/FormatCurrency";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [unread, setUnread] = useState(0);
    const [parentCategories, setParentCategories] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    //cart total
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
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
        e.preventDefault();
        try{
            await logoutUser(dispatch);
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
    //cart
    React.useEffect(() => {
        const loadCart = async () => {
            if (!user?.id) {
                setTotalItems(0);
                return;
            }
            try {
                const data = await api.fetchData(`/cart/items`);
                const count = data.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );
                const totalPrice = data.reduce(
                    (sum, item) =>
                        sum + item.product.currentPrice * item.quantity,
                    0
                );
                setTotalPrice(totalPrice);
                setTotalItems(count);
            } catch (error) {
                console.error("Failed to fetch cart items", error.response?.data || error);
                setTotalItems(0);
            }
        };
        loadCart();
    }, [user]);
    //notify
    React.useEffect(() => {
        const loadNotification = async () => {
            if (!user?.id) {
                setUnread(0);
                return;
            }

            try {
                const count = await api.fetchData(
                    `/notifications/user/${user.id}/unread-count`
                );
                setUnread(count);
            } catch (error) {
                console.log("Load notification error:", error);
            }
        };

        loadNotification();
    }, [user]);
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
                                {user ? (
                                    <div className="user-dropdown-wrapper">
                                        <div className="user-dropdown-toggle">
                                            <i className="fa-solid fa-user font-size-5 text-dark"></i>
                                            <div className="ml-2 d-none d-lg-block text-dark">
                                                <span className="text-secondary-gray-1090 font-size-1">
                                                    Xin chào
                                                </span>
                                                <div>{user.username}</div>
                                            </div>
                                        </div>
                                        <div className="user-dropdown-menu">
                                            <Link to="/user/info" className="user-dropdown-item">
                                                <i className="fa-solid fa-user-circle"/>
                                                <span>Thông tin người dùng</span>
                                            </Link>
                                            <Link to="/user/address" className="user-dropdown-item">
                                                <i className="fa-solid fa-location-dot"/>
                                                <span>Địa chỉ người dùng</span>
                                            </Link>
                                            <Link to="/user/order" className="user-dropdown-item">
                                                <i className="fa-solid fa-box"/>
                                                <span>Đơn hàng</span>
                                            </Link>
                                            <Link to="/user/notification" className="user-dropdown-item">
                                                <i className="fa-solid fa-bell text-dark"/>
                                                <span>Thông báo</span>
                                            </Link>
                                            <button
                                                type="button"
                                                className="user-dropdown-item logout-item"
                                                onClick={handleLogout}
                                            >
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                                <span>Đăng xuất</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link id="sidebarNavToggler-my_account" to="/sign-in">
                                        <div className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative">
                                            <i className="fa-solid fa-user font-size-5 text-dark"></i>

                                            <div className="ml-2 d-none d-lg-block text-dark">
                                                <span className="text-secondary-gray-1090 font-size-1">
                                                    Đăng nhập
                                                </span>
                                                <div>Tài khoản</div>
                                            </div>
                                        </div>
                                    </Link>
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
                                            {totalItems}
                                        </span> 
                                    </span>
                                    <div >
                                        <i className="fa-solid fa-cart-shopping font-size-5 text-dark"></i>
                                    </div>
                                    <div className="ml-2 d-none d-lg-block text-dark">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            Giỏ hàng </span>
                                        <div>
                                            <span 
                                                className="cart-contents-total"
                                            >
                                                <span className="woocommerce-Price-amount amount"
                                                    style={{color:"#505050"}}
                                                >
                                                    {FormatCurrency(totalPrice)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/user/notification"
                                className="d-block nav-link text-dark ml-2"
                            >
                                <div
                                    className="d-flex align-items-center text-white font-size-2 text-lh-sm position-relative"
                                >

                                    {unread > 0 && (
                                        <span
                                            className="position-absolute width-16 height-16 rounded-circle d-flex align-items-center justify-content-center font-size-n9 left-0 top-0 ml-n2 mt-n1 text-white bg-danger"
                                        >
                                            {unread}
                                        </span>
                                    )}

                                    <div>
                                        <i className="fa-solid fa-bell font-size-5 text-dark"/>
                                    </div>

                                    <div className="ml-2 d-none d-lg-block text-dark">
                                        <span className="text-secondary-gray-1090 font-size-1">
                                            Thông báo
                                        </span>
                                        <div>
                                            {unread > 0
                                                ? `${unread} chưa đọc`
                                                : "Không có"}
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