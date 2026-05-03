import {Link, useLocation} from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import React, {useEffect, useState} from "react";
import APIService from "../../../service/APIService";
import formatCurrency from "../../../utils/formatCurrency";

export const ProductsInWishlist = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/user/favorites`);
            setFavoriteProducts(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching favorite products")
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const deleteFavoriteProduct = async (id) => {
        try {
            await apiService.deleteData(`${process.env.REACT_APP_ENDPOINT_API}/user/favorites/${id}`);
            console.log("Favorite product deleted successfully");
            fetchProducts();
        } catch (error) {
            console.error("Error deleting favorite product");
        }
    }
    return (
        <section className="shoping-cart spad" style={{margin: "0 90px 0 90px"}}>
            {isLoading ? (
                <div className="loader"></div>
            ) : (favoriteProducts.length !== 0 ? (<div className="container">
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
                                        {favoriteProducts.map(favorite => (<tr style={{
                                                borderBottom: '1px solid #efefef'
                                            }} key={favorite.id}>
                                                <td className="shoping__cart__item">
                                                    <img src={favorite.product?.image} alt=""
                                                         style={{width: "85px", height: "85px", objectFit: "cover"}}/>
                                                    <Link to={`/product-detail/${favorite.product?.id}`}>
                                                        <h5>
                                                            {favorite.product?.title}
                                                        </h5>
                                                    </Link>
                                                </td>
                                                <td className="shoping__cart__price"
                                                >
                                                    {formatCurrency(favorite.product?.currentPrice)}
                                                </td>
                                                <td className="shoping__cart__price"
                                                >
                                                    {formatCurrency(favorite.product?.oldPrice)}
                                                </td>
                                                <td className="shoping__cart__item__close"
                                                    onClick={() => deleteFavoriteProduct(favorite.id)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>) :
                    (<div className="text-center">Bạn chưa có sản phẩm yêu thích nào.</div>)
            )}
        </section>
    )
}
export const Wishlist = () => {
    return (
        <div>
            <Breadcrumb/>
            <ProductsInWishlist/>
        </div>
    )
}
export default Wishlist;