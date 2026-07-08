import { Link } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import React, { useState, useEffect } from "react";
import ProductCard from "../product-list/sub-components/ProductCard";
import api from "../../../service/ApiService";

export const ProductsInWishlist = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user.id) {
                        const data = await api.fetchData(`/wishlist/${user.id}`);                    
                        const products = (data || []).map(item => ({
                        ...item.product,
                        favorite: true
                    }));
                    setFavoriteProducts(products);
                }
            } catch (error) {
                console.error("Lỗi lấy danh sách yêu thích:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    const handleAddToCart = async (e, product) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
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

    const handleWishlistToggle = (productId, isFav) => {
        if (!isFav) {
            setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                Đang tải danh sách yêu thích...
            </div>
        );
    }

    return (
        <section className="shoping-cart spad" style={{ margin: "0 90px" }}>
            {favoriteProducts.length !== 0 ? (
                <div className="container">
                    <div className="grid-view">
                        <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-4 row-cols-wd-4 border-top border-left mb-6">
                            {favoriteProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    onWishlistToggle={handleWishlistToggle}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <h5>Bạn chưa có sản phẩm yêu thích nào.</h5>
                    <Link to="/product-list" className="btn btn-primary mt-3">
                        Khám phá sản phẩm ngay
                    </Link>
                </div>
            )}
        </section>
    );
};

export const UserWishlist = () => {
    return (
        <div>
            <Breadcrumb />
            <ProductsInWishlist />
        </div>
    );
};

export default UserWishlist;