import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency.js";
import api from "../../../../service/ApiService.js";
import WindowPopup from "../../../components/general/WindowPopup.js";

const SingleProduct = ({product,handleAddToCart}) => {
    const navigate = useNavigate();
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

    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        title: "",
        message: "",
        type: ""
    });
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.id && product?.id) {
                try {
                    const wishlistData = await api.fetchData("/wishlist");
                    const isFav = (wishlistData || []).some(item => item.product?.id === product.id);
                    setIsFavorite(isFav);
                } catch (err) {
                    console.error("Lỗi check wishlist:", err);
                }
            }
        };
        checkFavoriteStatus();
    }, [product?.id]);

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
        } catch (error) {
            console.error("Lỗi toggle wishlist:", error);
            setIsFavorite(!newFav);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };
    const hidePopup = () => {
        setPopupInfo(prev => ({
            ...prev,
            visible: false
        }));
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
    const handleBuyNow = () => {
        console.log("Mua ngay:", {
            productId: product.id,
            quantity,
        });
    };
    const handleAddCartClick = (e) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Yêu cầu đăng nhập",
                message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng"
            });

            setTimeout(() => {
                navigate("/sign-in");
            }, 1500);

            return;
        }

        handleAddToCart(e, product, quantity);
    };
    return (
    <>
        <WindowPopup
            visible={popupInfo.visible}
            type={popupInfo.type}
            title={popupInfo.title}
            message={popupInfo.message}
            onClose={hidePopup}
        />
        <div className="single-product-container border my-4 py-4">
            <div className="row single-product-wrapper m-0">
                <div className="bookworm-product-gallery col-lg-5">
                    <img
                        src={product?.images?.[0]?.image}
                        alt={product.title}
                        onError={(e) => {
                            e.currentTarget.src = "/images/no-image.png";
                        }}
                    />            
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
                                    style={{ marginBottom: "5px" }}
                                    className="add_cart_btn"
                                    disabled={remainingQuantity === 0}
                                    onClick={handleAddCartClick}
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
                                        style={isFavorite ? {color: '#f75454'} : {}}
                                        onClick={handleWishlistClick}
                                        data-title="Add to wishlist">
                                    <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> <span
                                    className="text">{isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default SingleProduct;