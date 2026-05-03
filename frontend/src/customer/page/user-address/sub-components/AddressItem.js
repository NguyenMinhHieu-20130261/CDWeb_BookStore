import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../components/general/ConfirmationModal";

const AddressItem = ({ address, updateAddresses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 👉 Mock delete
    const deleteAddress = () => {
        console.log("Mock delete address:", address.id);
        updateAddresses && updateAddresses();
    };

    // 👉 Mock set default
    const setDefaultAddress = () => {
        console.log("Mock set default:", address.id);
        updateAddresses && updateAddresses();
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        deleteAddress();
        setIsModalOpen(false);
    };

    return (
        <div className="address-item-container">
            <div className="address-item">

                {/* HEADER */}
                <div className="d-flex justify-content-between" style={{ marginBottom: "4px" }}>
                    <div className="address-card_header">
                        <span className="name-span">
                            <div className="user-name">{address.fullName}</div>
                        </span>

                        <div className="separate"></div>

                        <div className="phone-number d-flex align-items-center">
                            {address.phoneNumber}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end" style={{ flexBasis: "40px" }}>
                        <Link to={`/user/address/update/${address.id}`}>
                            <button className="function-button update-button">
                                Cập nhật
                            </button>
                        </Link>

                        {!address.default && (
                            <button
                                onClick={handleDeleteClick}
                                className="function-button delete-button"
                            >
                                Xóa
                            </button>
                        )}

                        <ConfirmationModal
                            isOpen={isModalOpen}
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="address-card_content d-flex justify-content-between" style={{ marginBottom: "4px" }}>
                    <div className="flex-grow-1 d-flex" style={{ overflowX: "hidden", marginRight: "8px" }}>
                        <div className="address-content">
                            <div>{address.hnumSname}</div>
                            <div>
                                {address.wardCommune}, {address.countyDistrict}, {address.provinceCity}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end" style={{ paddingTop: "4px", flexBasis: "40px" }}>
                        <button
                            onClick={setDefaultAddress}
                            className="set-default-button"
                            disabled={address.default}
                        >
                            Thiết lập mặc định
                        </button>
                    </div>
                </div>

                {/* BADGE */}
                {address.default && (
                    <div className="d-flex align-items-center">
                        <span className="span-default">Mặc định</span>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddressItem;