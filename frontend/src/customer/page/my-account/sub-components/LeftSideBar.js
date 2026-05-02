import React, {useEffect, useState} from "react";
import SideBarItem from "./SideBarItem";
import APIService from "../../../../service/APIService";

const LeftSideBar = (props) => {
    const [information, setInformation] = useState({});
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user ? user.token : null;
    const fullName = information?.userInfo?.fullName || user?.username || 'Guest';

    useEffect(() => {
        const fetchInformation = async () => {
            const result = await new APIService(token).fetchData(`${process.env.REACT_APP_ENDPOINT_API}/user/info`);
            setInformation(result);
        }
        fetchInformation();
    }, [props.update]);

    return (
        <div className="col-md-3 d-block p-0 pr-6 left-side-bar">
            <div className="account-of">
                <img
                    src={information?.userInfo?.avatar}
                    alt="avatar"/>
                <div className="info">
                    Tài khoản của
                    <strong>{fullName}</strong>
                </div>
            </div>
            <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                <SideBarItem to="/user/account" iconClassName="fa-solid fa-user" itemName="Thông tin tài khoản"/>
                <SideBarItem to="/user/address" iconClassName="fa-solid fa-location-dot" itemName="Sổ địa chỉ"/>
                <SideBarItem to="/user/order" iconClassName="fa-solid fa-clipboard" itemName="Đơn hàng của tôi"/>
            </ul>
        </div>
    );
}
export default LeftSideBar;
