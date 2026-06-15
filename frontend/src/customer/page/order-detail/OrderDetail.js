import Breadcrumb from "../../components/general/Breadcrumb";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../service/ApiService";
import formatCurrency from "../../../utils/FormatCurrency";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import "../../assets/css/style-order-detail.css";
import IconProgress from "./sub-components/IconProcess";
import WindowPopup from "../../components/general/WindowPopup";

export const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const [popupInfo, setPopupInfo] = useState({ message: '', type: '', visible: false });

    useEffect(() => {
        const loadOrderDetail = async () => {
            try {
                const data = await api.fetchData(`/orders/detail/${orderId}`);
                setOrder(data);
                setOrderDetails(data.orderDetails || []);
            } catch (error) {
                console.log("Lỗi lấy chi tiết đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        loadOrderDetail();
    }, [orderId]);
    const shortenContent = (text, maxLength) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
    };

    const handleOpenAskingPopup = (e) => {
        e.preventDefault();
        setPopupInfo({ message: 'Bạn có chắc chắn muốn hủy đơn hàng này không?', type: 'question', visible: true });
    };

    const handleCancelOrder = async () => {
        try {
            await api.updateData(`/orders/cancel/${orderId}`);
            const data = await api.fetchData(`/orders/detail/${orderId}`);
            setOrder(data);
            setOrderDetails(data.orderDetails || []);
            setPopupInfo({ message: 'Hủy đơn hàng thành công!', type: 'success', visible: true });
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
            setPopupInfo({
                message: error.response?.data || 'Đã xảy ra lỗi khi hủy đơn hàng',
                type: 'error',
                visible: true
            });
        }
    };

    const showPopupReview = () => {
        setPopupInfo({ message: 'Hãy để lại đánh giá cho sản phẩm', type: 'review', visible: true });
    };

    const hidePopup = () => {
        setPopupInfo(prev => ({ ...prev, visible: false }));
    };
    if (loading) {
        return <p>Đang tải chi tiết đơn hàng...</p>;
    }
    if (!order) {
        return <p>Không tìm thấy đơn hàng</p>;
    }
    const tempTotal = orderDetails.reduce(
        (sum, item) => sum + item.totalMoney,
        0
    );
    return (
        <div>
            <Breadcrumb />
            <IconProgress statusId={order.status?.id}/>

            <div className="container information mt-5 mb-5">
                <LeftSideBar />

                <div className="col-md-9 checkout__order">

                    <h4 style={{ textAlign: "center" }}>Chi tiết hóa đơn</h4>
                    <h6 style={{ textAlign: 'right' }}>Mã đơn: {order.orderCode} | Ngày đặt: {order.orderDate}</h6>

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
                                    <td>{item.product?.detail?.productSku}</td>
                                    <td>{shortenContent(item.product?.title, 30)}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.totalMoney)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* SUMMARY */}
                    <div>Tạm tính: 
                        <span 
                        style={{ float: "right" }}>{formatCurrency(tempTotal)}
                        </span>
                    </div>
                    <div>Phí ship: 
                        <span style={{ float: "right" }}>{formatCurrency(order.shippingCost)}</span>
                    </div>
                    <div>Thanh toán: 
                        <span style={{ float: "right" }}>{order.paymentMethod}</span>
                    </div>
                    <div className="order-summary-row">
                        <strong>Địa chỉ giao hàng: </strong>
                        <span>
                            {order.shippingAddress?.detailAdrs}, {order.shippingAddress?.wardCommune}, {order.shippingAddress?.countyDistrict}, {order.shippingAddress?.provinceCity}
                        </span>
                    </div>
                    <div className="checkout__order__total">
                        Tổng tiền: {formatCurrency(order.orderTotal)}
                    </div>

                    {/* STATUS DETAILS */}
                    <div className="order-summary-row" style={{ marginTop: "15px", borderTop: "1px solid #ebebeb", paddingTop: "15px" }}>
                        <strong>Trạng thái thanh toán: </strong>
                        <span>
                            {order.status?.id === 6 ? (
                                <span className="text-danger" style={{ fontWeight: "bold" }}>Đã hủy</span>
                            ) : (order.status?.id === 5 || order.paymentMethod?.toLowerCase().includes("thẻ") || order.paymentMethod?.toLowerCase().includes("paypal") ? (
                                <span className="text-success" style={{ fontWeight: "bold" }}>Đã thanh toán</span>
                            ) : (
                                <span className="text-warning" style={{ fontWeight: "bold" }}>Chưa thanh toán (COD)</span>
                            ))}
                        </span>
                    </div>
                    <div className="order-summary-row" style={{ marginBottom: "15px" }}>
                        <strong>Trạng thái giao hàng: </strong>
                        <span>
                            {order.status?.id === 5 ? (
                                <span className="text-success" style={{ fontWeight: "bold" }}>Đã giao hàng</span>
                            ) : order.status?.id === 6 ? (
                                <span className="text-danger" style={{ fontWeight: "bold" }}>Đã hủy</span>
                            ) : order.status?.id === 4 ? (
                                <span className="text-info" style={{ fontWeight: "bold" }}>Đang giao hàng</span>
                            ) : (
                                <span className="text-secondary" style={{ fontWeight: "bold" }}>Chưa giao hàng (Đang chuẩn bị)</span>
                            )}
                        </span>
                    </div>

                    {/* ACTION */}
                    {order.status?.id === 5 ? (
                        <>
                            <button className="site-btn" disabled>Đã giao</button>
                            <button className="site-btn" onClick={showPopupReview}>Đánh giá</button>
                        </>
                    ) : order.status?.id === 6 ? (
                        <button className="site-btn" disabled style={{ backgroundColor: "#ccc", cursor: "not-allowed", border: "none" }}>
                            Đã hủy
                        </button>
                    ) : (
                        <button className="site-btn" onClick={handleOpenAskingPopup}>
                            Hủy đơn
                        </button>
                    )}
                    {/* SUCCESS */}
                    <WindowPopup
                        visible={popupInfo.visible && popupInfo.type === "success"}
                        type="success"
                        title="Thành công"
                        message={popupInfo.message}
                        onClose={hidePopup}
                    />
                    {/* CONFIRM */}
                    <WindowPopup
                        visible={popupInfo.visible && popupInfo.type === "question"}
                        type="question"
                        title="Xác nhận"
                        message={popupInfo.message}
                        onClose={hidePopup}
                        onConfirm={handleCancelOrder}
                    />
                    {/* REVIEW */}
                    <WindowPopup
                        visible={popupInfo.visible && popupInfo.type === "review"}
                        type="review"
                        title="Đánh giá"
                        message={popupInfo.message}
                        onClose={hidePopup}
                    >
                        {orderDetails.map(item => (
                            <div key={item.id} className="review-popup-item">
                                <span>{item.product?.title}</span>

                                <Link to={`/product-detail/${item.product?.slug}`}>
                                    <button type="button" className="site-btn">
                                        Đánh giá
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </WindowPopup>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;