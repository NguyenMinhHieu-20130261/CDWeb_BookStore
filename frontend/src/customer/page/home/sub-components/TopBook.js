import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../service/ApiService";

const renderStars = (value) => {
    const rounded = Math.round(value);
    return [1, 2, 3, 4, 5].map((star) => (
        <span
            key={star}
            style={{
                color: star <= rounded ? "#f6c343" : "#CDCFD0",
                marginRight: "2px"
            }}
        >
            <i className="fa-solid fa-star"></i>
        </span>
    ));
};

const TopReviewCard = ({ product, isLast }) => {
    const [summary, setSummary] = useState({ averageRating: 0, totalReviews: 0 });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await api.fetchData(`/reviews/product/${product.id}/summary`);
                setSummary({
                    averageRating: Number(data.averageRating || 0),
                    totalReviews: Number(data.totalReviews || 0),
                });
            } catch (error) {
                console.error("Error fetching review summary:", error);
            }
        };
        if (product?.id) {
            fetchSummary();
        }
    }, [product?.id]);

    const productImage = product.images?.length > 0
        ? product.images[0].image
        : "/assets/img/no-image.png";

    const ratingPercent = (summary.averageRating / 5) * 100;

    return (
        <div className={`border-top border-right ${isLast ? "border-bottom" : ""} border-left p-4d75 add-to-wishlist-after_add_to_cart product type-product post-14 status-publish first instock product_cat-c has-post-thumbnail sale taxable shipping-taxable purchasable product-type-simple`}>
            <div className="media m-1">
                <Link to={`/product-detail/${product.slug}`} className="d-block bwgb-products-list__product-image">
                    <img
                        width="120"
                        height="183"
                        src={productImage}
                        className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                        alt={product.title}
                        loading="lazy"
                    />
                </Link>
                <div className="media-body ml-5">
                    <div className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                        <Link to={`/product-list/${product.category?.id}`}>
                            {product.category?.name || "Sách"}
                        </Link>
                    </div>
                    <h6 className="bwgb-products-list__product-title font-weight-normal mb-1 text-lh-md crop-text-2">
                        <Link to={`/product-detail/${product.slug}`}>
                            {product.title}
                        </Link>
                    </h6>
                    <div className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                        <span className="text-gray-700">
                            {product.detail?.author || "Đang cập nhật"}
                        </span>
                    </div>
                    <div className="bwgb-products-list__product-price font-weight-medium font-size-3">
                        <span className="price">
                            <span className="woocommerce-Price-amount amount">
                                <bdi>
                                    {product.currentPrice.toLocaleString("vi-VN")}đ
                                </bdi>
                            </span>
                        </span>
                    </div>
                    <div className="bwgb-products-list__product-rating product__rating d-flex align-items-center font-size-2">
                        <div className="d-flex align-items-center mr-2">
                            {renderStars(summary.averageRating)}
                        </div>
                        <span className="bwgb-products-list__product-rating-count">({summary.totalReviews})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TopBook = () => {
    const [topRatedBook, setTopRatedBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [mostReviewedBooks, setMostReviewedBooks] = useState([]);
    const [loadingMostReviewed, setLoadingMostReviewed] = useState(true);

    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const data = await api.fetchData("/products/top-rated");
                setTopRatedBook(data);
            } catch (error) {
                console.error("Error fetching top rated book:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchMostReviewed = async () => {
            try {
                const data = await api.fetchData("/products/most-reviewed");
                setMostReviewedBooks(data);
            } catch (error) {
                console.error("Error fetching most reviewed books:", error);
            } finally {
                setLoadingMostReviewed(false);
            }
        };

        fetchTopRated();
        fetchMostReviewed();
    }, []);

    const productImage = topRatedBook?.images?.length > 0
        ? topRatedBook.images[0].image
        : "/assets/img/no-image.png";

    return (
        <div className="wp-block-bwgb-columns bwgb-columns space-bottom-2 space-bottom-lg-3 bwgb-91f3a61"
             id="bwgb-91f3a61">
            <div className="container">
                <div className="wp-block-bwgb-columns__row row no-gutters">
                    <div
                        className="wp-block-bwgb-column bwgb-column bwgb-3c65c46 col-sm-12 col-md-12 col-lg-12 col-xl-8"
                        id="bwgb-3c65c46">
                        <div className="wp-block-bwgb-products-deals-carousel__inner">
                            <h2 className="bwgb-products-deals-carousel__block-title font-size-7 mb-4 pb-1">Sách hay
                                trong tuần</h2>
                            <div className="wp-block-bwgb-products-deals-carousel__content">
                                <div>
                                    <div className="woocommerce columns-3 ">
                                        <div
                                            className="js-slick-carousel u-slick u-slick--equal-height border border-primary border-width-2 slick-initialized slick-slider">

                                            <div className="slick-list draggable">
                                                <div className="slick-track"
                                                     style={{ opacity: 1, width: '100%', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                    {loading ? (
                                                        <div className="p-4 text-center w-100">Đang tải...</div>
                                                    ) : !topRatedBook ? (
                                                        <div className="p-4 text-center w-100">Không tìm thấy sản phẩm</div>
                                                    ) : (
                                                        <div
                                                            className="js-slide product__card add-to-wishlist-after_add_to_cart product type-product post-110 status-publish first instock product_cat-biographies-memoirs has-post-thumbnail taxable shipping-taxable purchasable product-type-simple slick-slide slick-current slick-active"
                                                            style={{ width: '100%' }} tabIndex="0" data-slick-index="0"
                                                            aria-hidden="false">
                                                            <div
                                                                className="media p-md-6 p-lg-10 p-4 d-block d-md-flex w-100">
                                                                <div
                                                                    className="woocommerce-loop-product__thumbnail mb-4 mb-md-0">
                                                                    <Link to={`/product-detail/${topRatedBook.slug}`}
                                                                       className="d-block bwgb-products-deals-carousel__product-image"
                                                                       tabIndex="0">
                                                                        <img width="200" height="327"
                                                                             src={productImage}
                                                                             className="attachment-bookworm-200x327-crop size-bookworm-200x327-crop"
                                                                             alt={topRatedBook.title} loading="lazy"/>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    className="woocommerce-loop-product__body media-body ml-md-5d25">
                                                                    <div
                                                                        className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                                                                        <Link to={`/product-list/${topRatedBook.category?.id}`}
                                                                           tabIndex="0">
                                                                            {topRatedBook.category?.name || "Sách"}
                                                                        </Link>
                                                                    </div>
                                                                    <h2 className="bwgb-products-deals-carousel__product-title woocommerce-loop-product__title font-size-3 text-lh-md mb-2 text-height-2 crop-text-2 font-weight-normal">
                                                                        <Link to={`/product-detail/${topRatedBook.slug}`}
                                                                           tabIndex="0">
                                                                            {topRatedBook.title}
                                                                        </Link>
                                                                    </h2>
                                                                    <div
                                                                        className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                                                                        <span className="text-gray-700">
                                                                            {topRatedBook.detail?.author || "Đang cập nhật"}
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="bwgb-products-deals-carousel__product-price price d-flex align-items-center font-weight-medium font-size-3">
                                                                        <span className="price">
                                                                            <span className="woocommerce-Price-amount amount">
                                                                                <bdi>
                                                                                    {topRatedBook.currentPrice.toLocaleString("vi-VN")}đ
                                                                                </bdi>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="wp-block-bwgb-column bwgb-column border-bottom bwgb-dbb9656 col-sm-12 col-md-12 col-lg-12 col-xl-4"
                        id="bwgb-dbb9656">
                        <div className="wp-block-bwgb-products-list__inner">
                            <h6 className="bwgb-products-list__block-title font-weight-medium font-size-7 pb-1 mb-4">Top
                                đánh giá</h6>
                            <div className="wp-block-bwgb-products-list__content">
                                <div>
                                    <div className="woocommerce columns-2 ">
                                        {loadingMostReviewed ? (
                                            <div className="p-4 text-center">Đang tải...</div>
                                        ) : mostReviewedBooks.length === 0 ? (
                                            <div className="p-4 text-center">Không có đánh giá</div>
                                        ) : (
                                            mostReviewedBooks.map((product, index) => (
                                                <TopReviewCard
                                                    key={product.id}
                                                    product={product}
                                                    isLast={index === mostReviewedBooks.length - 1}
                                                />
                                            ))
                                        )}
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