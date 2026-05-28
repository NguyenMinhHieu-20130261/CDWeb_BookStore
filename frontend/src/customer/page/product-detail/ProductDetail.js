import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Product from "../product-list/sub-components/ProductCard";
import "../../assets/css/product-detail.css"
import {Link} from "react-router-dom";
import FormatCurrency from "../../../utils/FormatCurrency.js";
import Breadcrumb from "../../components/general/Breadcrumb";
import SingleProduct from "./sub-components/SingleProduct";
import ProductInfo from "./sub-components/ProductInfo";
import RelatedProducts from "./sub-components/RelatedProduct.js";
import Breadcrumbs from "../../components/general/Breadcrumb.js";
import SideBar from "./sub-components/SideBar.js";
import api from "../../../service/ApiService.js"

export const ProductDetail = () => {
    const {slug} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const productData = await api.fetchData(`/products/detail/${slug}`);
                setProduct(productData);
            } catch (error) {
                console.error("Lỗi lấy chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [slug]);
    if (loading) {
        return <div className="container py-5">Đang tải sản phẩm...</div>;
    }
    if (!product) {
        return <div className="container py-5">Không tìm thấy sản phẩm</div>;
    }
    return (
        <div>
            <Breadcrumbs/>
            <div className="container">
                <div className="row ">
                    <div id="primary" className="content-area order-1 right-sidebar col-lg-9">
                        <main id="main" className="site-main" role="main">
                            <div id="product-71"
                                 className=" type-product post-71 status-publish first instock product_cat-mystery product_cat-thriller-suspense has-post-thumbnail taxable shipping-taxable purchasable product-type-variable single-product__content single-product__v4">
                                <SingleProduct product={product} />
                                <ProductInfo product={product} />
                            </div>
                        </main>
                    </div>
                    <SideBar/>
                </div>
                <RelatedProducts/>
            </div>
        </div>
    )
}
export default ProductDetail;