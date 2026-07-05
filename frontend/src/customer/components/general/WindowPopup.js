import React from "react";
import "../../assets/css/style-general.css";

const WindowPopup = ({
        visible,
        type = "info",
        title,
        message,
        onClose,
        onConfirm,
        children
    }) => {
    if (!visible) return null;

    return (
        <div className="window-popup-overlay">
            <div className={`window-popup window-popup--${type}`}>
                <button
                    className="window-popup__close"
                    onClick={onClose}
                    type="button"
                >
                </button>

                <h3>{title}</h3>

                {message && <p>{message}</p>}

                {children}

                <div className="window-popup__actions">
                    {onConfirm && (
                        <button
                            type="button"
                            className="site-btn"
                            onClick={onConfirm}
                        >
                            Xác nhận
                        </button>
                    )}

                    <button
                        type="button"
                        className="site-btn popup-btn-cancel"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WindowPopup;