import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../service/ApiService";

const getIcon = (type) => {
    switch (type) {
        case "ORDER":
            return "fa-solid fa-cart-shopping";
        case "PROMOTION":
            return "fa-solid fa-tag";
        case "INVENTORY":
            return "fa-solid fa-box";
        case "USER":
            return "fa-solid fa-user";
        case "ADMIN":
            return "fa-solid fa-shield";
        default:
            return "fa-solid fa-bell";
    }
};

const timeAgo = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const diff = Math.floor((new Date() - date) / 1000);

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ`;
    return `${Math.floor(diff / 86400)} ngày`;
};

const NotificationDropdown = ({ user }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("all");

    const loadNotifications = async () => {
        if (!user?.id) {
            setNotifications([]);
            setUnread(0);
            return;
        }

        try {
            const list = await api.fetchData(`/notifications/user/${user.id}`);
            const count = await api.fetchData(`/notifications/user/${user.id}/unread-count`);

            setNotifications(Array.isArray(list) ? list : []);
            setUnread(count || 0);
        } catch (error) {
            console.log("Load notification error:", error);
        }
    };

    useEffect(() => {
        loadNotifications();

        const timer = setInterval(loadNotifications, 10000);
        return () => clearInterval(timer);
    }, [user?.id]);

    const handleRead = async (item) => {
        try {
            if (!item.isRead) {
                await api.updateData(`/notifications/${item.id}/read`);
                setUnread(prev => Math.max(prev - 1, 0));

                setNotifications(prev =>
                    prev.map(n =>
                        n.id === item.id ? { ...n, isRead: true } : n
                    )
                );
            }

            if (item.targetUrl) {
                navigate(item.targetUrl);
            } else {
                navigate("/user/notification");
            }

            setOpen(false);
        } catch (error) {
            console.log("Read notification error:", error);
        }
    };

    const handleReadAll = async () => {
        try {
            await api.updateData(`/notifications/user/${user.id}/read-all`);
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnread(0);
        } catch (error) {
            console.log("Read all notification error:", error);
        }
    };

    const filteredNotifications =
        filter === "unread"
            ? notifications.filter(n => !n.isRead)
            : notifications;

    return (
        <div
            className="notify-wrapper d-block nav-link text-dark ml-2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="notify-bell-area">
                {unread > 0 && (
                    <span className="notify-badge">
                        {unread > 99 ? "99+" : unread}
                    </span>
                )}

                <i className="fa-solid fa-bell font-size-5 text-dark" />

                <div className="ml-2 d-none d-lg-block text-dark">
                    <span className="text-secondary-gray-1090 font-size-1">
                        Thông báo
                    </span>
                    <div>{unread > 0 ? `${unread} chưa đọc` : "Không có"}</div>
                </div>
            </div>

            {open && (
                <div className="notify-dropdown">
                    <div className="notify-header">
                        <h4>Thông báo</h4>
                        <button onClick={handleReadAll}>Đọc tất cả</button>
                    </div>

                    <div className="notify-tabs">
                        <button
                            className={filter === "all" ? "active" : ""}
                            onClick={() => setFilter("all")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={filter === "unread" ? "active" : ""}
                            onClick={() => setFilter("unread")}
                        >
                            Chưa đọc
                        </button>
                    </div>

                    <div className="notify-section-title">Mới</div>

                    <div className="notify-list">
                        {filteredNotifications.length === 0 ? (
                            <div className="notify-empty">
                                Không có thông báo
                            </div>
                        ) : (
                            filteredNotifications.slice(0, 6).map(item => (
                                <div
                                    key={item.id}
                                    className={`notify-item ${!item.isRead ? "unread" : ""}`}
                                    onClick={() => handleRead(item)}
                                >
                                    <div className="notify-avatar">
                                        <i className={getIcon(item.type)} />
                                    </div>

                                    <div className="notify-content">
                                        <div className="notify-text">
                                            <b>{item.title}</b>
                                            <span> {item.message}</span>
                                        </div>
                                        <div className="notify-time">
                                            {timeAgo(item.createdAt)}
                                        </div>
                                    </div>

                                    {!item.isRead && <div className="notify-dot" />}
                                </div>
                            ))
                        )}
                    </div>

                    <Link
                        to="/user/notification"
                        className="notify-footer"
                        onClick={() => setOpen(false)}
                    >
                        Xem thông báo trước đó
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;