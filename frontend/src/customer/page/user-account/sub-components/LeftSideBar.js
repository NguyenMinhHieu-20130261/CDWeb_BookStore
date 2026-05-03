import React from "react";
import SideBarItem from "./SideBarItem";

const LeftSideBar = () => {

    const information = {
        userInfo: {
            fullName: "Nguyễn Văn A",
            avatar: "https://via.placeholder.com/100"
        }
    };

    const fullName = information?.userInfo?.fullName || "Guest";

    return (
        <div className="col-md-3 d-block p-0 pr-6 left-side-bar">
            <div className="account-of">
                <img
                    src={information?.userInfo?.avatar}
                    alt="avatar"
                />
                <div className="info">
                    Tài khoản của
                    <strong>{fullName}</strong>
                </div>
            </div>

            <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                <SideBarItem
                    to="/user/account"
                    iconClassName="fa-solid fa-user"
                    itemName="Thông tin tài khoản"
                />
                <SideBarItem
                    to="/user/address"
                    iconClassName="fa-solid fa-location-dot"
                    itemName="Sổ địa chỉ"
                />
                <SideBarItem
                    to="/user/order"
                    iconClassName="fa-solid fa-clipboard"
                    itemName="Đơn hàng của tôi"
                />
            </ul>
        </div>
    );
};

export default LeftSideBar;