import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../../assets/css/product-detail.css";
import Breadcrumbs from "../../components/general/Breadcrumb.js";
import SingleProduct from "./sub-components/SingleProduct";
import ProductInfo from "./sub-components/ProductInfo";
import RelatedProducts from "./sub-components/RelatedProduct.js";
import SideBar from "./sub-components/SideBar.js";
import api from "../../../service/ApiService.js";
import WindowPopup from "../../components/general/WindowPopup.js";

export const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    //list
    const [listProduct, setListProduct] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [popupInfo,setPopupInfo] = useState({
        visible:false,
        type:"",
        title:"",
        message:""
    });
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
                const data = await api.fetchData('/products/active');
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
            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Sản phẩm đã được thêm vào giỏ hàng"
            });
        } catch (error) {
            console.log("Lỗi thêm vào giỏ hàng:", error);
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Thất bại",
                message: "Sản phẩm không được thêm vào giỏ hàng"
            });
        }
    };
    const hidePopup = () => {
        setPopupInfo(prev=>({
            ...prev,
            visible:false
        }));
    };
    return (
        <div>
            <WindowPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                title={popupInfo.title}
                message={popupInfo.message}
                onClose={hidePopup}
            />
            <Breadcrumbs/>
            <div className="container">
                <div className="row">
                    <div id="primary" className="content-area order-1 right-sidebar col-lg-9">
                        <main id="main" className="site-main" role="main">
                            <div className="single-product__content single-product__v4">
                                <SingleProduct 
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                />
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