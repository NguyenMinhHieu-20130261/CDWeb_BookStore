import React from "react";

const ProductCard = ({ product }) => {
    return (
        <li className="add-to-wishlist-after_add_to_cart product product-card type-product post-108 status-publish first instock product_cat-cookbooks product_cat-cooking-education-reference product_cat-c has-post-thumbnail taxable shipping-taxable purchasable product-type-simple col">
            <div className="bookworm-product-grid">
                <div className="product__inner overflow-hidden p-3 p-md-4d875">
                    <div className="position-relative d-block">
                        <div className="woocommerce-loop-product__header">
                            <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                <img
                                    width="150"
                                    height="200"
                                    src={product.image}
                                    className="img-fluid d-block mx-auto attachment-shop_catalog size-shop_catalog wp-post-image img-fluid"
                                    alt={product.title}
                                    decoding="async"
                                />
                            </a>
                        </div>
                        <div className="woocommerce-loop-product__body product__body pt-3 bg-white">
                            <div className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                                <a href="#">{product.format}</a>
                            </div>
                            <h2 className="woocommerce-loop-product__title product__title h6 text-lh-md mb-1 crop-text-2 h-dark text-height-2">
                                <a href="#">{product.title}</a>
                            </h2>
                            <div className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                                <a href="#" className="text-gray-700">{product.author}</a>
                            </div>
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                        <span className="woocommerce-Price-currencySymbol">&#36;</span>
                                        {product.price}
                                    </bdi>
                                </span>
                            </span>
                            <div className="product__rating d-flex align-items-center font-size-2"></div>
                        </div>
                        <div className="woocommerce-loop-product__hover product__hover d-flex align-items-center">
                            <a
                                href="?add-to-cart=108"
                                data-quantity="1"
                                className="button product_type_simple add_to_cart_button ajax_add_to_cart text-uppercase text-dark h-dark font-weight-medium mr-auto"
                                data-product_id="108"
                                data-product_sku="BW-1003050"
                                aria-label="Add to cart"
                                rel="nofollow"
                                title="Add to cart"
                            >
                                <span className="product__add-to-cart">Add to cart</span>
                                <span className="product__add-to-cart-icon font-size-4">
                                    <i className="flaticon-icon-126515"></i>
                                </span>
                            </a>
                            <div
                                className="yith-wcwl-add-to-wishlist add-to-wishlist-108 wishlist-fragment on-first-load"
                                data-fragment-ref="108"
                            >
                                <div className="yith-wcwl-add-button">
                                    <a
                                        href="?add_to_wishlist=108"
                                        rel="nofollow"
                                        data-product-id="108"
                                        data-product-type="simple"
                                        data-original-product-id="108"
                                        className="add_to_wishlist single_add_to_wishlist"
                                        data-title="Add to wishlist"
                                    >
                                        <i className="flaticon-heart"></i>
                                        <span className="text">Add to wishlist</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProductCard;
