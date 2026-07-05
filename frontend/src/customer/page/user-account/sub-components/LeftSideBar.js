import React from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import api from "../../../../service/ApiService";

const LeftSideBar = () => {
    const [unread, setUnread] = React.useState(0);
    const user = useSelector((state) => state.auth.user);

    const fullName =
        user?.userInformation?.fullName ||
        user?.username ||
        "Người dùng";

    const avatar =
        user?.userInformation?.avatar ||
        "https://i.pravatar.cc/100";

    React.useEffect(() => {
        const loadUnread = async () => {
            if (!user?.id) return;

            try {
                const count = await api.fetchData(
                    `/notifications/user/${user.id}/unread-count`
                );
                setUnread(count);
            } catch (e) {
                console.log(e);
            }
        };

        loadUnread();
    }, [user]);
    return (
        <div className="col-md-3 d-block p-0 pr-6 left-side-bar">
            <div className="account-of">
                <img
                    src={avatar}
                    alt="avatar"
                />
                <div className="info">
                    Tài khoản của
                    <strong>{fullName}</strong>
                </div>
            </div>

            <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                <SideBarItem
                    to="/user/info"
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
                <SideBarItem
                    to="/user/notification"
                    iconClassName="fa-solid fa-bell"
                    itemName="Thông báo"
                    badge={unread}
                />
            </ul>
        </div>
    );
};

export default LeftSideBar;