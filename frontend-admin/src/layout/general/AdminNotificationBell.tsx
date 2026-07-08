import { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const API_URL = 
        import.meta.env.VITE_API_URL ||
        "https://cdwebbookstore-production.up.railway.app/api"
        //|| import.meta.env.LOCAL_API ||
        // "http://localhost:8080/api"
        ;

const AdminNotificationBell = () => {
    const [unread, setUnread] = useState(0);
    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("auth") || "{}");

    useEffect(() => {
        const loadUnread = async () => {
            if (!admin?.id) return;

            const res = await fetch(
                `${API_URL}/notifications/user/${admin.id}/unread-count`,
                {
                    headers: {
                        Authorization: `Bearer ${admin?.token || ""}`,
                    },
                }
            );

            const data = await res.json();
            setUnread(data);
        };

        loadUnread();
        const interval = setInterval(loadUnread, 10000);

        return () => clearInterval(interval);
    }, [admin?.id]);

    return (
        <IconButton color="inherit" onClick={() => navigate("/admin-notifications")}>
            <Badge badgeContent={unread} color="error">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
};

export default AdminNotificationBell;