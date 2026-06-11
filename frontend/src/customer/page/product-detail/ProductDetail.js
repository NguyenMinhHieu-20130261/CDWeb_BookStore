import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/product-detail.css";
import Breadcrumbs from "../../components/general/Breadcrumb.js";
import SingleProduct from "./sub-components/SingleProduct";
import ProductInfo from "./sub-components/ProductInfo";
import RelatedProducts from "./sub-components/RelatedProduct.js";
import SideBar from "./sub-components/SideBar.js";
import api from "../../../service/ApiService.js";

export const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    //list
    const [listProduct, setListProduct] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const productData = await api.fetchData(`/products/detail/${slug}`);
                setProduct(productData);
            } catch (error) {
                console.error("Lỗi lấy chi tiết sản phẩm:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        if (slug) {
            fetchProductDetail();
        }
    }, [slug]);
    useEffect(() => {
        const fetchProdList = async () => {
            try {
                const data = await api.fetchData('/products');
                // console.log("products", data);
                const productList = Array.isArray(data) ? data : data.data || [];
                setListProduct(productList);
            } catch (error) {
                console.log("Lỗi",  error);
            } finally {
                setLoadingList(false);
            }
        }
        fetchProdList();
    },[]);
    if (loading) {
        return <div className="container py-5">Đang tải sản phẩm...</div>;
    }
    if (loadingList) {
        return <div className="container py-5">Đang tải sản phẩm...</div>;
    }
    if (!product) {
        return <div className="container py-5">Không tìm thấy sản phẩm</div>;
    }
    return (
        <div>
            <Breadcrumbs/>
            <div className="container">
                <div className="row">
                    <div id="primary" className="content-area order-1 right-sidebar col-lg-9">
                        <main id="main" className="site-main" role="main">
                            <div className="single-product__content single-product__v4">
                                <SingleProduct product={product} />
                                <ProductInfo product={product} />
                            </div>
                        </main>
                    </div>
                    <SideBar 
                        listProduct={listProduct} 
                    />
                </div>
                <RelatedProducts />
            </div>
        </div>
    );
};
export default ProductDetail;