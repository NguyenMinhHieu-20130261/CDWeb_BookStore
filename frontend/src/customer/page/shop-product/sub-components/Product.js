import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import formatCurrency from "../../../../utils/formatCurrency";
import APIService from "../../../../service/APIService";
import Rating from "@mui/material/Rating";
import axios from "axios";

const Product = (props) => {
    const productInfo = props.info;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [popupInfo, setPopupInfo] = useState({message: '', type: '', visible: false});
    const [rating, setRating] = useState(0);
    const [commentQuantity, setCommentQuantity] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [remainingQuantity, setRemainingQuantity] = useState(null);
    const [isFavorite, setIsFavortie] = useState(false);

    const fetchFavorite = async () => {
        if (user) {
            try {
                const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/user/favorites`);
                const favoriteProduct = result.find(favorite => favorite.product?.id === productInfo.id);
                const isFavoriteProduct = favoriteProduct ? true : false;
                setIsFavortie(isFavoriteProduct)
            } catch (error) {
                console.error("Error fetching favorite products")
            }
        }
    }
    useEffect(() => {
        if (productInfo) {
            const comments = productInfo?.comments;
            let ratingTotal = 0;
            comments.forEach(comment => {
                ratingTotal += comment.rating;
            })
            const rating = ratingTotal / comments.length;
            setRating(rating);
            setCommentQuantity(comments.length);

            const promotions = productInfo?.promotion;
            if (promotions && promotions.length > 0) {
                promotions.forEach((promotion) => {
                    setDiscount(promotion.discount)
                });
            }
            fetchFavorite();
            setPrice();
            checkRemainingQuantity();
        }
    }, [user, productInfo, discount])

    const addToCart = async (event) => {
        event.preventDefault();
        if (!user) {
            const errorMessage = 'Bạn cần đăng nhập trước khi thêm vào giỏ hàng!';
            setPopupInfo({message: errorMessage, type: 'error', visible: true});
        } else {
            const requestData = {product: {id: productInfo.id}, quantity: 1};
            try {
                const responseData = await apiService.sendData(`${process.env.REACT_APP_ENDPOINT_API}/cart/add`, requestData);
                setPopupInfo({message: responseData, type: 'success', visible: true});
            } catch (error) {
                if (error.response) {
                    setPopupInfo({message: error.response.data, type: 'error', visible: true});
                }
            }
        }
    };

    const addFavoriteProduct = async (event) => {
        event.preventDefault();
        if (!user) {
            const errorMessage = 'Bạn phải đăng nhập trước khi thêm vào yêu thích!';
            setPopupInfo({message: errorMessage, type: 'error', visible: true});
        } else {
            try {
                const result = await apiService.sendData(`${process.env.REACT_APP_ENDPOINT_API}/user/favorites/${productInfo.id}`);
                const successMessage = result.message || 'Sản phẩm đã được thêm vào yêu thích!';
                setPopupInfo({message: successMessage, type: 'success', visible: true});
            } catch (error) {
                console.error("Error adding favorite product");
            }
        }
    }
    const setPrice = async () => {
        try {
            if (discount !== 0) {
                const newPrice = productInfo.oldPrice - (productInfo.oldPrice * discount / 100);
                await axios.put(`${process.env.REACT_APP_ENDPOINT_API}/products/set_discount/${productInfo.id}/price/${newPrice}`);
            }
        } catch (error) {
            console.error("Error setting price", error);
        }
    }

    const checkRemainingQuantity = async () => {
        try {
            const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/inventories/inventory/${productInfo.id}`);
            setRemainingQuantity(result.remainingQuantity);
        } catch (error) {
            console.error(error);
        }
    }

    const hidePopup = () => {
        setPopupInfo((prevInfo) => ({...prevInfo, visible: false}));
    };

    return (
        <li className="add-to-wishlist-after_add_to_cart product type-product post-108 status-publish first instock product_cat-cookbooks product_cat-cooking-education-reference product_cat-c has-post-thumbnail taxable shipping-taxable purchasable product-type-simple col">
            <div className="bookworm-product-grid">
                <div className="product__inner overflow-hidden p-3">
                    <div className="position-relative d-block">
                        {remainingQuantity === 0 && (
                            <div className={`${discount !== 0 ? 'sold-out-badge-discount' : 'sold-out-badge'}`}>
                                <span>Hết hàng</span>
                            </div>
                        )}
                        {discount !== 0 ? (
                            <div className="discount-star">
                                <span>{discount}% OFF</span>
                            </div>
                        ) : <> </>}
                        <div className="woocommerce-loop-product__header">
                            <Link to={`/product-detail/${productInfo.id}`}
                                  className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                                src={productInfo.image}
                                className="img-fluid d-block mx-auto attachment-shop_catalog size-shop_catalog wp-post-image img-fluid"
                                alt decoding="async"/></Link>
                        </div>
                        <div className="woocommerce-loop-product__body product__body pt-3 bg-white">
                            <h2 className="woocommerce-loop-product__title product__title h6 text-lh-md mb-1 crop-text-2 h-dark  text-height-2">
                                <Link to={`/product-detail/${productInfo.id}`}
                                      className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                      title={productInfo.title}>
                                    {productInfo.title}</Link>
                            </h2>
                            <div className="price-label">
                                {discount !== 0 ? (
                                    <span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price">{formatCurrency(productInfo.currentPrice)}</span>
                                    </p>
                                    <p className="old-price">
                                        <span className="price">{formatCurrency(productInfo.oldPrice)}</span>
                                    </p>
                                </span>
                                ) : (<span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price">{formatCurrency(productInfo.oldPrice)}</span>
                                    </p>
                                </span>)}
                            </div>
                            <div className="d-flex align-items-center">
                                <Rating name="size-small" value={rating} readOnly size="small"/>
                                <span className="ml-1" style={{color: "#CDCFD0"}}>({commentQuantity})</span>
                            </div>
                        </div>
                        {remainingQuantity === 0 ? (<div
                                className="woocommerce-loop-product__hover product__hover d-flex align-items-center justify-content-center mt-2">
                                <Link to={`/product-detail/${productInfo.id}`}>
                                    <button className="see-detail">Xem chi tiết</button>
                                </Link>
                            </div>) :
                            (<div
                                className="woocommerce-loop-product__hover product__hover d-flex align-items-center justify-content-between mt-2">
                                <div className="cart-fragment">
                                    <Link to="" data-quantity="1" onClick={(event) => addToCart(event)}
                                          className="button product_type_simple add_to_cart_button ajax_add_to_cart text-uppercase text-dark h-dark font-weight-medium mr-auto"
                                          title="Thêm vào giỏ hàng">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </Link>
                                </div>
                                <div className="yith-wcwl-add-to-wishlist wishlist-fragment on-first-load">
                                    <div className="yith-wcwl-add-button">
                                        {!isFavorite ? (<Link to="" onClick={(event) => addFavoriteProduct(event)}
                                                              className="add_to_wishlist single_add_to_wishlist"
                                                              title="Thêm vào yêu thích">
                                                <i className="fa-regular fa-heart"></i>
                                            </Link>) :
                                            (<Link to=""
                                                   style={{backgroundColor: '#f75454'}}
                                                   className="add_to_wishlist single_add_to_wishlist"
                                                   title="Đã thêm vào yêu thích">
                                                <i className="fa-regular fa-heart" style={{color: 'white'}}></i>
                                            </Link>)}
                                    </div>
                                </div>
                            </div>)}
                    </div>

                    <div
                        className={`popup popup--icon -success js_success-popup ${popupInfo.visible && popupInfo.type === 'success' ? 'popup--visible' : ''}`}>
                        <div className="popup__background"></div>
                        <div className="popup__content">
                            <h3 className="popup__content__title">
                                Thành công
                            </h3>
                            <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                            <p>
                                <button className="button-popup button--success" data-for="js_success-popup"
                                        onClick={hidePopup}>Ẩn thông báo
                                </button>
                            </p>
                        </div>
                    </div>

                    <div
                        className={`popup popup--icon -error js_error-popup ${popupInfo.visible && popupInfo.type === 'error' ? 'popup--visible' : ''}`}>
                        <div className="popup__background"></div>
                        <div className="popup__content">
                            <h3 className="popup__content__title">
                                Thất bại
                            </h3>
                            <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                            <p>
                                <button className="button-popup button--error" data-for="js_error-popup"
                                        onClick={hidePopup}>Ẩn thông báo
                                </button>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    );
}
export default Product;