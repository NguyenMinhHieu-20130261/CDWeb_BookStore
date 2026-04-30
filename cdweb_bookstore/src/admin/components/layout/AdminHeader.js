import {Link} from "react-router-dom";

export default function Header() {
  return (
    <>
    {/* MobileHeader */}
      <div className="pc-mob-header pc-header">
            <div className="pcm-logo">
                <img src="./assets/images/logo.png" alt="" className="logo logo-lg"/>
            </div>
            <div className="pcm-toolbar">
                <Link>
                    <div className="hamburger hamburger--arrowturn">
                        <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                        </div>
                    </div>
                </Link>
                <Link>
                    <i data-feather="align-right"></i>
                </Link>
                <Link href="#!" className="pc-head-link" id="header-collapse">
                    <i data-feather="more-vertical"></i>
                </Link>
            </div>
        </div>
        {/* Main Header */}
        <header className="pc-header">
            <div className="header-wrapper">
                <div className="page-header-title">
                    <h5 className="m-b-10" style={{marginTop: '28px', fontWeight: 'bolder', fontSize: '1rem'}}>QUẢN
                        LÝ CỬA HÀNG SÁCH GOLDLEAF</h5>
                </div>
                <div className="ml-auto">
                    <ul className="list-unstyled">
                        <li className="dropdown pc-h-item">
                            <Link className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown"
                                href="#"
                                role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="material-icons-two-tone">search</i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right pc-h-dropdown drp-search">
                                <form className="px-3">
                                    <div className="form-group mb-0 d-flex align-items-center">
                                        <i data-feather="search"></i>
                                        <input type="search" className="form-control border-0 shadow-none"
                                                placeholder="Search here. . ."/>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="dropdown pc-h-item">
                            <Link className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown"
                                href="#"
                                role="button" aria-haspopup="false" aria-expanded="false">
                                <img src={require("../../assets/images/user/avatar-2.png")} alt="user-image"
                                        className="user-avtar"/>
                                <span>
                            <span className="user-name-admin">Admin</span>
                        <span className="user-desc">Quản lý cấp 1</span>
                        </span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                                <div className=" dropdown-header">
                                    <h5 className="text-overflow m-0"><span className="badge bg-light-primary"><a
                                        href="https://gumroad.com/dashboardkit"
                                        target="_blank">Thêm admin mới</a></span></h5>
                                </div>
                                <Link href="#!" className="dropdown-item">
                                    <i className="material-icons-two-tone">account_circle</i>
                                    <span>Tài khoản của tôi</span>
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    <i className="material-icons-two-tone">chrome_reader_mode</i>
                                    <span>Đăng xuất</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    </>
  );
}