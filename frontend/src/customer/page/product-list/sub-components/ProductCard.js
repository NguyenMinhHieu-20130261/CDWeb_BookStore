import React from "react";
import { Link } from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency";

const ProductCard = ({ product }) => {
    const productImage = product.images?.length > 0
        ? product.images[0].image
        : "/assets/img/no-image.png";
    return (
        <li className="add-to-wishlist-after_add_to_cart product product-card product-pad">
            <div className="product__inner overflow-hidden p-3 p-md-4d875 w-100">
                <div className="woocommerce-LoopProduct-link woocommerce-loop-product__link d-block position-relative">
                    <div className="woocommerce-loop-product__thumbnail">
                        <Link
                            to={`/product-detail/${product.slug}`}
                            state={{
                                title: product.title,
                                categoryName: product.category?.name || product.category?.categoryName,
                                categoryLink: `/product-list/${product.category?.id}`
                            }}
                            className="d-block bwgb-products-carousel__product-image mx-auto attachment-shop_catalog size-shop_catalog wp-post-image img-fluid"
                        >
                            <img
                                width="120"
                                height="183"
                                src={productImage}
                                className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                                alt={product.title}
                            />
                        </Link>
                    </div>

                    <div className="woocommerce-loop-product__body product__body pt-3 bg-white">
                        <div className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                            <Link 
                                to={`/product-detail/${product.slug}`}
                                state={{
                                    title: product.title,
                                    categoryName: product.category?.name || product.category?.categoryName,
                                    categoryLink: `/product-list/${product.category?.id}`
                                }}
                            >
                                Sách
                            </Link>
                        </div>

                        <h2 className="bwgb-products-carousel__product-title woocommerce-loop-product__title product__title h6 text-lh-md mb-1 text-height-2 crop-text-2 h-dark">
                            <Link 
                                to={`/product-detail/${product.slug}`}
                                state={{
                                    title: product.title,
                                    categoryName: product.category?.name || product.category?.categoryName,
                                    categoryLink: `/product-list/${product.category?.id}`
                                }}
                            >
                                {product.title}
                            </Link>
                        </h2>
                        <div className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                            <Link 
                                to={`/product-detail/${product.slug}`}
                                state={{
                                    title: product.title,
                                    categoryName: product.category?.name || product.category?.categoryName,
                                    categoryLink: `/product-list/${product.category?.id}`
                                }}
                                className="text-gray-700">
                                {product.author || "Đang cập nhật"}
                            </Link>
                        </div>
                        <div className="bwgb-products-carousel__product-price d-flex align-items-center font-weight-medium font-size-3">
                            <span className="price">
                                {product.oldPrice > 0 && (
                                    <span className="old-price mr-2">
                                        {FormatCurrency(product?.oldPrice)}
                                    </span>
                                )}

                                <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                        {FormatCurrency(product?.currentPrice)}
                                    </bdi>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="product__hover d-flex align-items-center bwgb-products-carousel__add-to-cart-icon-only">
                        <Link to="/"
                            className="button product_type_simple add_to_cart_button text-uppercase text-dark h-dark font-weight-medium atc-text"
                            title="Add to cart"
                        >
                            <span className="product__add-to-cart atc-text">Thêm vào giỏ hàng</span>
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
        </li>
    );
};

export default ProductCard;