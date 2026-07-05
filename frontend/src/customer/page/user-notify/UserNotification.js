import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import LoadingPage from "../../components/general/LoadingPage";
import api from "../../../service/ApiService";

const UserNotification = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user?.id) return;

            try {
                const data = await api.fetchData(
                    `/notifications/user/${user.id}`
                );
                setNotifications(data);
            } catch (error) {
                console.log("Load notifications error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user?.id]);

    const handleRead = async (id, targetUrl) => {
        try {
            await api.updateData(`/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, isRead: true } : item
                )
            );
        } catch (error) {
            console.log("Read notification error:", error);
        }
    };

    if (loading) return <LoadingPage />;

    return (
        <>
            <Breadcrumb />

            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar />

                <div
                    className="col-md-9 border"
                    style={{ borderRadius: "10px", padding: "20px" }}
                >
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h4>Thông báo của tôi</h4>
                    </div>

                    {notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex align-items-start border-bottom py-3"
                                style={{
                                    backgroundColor: item.isRead ? "#fff" : "#fff7f3",
                                    cursor: "pointer"
                                }}
                                onClick={() => handleRead(item.id, item.targetUrl)}
                            >
                                <div
                                    className="mr-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: item.isRead ? "#eee" : "#ffefe8",
                                        color: item.isRead ? "#777" : "#ee4d2d"
                                    }}
                                >
                                    <i className="fa-solid fa-bell"></i>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div className="d-flex justify-content-between">
                                        <strong>{item.title}</strong>

                                        {!item.isRead && (
                                            <span className="badge bg-danger text-white">
                                                Mới
                                            </span>
                                        )}
                                    </div>

                                    <p className="mb-1 mt-1">
                                        {item.message}
                                    </p>

                                    <small className="text-muted">
                                        {item.createdAt}
                                    </small>

                                    {item.targetUrl && (
                                        <div className="mt-2">
                                            <Link to={item.targetUrl}>
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            Bạn chưa có thông báo nào.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserNotification;