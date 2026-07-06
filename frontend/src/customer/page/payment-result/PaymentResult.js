import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WindowPopup from "../../components/general/WindowPopup";

const PaymentResult = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    const [popup, setPopup] = React.useState({
        visible: true,
        title: "",
        message: "",
        type: ""
    });

    useEffect(() => {
        switch (status) {
            case "success":
                setPopup({
                    visible: true,
                    type: "success",
                    title: "Thanh toán thành công",
                    message: "Đơn hàng đã được thanh toán."
                });
                break;

            case "cancel":
                setPopup({
                    visible: true,
                    type: "warning",
                    title: "Đã hủy thanh toán",
                    message: "Bạn đã hủy giao dịch."
                });
                break;

            case "timeout":
                setPopup({
                    visible: true,
                    type: "warning",
                    title: "Hết thời gian thanh toán",
                    message: "Giao dịch đã hết thời gian chờ."
                });
                break;

            default:
                setPopup({
                    visible: true,
                    type: "error",
                    title: "Thanh toán thất bại",
                    message: "Vui lòng thử lại."
                });
        }

        const timer = setTimeout(() => {
            navigate("/user/order", { replace: true });
        }, 2500);

        return () => clearTimeout(timer);
    }, [status, navigate]);

    return (
        <WindowPopup
            visible={popup.visible}
            type={popup.type}
            title={popup.title}
            message={popup.message}
            onClose={() => navigate("/user/order", { replace: true })}
        />
    );
};

export default PaymentResult;