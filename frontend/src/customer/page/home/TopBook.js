import formatCurrency from "../../../utils/formatCurrency";
import React, {useEffect, useState} from "react";
import APIService from "../../../service/APIService";
import {Link} from "react-router-dom";
import Rating from "@mui/material/Rating";

const Book = ({book}) => {
    const [rating, setRating] = useState(0);
    const [commentQuantity, setCommentQuantity] = useState(0);

    useEffect(() => {
        if (book) {
            const comments = book?.comments;
            let ratingTotal = 0;
            comments.forEach(comment => {
                ratingTotal += comment.rating;
            })
            const rating = ratingTotal / comments.length;
            setRating(rating);
            setCommentQuantity(comments.length);
        }
    }, [book])
    return (
        <div
            className="border-top border-right border-left p-4 add-to-wishlist-after_add_to_cart product type-product post-14 status-publish first instock product_cat-c has-post-thumbnail sale taxable shipping-taxable purchasable product-type-simple">
            <div className="media m-1">
                <Link to={`/product-detail/${book.id}`}
                      className="d-block bwgb-products-list__product-image"><img
                    width="100" height="100"
                    src={book.image}
                    className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                    alt=""
                    loading="lazy" style={{maxWidth: '100px', minWidth: '100px'}}/></Link>
                <div className="media-body ml-5">
                    <div
                        className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                        <Link
                            to={`/product-list/${book.category.parentCategory?.parentCategory?.id}/${book.category.parentCategory?.id}/${book.category.id}`}>{book.category.name}</Link>
                    </div>
                    <h6 className="bwgb-products-list__product-title font-weight-normal mb-1 text-lh-md crop-text-2">
                        <Link to={`/product-detail/${book.id}`} title={book.title}>{book.title}</Link>
                    </h6>
                    <div
                        className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                        <p className="text-gray-700 font-size-2">{book.detail.author}</p>
                    </div>
                    <div className="price-label">
                        <span
                            className="price d-flex justify-content-start align-items-center">
                            <p className="current-price mr-2">
                                <span
                                    className="price">{formatCurrency(book.currentPrice)}</span>
                            </p>
                            <p className="old-price">
                                <span
                                    className="price">{formatCurrency(book.oldPrice)}</span>
                            </p>
                        </span>
                    </div>
                    <div className="d-flex align-items-center">
                        <Rating name="size-small" value={rating} readOnly size="small"/>
                        <span className="ml-1" style={{color: "#CDCFD0"}}>({commentQuantity})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const TopBook = () => {
    const apiService = new APIService();
    const [topReviewBooks, setTopReviewBooks] = useState([]);
    const [goodBook, setGoodBook] = useState({});
    const secondImage = goodBook.images && goodBook.images[1];
    const secondImageUrl = secondImage && secondImage.image;
    const [shortDescription, setShortDescription] = useState('');

    const fetchGoodBook = async () => {
        try {
            const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/products/6`);
            setGoodBook(result)
            const match = /<p[^>]*>(.*?)<\/p>/i.exec(result.detail?.description);
            if (match) {
                const firstParagraph = match[1];
                setShortDescription(firstParagraph);
            }
        } catch (error) {
            console.error('Error fetching product', error);
        }
    }
    const fetchTopReviewProducts = async () => {
        try {
            const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/products/top_review`);
            const limitProducts = result.slice(0, 2);
            setTopReviewBooks(limitProducts);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }
    useEffect(() => {
        fetchGoodBook();
        fetchTopReviewProducts();
    }, [])
    return (<div className="wp-block-bwgb-columns bwgb-columns space-bottom-2 space-bottom-lg-3 bwgb-91f3a61"
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
                                                 style={{
                                                     opacity: 1,
                                                     width: '1554px',
                                                     transform: 'translate3d(0px, 0px, 0px)'
                                                 }}>
                                                <div
                                                    className="js-slide product__card add-to-wishlist-after_add_to_cart product type-product post-110 status-publish first instock product_cat-biographies-memoirs has-post-thumbnail taxable shipping-taxable purchasable product-type-simple slick-slide slick-current slick-active"
                                                    style={{width: '777px'}} tabIndex="0" data-slick-index="0"
                                                    aria-hidden="false">
                                                    {goodBook && (<div
                                                        className="media p-md-6 p-lg-10 p-4 d-block d-md-flex w-100">
                                                        <div
                                                            className="woocommerce-loop-product__thumbnail mb-4 mb-md-0">
                                                            <Link to={`/product-detail/${goodBook.id}`}
                                                                  className="d-block bwgb-products-deals-carousel__product-image"
                                                                  tabIndex="0"><img width="200" height="327"
                                                                                    src={secondImageUrl}
                                                                                    className="attachment-bookworm-200x327-crop size-bookworm-200x327-crop"
                                                                                    alt="" loading="lazy"/></Link>
                                                        </div>
                                                        <div
                                                            className="woocommerce-loop-product__body media-body ml-md-5d25">
                                                            <div
                                                                className="woocommerce-loop-product__format text-uppercase font-size-1 mb-1 text-truncate text-primary">
                                                                <Link
                                                                    to={`/product-list/${goodBook.category?.parentCategory?.parentCategory?.id}/${goodBook.category?.parentCategory?.id}/${goodBook.category?.id}`}
                                                                    tabIndex="0">{goodBook.category?.name}</Link>
                                                            </div>
                                                            <h2 className="bwgb-products-deals-carousel__product-title woocommerce-loop-product__title font-size-3 text-lh-md mb-2 text-height-2 crop-text-2 font-weight-normal">
                                                                <Link to={`/product-detail/${goodBook.id}`}
                                                                      tabIndex="0">{goodBook.title}</Link>
                                                            </h2>
                                                            <div
                                                                className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                                                                <p className="text-gray-700 font-size-2"
                                                                   tabIndex="0">{goodBook.detail?.author}</p></div>
                                                            <div className="price-label">
                                                                    <span
                                                                        className="price d-flex justify-content-start align-items-center">
                                                                        <p className="current-price mr-2">
                                                                            <span
                                                                                className="price">{formatCurrency(goodBook.currentPrice)}</span>
                                                                        </p>
                                                                        <p className="old-price">
                                                                            <span
                                                                                className="price">{formatCurrency(goodBook.oldPrice)}</span>
                                                                        </p>
                                                                    </span>
                                                            </div>
                                                            <div
                                                                className="woocommerce-product-details__short-description my-3">
                                                                <p dangerouslySetInnerHTML={{__html: shortDescription}}/>
                                                            </div>
                                                        </div>
                                                    </div>)}
                                                </div>
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
                                    {topReviewBooks.map(book => (
                                        <Book book={book} key={book.id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}