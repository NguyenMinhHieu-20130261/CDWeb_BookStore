import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/general/Pagination";
import BreadCrumb from "../../components/general/Breadcrumb";
import Sidebar from "./sub-components/Sidebar";
import ProductGrid from "./sub-components/ProductGrid";
import "../../assets/css/style-produc.css"
import api from "../../../service/ApiService"
import { useParams,useNavigate } from "react-router-dom";

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const {categoryId} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const totalPages = Math.ceil(products.length / pageSize) || 1;

    const pagedProducts = useMemo(() => {
        if (pageSize === -1) return products;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return products.slice(startIndex, endIndex);
    }, [products, currentPage, pageSize]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchProdList = async () => {
            try {
                let url = "/products/active";
                if (categoryId) {
                    url = `/products/main-category/${categoryId}`;
                }
                const data = await api.fetchData(url);
                // console.log("products", data);
                const productList = Array.isArray(data) ? data : data.data || [];
                
                setProducts(productList);
                setAllProducts(productList);
                setCurrentPage(1);
            } catch (error) {
                console.log("Lỗi",  error);
            } finally {
                setLoading(false);
            }
        }
        fetchProdList();
    }, [categoryId]);
    const handlePriceFilterChange = (priceRange, event) => {
        event.preventDefault();

        const isSelected = selectedPriceRange === priceRange;
        const newPriceRange = isSelected ? null : priceRange;

        setSelectedPriceRange(newPriceRange);
        if (isSelected) {
            setProducts(allProducts);
            return;
        }
        const [min, max] = priceRange.split("-");
        const minPrice = Number(min);
        const maxPrice = max ? Number(max) : Infinity;

        const filteredProds = allProducts.filter((product) => {
            const price = Number(product.price || product.currentPrice || product.salePrice);
            return price >= minPrice && price <= maxPrice;
        });
        setProducts(filteredProds);
    };
    const handleAddToCart = async (e,product) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
            navigate("/sign-in");
            return;
        }
        try {
            await api.sendData("/cart/add", {
                user: {id: user.id},
                product: {id: product.id},
                quantity: 1
            });
            alert("Đã thêm sản phẩm vào giỏ hàng");
        } catch (error) {
            console.log("Lỗi thêm vào giỏ hàng:", error);
            alert("Không thể thêm sản phẩm vào giỏ hàng");
        }
    };
    return (
        <>
            <BreadCrumb/>
            <div className="site-content space-bottom-3 mt-8">
                <div className="container">
                    <div className="row content-container">
                        <div id="primary" className="content-area order-2 mx-2">
                            <main id="main" className="site-main" role="main">
                                <header className="woocommerce-products-header"/>
                                <div className="woocommerce-notices-wrapper"/>
                                <div className="position-relative mb-3">
                                    <div
                                        className="wp-block-bwgb-products-carousel bwgb-products-carousel bookworm-recommended-block bwgb-297e8e9 bwgb-products-carousel__style-v2"
                                        id="bwgb-297e8e9">
                                        <div className="wp-block-bwgb-products-carousel__inner">
                                            <header
                                                className=" justify-content-between align-items-center bwgb-products-carousel__block-header text-center ">
                                                <h2 className="bwgb-products-carousel__block-title font-size-7 mb-md-0">
                                                    Sách Đề Xuất
                                                </h2>
                                            </header>
                                            <div className="wp-block-bwgb-products-carousel__content"
                                                 data-posts-per-page="8" data-columns="4">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container p-0">
                                    <div
                                        className="shop-control-bar d-lg-flex justify-content-between align-items-center mb-5 text-center text-md-left">
                                        <div className="shop-control-bar__left mb-3 m-lg-0">
                                            <p className="woocommerce-result-count m-0">
                                                Hiển thị {pagedProducts.length} / {products.length} sản phẩm
                                            </p>
                                        </div>
                                        <div className="shop-control-bar__right d-md-flex align-items-center">
                                            <form className="woocommerce-ordering mb-4 m-md-0" method="get">
                                                <select name="orderby"
                                                        className="orderby js-select selectpicker dropdown-select"
                                                        aria-label="Shop order"
                                                        data-style="border-bottom shadow-none outline-none py-2">
                                                    <option value="menu_order">Default sorting
                                                    </option>
                                                    <option value="popularity">Sort by popularity</option>
                                                    <option value="rating">Sort by average rating</option>
                                                    <option value="date">Sort by latest</option>
                                                    <option value="price">Sort by price: low to high</option>
                                                    <option value="price-desc">Sort by price: high to low</option>
                                                </select>
                                                <input type="hidden" name="paged" value="1"/>
                                            </form>
                                            <form method="POST"
                                                className="number-of-items ml-md-4 mb-4 m-md-0 d-none d-xl-block"
                                                onSubmit={(e) => e.preventDefault()}
                                            >
                                                <select name="ppp" 
                                                    className="dropdown-select orderby"
                                                    data-style="border-bottom shadow-none outline-none py-2"
                                                    value={pageSize}
                                                    onChange={(e) => {
                                                        setPageSize(Number(e.target.value));
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    <option value={10}>Hiển thị 10 sản phẩm</option>
                                                    <option value={20}>Hiển thị 20 sản phẩm</option>
                                                    <option value={50}>Hiển thị 50 sản phẩm</option>
                                                    <option value={-1}>HIển thị tất cả</option>
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-view">
                                    {loading ? (
                                        <p>Đang tải sản phẩm...</p>
                                    ) : (
                                        <ProductGrid 
                                            products={products} 
                                            handleAddToCart={handleAddToCart}
                                        />
                                    )}

                                </div>

                            </main>                          
                        </div>
                        <Sidebar
                            products={allProducts}
                            selectedPriceRange={selectedPriceRange}
                            handlePriceFilterChange={handlePriceFilterChange}
                        />                    
                        </div>
                        <Pagination 
                            style ={{minWidth:"100%"}}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        /> 
                </div>
            </div>
        </>
    );
}
export default ProductList;