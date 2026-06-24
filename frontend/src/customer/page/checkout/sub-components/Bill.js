import React from "react";
import FormatCurrency from "../../../../utils/FormatCurrency";

const Bill = ({
    cartItems,
    paymentMethod,
    setPaymentMethod,
    isConfirmed,
    setIsConfirmed,
    isSubmitting,
    couponCode,
    setCouponCode,
    appliedPromotion,
    couponError,
    couponSuccess,
    handleApplyCoupon,
    handleRemoveCoupon
}) => {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product.currentPrice * item.quantity;
    }, 0);

    const discountPercent = appliedPromotion ? parseFloat(appliedPromotion.discountPercent) : 0;
    const discountValue = Math.round(totalPrice * (discountPercent / 100));
    const finalPrice = Math.max(0, totalPrice - discountValue);

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
                <div className="checkout__order__subtotal" style={{ borderBottom: "none" }}>
                    Tạm tính <span>{FormatCurrency(totalPrice)}</span>
                </div>
                {appliedPromotion && (
                    <div className="checkout__order__subtotal" style={{ borderTop: "none", color: "#e10c0c", paddingBottom: "15px", marginBottom: "15px" }}>
                        Mã giảm giá ({appliedPromotion.code} - {appliedPromotion.discountPercent}%) <span>-{FormatCurrency(discountValue)}</span>
                    </div>
                )}
                <div className="checkout__order__total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Tổng tiền{" "}
                    {appliedPromotion ? (
                        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <span style={{ textDecoration: "line-through", fontSize: "14px", color: "#999", fontWeight: "normal", float: "none", marginBottom: "4px" }}>
                                {FormatCurrency(totalPrice)}
                            </span>
                            <span style={{ fontSize: "20px", color: "#dd2222", fontWeight: "800", float: "none" }}>
                                {FormatCurrency(finalPrice)}
                            </span>
                        </span>
                    ) : (
                        <span>{FormatCurrency(totalPrice)}</span>
                    )}
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
                
                {/* Coupon Code Input Area */}
                <div className="checkout__coupon__section" style={{ marginTop: "15px", marginBottom: "15px", borderTop: "1px solid #e1e1e1", paddingTop: "15px" }}>
                    <p style={{ fontWeight: "700", marginBottom: "8px", color: "#1c1c1c" }}>Mã giảm giá</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Nhập mã giảm giá"
                            value={couponCode || ""}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={!!appliedPromotion}
                            style={{
                                flex: 1,
                                height: "42px",
                                border: "1px solid #ebebeb",
                                paddingLeft: "15px",
                                fontSize: "14px",
                                color: "#444",
                                borderRadius: "4px",
                                background: appliedPromotion ? "#f5f5f5" : "#fff",
                                transition: "all 0.3s ease"
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#00BFFF";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 191, 255, 0.15)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#ebebeb";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        />
                        {appliedPromotion ? (
                            <button
                                type="button"
                                onClick={handleRemoveCoupon}
                                style={{
                                    height: "42px",
                                    padding: "0 20px",
                                    backgroundColor: "#d9534f",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 2px 5px rgba(217, 83, 79, 0.2)"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "#c9302c";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(217, 83, 79, 0.3)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "#d9534f";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 2px 5px rgba(217, 83, 79, 0.2)";
                                }}
                            >
                                Hủy
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                style={{
                                    height: "42px",
                                    padding: "0 20px",
                                    backgroundColor: "#00BFFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 2px 5px rgba(0, 191, 255, 0.2)"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "#009acd";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 191, 255, 0.3)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "#00BFFF";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 191, 255, 0.2)";
                                }}
                            >
                                Áp dụng
                            </button>
                        )}
                    </div>
                    {couponError && (
                        <div style={{ color: "#dd2222", fontSize: "13px", marginTop: "6px", fontWeight: "600" }}>
                            {couponError}
                        </div>
                    )}
                    {couponSuccess && (
                        <div style={{ color: "#28a745", fontSize: "13px", marginTop: "6px", fontWeight: "600" }}>
                            {couponSuccess}
                        </div>
                    )}
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