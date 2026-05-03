import { Link } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import React, { useState } from "react";
import formatCurrency from "../../../utils/formatCurrency";

export const ProductsInWishlist = () => {
    // 👉 Mock data (dữ liệu giả)
    const [favoriteProducts] = useState([
        {
            id: 1,
            product: {
                id: 101,
                title: "Sản phẩm mẫu 1",
                image: "https://via.placeholder.com/85",
                currentPrice: 120000,
                oldPrice: 150000
            }
        },
        {
            id: 2,
            product: {
                id: 102,
                title: "Sản phẩm mẫu 2",
                image: "https://via.placeholder.com/85",
                currentPrice: 200000,
                oldPrice: 250000
            }
        }
    ]);

    return (
        <section className="shoping-cart spad" style={{ margin: "0 90px" }}>
            {favoriteProducts.length !== 0 ? (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Sản phẩm</th>
                                            <th>Giá đã giảm</th>
                                            <th>Giá gốc</th>
                                            <th>Bỏ thích</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {favoriteProducts.map((favorite) => (
                                            <tr key={favorite.id} style={{ borderBottom: '1px solid #efefef' }}>
                                                <td className="shoping__cart__item">
                                                    <img
                                                        src={favorite.product.image}
                                                        alt=""
                                                        style={{ width: "85px", height: "85px", objectFit: "cover" }}
                                                    />
                                                    <Link to="#">
                                                        <h5>{favorite.product.title}</h5>
                                                    </Link>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {formatCurrency(favorite.product.currentPrice)}
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {formatCurrency(favorite.product.oldPrice)}
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">Bạn chưa có sản phẩm yêu thích nào.</div>
            )}
        </section>
    );
};

export const Wishlist = () => {
    return (
        <div>
            <Breadcrumb />
            <ProductsInWishlist />
        </div>
    );
};

export default Wishlist;