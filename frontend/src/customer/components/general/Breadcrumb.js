import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const {
        title,
        categoryName,
        categoryLink
    } = location.state || {};

    const breadcrumbConfig = {
        product: {
            listPath: "/product-list",
            listName: "Danh sách sản phẩm",
            categoryFallback: "Danh mục sản phẩm",
            detailFallback: "Chi tiết sản phẩm",
        },
        blog: {
            listPath: "/blog-list",
            listName: "Danh sách bài viết",
            categoryFallback: "Danh mục bài viết",
            detailFallback: "Chi tiết bài viết",
        },
    };
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
    const getPageType = () => {
        if (location.pathname.startsWith("/product")) return "product";
        if (location.pathname.startsWith("/blog")) return "blog";
        return null;
    };

    const pageType = getPageType();
    const config = breadcrumbConfig[pageType];

    const isDetailPage =
        location.pathname.startsWith("/product-detail") ||
        location.pathname.startsWith("/blog-detail");

    const isListPage =
        location.pathname.startsWith("/product-list") ||
        location.pathname.startsWith("/blog-list");

    let breadcrumbItems = [];

    if (config && isDetailPage) {
        breadcrumbItems = [
            {
                name: config.listName,
                link: `${config.listPath}/all`,
                isLink: true,
            },
            {
                name: categoryName || config.categoryFallback,
                link: categoryLink || `${config.listPath}/all`,
                isLink: !!categoryName,
            },
            {
                name: title || config.detailFallback,
                link: location.pathname,
                isLink: false,
            },
        ];
    } else if (config && isListPage) {
        const isAllPage =
            location.pathname === config.listPath ||
            location.pathname === `${config.listPath}/all`;

        breadcrumbItems = [
            {
                name: config.listName,
                link: `${config.listPath}/all`,
                isLink: !isAllPage,
            },
        ];

        if (!isAllPage) {
            breadcrumbItems.push({
                name: categoryName || title || config.categoryFallback,
                link: location.pathname,
                isLink: false,
            });
        }
    } else {
        const pathNames = location.pathname.split("/").filter(Boolean);
        let currentLink = "";

        breadcrumbItems = pathNames.reduce((acc, path) => {
            currentLink += `/${path}`;
            const name = pathNameMap[currentLink];

            if (name) {
                acc.push({
                    name,
                    link: currentLink,
                    isLink: true,
                });
            }

            return acc;
        }, []);
    }
    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <Link className="h-primary" to="/">
                            Trang chủ
                        </Link>
                        {breadcrumbItems.map((item, index) => {
                            const isLast = index === breadcrumbItems.length - 1;
                            return (
                                <React.Fragment key={index}>
                                    <span className="breadcrumb-separator mx-2">
                                        <i className="fas fa-angle-right"></i>
                                    </span>

                                    {!isLast && item.isLink ? (
                                        <Link className="h-primary" to={item.link}>
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span>{item.name}</span>
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