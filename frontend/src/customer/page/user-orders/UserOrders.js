import { Link,useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import React, { useEffect, useState } from "react";
import FormatCurrency from "../../../utils/FormatCurrency";
import api from "../../../service/ApiService";
import "../../assets/css/user-account.css";
import WindowPopup from "../../components/general/WindowPopup";

export const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        title: "",
        message: "",
        type: ""
    });
    const payment = searchParams.get("payment");

    const user = JSON.parse(localStorage.getItem("user"));

    const hidePopup = () => {
        setPopupInfo((prev) => ({
            ...prev,
            visible: false
        }));
    };

    useEffect(() => {
        const loadOrders = async () => {
            if (!user?.id) {
                setOrders([]);
                setLoading(false);
                return;
            }
            try {
                const data = await api.fetchData(`/orders/user`);
                setOrders(data);
            } catch (error) {
                console.log("Lỗi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, [user.id]);

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-tangerine';
            case 'confirmed':
                return 'text-secondary';
            case 'preparing':
                return 'text-primary-indigo';
            case 'shipping':
                return 'text-info';
            case 'delivered':
                return 'text-success';
            case 'cancelled':
                return 'text-danger';
            default:
                return '';
        }
    };
    //trạng thái payment
    useEffect(() => {
        if (!payment) return;
        switch (payment) {
            case "success":
                setPopupInfo({
                    visible: true,
                    type: "success",
                    title: "Thanh toán thành công",
                    message: "Đơn hàng của bạn đã được thanh toán."
                });
                break;

            case "cancel":
                setPopupInfo({
                    visible: true,
                    type: "warning",
                    title: "Đã hủy thanh toán",
                    message: "Bạn đã hủy giao dịch."
                });
                break;

            case "timeout":
                setPopupInfo({
                    visible: true,
                    type: "warning",
                    title: "Hết thời gian thanh toán",
                    message: "Giao dịch đã hết thời gian chờ."
                });
                break;

            default:
                setPopupInfo({
                    visible: true,
                    type: "error",
                    title: "Thanh toán thất bại",
                    message: "Vui lòng thử lại."
                });
        }
    }, [payment]);

    if (loading) {
        return <p>Đang tải đơn hàng...</p>;
    }
    return (
        <div>
            <Breadcrumb />
            <WindowPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                title={popupInfo.title}
                message={popupInfo.message}
                onClose={hidePopup}
            />
            <div className="container information mb-5 mt-5 px-0">
                <LeftSideBar />

                <div className="col-md-9 orders">
                    <div className="my-orders checkout__order">

                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Mã Đơn</th>
                                    <th>Tổng tiền</th>
                                    <th>Ngày đặt</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.orderCode}</td>

                                            <td>
                                                {FormatCurrency(order.orderTotal)}
                                            </td>

                                            <td>{order.orderDate}</td>

                                            <td>
                                                <span className={getStatusColorClass(order.status.slug)}>
                                                    {order.status.name}
                                                </span>
                                            </td>

                                            <td>
                                                <Link to={`/user/order/${order.id}`}>
                                                    Xem
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: "center" }}>
                                            Bạn chưa có đơn hàng nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrders;