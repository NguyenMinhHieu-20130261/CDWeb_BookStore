import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <>
            <div className="page-header border-bottom">
                <div className="container">
                    <div className="d-md-flex justify-content-between align-items-center py-4">
                        <nav className="woocommerce-breadcrumb font-size-2">
                            <Link className="h-primary" to="/">Home</Link>
                            <span className="breadcrumb-separator mx-2">
                                <i className="fas fa-angle-right"></i>
                            </span>
                            Error 404
                        </nav>
                    </div>
                </div>
            </div>
            <main id="content" role="main">
                <div className="container">
                    <div className="space-bottom-1 space-top-xl-2 space-bottom-xl-4">
                        <div className="d-flex flex-column align-items-center pt-lg-7 pb-lg-4 pb-lg-6">
                            <div className="font-weight-medium font-size-200 font-size-xs-170 text-lh-sm mt-xl-1">404
                            </div>
                            <h6 className="font-size-4 font-weight-medium mb-2">Oops Hình như trang này không tồn tại</h6>
                            <span className="font-size-2 mb-6">Bạn có thể quay lại trang trước đó hoặc trở về trang chủ</span>
                            <div className="d-flex align-items-center flex-column">
                                <Link to="/"
                                   className="btn btn-dark rounded-0 btn-wide height-60 width-250 font-weight-medium d-flex align-items-center justify-content-center">
                                    Quay lại </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default NotFound;