import "./../../../assets/css/style-cart.css"
export const PageLink = () => {
    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2"><a className="h-primary"
                                                                           href="https://bookworm.madrasthemes.com">Home</a><span
                        className="breadcrumb-separator mx-2"><i
                        className="fas fa-angle-right"></i></span>Cart
                    </nav>
                </div>
            </div>
        </div>
    )
}
export const ProductsInCart = () => {
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
                                <tbody>
                                <tr>
                                    <td className="shoping__cart__item">
                                        <img src="img/cart/cart-1.jpg" alt=""/>
                                            <h5>Alaska Giant xám trắng</h5>
                                    </td>
                                    <td className="shoping__cart__price">
                                        25.000.000đ
                                    </td>
                                    <td className="shoping__cart__quantity">
                                        <div className="">
                                            <div className="pro-qty">
                                                <input type="text" value="1"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shoping__cart__total">
                                        25.000.000đ
                                    </td>
                                    <td className="shoping__cart__item__close">
                                        <i className="fa-solid fa-xmark"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="shoping__cart__item">
                                        <img src="img/cart/cart-2.jpg" alt=""/>
                                            <h5>Cún golden siêu phẩm</h5>
                                    </td>
                                    <td className="shoping__cart__price">
                                        30.000.000đ
                                    </td>
                                    <td className="shoping__cart__quantity">
                                        <div className="">
                                            <div className="pro-qty">
                                                <input type="text" value="1"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shoping__cart__total">
                                        30.000.000đ
                                    </td>
                                    <td className="shoping__cart__item__close">
                                        <i className="fa-solid fa-xmark"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="shoping__cart__item">
                                        <img src="img/cart/cart-3.jpg" alt=""/>
                                            <h5>Mèo chân ngắn tai cụp</h5>
                                    </td>
                                    <td className="shoping__cart__price">
                                        30.000.000đ
                                    </td>
                                    <td className="shoping__cart__quantity">
                                        <div className="">
                                            <div className="pro-qty">
                                                <input type="text" value="1"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shoping__cart__total">
                                        30.000.000đ
                                    </td>
                                    <td className="shoping__cart__item__close">
                                        <i className="fa-solid fa-xmark"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__btns">
                            <a href="#" className="primary-btn cart-btn">TIẾP TỤC MUA SẮM</a>
                            <a href="#" className="primary-btn cart-btn cart-btn-right"><span
                                className="icon_loading"></span>
                                &nbsp; Cập nhật giỏ hàng</a>
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
                                <li>Tạm tính <span>85.000.000 Đồng</span></li>
                                <li>Tổng tiền <span>85.000.000 Đồng</span></li>
                            </ul>
                            <a href="checkout.html" className="primary-btn">CHUYỂN ĐẾN PHẦN THANH TOÁN</a>
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
        <PageLink/>
        <ProductsInCart/>
        </div>
    )
}
export default Cart;