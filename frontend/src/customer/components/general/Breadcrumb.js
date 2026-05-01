import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();

    const pathNameMap = {
        '/sign-in': 'Đăng nhập',
        '/sign-up': 'Đăng ký',
        '/forgot-password': 'Quên mật khẩu',
        '/user/account': 'Thông tin tài khoản',
        '/blog-list': 'Bài viết',
        '/blog-detail': 'Chi tiết bài viết',
        '/contact': 'Liên hệ',
        '/cart': 'Giỏ hàng',
        // '/user/order': 'Đơn hàng của tôi',
        // '/user/wishlist': 'Sản phẩm yêu thích',
        '/checkout': 'Thanh toán',
        '/product-list': 'Tất cả sản phẩm',
    };

    const pathNames = location.pathname.split('/').filter(Boolean);

    const buildLink = (index) =>
        '/' + pathNames.slice(0, index + 1).join('/');

    const getPathName = (path) =>
        pathNameMap[path] || path;

    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <Link className="h-primary" to="/">
                            Trang chủ
                        </Link>

                        {pathNames.map((_, index) => {
                            const currentLink = buildLink(index);

                            return (
                                <React.Fragment key={index}>
                                    <span className="breadcrumb-separator mx-2">
                                        <i className="fas fa-angle-right"></i>
                                    </span>

                                    {index !== pathNames.length - 1 ? (
                                        <Link className="h-primary" to={currentLink}>
                                            {getPathName(currentLink)}
                                        </Link>
                                    ) : (
                                        <span>
                                            {getPathName(currentLink)}
                                        </span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;