import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ApiService from "../../../service/APIService";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const PaymentResult = () => {
    const navigate = useNavigate()
    const [popupInfo, setPopupInfo] = useState({message: '', type: '', visible: false});

    const query = useQuery();
    const vnpTransactionStatus = query.get('vnp_TransactionStatus');
    const vnpAmount = query.get('vnp_Amount')
    const orderId = query.get('vnp_TxnRef')
    console.log('Transaction status: ', vnpTransactionStatus)
    console.log('Amount: ', vnpAmount)
    console.log('Order id: ', orderId)

    const handleOnClick = (e) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    const updateStatus = async () => {
        const data = {
            "idStatus": 8,
        }
        try {
            const res = await new ApiService().sendData(`/orders/done-payment/${orderId}`, data)
            console.log('Response updated status: ', res)
        } catch (e) {
            console.log(e)
        }
    }

    const finishOrder = async () => {
        if (vnpTransactionStatus === '00') {
            console.log('Success')
            const successMessage = `Bạn đã thanh toán thánh công số tiền: ${(parseInt(vnpAmount) / 100).toLocaleString('vi-VN') + 'đ'}`
            setPopupInfo({message: successMessage, type: 'success', visible: true});
            await updateStatus("Paid");
        } else {
            console.log('error')
            const errorMessage = 'Thanh toán thất bại!'
            setPopupInfo({message: errorMessage, type: 'error', visible: true});
            await updateStatus("Canceled")
        }
    }

    useEffect(() => {
        finishOrder()
    }, []);

    return (
        <>
            <div
                className={`popup popup--icon -success js_success-popup ${popupInfo.visible && popupInfo.type === 'success' ? 'popup--visible' : ''}`}>
                <div className="popup__background"></div>
                <div className="popup__content">
                    <h3 className="popup__content__title">
                        Thành công
                    </h3>
                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                    <p>
                        <button className="button-popup button--success" data-for="js_success-popup"
                                onClick={e => handleOnClick(e)}>Về trang chủ
                        </button>
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
                                onClick={e => handleOnClick(e)}>Về trang chủ
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}
export default PaymentResult