import React from "react";

const IconProgress = ({ statusId }) => {
    const progress = statusId === 6 ? 0 : statusId;
    const steps = [
        {
            text: "Đang chờ xử lý",
            icon: "fa-solid fa-receipt"
        },
        {
            text: "Đã xác nhận",
            icon: "fa-solid fa-circle-check"
        },
        {
            text: "Đang chuẩn bị",
            icon: "fa-solid fa-box"
        },
        {
            text: "Đang giao",
            icon: "fa-solid fa-truck-fast"
        },
        {
            text: "Đã giao",
            icon: "fa-solid fa-house-circle-check"
        }
    ];
    if (progress === 0) {
        return (
            <div className="order-cancel">
                <i className="fa-solid fa-ban"></i>
                <span>Đơn hàng đã hủy</span>
            </div>
        );
    }
    return (
        <div id="progress-ship">
            <div
                id="progress-bar"
                style={{
                    width: `${(progress - 1) * 25}%`
                }}
            >
            </div>
            <ul id="progress-text">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className={`
                            step
                            ${index < progress - 1 ? "active" : ""}
                            ${index === progress - 1 ? "progress-step" : ""}
                        `}
                    >
                        <div className="progress-icon">
                            <i className={step.icon}></i>
                        </div>
                        <p>{step.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default IconProgress;