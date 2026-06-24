import { Link } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import React, { useEffect, useState } from "react";
import FormatCurrency from "../../../utils/FormatCurrency";
import api from "../../../service/ApiService";
import "../../assets/css/user-account.css";

export const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const loadOrders = async () => {
            if (!user?.id) {
                setOrders([]);
                setLoading(false);
                return;
            }
            try {
                const data = await api.fetchData(`/orders/user/${user.id}`);
                setOrders(data);
            } catch (error) {
                console.log("Lỗi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

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
    if (loading) {
        return <p>Đang tải đơn hàng...</p>;
    }
    return (
        <div>
            <Breadcrumb />
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