import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();

    const pathNameMap = {
        '/sign-in': 'Đăng nhập',
        '/sign-up': 'Đăng ký',
        '/forgot-password': 'Quên mật khẩu',
        '/user-account': 'Thông tin tài khoản',
        '/blog-list': 'Bài viết',
        '/blog-detail': 'Chi tiết bài viết',
        '/contact': 'Liên hệ',
        '/cart': 'Giỏ hàng',
        '/user/address': 'Địa chỉ của tôi',
        '/user/address/update': 'Cập nhật địa chỉ',
        '/user/address/add': 'Thêm địa chỉ mới',
        '/user/info': 'Thông tin cá nhân',
        '/user/order': 'Đơn hàng của tôi',
        '/user/wishlist': 'Sản phẩm yêu thích',
        '/check-out': 'Thanh toán',
        '/product-list': 'Tất cả sản phẩm',
        '/product-detail': 'Chi tiết sản phẩm',

    };

    const getPathName = (path) => pathNameMap[path] || '';

    const pathNames = location.pathname.split('/').filter(path => path !== '');

    let currentLink = '';

    // Lọc và tạo một mảng mới chỉ chứa các mục có tên trong pathNameMap
    const filteredPathNames = pathNames.reduce((acc, path, index) => {
        currentLink += `/${path}`;
        const name = getPathName(currentLink);
        if (name) {
            acc.push({path, name, fullLink: currentLink});
        }
        return acc;
    }, []);

    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <Link className="h-primary" to="/">
                            Trang chủ
                        </Link>

                        {filteredPathNames.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="breadcrumb-separator mx-2">
                                    <i className="fas fa-angle-right"></i>
                                </span>
                                {index !== filteredPathNames.length - 1 ? (
                                    <Link className="h-primary" to={item.fullLink}>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span>
                                        {item.name}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;