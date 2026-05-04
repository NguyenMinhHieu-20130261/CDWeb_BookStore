import Breadcrumb from "../../components/general/Breadcrumb";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import formatCurrency from "../../../utils/formatCurrency";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";

export const OrderDetail = () => {

    const mockOrder = {
        id: 1,
        orderCode: "ORD123456",
        shippingCost: 30000,
        paymentMethod: "Thanh toán khi nhận hàng",
        note: "Giao giờ hành chính",
        orderTotal: 530000,
        status: { id: 3, name: "Đang chuẩn bị hàng" },
        shippingAddress: {
            wardCommune: "Phường Bến Nghé",
            countyDistrict: "Quận 1",
            provinceCity: "TP.HCM"
        }
    };

    const mockOrderDetails = [
        {
            id: 1,
            quantity: 2,
            totalMoney: 200000,
            product: {
                title: "Áo thun nam siêu đẹp chất lượng cao",
                currentPrice: 100000,
                detail: {
                    id: 101,
                    productSku: "SP001"
                }
            }
        },
        {
            id: 2,
            quantity: 1,
            totalMoney: 300000,
            product: {
                title: "Quần jean nam form slim fit",
                currentPrice: 300000,
                detail: {
                    id: 102,
                    productSku: "SP002"
                }
            }
        }
    ];

    const [order] = useState(mockOrder);
    const [orderDetails] = useState(mockOrderDetails);
    const [popupInfo, setPopupInfo] = useState({ message: '', type: '', visible: false });

    const tempTotal = orderDetails.reduce((sum, item) => sum + item.totalMoney, 0);

    const progress = order.status?.id === 6 ? 0 : order.status?.id;

    const shortenContent = (text, maxLength) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
    };

    // 👉 popup mock
    const handleOpenAskingPopup = (e) => {
        e.preventDefault();
        setPopupInfo({ message: 'Bạn có chắc chắn muốn hủy đơn hàng này không?', type: 'question', visible: true });
    };

    const handleCancelOrder = () => {
        setPopupInfo({ message: 'Mock: Hủy đơn hàng thành công!', type: 'success', visible: true });
    };

    const showPopupReview = () => {
        setPopupInfo({ message: 'Hãy để lại đánh giá cho sản phẩm', type: 'review', visible: true });
    };

    const hidePopup = () => {
        setPopupInfo(prev => ({ ...prev, visible: false }));
    };

    return (
        <div>
            <Breadcrumb />

            {/* PROGRESS */}
            {progress !== 0 && (
                <div id="progress-ship">
                    <div id="progress-bar" style={{ width: `${(progress - 1) * 25}%` }}></div>
                    <ul id="progress-text">
                        {['Đang chờ xử lý', 'Đã xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao'].map((step, i) => (
                            <li key={i} className={`step ${i < progress - 1 ? 'active' : i === progress - 1 ? 'progress-step' : ''}`}>
                                <p>{step}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="container information mt-5 mb-5">
                <LeftSideBar />

                <div className="col-md-9 checkout__order">

                    <h4 style={{ textAlign: "center" }}>Chi tiết hóa đơn</h4>
                    <h6 style={{ textAlign: 'right' }}>Mã đơn: {order.orderCode}</h6>

                    {/* TABLE */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã SP</th>
                                <th>Tên</th>
                                <th>SL</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product.detail.productSku}</td>
                                    <td>{shortenContent(item.product.title, 30)}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.totalMoney)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* SUMMARY */}
                    <div>Tạm tính: <span style={{ float: "right" }}>{formatCurrency(tempTotal)}</span></div>
                    <div>Phí ship: <span style={{ float: "right" }}>{formatCurrency(order.shippingCost)}</span></div>
                    <div>Thanh toán: <span style={{ float: "right" }}>{order.paymentMethod}</span></div>
                    <div>Địa chỉ: <span style={{ float: "right" }}>
                        {order.shippingAddress.wardCommune}, {order.shippingAddress.countyDistrict}, {order.shippingAddress.provinceCity}
                    </span></div>

                    <div className="checkout__order__total">
                        Tổng tiền: {formatCurrency(order.orderTotal)}
                    </div>

                    {/* ACTION */}
                    {order.status.id === 5 ? (
                        <>
                            <button className="site-btn" disabled>Đã giao</button>
                            <button className="site-btn" onClick={showPopupReview}>Đánh giá</button>
                        </>
                    ) : (
                        <button className="site-btn" onClick={handleOpenAskingPopup}>
                            Hủy đơn
                        </button>
                    )}

                    {/* POPUP SUCCESS */}
                    {popupInfo.visible && popupInfo.type === 'success' && (
                        <div className="popup popup--visible">
                            <div className="popup__content">
                                <h3>Thành công</h3>
                                <p>{popupInfo.message}</p>
                                <button onClick={hidePopup}>Đóng</button>
                            </div>
                        </div>
                    )}

                    {/* POPUP QUESTION */}
                    {popupInfo.visible && popupInfo.type === 'question' && (
                        <div className="popup popup--visible">
                            <div className="popup__content">
                                <h3>Xác nhận</h3>
                                <p>{popupInfo.message}</p>
                                <button onClick={hidePopup}>Hủy</button>
                                <button onClick={handleCancelOrder}>Xác nhận</button>
                            </div>
                        </div>
                    )}

                    {/* POPUP REVIEW */}
                    {popupInfo.visible && popupInfo.type === 'review' && (
                        <div className="popup popup--visible">
                            <div className="popup__content">
                                <h3>Đánh giá</h3>
                                {orderDetails.map(item => (
                                    <div key={item.id}>
                                        {item.product.title}
                                        <Link to={`/product-detail/${item.product.detail.id}`}>
                                            <button>Đánh giá</button>
                                        </Link>
                                    </div>
                                ))}
                                <button onClick={hidePopup}>Đóng</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default OrderDetail;