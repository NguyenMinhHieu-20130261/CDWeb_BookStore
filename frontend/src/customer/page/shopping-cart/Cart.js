import "../../assets/css/style-cart.css"
import {Link} from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb"
import { useEffect, useState } from "react";
import api from "../../../service/ApiService";
import FormatCurrency from "../../../utils/FormatCurrency";

export const ProductsInCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const getCartItems = async () => {
        try {
            if (!user || !user.id) {
                setCartItems([]);
                setLoading(false);
                return;
            }
            const res = await api.fetchData(`/cart/items/${user.id}`);
            setCartItems(res);
        } catch (error) {
            console.log("Lỗi lấy giỏ hàng:", error);
        } finally {
            setLoading(false);
        }
    };
    const removeCartItem = async (cartItemId) => {
        try {
            await api.deleteData(`/cart/remove/${cartItemId}`);
            getCartItems();
        } catch (error) {
            console.log("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
        }
    };
    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await api.updateData(`/cart/update-quantity/${cartItemId}`, {
                quantity: newQuantity
            });
            getCartItems();
        } catch (error) {
            console.log("Lỗi cập nhật số lượng:", error);
        }
    };
    useEffect(() => {
        getCartItems();
    }, []);

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product.currentPrice * item.quantity;
    }, 0);
    if (loading) {
        return (
            <section className="shoping-cart spad" style={{ margin: "0 90px 0 90px" }}>
                <div className="container">
                    <p>Đang tải giỏ hàng...</p>
                </div>
            </section>
        );
    }
    return (
        <section className="shoping-cart spad" style={{ margin: "0 90px 0 90px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__table">
                            <table>
                                <thead>
                                <tr>
                                    <th className="shoping__product">Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody 
                                    style={{width:"100%"}}
                                >
                                    {!user ? (
                                        <tr>
                                            <td className="no-user" colSpan="5" >
                                                <div>
                                                    <p className="no-user-text">
                                                        Bạn cần đăng nhập để thêm hàng vào giỏ hàng...
                                                    </p>
                                                    <Link className="no-user-link" to="/sign-in">
                                                        Đăng nhập
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : cartItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
                                                Giỏ hàng đang trống
                                            </td>
                                        </tr>
                                    ) : (cartItems.map((item) => {
                                            const productImage = item.product?.images?.length > 0
                                                ? item.product.images[0].image
                                                : "/assets/img/no-image.png";
                                            console.log("IMAGES:", item.product?.images);
                                            return(
                                                <tr key={item.id}>
                                                    <td className="shoping__cart__item">
                                                        <img
                                                            src={productImage}
                                                            alt={item.product.title}
                                                            style={{
                                                                width: "100px",
                                                                height: "120px",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                        <h5>{item.product.title}</h5>
                                                    </td>
                                                    <td className="shoping__cart__price">
                                                        {FormatCurrency(item.product.currentPrice)}
                                                    </td>
                                                    <td className="shoping__cart__quantity">
                                                        <div className="cart-quantity-box">
                                                            <button
                                                                className="qty-btn"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={item.quantity}
                                                                readOnly
                                                            />
                                                            <button
                                                                className="qty-btn"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="shoping__cart__total">
                                                        {FormatCurrency(item.product.currentPrice * item.quantity)}
                                                    </td>
                                                    <td
                                                        className="shoping__cart__item__close"
                                                        onClick={() => removeCartItem(item.id)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <i className="fa-solid fa-xmark"/>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__btns">
                            <Link to="/product-list" className="primary-btn cart-btn">TIẾP TỤC MUA SẮM</Link>
                            <Link to="" className="primary-btn cart-btn cart-btn-right">
                                <span className="icon_loading"/>
                                &nbsp; Cập nhật giỏ hàng
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="shoping__continue">
                            <div className="shoping__discount">
                                <h5>Mã giảm giá</h5>
                                <form action="#">
                                    <input type="text" placeholder="Nhập mã giảm giá"/>
                                        <button type="submit" className="site-btn">APPLY</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="shoping__checkout">
                            <h5>Tổng tiền giỏ hàng</h5>
                            <ul>
                                <li>Tạm tính <span>{FormatCurrency(totalPrice)}</span></li>
                                <li>Tổng tiền <span>{FormatCurrency(totalPrice)}</span></li>
                            </ul>
                            <Link to="/check-out" className="primary-btn">CHUYỂN ĐẾN PHẦN THANH TOÁN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export const Cart = () => {
    return (
        <div>
            <Breadcrumb/>
            <ProductsInCart/>
        </div>
    )
}
export default Cart;