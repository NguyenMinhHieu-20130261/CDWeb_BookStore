import React, {useState} from "react";
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

export const ProductDetail = () => {
    return (
        <div>
            <Breadcrumbs/>
            <div className="container">
                <div className="row ">
                    <div id="primary" className="content-area order-1 right-sidebar col-lg-9">
                        <main id="main" className="site-main" role="main">
                            <div id="product-71"
                                 className=" type-product post-71 status-publish first instock product_cat-mystery product_cat-thriller-suspense has-post-thumbnail taxable shipping-taxable purchasable product-type-variable single-product__content single-product__v4">
                                <SingleProduct/>
                                <ProductInfo/>
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