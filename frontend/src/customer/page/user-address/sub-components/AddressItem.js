import React, {useState} from "react";
import WindowPopup from "../../../components/general/WindowPopup";
import { Link } from "react-router-dom";

const AddressItem = ({ address, onDelete, onSetDefault}) => {
    const [actionType, setActionType] = useState("");
    const [popupInfo,setPopupInfo] = useState({
        visible:false,
        type:"",
        title:"",
        message:""
    });
    const handleDelete = () => {
        setActionType("delete");
        setPopupInfo({
            visible: true,
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc muốn xóa địa chỉ này không?"
        });
    };
    const hidePopup = () => {
        setPopupInfo(prev=>({
            ...prev,
            visible:false
        }));
    };
    const handleSetDefault = () => {
        setActionType("default");
        setPopupInfo({
            visible: true,
            type: "question",
            title: "Xác nhận",
            message: "Bạn có muốn đặt địa chỉ này thành mặc định không?"
        });
    };
    const handleConfirm = async () => {
        if (actionType === "delete") {
            await onDelete(address.id);
            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Xóa địa chỉ thành công"
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);

            return;
        }

        if (actionType === "default") {
            await onSetDefault(address.id);
            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Đã đặt địa chỉ mặc định"
            });
            setTimeout(() => {
                window.location.reload();
            }, 1200);
            return;
        }
        setPopupInfo(prev => ({
            ...prev,
            visible: false
        }));
    };
    return (
        <>
            <WindowPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                title={popupInfo.title}
                message={popupInfo.message}
                onClose={hidePopup}
                onConfirm={handleConfirm}
            />
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
                        {!address.isDefault && (
                            <button
                                className="btn-set-default"
                                onClick={handleSetDefault}
                            >
                                Đặt mặc định
                            </button>   
                        )}
                        <Link className="btn-edit"
                            to={`/user/address/update/${address.id}`}
                        >
                            Sửa
                        </Link>
                        <button
                            className="btn-delete"
                            onClick={handleDelete}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default AddressItem;