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
export const Coupon = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <h6><span className="icon_tag_alt"></span> Bạn có mã giảm giá ? <a href="#">Nhấn vào đây</a> để nhận mã
                    giảm giá
                </h6>
            </div>
        </div>
    )
}
export const InputInfor = () => {
    return (
        <div className="col-lg-8 col-md-6">
            <div className="row">
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Họ<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Tên<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
            </div>
            <div className="checkout__input">
                <p>Quốc gia<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Địa chỉ<span>*</span></p>
                <input type="text" placeholder="Street Address" className="checkout__input__add"/>
                    <input type="text" placeholder="Apartment, suite, unite ect (optinal)"/>
            </div>
            <div className="checkout__input">
                <p>Quận/Huyện<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Tỉnh/Thành phố<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Mã bưu điện (tùy chọn)<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Điện thoại<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
            </div>
            <div className="checkout__input__checkbox">
                <label htmlFor="diff-acc">
                    Giao đến địa chỉ khác?
                    <input type="checkbox" id="diff-acc"/>
                        <span className="checkmark"></span>
                </label>
            </div>
            <div className="checkout__input">
                <p>Ghi chú<span>*</span></p>
                <input type="text" placeholder="Ghi chú về đơn hàng của bạn, ví dụ:Hàng dễ vỡ."/>
            </div>
        </div>
    )
}
export const Bill = () => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="checkout__order">
                <h4>Hóa đơn của bạn</h4>
                <div className="checkout__order__products">Sản phẩm <span>Tổng tiền</span></div>
                <ul>
                    <li>Alaska Giant xám trắng <span>25.000.000đ</span></li>
                    <li>Cún golden siêu phẩm <span>30.000.000đ</span></li>
                    <li>Mèo chân ngắn tai cụp <span>30.000.000đ</span></li>
                </ul>
                <div className="checkout__order__subtotal">Tạm tính <span>85.000.000 Đồng</span></div>
                <div className="checkout__order__total">Tổng tiền <span>85.000.000 Đồng</span></div>
                <div className="checkout__input__checkbox">
                    <label htmlFor="acc-or">
                        <p>Xác nhận thông tin<span>*</span></p>
                        <input type="checkbox" id="acc-or"/>
                            <span className="checkmark"></span>
                    </label>
                </div>
                <p>Tôi xác nhận thông tin đơn hàng và những thông tin tôi đã nhập là chính xác.</p>
                <div className="Checkout-container">
                    <div className="checkout__input__checkbox">
                        <label htmlFor="payment">
                            Thanh toán khi nhận hàng
                            <input type="checkbox" id="payment"/>
                                <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="checkout__input__checkbox">
                        <label htmlFor="paypal">
                            Thanh toán qua thẻ
                            <input type="checkbox" id="paypal"/>
                                <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="site-btn">Mua hàng</button>
            </div>
        </div>
    )
}
export const Checkout = () => {
    return (
        <div>
            <PageLink/>
        <section className="checkout spad">
            <div className="container">
                <Coupon/>
                <div className="checkout__form">
                    <h4>Thông tin thanh toán</h4>
                    <form action="#">
                        <div className="row">
                            <InputInfor/>
                            <Bill/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </div>
    )
}
export default Checkout;