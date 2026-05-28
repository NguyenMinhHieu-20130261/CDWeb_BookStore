import {Link} from "react-router-dom";

const ProductCard = () =>{
    return(
        <div className="product-card product add-to-wishlist-after_add_to_cart type-product">
            <div className="product__inner overflow-hidden p-3 p-md-4d875 w-100">
                <div className="woocommerce-LoopProduct-link woocommerce-loop-product__link d-block position-relative">
                    <div className="woocommerce-loop-product__thumbnail">
                        <Link to="/"
                            className="d-block bwgb-products-carousel__product-image mx-auto attachment-shop_catalog size-shop_catalog wp-post-image img-fluid">
                            <img
                                width="120"
                                height="183"
                                className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                                // src={product.image}
                                // alt={product.title}
                                alt="12312312312312312312"
                                />
                        </Link>
                    </div>

                    <div className="woocommerce-loop-product__body product__body pt-3 bg-white">
                        <div className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                            <Link to="/">
                            format
                            {/* {product.format} */}
                            </Link>
                        </div>

                        <h2 className="bwgb-products-carousel__product-title woocommerce-loop-product__title product__title h6 text-lh-md mb-1 text-height-2 crop-text-2 h-dark">
                            <Link to="/">
                            Tựa đề
                            {/* {product.title} */}
                            </Link>
                        </h2>

                        <div className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                            <Link to="/" className="text-gray-700">
                                {/* {product.author} */}
                                tác giả
                            </Link>
                        </div>

                        <div className="bwgb-products-carousel__product-price d-flex align-items-center font-weight-medium font-size-3">
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                        <span className="woocommerce-Price-currencySymbol">đ    </span>
                                        {/* {product.price} */}
                                    1312312312312313
                                    </bdi>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="product__hover d-flex align-items-center bwgb-products-carousel__add-to-cart-icon-only">
                        <Link
                            to="/"
                            className="button product_type_simple add_to_cart_button text-uppercase text-dark h-dark font-weight-medium mr-auto"
                            title="Add to cart"
                        >
                            <span className="product__add-to-cart">Thêm vào giỏ hàng</span>
                            <span className="product__add-to-cart-icon font-size-4">
                                <i className="flaticon-icon-126515"></i>
                            </span>
                        </Link>
                        <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                                <Link to="/">
                                    <i className="flaticon-heart"/>
                                    <span className="text"> Thêm vào yêu thích</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const NewBooks = () => {
    return (
        <div className="wp-block-bwgb-tabs__inner container">
            <header className="mb-5  d-md-flex justify-content-between align-items-center">
                <h2 className="bwgb-tabs__block-title font-size-7 mb-3 mb-md-0">Sách mới xuất bản</h2>
                <ul className="nav nav-gray-700 flex-nowrap flex-md-wrap overflow-auto overflow-md-visible"
                    role="tablist">
                    {/* Category */}
                    <li className="nav-item flex-shrink-0 flex-md-shrink-1 mx-4">
                        <a data-tabcount="1" className="nav-link px-0 active" data-toggle="tab" href="#tab-717dbc63-1"
                           role="tab" aria-controls="tab-717dbc63-1" aria-selected="false">
                            <h6 className="bwgb-tabs__title">Lịch sử</h6>
                        </a>
                    </li>
                    <li className="nav-item flex-shrink-0 flex-md-shrink-1 mx-4">
                        <a data-tabcount="2" className="nav-link px-0" data-toggle="tab" href="#tab-717dbc63-2"
                           role="tab" aria-controls="tab-717dbc63-2" aria-selected="false">
                            <h6 className="bwgb-tabs__title">Công nghệ &amp; toán học</h6>
                        </a>
                    </li>
                </ul>
            </header>
            <div className="tab-content u-slick__tab">
                <div id="tab-717dbc63-1"
                     className="tab-pane fade tab-content-1 show active wp-block-bwgb-tab-content bwgb-tab-content">
                    <div
                        className="wp-block-bwgb-products-carousel bwgb-products-carousel bwgb-b3b1e74 bwgb-products-carousel__style-v2"
                        id="bwgb-b3b1e74">
                        <div className="wp-block-bwgb-products-carousel__inner">
                            <div className="wp-block-bwgb-products-carousel__content">
                                <div>
                                    <div className="woocommerce columns-3 ">
                                        <div
                                            className="u-slick u-slick--equal-height u-slick products no-gutters border-left border-top border-right"
                                            >
                                            <div
                                                className="js-prev u-slick__arrow u-slick__arrow-centered--y d-none d-lg-block fas fa-chevron-left u-slick__arrow-inner u-slick__arrow-inner--left ml-lg-n10 slick-arrow slick-disabled"
                                                aria-disabled="true"></div>

                                            <div className="slick-list draggable">
                                                <div className="slick-track"
                                                    style={{ opacity: 1, width: '1638px', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                        <ProductCard/>
                                                </div>
                                            </div>
                                            <div
                                                className="js-next u-slick__arrow u-slick__arrow-centered--y d-none d-lg-block fas fa-chevron-right u-slick__arrow-inner u-slick__arrow-inner--right mr-lg-n10 slick-arrow"
                                                aria-disabled="false"></div>
                                            <ul className="js-pagination text-center u-slick__pagination position-absolute right-0 left-0 d-lg-none mt-3 mb-0"
                                                style={{ display: 'block' }} role="tablist">
                                                <li className="slick-active slick-current" role="presentation">
                                                    <span></span></li>
                                                <li role="presentation"><span></span></li>
                                                <li role="presentation"><span></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}