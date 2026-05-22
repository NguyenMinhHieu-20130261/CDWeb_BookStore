import React from "react";

const LoadingPage = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                width: "100%",
                minHeight: "300px"
            }}
        >
            <div className="text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <div className="mt-3">
                    Đang tải dữ liệu...
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;