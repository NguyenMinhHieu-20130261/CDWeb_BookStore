import Breadcrumb from "../../components/general/Breadcrumb";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import APIService from "../../../service/APIService";
import formatCurrency from "../../../utils/formatCurrency";
import axios from "axios";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";

export const OrderDetail = () => {
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [tempTotal, setTempTotal] = useState(0);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [promotion, setPromotion] = useState(0);
    const [progress, setProgress] = useState(1);
    const [popupInfo, setPopupInfo] = useState({message: '', type: '', visible: false});

    const updateProgress = (value) => {
        setProgress(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/orders/${id}`);
                setOrder(result);
                if (result.orderDetails) {
                    setOrderDetails(result.orderDetails);
                    let subTotal = 0;
                    result.orderDetails.forEach(item => {
                        subTotal += item.totalMoney;
                        setTempTotal(subTotal);
                    })
                }
                if (result.promotion) {
                    setPromotion(result.promotion.discount);
                }
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        fetchData();
    }, [orderDetails]);
    const shortenContent = (content, maxLength) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(content, 'text/html');
        const textContent = htmlDoc.body.textContent || "";
        if (textContent.length <= maxLength) {
            return textContent;
        } else {
            return textContent.substring(0, maxLength) + '...';
        }
    };
    useEffect(() => {
        if (order.status?.id === 1) {
            updateProgress(1);
        } else if (order.status?.id === 2) {
            updateProgress(2);
        } else if (order.status?.id === 3) {
            updateProgress(3);
        } else if (order.status?.id === 4) {
            updateProgress(4);
        } else if (order.status?.id === 5) {
            updateProgress(5);
        } else if (order.status?.id === 6) {
            updateProgress(0);
        }
    }, [order]);

    const handleOpenAskingPopup = (e) => {
        e.preventDefault();
        setPopupInfo({message: 'Bạn có chắc chắn muốn hủy đơn hàng này không?', type: 'question', visible: true});
    }
    const showPopupReview = (e) => {
        e.preventDefault();
        setPopupInfo({message: 'Hãy để lại đánh giá cho sản phẩm bạn đã mua', type: 'review', visible: true});
    }

    const handleCancelOrder = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_ENDPOINT_API}/orders/cancel/${order.id}`);
            const successMessage = 'Hủy đơn hàng thành công!';
            setPopupInfo({message: successMessage, type: 'success', visible: true});
        } catch (error) {
            if (error.response.status === 400) {
                setPopupInfo({message: error.response.data, type: 'error', visible: true});
            } else {
                setPopupInfo({message: 'Hủy đơn hàng thất bại!', type: 'error', visible: true});
            }
        }
    }
    const hidePopup = (e) => {
        e.preventDefault();
        setPopupInfo((prevInfo) => ({...prevInfo, visible: false}));
    };

    useEffect(() => {
        const buttons = Array.from(document.querySelectorAll('button.add_cart_btn'));
        buttons.forEach(button => button.addEventListener('click', handleOpenAskingPopup));
        return () => {
            buttons.forEach(button => button.removeEventListener('click', handleOpenAskingPopup));
        };
    }, []);

    return (
        <div>
            <Breadcrumb/>
            {progress === 0 ? <></> :
                <div id="progress-ship">
                    <div id="progress-bar" style={{width: `${(progress - 1) * 25}%`}}></div>
                    <ul id="progress-text">
                        {['Đang chờ xử lý', 'Đã xác nhận', 'Đang chuẩn bị hàng', 'Đang vận chuyển', 'Đã giao hàng'].map((step, index) => (
                            <li key={index}
                                className={`step ${index < progress - 1 ? 'active' : index === progress - 1 ? 'progress-step' : ''}`}>
                                <p className="ship-text">{step}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <div className="container information rounded bg-white mt-5 mb-5">
                <LeftSideBar/>
                <div className="col-md-9 checkout__order order-detail" style={{margin: "auto"}}>
                    <div className="col-lg-12 col-md-6">
                        <div className="checkout__order">
                            <h4 style={{textAlign: "center"}}>Chi tiết hóa đơn</h4>
                            <h6 style={{textAlign: 'right', marginBottom: '20px'}}>Mã đơn
                                hàng: {order.orderCode}</h6>
                            <table className="table table-sm fs--1 mb-0">
                                <thead>
                                <tr>
                                    <th className="sort align-middle pe-5" scope="col" data-sort="total-spent">
                                        Mã SP
                                    </th>
                                    <th className="sort align-middle pe-5" scope="col" data-sort="email">
                                        Tên Sản Phẩm
                                    </th>
                                    <th className="sort align-middle pe-5" scope="col" data-sort="email">
                                        Số Lượng
                                    </th>
                                    <th className="sort align-middle text-center" scope="col"
                                        data-sort="total-orders">
                                        Giá
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="list" id="table-latest-review-body">
                                {orderDetails.map(orderDetail => (<tr key={orderDetail.id}
                                                                      className="hover-actions-trigger btn-reveal-trigger position-static">
                                    <td className="fs--1 align-middle ps-0 py-3">{orderDetail.product?.detail?.productSku}</td>
                                    <td className="customer align-middle white-space-nowrap pe-5"
                                        title={orderDetail.product?.title}>
                                        {shortenContent(orderDetail.product?.title, 30)}
                                    </td>
                                    <td className="email align-middle white-space-nowrap pe-5"
                                        style={{textAlign: "center"}}>{orderDetail.quantity}
                                    </td>
                                    <td className="email align-middle white-space-nowrap pe-5"
                                        style={{textAlign: "right"}}>
                                        {formatCurrency(orderDetail.totalMoney)}
                                    </td>
                                </tr>))}
                                </tbody>
                            </table>
                            <div>Tạm tính: <span
                                style={{float: "right"}}>
                                        {formatCurrency(tempTotal)}
                                    </span></div>
                            {promotion ? <div>Áp dụng voucher: <span
                                style={{float: "right"}}>{promotion}%</span></div> : null}
                            {promotion > 0 ? <div>Giá được giảm: <span
                                style={{float: "right"}}>{formatCurrency(tempTotal * promotion / 100)}</span>
                            </div> : null}
                            <div style={{borderTop: "1px solid #e1e1e1"}}>Phí vận chuyển: <span
                                style={{float: "right"}}
                                id="fee">{order.shippingCost === 0 ? 'Miễn phí vận chuyển' : formatCurrency(order.shippingCost)}</span>
                            </div>
                            <input value="" id="provisional" style={{display: "none"}}/>
                            <div>Phương thức thanh toán: <span
                                style={{float: "right"}}>{order.paymentMethod}</span></div>
                            <div>Địa chỉ giao hàng: <span
                                style={{float: "right"}}>{order.shippingAddress?.wardCommune}, {order.shippingAddress?.countyDistrict}
                                , {order.shippingAddress?.provinceCity}                                        </span>
                            </div>
                            <div>Ghi chú đơn hàng: <span style={{float: "right"}}>{order.note}
                                        </span></div>
                            <div className="checkout__order__total text-right">Tổng tiền <span
                                id="tongtien"></span>
                                {formatCurrency(order.orderTotal)}
                            </div>
                            {order.status?.id === 6 ? <div className="site-btn" style={{
                                backgroundColor: "red",
                                borderRadius: "5px",
                                float: "right"
                            }}>
                                {order.status?.name}
                            </div> : order.status?.id === 5 ?
                                <>
                                    <button className="site-btn" style={{
                                        backgroundColor: "green",
                                        borderRadius: "5px",
                                        float: "right"
                                    }} disabled={true}>
                                        Đã giao hàng
                                    </button>
                                    <button className="site-btn" style={{
                                        backgroundColor: "orange",
                                        borderRadius: "5px",
                                        float: "right"
                                    }} onClick={showPopupReview}>
                                        Đánh giá sản phẩm
                                    </button>
                                </>
                                :
                                <button class="site-btn" style={{
                                    backgroundColor: "yellowgreen",
                                    borderRadius: "5px",
                                    float: "right"
                                }} onClick={handleOpenAskingPopup}>
                                    Hủy đơn hàng
                                </button>}

                            <div
                                className={`popup popup--icon -success js_success-popup ${popupInfo.visible && popupInfo.type === 'success' ? 'popup--visible' : ''}`}>
                                <div className="popup__background"></div>
                                <div className="popup__content">
                                    <h3 className="popup__content__title">
                                        Thành công
                                    </h3>
                                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                                    <p>
                                        <button className="button-popup button--success"
                                                data-for="js_success-popup"
                                                onClick={hidePopup}>Ẩn thông báo
                                        </button>
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`popup popup--icon -question js_question-popup ${popupInfo.visible && popupInfo.type === 'question' ? 'popup--visible' : ''}`}>
                                <div className="popup__background"></div>
                                <div className="popup__content">
                                    <h3 className="popup__content__title">
                                        Xác nhận
                                    </h3>
                                    <p>{popupInfo.message}</p>
                                    <p>
                                        <div style={{display: "flex", marginTop: "10px"}}>
                                            <button className="button-popup button--error"
                                                    data-for="js_success-popup" style={{marginRight: "20px"}}
                                                    onClick={hidePopup}>Hủy
                                            </button>
                                            <button className="button-popup button--warning"
                                                    data-for="js_success-popup"
                                                    onClick={handleCancelOrder}>Xác nhận
                                            </button>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`popup popup--icon -error js_error-popup ${popupInfo.visible && popupInfo.type === 'error' ? 'popup--visible' : ''}`}>
                                <div className="popup__background"></div>
                                <div className="popup__content">
                                    <h3 className="popup__content__title">
                                        Thất bại
                                    </h3>
                                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                                    <p>
                                        <button className="button-popup button--error" data-for="js_error-popup"
                                                onClick={hidePopup}>Ẩn thông báo
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`popup ${popupInfo.visible && popupInfo.type === 'review' ? 'popup--visible' : ''}`}>
                                <div className="popup__background"></div>
                                <div className="popup__content">
                                    <h3 className="popup__content__title">
                                        <strong>Đánh giá sản phẩm</strong>
                                    </h3>
                                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                                    <p>
                                        <div style={{width: "100%", height: "300px", overflow: "auto"}}>
                                            <table className="order-table" cellSpacing="0" cellPadding="1" border="1"
                                                   width="300">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        Mã SP
                                                    </th>
                                                    <th>
                                                        Tên Sản Phẩm
                                                    </th>
                                                    <th>
                                                        Giá
                                                    </th>
                                                    <th>
                                                        Đánh giá
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {orderDetails.map(orderDetail => (<tr key={orderDetail.id}>
                                                    <td style={{paddingTop: "18px"}}>{orderDetail.product?.detail?.productSku}</td>
                                                    <td style={{paddingTop: "18px"}}>
                                                        {shortenContent(orderDetail.product?.title, 30)}
                                                    </td>
                                                    <td style={{paddingTop: "18px"}}>
                                                        {formatCurrency(orderDetail.product?.currentPrice)}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/product-detail/${orderDetail.product?.detail.id}`}>
                                                            <button className="button-product button-link"
                                                                    style={{textAlign: "center"}}><strong>Đánh
                                                                giá</strong></button>
                                                        </Link>
                                                    </td>
                                                </tr>))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="button-popup button--error" data-for="js_error-popup"
                                                onClick={hidePopup}>Ẩn thông báo
                                        </button>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default OrderDetail;