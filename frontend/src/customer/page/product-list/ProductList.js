import React, { useEffect, useState } from "react";
import Pagination from "../../components/general/Pagination";
import BreadCrumb from "../../components/general/Breadcrumb";
import Sidebar from "./sub-components/Sidebar";
import ProductGrid from "./sub-components/ProductGrid";
import "../../assets/css/style-produc.css"
import api from "../../../service/ApiService"

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProdList = async () => {
            try {
                const data = await api.fetchData(`/products`);
                console.log("products", data);
                setProducts(data);
            } catch (error) {
                console.log("Lỗi",  error);
            } finally {
                setLoading(false);
            }
        }
        fetchProdList();
    }, []);
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
                                                    Recommended Books</h2>
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
                                                Hiển thị {products.length} sản phẩm </p>
                                        </div>
                                        <div className="shop-control-bar__right d-md-flex align-items-center">
                                            <form className="woocommerce-ordering mb-4 m-md-0" method="get">
                                                <select name="orderby"
                                                        className="orderby js-select selectpicker dropdown-select"
                                                        aria-label="Shop order"
                                                        data-style="border-bottom shadow-none outline-none py-2">
                                                    <option value="menu_order" selected="selected">Default sorting
                                                    </option>
                                                    <option value="popularity">Sort by popularity</option>
                                                    <option value="rating">Sort by average rating</option>
                                                    <option value="date">Sort by latest</option>
                                                    <option value="price">Sort by price: low to high</option>
                                                    <option value="price-desc">Sort by price: high to low</option>
                                                </select>
                                                <input type="hidden" name="paged" value="1"/>
                                            </form>
                                            <form method="POST" action
                                                  className="number-of-items ml-md-4 mb-4 m-md-0 d-none d-xl-block">
                                                <select name="ppp" onChange="this.form.submit()"
                                                        className="dropdown-select orderby"
                                                        data-style="border-bottom shadow-none outline-none py-2">
                                                    <option value="20">Show 20</option>
                                                    <option value="40">Show 40</option>
                                                    <option value="80">Show 80</option>
                                                    <option value="-1">Show All</option>
                                                </select></form>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-view">
                                    {loading ? (
                                        <p>Đang tải sản phẩm...</p>
                                    ) : (
                                        <ProductGrid products={products} />
                                    )}
                                    <Pagination/>
                                </div>
                            </main>
                        </div>
                        <Sidebar products={products || []} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductList;