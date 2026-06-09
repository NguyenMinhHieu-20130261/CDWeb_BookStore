import React from "react";
import { Link } from "react-router-dom";

const AddressItem = ({ address,onDelete }) => {
    console.log("ADDRESS OBJECT:", address);
    console.log("ADDRESS ID:", address?.id);
    const handleDelete =()=>{
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa địa chỉ này không?");
        if (!confirmDelete) return;
        onDelete(address.id);
    }
    return (
        <div className="address-item-container">
            <div className="address-item">

                {/* HEADER */}
                <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "4px" }}
                >
                    <div className="address-card_header">
                        <span className="name-span">
                            <div className="user-name">
                                {address.fullName}
                            </div>
                        </span>
                        <div className="separate"></div>
                        <div className="phone-number d-flex align-items-center">
                            {address.phoneNumber}
                        </div>
                    </div>

                </div>
                {/* CONTENT */}
                <div
                    className="address-card_content"
                    style={{ marginBottom: "4px" }}
                >
                    <div className="address-content">
                        <div>
                            {address.detailAdrs},
                        </div>
                        <div>
                            {address.wardCommune},
                            {" "}
                            {address.countyDistrict},
                            {" "}
                            {address.provinceCity}
                        </div>
                    </div>
                </div>
                {/* DEFAULT BADGE */}
                {address.isDefault && (
                    <div className="d-flex align-items-center">
                        <span className="span-default">
                            Mặc định
                        </span>
                    </div>
                )}
                 <div className="address-actions">
                    <Link className="btn-edit"
                        to={`/user/address/update/${address.id}`}
                    >
                        ✏️ Sửa
                    </Link>
                    <button className="btn-delete"
                        onClick={handleDelete}
                    >
                        🗑 Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressItem;