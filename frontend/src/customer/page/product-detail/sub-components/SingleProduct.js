import React from "react";
import { Link } from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency.js";

const SingleProduct = () => {
    return (
        <div className="single-product-container border my-4 py-4">
            <div className="row single-product-wrapper">
                <div className="bookworm-product-gallery col-lg-5">
                </div>
                <div className="summary entry-summary col-lg-7 pl-lg-0">
                    <div className="summary entry-summary">
                        <div className="summary__inner px-lg-4">
                            <h1 className="product_title entry-title">The Lost Colony (The Long Winter Trilogy Book
                                3)</h1>
                            <div className="rating-author_info font-size-2 mb-4 d-flex flex-wrap align-items-center">
                                <div className="rate d-flex align-items-center">
                                    <Link to="#">
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className=""><i className="fa-solid fa-star"></i></span>
                                        <span className=""><i className="fa-solid fa-star"></i></span>
                                    </Link>
                                    <Link to="#"><p className="ml-2" style={{color: "#CDCFD0"}}>(2 Đánh giá)</p></Link>
                                </div>
                            </div>
                            <div className="price-label">
                                <span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price">{FormatCurrency(50000)}</span>
                                    </p>
                                    <p className="old-price">
                                        <span className="price">{FormatCurrency(75000)}</span>
                                    </p>
                                </span>
                            </div>
                            <div className="woocommerce-product-details__short-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    Excepteur sint occaecat.</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                <div className="lgdBsd"><p className="label">Số
                                    Lượng</p>
                                    <div className="group-input">
                                        <button className=""><img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                                            alt="remove-icon" width="20" height="20"/></button>
                                        <input type="text" value="2" className="input"/>
                                        <button><img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                                            alt="add-icon" width="20" height="20"/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-groups">
                                <button type="button" className="add_cart_btn">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    thêm vào giỏ hàng
                                </button>
                                <button type="button" className="buy_now_btn">
                                    <i className="fa-solid fa-wallet"></i>
                                    mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleProduct;