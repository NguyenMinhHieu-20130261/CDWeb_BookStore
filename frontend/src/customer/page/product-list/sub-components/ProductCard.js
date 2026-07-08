import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../../service/ApiService";
import FormatCurrency from "../../../../utils/FormatCurrency";
import {useNavigate} from "react-router-dom";

const ProductCard = ({ product,handleAddToCart, onWishlistToggle }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(product.favorite || false);

    useEffect(() => {
        setIsFavorite(product.favorite || false);
    }, [product.favorite]);

    const handleWishlistClick = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để sử dụng chức năng yêu thích");
            navigate("/sign-in");
            return;
        }
        const newFav = !isFavorite;
        setIsFavorite(newFav);
        try {
            await api.sendData(`/wishlist/toggle/${product.id}`);
            if (onWishlistToggle) {
                onWishlistToggle(product.id, newFav);
            }
        } catch (error) {
            console.error("Lỗi toggle wishlist:", error);
            setIsFavorite(!newFav);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    const productImage = product.images?.length > 0
        ? product.images[0].image
        : "/assets/img/no-image.png";

    return (
        <li
            className="add-to-wishlist-after_add_to_cart product product-card product-pad"
            style={{
                width: "270px",
                flex: "0 0 270px",
                height: "460px",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                className="product__inner overflow-hidden p-3 p-md-4d875 w-100"
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
                <div
                    className="woocommerce-LoopProduct-link woocommerce-loop-product__link d-block position-relative"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <div>
                        <div
                            className="woocommerce-loop-product__thumbnail"
                            style={{
                                height: "180px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative"
                            }}
                        >
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
                                    src={productImage}
                                    style={{ height: "160px", width: "auto", objectFit: "contain" }}
                                    className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                                    alt={product.title}
                                />
                            </Link>
                            <button
                                className={`wishlist-btn ${
                                    isFavorite ? "active" : ""
                                }`}
                                onClick={handleWishlistClick}
                            >
                                <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                            </button>
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

                            <h2
                                className="bwgb-products-carousel__product-title woocommerce-loop-product__title product__title h6 text-lh-md mb-1 text-height-2 crop-text-2 h-dark"
                                style={{ minHeight: "44px", overflow: "hidden" }}
                            >
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
                    </div>

                    <div className="product__hover d-flex align-items-center bwgb-products-carousel__add-to-cart-icon-only mt-3">
                        <div
                            className="button product_type_simple add_to_cart_button text-uppercase text-dark h-dark font-weight-medium atc-text"
                            style = {{cursor:"pointer", minWidth: "100%"}}
                            title="Add to cart"
                            onClick={(e) => handleAddToCart(e, product)}
                        >
                            <span className="product__add-to-cart atc-text">Thêm vào giỏ hàng</span>
                        </div>
                        {/* <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                                <div
                                
                                >
                                    <i className="flaticon-heart"/>
                                    <span className="text"> Thêm vào yêu thích</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProductCard;