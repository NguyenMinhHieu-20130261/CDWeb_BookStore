import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency.js";
import api from "../../../../service/ApiService.js";

const SingleProduct = ({product}) => {
    const [quantity, setQuantity] = useState(1);
    const [reviewSummary, setReviewSummary] = useState({
        averageRating: 0,
        totalReviews: 0,
    });
    const prodDetail = product.detail;
    const remainingQuantity = 90;

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };
    useEffect(() => {
        const fetchReviewSummary = async () => {
            try {
                const data = await api.fetchData(`/reviews/product/${product.id}/summary`);
                setReviewSummary({
                    averageRating: Number(data.averageRating || 0),
                    totalReviews: Number(data.totalReviews || 0),
                });
            } catch (error) {
                console.error("Lỗi lấy tổng đánh giá:", error);
            }
        };
        if (product?.id) {
            fetchReviewSummary();
        }
    }, [product?.id]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setQuantity("");
            return;
        }
        const numberValue = Number(value);
        if (!Number.isNaN(numberValue)) {
            setQuantity(numberValue);
        }
    };
    const handleBlur = () => {
        if (!quantity || quantity < 1) {
            setQuantity(1);
            return;
        }
        if (quantity > remainingQuantity) {
            setQuantity(remainingQuantity);
        }
    };
    const renderStars = (ratingValue) => {
        const value = Number(ratingValue || 0);
        return [1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                style={{
                    color: star <= value ? "#f6c343" : "#CDCFD0",
                    marginRight: "2px"
                }}
            >
                <i className="fa-solid fa-star"></i>
            </span>
        ));
    };
    const handleAddToCart = () => {
        console.log("Thêm vào giỏ:", {
            productId: product.id,
            quantity,
        });
    };
    const handleBuyNow = () => {
        console.log("Mua ngay:", {
            productId: product.id,
            quantity,
        });
    };
    return (
    <div className="single-product-container border my-4 py-4">
        <div className="row single-product-wrapper m-0">
            <div className="bookworm-product-gallery col-lg-5">
                <img src={product.image} alt={product.title}/>
            </div>
            <div className="summary entry-summary col-lg-7 pl-lg-0">
                <div className="summary entry-summary">
                    <div className="summary__inner px-lg-4">
                        <h1 className="product_title entry-title">{product.title}</h1>
                        {/* Sao Rating */}
                        <div className="rating-author_info font-size-2 mb-4 d-flex flex-wrap align-items-center">
                            <div className="d-flex align-items-center">
                                <div>{renderStars(reviewSummary.averageRating)}</div>
                                <Link to="#tab-reviews">
                                    <p className="ml-2 mb-0" style={{ color: "#757575" }}>
                                        ({reviewSummary.totalReviews} đánh giá)
                                    </p>
                                </Link>
                            </div>
                            {prodDetail?.author && (
                                <div className="ml-4" style={{ color: "#757575" }}>
                                    Tác giả: <span style={{ color: "#333" }}>{prodDetail.author}</span>
                                </div>
                            )}
                        </div>
                        <div className="price-label mb-4 p-3" style={{ backgroundColor: "#fafafa", borderRadius: "8px" }}>
                            {product?.currentPrice !== product?.oldPrice ? (
                                <div className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-3 mb-0">
                                        <span className="price" style={{ color: "#f75454", fontSize: "30px", fontWeight: 700 }}>
                                            {FormatCurrency(product?.currentPrice)}
                                        </span>
                                    </p>
                                    <p className="old-price mb-0">
                                        <span className="price" style={{ color: "#999", textDecoration: "line-through" }}>
                                            {FormatCurrency(product?.oldPrice)}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <p className="current-price mb-0">
                                    <span className="price" style={{ color: "#f75454", fontSize: "30px", fontWeight: 700 }}>
                                        {FormatCurrency(product?.currentPrice || product?.oldPrice)}
                                    </span>
                                </p>
                            )}
                        </div>
                        {/* Nut so luong */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div className="lgdBsd">
                                <p className="label">Số lượng</p>
                                <div className="group-input">
                                    <button
                                        type="button"
                                        disabled={quantity === 1 || remainingQuantity === 0}
                                        onClick={decreaseQuantity}
                                    >
                                        <i className="fa-solid fa-minus" />
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        className="input"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        disabled={remainingQuantity === 0}
                                    />
                                    <button
                                        type="button"
                                        disabled={remainingQuantity === 0 || Number(quantity) >= remainingQuantity}
                                        onClick={increaseQuantity}
                                    >
                                        <i className="fa-solid fa-plus" />
                                    </button>
                                    <div style={{ marginLeft: "15px", color: remainingQuantity === 0 ? "#f75454" : "#757575" }}>
                                        {remainingQuantity === 0 ? "Hết hàng" : `${remainingQuantity} sản phẩm có sẵn`}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* add to cart */}
                        <div className="btn-groups">
                            <button
                                type="button"
                                style ={{marginBottom: "5px"}}
                                className="add_cart_btn"
                                disabled={remainingQuantity === 0}
                                onClick={handleAddToCart}
                            >
                                <i className="fa-solid fa-cart-shopping" />
                                {remainingQuantity === 0 ? "hết hàng" : "thêm vào giỏ hàng"}
                            </button>
                            <button
                                type="button"
                                disabled={remainingQuantity === 0}
                                className="buy_now_btn"
                                onClick={handleBuyNow}
                            >
                                <i className="fa-solid fa-wallet" />
                                mua ngay
                            </button>
                        </div>

                        <div className="add-wishlist-button mt-4">
                            <Link to="" rel="nofollow" 
                                    className="add_to_wishlist single_add_to_wishlist"
                                    data-title="Add to wishlist">
                                <i className="fa-regular fa-heart"></i> <span
                                className="text">Thêm vào yêu thích</span>
                            </Link>
                        </div>
                        {/* <div className="add-wishlist-button mt-4">
                            <Link style={{color: '#f75454'}} to="" rel="nofollow"
                                    className="add_to_wishlist single_add_to_wishlist"
                                    data-title="Add to wishlist">
                                <i className="fa-solid fa-heart"></i> <span
                                className="text">Yêu thích</span>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SingleProduct;