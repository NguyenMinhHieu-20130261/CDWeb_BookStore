const Bill = () => {
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
export default Bill;