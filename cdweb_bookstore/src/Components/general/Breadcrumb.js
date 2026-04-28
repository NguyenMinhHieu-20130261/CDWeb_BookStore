import React from "react";
import {Link} from "react-router-dom";


const BreadCrumb = ()=>{
    return(
    <div className="page-header border-bottom">
        <div className="container">
            <div className="d-md-flex justify-content-between align-items-center py-4">
                <nav className="woocommerce-breadcrumb font-size-2">
                    <Link className="h-primary" to="/home">Trang Chủ</Link>
                    <span
                    className="breadcrumb-separator mx-2">
                        <i className="fas fa-angle-right"/>
                        </span>
                    <Link className="h-primary" to="/product-list">Shop</Link>
                        <span className="breadcrumb-separator mx-2">
                            <i className="fas fa-angle-right"/>
                        </span>
                        <span className="curnt-link"> 123</span>
                </nav>
            </div>
        </div>
    </div>
    )
}
export default BreadCrumb
