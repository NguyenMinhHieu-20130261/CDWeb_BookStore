import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import api from "../../../../service/ApiService.js";

const ProductInfo = ({product}) => {
    const prodDetail = product.detail;
    const categoryName = product.category?.name || product.category?.categoryName;

    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState("");
    const [sortReview, setSortReview] = useState("newest");

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!user;
    
    const fetchReviews = async () => {
        try {
            let url = `/reviews/product/${product.id}?sort=${sortReview}`;
            if (selectedRating) {
                url += `&rating=${selectedRating}`;
            }
            const data = await api.fetchData(url);
            setReviews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi lấy review:", error);
            setReviews([]);
        }
    };
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setReviewError("Bạn cần đăng nhập để viết đánh giá.");
            return;
        }
        if (!comment.trim()) {
            setReviewError("Vui lòng nhập nội dung đánh giá.");
            return;
        }
        try {
            setSubmitting(true);
            setReviewError("");
            await api.sendData("/reviews/add", {
                productId: product.id,
                userId: user.id,
                rating: Number(rating),
                cmtDetail: comment.trim(),
            });
            setComment("");
            setRating(5);
            await fetchReviews();
            console.log("REVIEWS:", rating);
        } catch (error) {
            console.error("Lỗi gửi review:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                setReviewError("Bạn cần đăng nhập để viết đánh giá.");
            } else {
                setReviewError("Không thể gửi đánh giá. Vui lòng thử lại.");
            }
        } finally {
            setSubmitting(false);
        }
    };
    useEffect(() => {
        if (product?.id) {
            fetchReviews();
        }
    }, [product?.id, selectedRating, sortReview]);

    const totalReviews = reviews.length;
    const averageRating =
        totalReviews > 0
            ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews
            : 0;
    const countByRating = (rating) => {
        return reviews.filter(review => Number(review.rating) === rating).length;
    };
    const percentByRating = (rating) => {
        if (totalReviews === 0) return 0;
        return (countByRating(rating) / totalReviews) * 100;
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
                    <p className="mb-0">
                        {prodDetail?.description || "Chưa có mô tả sản phẩm."}
                    </p>
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
                                    <p>{prodDetail?.productSku || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Tên nhà cung cấp
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.supplier || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Tác giả
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.author || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Nhà xuất bản
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.publisher || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Năm xuất bản
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.publishYear || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Trọng lượng
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.weight || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Kích thước
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.size || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Số trang
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{prodDetail?.quantityOfPage || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                            <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
                                <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                                    Danh mục
                                </th>
                                <td className="woocommerce-product-attributes-item__value">
                                    <p>{categoryName || "Đang cập nhật"}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div
                    className="border p-3 my-4 woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab font-size-2"
                    id="tab-reviews"
                    role="tabpanel"
                >
                    <h4 className="font-size-3">Đánh giá khách hàng</h4>

                    <div className="row mb-8 advanced-review-rating">
                        <div className="col-md-12 mb-6">
                            <div className="d-flex align-items-center mb-4">
                                <span className="font-size-15 font-weight-bold">
                                    {averageRating.toFixed(1)}
                                </span>
                                <div className="ml-3 h6 mb-0">
                                    <span className="font-weight-normal">
                                        {totalReviews} đánh giá
                                    </span>
                                    <div>
                                        {renderStars(Math.round(averageRating))}
                                    </div>
                                </div>
                            </div>

                            <div className="d-md-flex mb-4" style={{ gap: "12px" }}>
                                <select
                                    className="form-control"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                >
                                    <option value="">Tất cả đánh giá</option>
                                    <option value="5">5 sao</option>
                                    <option value="4">4 sao</option>
                                    <option value="3">3 sao</option>
                                    <option value="2">2 sao</option>
                                    <option value="1">1 sao</option>
                                </select>

                                <select
                                    className="form-control"
                                    value={sortReview}
                                    onChange={(e) => setSortReview(e.target.value)}
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <ul className="list-unstyled p-0">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <li className="py-2" key={rating}>
                                        <div className="row align-items-center mx-gutters-2 font-size-2">
                                            <div className="col-auto">
                                                <span className="text-dark">{rating} sao</span>
                                            </div>

                                            <div className="col px-0">
                                                <div className="progress bg-white-100" style={{ height: "7px" }}>
                                                    <div
                                                        className="progress-bar bg-yellow-darker"
                                                        role="progressbar"
                                                        style={{ width: `${percentByRating(rating)}%` }}
                                                        aria-valuenow={percentByRating(rating)}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="col-2 text-right">
                                                <span className="text-secondary">
                                                    {countByRating(rating)}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div id="reviews">
                        <ul className="commentlist list-unstyled mb-8">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <li
                                        key={review.id}
                                        className="review byuser even thread-even depth-1 mb-4 pb-5 border-bottom"
                                    >
                                        <div className="comment_container">
                                            <div className="comment-text">
                                                <div className="d-md-flex align-items-center mb-3">
                                                    <h6 className="mb-0 mr-3">
                                                        {review.fullName || review.username || "Người dùng"}
                                                    </h6>
                                                    <div>
                                                        {renderStars(review.rating)}
                                                    </div>
                                                </div>

                                                <div className="description mb-4 text-lh-md">
                                                    <p>{review.cmtDetail}</p>
                                                </div>

                                                <div className="text-gray-600">
                                                    {review.createdAt || "Không rõ thời gian"}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="py-3">
                                    Chưa có đánh giá nào cho sản phẩm này.
                                </li>
                            )}
                        </ul>

                        <div id="review_form_wrapper">
                            <div id="review_form">
                                <div id="respond" className="comment-respond">
                                    <h4 id="reply-title" className="comment-reply-title font-size-3 mb-4">
                                        Viết đánh giá
                                    </h4>
                                    {!isLoggedIn ? (
                                        <p className="must-log-in">
                                            Bạn phải đăng nhập để viết đánh giá.
                                            <Link to="/sign-in" className="ml-2">
                                                Đăng nhập ngay
                                            </Link>
                                        </p>
                                    ) : (
                                        <form onSubmit={handleSubmitReview}>
                                            {reviewError && (
                                                <div className="alert alert-danger">
                                                    {reviewError}
                                                </div>
                                            )}
                                            <div className="form-group mb-3">
                                                <label>Số sao</label>
                                                <select
                                                    className="form-control"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="5">5 sao</option>
                                                    <option value="4">4 sao</option>
                                                    <option value="3">3 sao</option>
                                                    <option value="2">2 sao</option>
                                                    <option value="1">1 sao</option>
                                                </select>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Nội dung đánh giá</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    placeholder="Nhập đánh giá của bạn..."
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={submitting}
                                            >
                                                {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductInfo;