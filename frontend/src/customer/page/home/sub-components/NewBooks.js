import {Link, useNavigate} from "react-router-dom";
import React from "react";
import api from "../../../../service/ApiService";
const ProductCard = ({product,handleAddToCart}) =>{
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(product.favorite || false);

    React.useEffect(() => {
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
        } catch (error) {
            console.error("Lỗi toggle wishlist:", error);
            setIsFavorite(!newFav);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    const productImage = product.images?.length > 0
                        ? product.images[0].image
                        : "/assets/img/no-image.png";
    return(
        <div
            className="product-card product add-to-wishlist-after_add_to_cart type-product"
            style={{
                width: "270px",
                flex: "0 0 270px",
                minHeight: "480px",
                margin: "10px"
            }}
        >
            <div className="product__inner overflow-hidden p-3 p-md-4d875 w-100">
                <div className="woocommerce-LoopProduct-link woocommerce-loop-product__link d-block position-relative">
                    <div className="woocommerce-loop-product__thumbnail" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <Link to={`/product-detail/${product.slug}`}
                            className="d-block bwgb-products-carousel__product-image mx-auto attachment-shop_catalog size-shop_catalog wp-post-image img-fluid">
                            <img
                                style={{ height: "160px", width: "auto", objectFit: "contain" }}
                                className="attachment-bookworm-120x183-crop size-bookworm-120x183-crop"
                                src={productImage}
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
                            <Link to={`/product-detail/${product.slug}`}>
                                Sách
                            </Link>
                        </div>

                        <h2 className="bwgb-products-carousel__product-title woocommerce-loop-product__title product__title h6 text-lh-md mb-1 text-height-2 crop-text-2 h-dark" style={{ minHeight: "44px", overflow: "hidden" }}>
                            <Link to={`/product-detail/${product.slug}`}>
                                {product.title}
                            </Link>
                        </h2>

                        <div className="woocommerce-loop-product__author font-size-2 text-truncate mb-1">
                            <Link to={`/product-detail/${product.slug}`} className="text-gray-700">
                                {product.author || "Đang cập nhật"}
                            </Link>
                        </div>

                        <div className="bwgb-products-carousel__product-price d-flex align-items-center font-weight-medium font-size-3">
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                        {product.currentPrice.toLocaleString("vi-VN")}đ
                                    </bdi>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="product__hover d-flex align-items-center bwgb-products-carousel__add-to-cart-icon-only mt-3">
                        <div
                            className="button product_type_simple add_to_cart_button text-uppercase text-dark h-dark font-weight-medium mr-auto"
                            title="Add to cart"
                            onClick={(e) => handleAddToCart(e, product)}
                        >
                            <span className="product__add-to-cart"
                            >Thêm vào giỏ hàng
                            </span>
                            <span className="product__add-to-cart-icon font-size-4">
                                <i className="flaticon-icon-126515"></i>
                            </span>
                        </div>
                        <div className="yith-wcwl-add-to-wishlist">
                            <div className="yith-wcwl-add-button">
                                <Link to="" onClick={handleWishlistClick} style={{color: isFavorite ? '#f75454' : '#606060'}}>
                                    <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}/>
                                    <span className="text"> {isFavorite ? " Đã yêu thích" : " Thêm vào yêu thích"}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const NewBooks = ({handleAddToCart}) => {
    const [categories, setCategories] = React.useState([]);
    const [parentCategories, setParentCategories] = React.useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [loadingProducts, setLoadingProducts] = React.useState(false);
    
    React.useEffect(() => {
        const loadCate = async () => {
            try {
                const data = await api.fetchData("/category/all");
                setCategories(data);
                // console.log("data", data);
                // Lọc ra danh mục cha
                const parents = data.filter(c => c.parentId === null);
                // console.log("parents", parents);
                setParentCategories(parents);
                if (parents.length > 0) {
                    setSelectedCategoryId(parents[0].id);
                }
            } catch (error) {
                console.error("Lỗi load cate:", error);
            }
        };
        loadCate();
    }, []);
     React.useEffect(() => {
        if (!selectedCategoryId) return;

        const loadProductsByCategory = async () => {
            try {
                setLoadingProducts(true);
                const data = await api.fetchData(`/products/latest/${selectedCategoryId}`);
                const productList = data || [];

                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user.id) {
                    try {
                        const wishlistData = await api.fetchData("/wishlist");
                        const wishlistProductIds = new Set((wishlistData || []).map(item => item.product?.id));
                        productList.forEach(prod => {
                            prod.favorite = wishlistProductIds.has(prod.id);
                        });
                    } catch (err) {
                        console.error("Lỗi lấy danh sách yêu thích:", err);
                    }
                }

                setProducts(productList);
            } catch (error) {
                console.error("Lỗi load product theo cate:", error);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProductsByCategory();
    }, [selectedCategoryId]);

    return (
        <div className="wp-block-bwgb-tabs__inner container">
            <header className="mb-5  d-md-flex justify-content-between align-items-center">
                <h2 className="bwgb-tabs__block-title font-size-7 mb-3 mb-md-0">Sách mới xuất bản</h2>
                <ul className="nav nav-gray-700 flex-nowrap flex-md-wrap overflow-auto overflow-md-visible"
                    role="tablist">
                    {/* Category */}
                    {parentCategories.map(mainCate => (
                        <li key={mainCate.id}
                        className="nav-item flex-shrink-0 flex-md-shrink-1 mx-4"
                        >
                           <button
                                type="button"
                                className={`nav-link px-0 border-0 bg-transparent ${
                                    selectedCategoryId === mainCate.id ? "active" : ""
                                }`}
                                onClick={() => setSelectedCategoryId(mainCate.id)}
                            >
                                <h6 className="bwgb-tabs__title">{mainCate.name}</h6>
                            </button>
                        </li>
                    ))}
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
                                                    style={{ opacity: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                {loadingProducts ? (
                                                    <p className="p-4">Đang tải sản phẩm...</p>
                                                ) : products.length > 0 ? (
                                                    products.map(product => (
                                                        <ProductCard
                                                            key={product.id}
                                                            product={product}
                                                            handleAddToCart={handleAddToCart}
                                                        />
                                                    ))
                                                ) : (
                                                    <p className="p-4">Không có sản phẩm</p>
                                                )}
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