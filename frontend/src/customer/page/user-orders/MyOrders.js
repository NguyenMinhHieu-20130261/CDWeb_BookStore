import { Link } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";
import React, { useState } from "react";
import formatCurrency from "../../../utils/formatCurrency";
import "../../assets/css/style-myaccount.css";

export const MyOrders = () => {

    // 👉 Mock data
    const [orders] = useState([
        {
            id: 1,
            orderCode: "ORD001",
            orderTotal: 500000,
            orderDate: "2026-05-01",
            status: { name: "Đang xử lý", slug: "pending" }
        },
        {
            id: 2,
            orderCode: "ORD002",
            orderTotal: 750000,
            orderDate: "2026-05-02",
            status: { name: "Đã giao", slug: "delivered" }
        },
        {
            id: 3,
            orderCode: "ORD003",
            orderTotal: 300000,
            orderDate: "2026-05-03",
            status: { name: "Đã hủy", slug: "cancelled" }
        }
    ]);

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
                                                {formatCurrency(order.orderTotal)}
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

export default MyOrders;