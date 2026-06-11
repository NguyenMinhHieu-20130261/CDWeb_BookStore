import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency.js";
const SideBarItems = ({product}) =>{
    if (!product) return null;
    return(
        <li className="mb-5">
            <div className="media">
                <div className="media d-md-flex">
                    <Link 
                        to={`/products/${product.slug || product.id}`}
                        className="d-block">
                            <img
                            width="150" height="200"
                            src={product.image}
                            className="img-fluid"
                            alt={product.title}
                            style={{ maxWidth: "60px" }}
                            loading="lazy"
                        />
                    </Link>
                    <div className="media-body ml-3 pl-1">
                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2">
                            <Link to={`/products/${product.slug || product.id}`}>
                                {product.title}
                            </Link>
                        </h6>
                        <span className="price d-flex justify-content-start align-items-center">
                            <p className="current-price mr-2">
                                <span className="price" style={{fontSize: "14px"}}>
                                    {FormatCurrency(product?.currentPrice)}
                                </span>
                            </p>
                            <p className="old-price pb-1">
                                <span className="price" style={{fontSize: "11px"}}>
                                    {FormatCurrency(product?.oldPrice)}
                                </span>
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </li>
    )
}
const SideBar = ({listProduct= []}) => {
    const newProducts = listProduct.slice(0, 3);
    return (
        <div id="secondary" className="sidebar widget-area order-2 left-sidebar" role="complementary">
            <div id="widgetAccordion">
                <div id="woocommerce_products-2" className="widget p-4d875 border my-4 woocommerce widget_products">
                    <h4 className="font-size-3 mb-4">Sản phẩm mới</h4>
                    <ul className="product_list_widget">
                        {newProducts.map((product) => (
                            <SideBarItems
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ul>
                </div>
                <div id="bookworm_features_block_widget-2"
                     className="widget p-4d875 border mb-5 widget_bookworm_features_block_widget">
                    <div className="site-features">
                        <ul className="list-unstyled my-0 list-features">
                            <li className="list-feature p-4d875 ">
                                <div className="media d-md-block d-xl-flex text-center text-xl-left">
                                    <div
                                        className="feature__icon font-size-10 text-primary text-lh-xs mb-md-3 mb-lg-0 mr-xl-4">
                                        <i className="flaticon-delivery"></i>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="feature__title h6 mb-1 text-dark">Giao Hàng Miễn Phí</h4>
                                        <p className="feature__subtitle m-0 text-dark">Đơn Hàng Trên 500.000đ</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-feature p-4d875 border-top ">
                                <div className="media d-md-block d-xl-flex text-center text-xl-left">
                                    <div
                                        className="feature__icon font-size-10 text-primary text-lh-xs mb-md-3 mb-lg-0 mr-xl-4">
                                        <i className="flaticon-credit"></i>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="feature__title h6 mb-1 text-dark">Thanh Toán An Toàn</h4>
                                        <p className="feature__subtitle m-0 text-dark">100% Thanh Toán An Toàn</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-feature p-4d875 border-top ">
                                <div className="media d-md-block d-xl-flex text-center text-xl-left">
                                    <div
                                        className="feature__icon font-size-10 text-primary text-lh-xs mb-md-3 mb-lg-0 mr-xl-4">
                                        <i className="flaticon-warranty"></i>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="feature__title h6 mb-1 text-dark">Đảm Bảo Hoàn Lại Tiền</h4>
                                        <p className="feature__subtitle m-0 text-dark">Trong Vòng 30 Ngày</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-feature p-4d875 border-top ">
                                <div className="media d-md-block d-xl-flex text-center text-xl-left">
                                    <div
                                        className="feature__icon font-size-10 text-primary text-lh-xs mb-md-3 mb-lg-0 mr-xl-4">
                                        <i className="flaticon-help"></i>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="feature__title h6 mb-1 text-dark">Hỗ Trợ 24/7</h4>
                                        <p className="feature__subtitle m-0 text-dark">Trong Vòng 1 Ngày Làm Việc</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideBar;