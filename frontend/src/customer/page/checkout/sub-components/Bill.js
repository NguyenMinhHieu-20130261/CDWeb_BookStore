import React from "react";
import FormatCurrency from "../../../../utils/FormatCurrency";

const Bill = ({
    cartItems,
    paymentMethod,
    setPaymentMethod,
    isConfirmed,
    setIsConfirmed,
    isSubmitting
}) => {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product.currentPrice * item.quantity;
    }, 0);

    return (
        <div className="col-lg-4 col-md-6">
            <div className="checkout__order">
                <h4>Hóa đơn của bạn</h4>
                <div className="checkout__order__products">
                    Sản phẩm <span>Tổng tiền</span>
                </div>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} style={{ display: "flex", justifyContent: "between", alignItems: "center" }}>
                            <span style={{ maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.product.title} x {item.quantity}
                            </span>
                            <span style={{ float: "right" }}>
                                {FormatCurrency(item.product.currentPrice * item.quantity)}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="checkout__order__subtotal">
                    Tạm tính <span>{FormatCurrency(totalPrice)}</span>
                </div>
                <div className="checkout__order__total">
                    Tổng tiền <span>{FormatCurrency(totalPrice)}</span>
                </div>
                
                <div className="checkout__input__checkbox">
                    <label htmlFor="acc-or">
                        <p style={{ margin: 0 }}>Xác nhận thông tin<span>*</span></p>
                        <input
                            type="checkbox"
                            id="acc-or"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                    Tôi xác nhận thông tin đơn hàng và những thông tin tôi đã nhập là chính xác.
                </p>

                <div className="Checkout-container" style={{ marginTop: "15px" }}>
                    <div className="checkout__input__checkbox">
                        <label htmlFor="payment">
                            Thanh toán khi nhận hàng
                            <input
                                type="checkbox"
                                id="payment"
                                checked={paymentMethod === "Thanh toán khi nhận hàng"}
                                onChange={() => setPaymentMethod("Thanh toán khi nhận hàng")}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="checkout__input__checkbox">
                        <label htmlFor="paypal">
                            Thanh toán qua thẻ
                            <input
                                type="checkbox"
                                id="paypal"
                                checked={paymentMethod === "Thanh toán qua thẻ"}
                                onChange={() => setPaymentMethod("Thanh toán qua thẻ")}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                
                <button
                    type="submit"
                    className="site-btn"
                    disabled={isSubmitting || cartItems.length === 0}
                    style={{ width: "100%", marginTop: "15px" }}
                >
                    {isSubmitting ? "Đang xử lý..." : "Mua hàng"}
                </button>
            </div>
        </div>
    );
};

export default Bill;