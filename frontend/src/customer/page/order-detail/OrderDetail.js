import Breadcrumb from "../../components/general/Breadcrumb";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../service/ApiService";
import formatCurrency from "../../../utils/FormatCurrency";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import "../../assets/css/style-order-detail.css";
import IconProgress from "./sub-components/IconProcess";

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

    const handleCancelOrder = () => {
        setPopupInfo({ message: 'Mock: Hủy đơn hàng thành công!', type: 'success', visible: true });
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
                        <span>Địa chỉ: </span>
                        <span>
                            {order.shippingAddress?.detailAdrs}, {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.province}
                        </span>
                    </div>
                    <div className="checkout__order__total">
                        Tổng tiền: {formatCurrency(order.orderTotal)}
                    </div>

                    {/* ACTION */}
                    {order.status?.id === 5 ? (
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
                                        <Link 
                                            // to={`/product-detail/${product.slug}`}
                                            // state={{
                                            //     title: product.title,
                                            //     categoryName: product.category?.name || product.category?.categoryName,
                                            //     categoryLink: `/product-list/${product.category?.id}`
                                            // }}
                                        >
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