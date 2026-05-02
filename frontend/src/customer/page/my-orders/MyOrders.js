import {Link} from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";
import React, {useEffect, useState} from "react";
import APIService from "../../../service/APIService";
import formatCurrency from "../../../utils/formatCurrency";
import "../../assets/css/style-myaccount.css"

export const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/orders/user`);
            setOrders(result);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    useEffect(() => {
        fetchData();
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
    return (
        <div>
            <Breadcrumb/>
            <div className="container information mb-5 mt-5 px-0">
                <LeftSideBar/>
                <div className="col-md-9 orders">
                    <div className="my-orders checkout__order">
                        <table className="table table-sm fs--1 mb-0">
                            <thead>
                            <tr>
                                <th className="sort align-middle pe-5" scope="col" data-sort="total-spent"
                                >Mã Đơn
                                </th>
                                <th className="sort align-middle pe-5" scope="col" data-sort="email">
                                    Tổng tiền
                                </th>
                                <th className="sort align-middle pe-5" scope="col" data-sort="email">
                                    Ngày đặt
                                </th>
                                <th className="sort align-middle " scope="col" data-sort="total-orders">
                                    Trạng thái
                                </th>
                                <th className="sort align-middle " scope="col" data-sort="total-orders">
                                    Chi tiết
                                </th>
                            </tr>
                            </thead>
                            <tbody className="list" id="table-latest-review-body">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} style={{paddingTop: '30px'}}>
                                        <div className="loader"></div>
                                    </td>
                                </tr>
                            ) : (orders.length > 0 ? (orders.map(order => (
                                    <tr key={order.id}
                                        className="hover-actions-trigger btn-reveal-trigger position-static">
                                        <td className="fs--1 align-middle ps-0 py-3">
                                            <p className="mb-0 text-1100 fw-bold">{order.orderCode}</p>
                                        </td>
                                        <td className="customer align-middle white-space-nowrap pe-5">
                                            <p className="mb-0 ms-3 text-1100 fw-bold">{formatCurrency(order.orderTotal)}</p>
                                        </td>
                                        <td className="email align-middle white-space-nowrap pe-5">{order.orderDate}</td>
                                        <td className="email align-middle white-space-nowrap pe-5">
                                            <p className={`mb-0 ${getStatusColorClass(order.status?.slug)}`}>{order.status?.name}</p>
                                        </td>
                                        <td className="email align-middle white-space-nowrap pe-5">
                                            <Link className="fw-semi-bold text-1100"
                                                  to={`/user/order/${order.id}`}>Xem</Link>
                                        </td>
                                    </tr>))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{paddingTop: '30px', textAlign: "center"}}>Bạn chưa có đơn
                                        đặt hàng nào.
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyOrders;