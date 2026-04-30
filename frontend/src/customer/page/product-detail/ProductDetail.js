import React, {useState} from "react";
import Product from "../product-list/sub-components/ProductCard";
import "../../assets/css/product-detail.css"
import {Link} from "react-router-dom";
import FormatCurrency from "../../../utils/FormatCurrency.js";

export const SingleProduct = () => {
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
export const Information = () => {
    return (
        <div className="woocommerce-tabs wc-tabs-wrapper mx-lg-auto">
            <div className="classic-nav">
                {/*<ul className="tabs wc-tabs nav container justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble"*/}
                {/*    role="tablist">*/}
                {/*    <li className="description_tab flex-shrink-0 flex-md-shrink-1 nav-item" id="tab-title-description"*/}
                {/*        role="tab" aria-controls="tab-description">*/}
                {/*        <a href="product-detail#tab-description" className="nav-link font-weight-medium py-4">*/}
                {/*            Description </a>*/}
                {/*    </li>*/}
                {/*    <li className="additional_information_tab flex-shrink-0 flex-md-shrink-1 nav-item"*/}
                {/*        id="tab-title-additional_information" role="tab" aria-controls="tab-additional_information">*/}
                {/*        <a href="product-detail#tab-additional_information"*/}
                {/*           className="nav-link font-weight-medium py-4">*/}
                {/*            Product Details </a>*/}
                {/*    </li>*/}
                {/*    <li className="videos_tab flex-shrink-0 flex-md-shrink-1 nav-item" id="tab-title-videos" role="tab"*/}
                {/*        aria-controls="tab-videos">*/}
                {/*        <a href="product-detail#tab-videos" className="nav-link font-weight-medium py-4">*/}
                {/*            Videos </a>*/}
                {/*    </li>*/}
                {/*    <li className="reviews_tab flex-shrink-0 flex-md-shrink-1 nav-item" id="tab-title-reviews"*/}
                {/*        role="tab" aria-controls="tab-reviews">*/}
                {/*        <a href="product-detail#tab-reviews" className="nav-link font-weight-medium py-4">*/}
                {/*            Reviews (1) </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
                {/*<div className="tab-content">*/}
                <div
                    className="border p-3 my-4 woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab font-size-2"
                    id="tab-description" role="tabpanel" aria-labelledby="tab-title-description">
                    <h4 className="font-size-3">Mô tả sản phẩm</h4>
                    <p className="mb-0">We aim to show you accurate product information. Manufacturers, suppliers
                        and others provide what you see here, and we have not verified it. See our disclaimer</p>
                    <p className="mb-0">#1 New York Times Bestseller</p>
                    <p className="mb-0">A Reese Witherspoon x Hello Sunshine Book Club Pick</p>
                    <p className="mb-4">&#8220;I can&#8217;t even express how much I love this book! I didn&#8217;t
                        want this story to end!&#8221;&#8211;Reese Witherspoon</p>
                    <p className="mb-4">&#8220;Painfully beautiful.&#8221;&#8211;The New York Times Book Review
                    </p>
                    <p>&#8220;Perfect for fans of Barbara Kingsolver.&#8221;&#8211;Bustle</p>
                    <p className="mb-4">For years, rumors of the &#8220;Marsh Girl&#8221; have haunted Barkley Cove,
                        a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is
                        found dead, the locals immediately suspect Kya
                        Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent,
                        she has survived for years alone in the marsh that she calls home, finding friends in the
                        gulls and lessons in the sand.
                        Then the time comes when she yearns to be touched and loved. When two young men from town
                        become intrigued by her wild beauty, Kya opens herself to a new life&#8211;until the
                        unthinkable happens.</p>
                    <p className="mb-4">Perfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads
                        Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story,
                        and a surprising tale of possible murder.
                        Owens reminds us that we are forever shaped by the children we once were, and that we are
                        all subject to the beautiful and violent secrets that nature keeps
                    </p>
                    <p>WHERE THE CRAWDADS LP</p>
                </div>
                <div
                    className="border p-3 my-4 woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information panel entry-content wc-tab font-size-2"
                    id="tab-additional_information" role="tabpanel"
                    aria-labelledby="tab-title-additional_information">
                    <h4 className="font-size-3">Thông tin sản phẩm</h4>
                    <div className="table-responsive">
                        <table
                            className="woocommerce-product-attributes shop_attributes table table-hover table-borderless">
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_book-author">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Mã sản phẩm
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p><a href="https://bookworm.madrasthemes.com/book-author/a-g-riddle/"
                                          rel="tag">A G Riddle</a></p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Tên nhà cung cấp
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Tác giả
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Nhà xuất bản
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Năm xuất bản
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Trọng lượng
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Số trang
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Danh mục
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>Hardcover, Kindle, Paperback</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div
                    className="border p-3 my-4 woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab font-size-2"
                    id="tab-reviews" role="tabpanel" aria-labelledby="tab-title-reviews">
                    <h4 className="font-size-3">Đánh giá khách hàng</h4>
                    <div className="row mb-8 advanced-review-rating">
                        <div className="col-md-12 mb-6">
                            <div className="d-flex  align-items-center mb-4">
                                <span className="font-size-15 font-weight-bold">4.0</span>
                                <div className="ml-3 h6 mb-0">
                                                        <span className="font-weight-normal">
                                                            1 review </span>
                                    <div className="text-yellow-darker">
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className="checked"><i className="fa-solid fa-star"></i></span>
                                        <span className=""><i className="fa-solid fa-star"></i></span>
                                        <span className=""><i className="fa-solid fa-star"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-flex">
                                <a href="product-detail#reviews"
                                   className="btn btn-outline-dark rounded-0 px-5 mb-3 mb-md-0"
                                   data-scroll>Xem tất cả đánh giá</a>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <ul className="list-unstyled p-0">
                                <li className="py-2">
                                    <a className="row align-items-center mx-gutters-2 font-size-2">
                                        <div className="col-auto">
                                            <span className="text-dark">5 sao</span>
                                        </div>
                                        <div className="col px-0">
                                            <div className="progress bg-white-100" style={{height: "7px"}}>
                                                <div className="progress-bar bg-yellow-darker" role="progressbar"
                                                     style={{width: "0%"}} aria-valuenow="100" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right zero"><span
                                            className="text-secondary">0</span></div>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="row align-items-center mx-gutters-2 font-size-2">
                                        <div className="col-auto">
                                            <span className="text-dark">4 sao</span>
                                        </div>
                                        <div className="col px-0">
                                            <div className="progress bg-white-100" style={{height: "7px"}}>
                                                <div className="progress-bar bg-yellow-darker" role="progressbar"
                                                     style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right"><span className="text-secondary">1</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="row align-items-center mx-gutters-2 font-size-2">
                                        <div className="col-auto">
                                            <span className="text-dark">3 sao</span>
                                        </div>
                                        <div className="col px-0">
                                            <div className="progress bg-white-100" style={{height: "7px"}}>
                                                <div className="progress-bar bg-yellow-darker" role="progressbar"
                                                     style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right zero"><span
                                            className="text-secondary">0</span></div>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="row align-items-center mx-gutters-2 font-size-2">
                                        <div className="col-auto">
                                            <span className="text-dark">2 sao</span>
                                        </div>
                                        <div className="col px-0">
                                            <div className="progress bg-white-100" style={{height: "7px"}}>
                                                <div className="progress-bar bg-yellow-darker" role="progressbar"
                                                     style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right zero"><span
                                            className="text-secondary">0</span></div>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="row align-items-center mx-gutters-2 font-size-2">
                                        <div className="col-auto">
                                            <span className="text-dark">1 sao</span>
                                        </div>
                                        <div className="col px-0">
                                            <div className="progress bg-white-100" style={{height: "7px"}}>
                                                <div className="progress-bar bg-yellow-darker" role="progressbar"
                                                     style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right zero"><span
                                            className="text-secondary">0</span></div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h4 className="font-size-3 mb-8 d-none">1-5 of 1 review </h4>
                    <div id="reviews">
                        <ul className="commentlist list-unstyled mb-8">
                            <li className="review byuser comment-author-nilofer even thread-even depth-1 mb-4 pb-5 border-bottom"
                                id="li-comment-95">
                                <div id="comment-95" className="comment_container">
                                    <div className="comment-text">
                                        <div className="d-md-flex align-items-center mb-3">
                                            <h6 className="mb-0 mr-3">Nilofer</h6>
                                            <div className="text-yellow-darker">
                                                <span className="checked"><i className="fa-solid fa-star"></i></span>
                                                <span className="checked"><i className="fa-solid fa-star"></i></span>
                                                <span className="checked"><i className="fa-solid fa-star"></i></span>
                                                <span className=""><i className="fa-solid fa-star"></i></span>
                                                <span className=""><i className="fa-solid fa-star"></i></span>
                                            </div>
                                        </div>
                                        <div className="description mb-4 text-lh-md">
                                            <p>I read this book shortly after I got it and didn&#8217;t just put it
                                                on my TBR shelf mainly because I saw it on Reese Witherspoon&#8217;s
                                                bookclub September read. It was one of the best books
                                                I&#8217;ve read this year, and reminded me some of Kristen
                                                Hannah&#8217;s The Great Alone.</p>
                                        </div>
                                        <div className="text-gray-600">September 1, 2020</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div id="review_form_wrapper">
                            <div id="review_form">
                                <div id="respond" className="comment-respond">
                                    <h4 id="reply-title" className="comment-reply-title font-size-3 mb-4">Viết đánh
                                        giá
                                        <small><a rel="nofollow" id="cancel-comment-reply-link"
                                                  href="/shop-product/the-lost-colony-the-long-winter-trilogy-book-3/#respond"
                                                  style={{display: "none"}}>Cancel reply</a></small></h4>
                                    <p className="must-log-in">Bạn phải <a
                                        href="https://bookworm.madrasthemes.com/my-account/">Đăng nhập</a> để viết
                                        đánh giá.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
export const SideBar = () => {
    return (
        <div id="secondary" className="sidebar widget-area order-1" role="complementary">
            <div id="widgetAccordion">
                <div id="woocommerce_products-2" className="widget p-4d875 border my-4 woocommerce widget_products">
                    <h4 className="font-size-3 mb-4">Sản phẩm mới</h4>
                    <ul className="product_list_widget">
                        <li className="mb-5">
                            <div className="media">
                                <div className="media d-md-flex">
                                    <a href="https://bookworm.madrasthemes.com/product/blindside-michael-bennett-book-12/"
                                       className="d-block">
                                        <img width="150" height="200"
                                             src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/10-150x200.jpg"
                                             className="img-fluid" alt style={{maxWidth: "60px"}} loading="lazy"/> </a>
                                    <div className="media-body ml-3 pl-1">
                                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2"><a
                                            href="https://bookworm.madrasthemes.com/product/blindside-michael-bennett-book-12/">
                                            Blindside (Michael Bennett Book 12) </a></h6>
                                        <span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price" style={{fontSize: "14px"}}>130000</span>
                                    </p>
                                    <p className="old-price pb-1">
                                        <span className="price" style={{fontSize: "11px"}}>150000</span>
                                    </p>
                                </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mb-5">
                            <div className="media">
                                <div className="media d-md-flex">
                                    <a href="https://bookworm.madrasthemes.com/product/until-the-end-of-time-mind-matter-and-our-search-for-meaning-in-an-evolving-universe/"
                                       className="d-block">
                                        <img width="150" height="200"
                                             src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/9-150x200.jpg"
                                             className="img-fluid" alt style={{maxWidth: "60px"}} loading="lazy"/> </a>
                                    <div className="media-body ml-3 pl-1">
                                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2"><a
                                            href="https://bookworm.madrasthemes.com/product/until-the-end-of-time-mind-matter-and-our-search-for-meaning-in-an-evolving-universe/">
                                            Until the End of Time: Mind, Matter, and Our Search for Meaning in
                                            an Evolving Universe </a></h6>
                                        <span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price" style={{fontSize: "14px"}}>130000</span>
                                    </p>
                                    <p className="old-price pb-1">
                                        <span className="price" style={{fontSize: "11px"}}>150000</span>
                                    </p>
                                </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mb-5">
                            <div className="media">
                                <div className="media d-md-flex">
                                    <a href="https://bookworm.madrasthemes.com/product/open-book-a-memoir/"
                                       className="d-block">
                                        <img width="150" height="200"
                                             src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/8-150x200.jpg"
                                             className="img-fluid" alt style={{maxWidth: "60px"}} loading="lazy"/> </a>
                                    <div className="media-body ml-3 pl-1">
                                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2"><a
                                            href="https://bookworm.madrasthemes.com/product/open-book-a-memoir/">
                                            Open Book: A Memoir </a></h6>
                                        <span className="price d-flex justify-content-start align-items-center">
                                            <p className="current-price mr-2">
                                                <span className="price" style={{fontSize: "14px"}}>130000</span>
                                            </p>
                                            <p className="old-price pb-1">
                                                <span className="price" style={{fontSize: "11px"}}>150000</span>
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
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
export const RelatedProducts = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    return (
        <section className="related products space-bottom-3">
            <div className="container">
                <header className="mb-5 d-md-flex justify-content-between align-items-center">
                    <h2 className="font-size-5 mb-3 mb-md-0">Sản phẩm liên quan</h2>
                </header>
                <div className="products-carousel-wrap related-product-carousel" data-ride="bk-slick-carousel"
                     data-wrap=".products"
                     data-slick="{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:1,&quot;infinite&quot;:false,&quot;autoplay&quot;:false,&quot;arrows&quot;:true,&quot;dots&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:554,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:992,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:1199,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:2}},{&quot;breakpoint&quot;:1500,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:2}}]}">
                    <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-5 row-cols-wd-5 border-top border-left mb-6">
                        {relatedProducts.map(product => (<Product key={product.id} info={product}/>))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
export const PageLink = () => {
    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2"><a className="h-primary"
                                                                           href="https://bookworm.madrasthemes.com">Home</a><span
                        className="breadcrumb-separator mx-2"><i
                        className="fas fa-angle-right"></i></span><a className="h-primary"
                                                                     href="https://bookworm.madrasthemes.com/product-category/mystery/">Mystery</a><span
                        className="breadcrumb-separator mx-2"><i className="fas fa-angle-right"></i></span>The Lost
                        Colony (The Long Winter Trilogy Book 3)
                    </nav>
                </div>
            </div>
        </div>
    )
}
export const Detail = () => {
    return (
        <div>
            <PageLink/>
            <div className="container">
                <div className="row">
                    <div id="primary" className="content-area order-1">
                        <main id="main" className="site-main" role="main">
                            <div id="product-71"
                                 className="product type-product post-71 status-publish first instock product_cat-mystery product_cat-thriller-suspense has-post-thumbnail taxable shipping-taxable purchasable product-type-variable single-product__content single-product__v4">
                                <SingleProduct/>
                                <Information/>
                            </div>
                        </main>
                    </div>
                    <SideBar/>
                </div>
                <RelatedProducts/>
            </div>
        </div>
    )
}
export default Detail;