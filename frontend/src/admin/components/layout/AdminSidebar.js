import {Link} from "react-router-dom";

export default function Header() {
  return (
    <>
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <a href="index.html" className="b-brand">
                        <img src={require("../../assets/images/logo.png")} alt="" className="logo logo-lg"/>
                        <img src={require("../../assets/images/logo-sm.svg")} alt="" className="logo logo-sm"/>
                    </a>
                </div>
                <div className="navbar-content">
                    <ul className="pc-navbar">
                        <li className="pc-item pc-caption">
                            <label>Quản lý</label>
                        </li>
                        <li className="pc-item">
                            <Link to="/admin" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone">home</i></span><span
                                className="pc-mtext">Quản lý chung</span></Link>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Quản lý sản phẩm</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/admin/products" className="pc-link"><span className="pc-micon"><i
                                data-feather="github">business_center</i></span><span
                                className="pc-mtext">Sách</span><span className="pc-arrow"><i
                                data-feather="chevron-right"></i></span></Link>
                            <ul className="pc-submenu">
                                <li className="pc-item"><Link to="/admin/products" className="pc-link">Danh sách
                                    đơn hàng</Link></li>
                                <li className="pc-item"><Link to="/admin/products/add" className="pc-link">Thêm đơn hàng</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/admin/accessories" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone">business_center</i></span><span
                                className="pc-mtext">Phụ kiện</span><span
                                className="pc-arrow"><i data-feather="chevron-right"></i></span></Link>
                            <ul className="pc-submenu">
                                <li className="pc-item"><Link to="/admin/accessories" className="pc-link">Danh sách
                                    phụ
                                    kiện</Link></li>
                                <li className="pc-item"><Link to="/admin/accessories/add" className="pc-link">Thêm phụ
                                    kiện</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item">
                            <Link to="/admin/products/status" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone">history_edu</i></span><span
                                className="pc-mtext">Tình trạng đơn hàng</span></Link>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Quản lý tin tức</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/admin/blogs" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone"
                                data-feather="file-minus"></i></span><span
                                className="pc-mtext">Tin tức</span><span className="pc-arrow"><i
                                data-feather="chevron-right"></i></span></Link>
                            <ul className="pc-submenu">
                                <li className="pc-item"><Link to="/admin/blogs" className="pc-link">Danh sách tin
                                    tức</Link>
                                </li>
                                <li className="pc-item"><Link to="/admin/blogs/add" className="pc-link">Thêm tin tức</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Tài khoản</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/admin/admins" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone"
                                data-feather="cpu"></i></span><span
                                className="pc-mtext">Admin</span><span className="pc-arrow"><i
                                data-feather="chevron-right"></i></span></Link>
                            <ul className="pc-submenu">
                                <li className="pc-item"><Link to="/admin/admins" className="pc-link">Danh sách
                                    admin</Link>
                                </li>
                                <li className="pc-item"><Link to="/admin/admins/add" className="pc-link">Thêm admin</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <Link to="/admin/users" className="pc-link"><span className="pc-micon"><i
                                className="material-icons-two-tone"
                                data-feather="user"></i></span><span
                                className="pc-mtext">Người dùng</span><span className="pc-arrow"><i
                                data-feather="chevron-right"></i></span></Link>
                            <ul className="pc-submenu">
                                <li className="pc-item"><Link to="/admin/users" className="pc-link">Danh sách người
                                    dùng</Link></li>
                                <li className="pc-item"><Link to="/admin/users/add" className="pc-link">Thêm người
                                    dùng</Link></li>
                            </ul>
                        </li>
                        <li className="pc-item pc-caption">
                            <label>Quản lý bình luận</label>
                        </li>
                        <li className="pc-item">
                            <Link to="/admin/comments" className="pc-link"><span className="pc-micon"><i
                                data-feather="message-circle">history_edu</i></span><span
                                className="pc-mtext">Bình luận</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

