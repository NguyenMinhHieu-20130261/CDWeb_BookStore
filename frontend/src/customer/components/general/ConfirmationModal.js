import React from "react";

const ConfirmationModal = ({isOpen, onCancel, onConfirm}) => {
    if (!isOpen) return null;
    return (
        <div className="modal d-flex">
            <div className="modal-contents">
                <h2>Xác nhận xóa</h2>
                <p>Bạn có chắc chắn muốn xóa không?</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Xác nhận</button>
                    <button onClick={onCancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmationModal;