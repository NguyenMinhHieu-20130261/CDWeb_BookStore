import React from "react";
import {Link} from "react-router-dom";

const Breadcrumb = ({location}) => {

    const pathNameMap = {
        '/sign-in': 'Đăng nhập',
        '/sign-up': 'Đăng ký',
        '/forgot-password': 'Quên mật khẩu',
        '/user/account': 'Thông tin tài khoản',
        // '/user/order': 'Đơn hàng của tôi',
        // '/user/wishlist': 'Sản phẩm yêu thích',
        '/blog-list': 'Bài viết',
        '/blog-detail': 'Chi tiết bài viết',
        '/contact': 'Liên hệ',
        '/cart': 'Giỏ hàng',
        '/checkout': 'Thanh toán',
        '/product-list': 'Tất cả sản phẩm',
    }
    const getPathName = (path) => {
        return pathNameMap[path] || '';
    }
    let currentLink = '';
    const pathNames = location.pathname.split('/').filter(path => path !== '');
    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <Link className="h-primary" to="/">Trang chủ</Link>
                        {pathNames.map((path, index) => {
                            currentLink += `/${path}`;
                            return (
                                < React.Fragment key={index}>
                                    {index !== pathNames.length - 1 ? (
                                        getPathName(currentLink) !== '' && (
                                            <>
                                                <span className="breadcrumb-separator mx-2">
                                                <i className="fas fa-angle-right"></i>
                                                </span>
                                                <Link className="h-primary"
                                                      to={currentLink}>{getPathName(currentLink)}</Link>
                                            </>)
                                    ) : (
                                        <>
                                                <span className="breadcrumb-separator mx-2">
                                                <i className="fas fa-angle-right"></i>
                                                </span>
                                            <span>{getPathName(currentLink)}</span>
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Breadcrumb;