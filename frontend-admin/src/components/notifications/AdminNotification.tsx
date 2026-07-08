import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Divider,
} from "@mui/material";

const API_URL = 
        // import.meta.env.VITE_API_URL ||
        // "https://cdwebbookstore-production.up.railway.app/api"||
        import.meta.env.LOCAL_API ||
        "http://localhost:8080/api";

const AdminNotification = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const admin = JSON.parse(localStorage.getItem("auth") || "{}");

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin?.token || ""}`,
    };

    const loadNotifications = async () => {
        if (!admin?.id) return;

        const res = await fetch(`${API_URL}/notifications/user/${admin.id}`, {
            headers,
        });

        const data = await res.json();
        setNotifications(data);
    };

    const markAsRead = async (id: number) => {
        await fetch(`${API_URL}/notifications/${id}/read`, {
            method: "PUT",
            headers,
        });

        loadNotifications();
    };

    const markAllAsRead = async () => {
        await fetch(`${API_URL}/notifications/user/${admin.id}/read-all`, {
            method: "PUT",
            headers,
        });

        loadNotifications();
    };

    useEffect(() => {
        loadNotifications();
    }, [admin?.id]);

    return (
        <Box p={3}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" fontWeight={700}>
                            Thông báo Admin
                        </Typography>

                        <Button variant="contained" onClick={markAllAsRead}>
                            Đánh dấu đã đọc tất cả
                        </Button>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {notifications.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 2,
                                mb: 2,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                backgroundColor: item.isRead ? "#fff" : "#eef5ff",
                            }}
                        >
                            <Box display="flex" justifyContent="space-between">
                                <Typography fontWeight={700}>{item.title}</Typography>

                                <Chip
                                    size="small"
                                    label={item.isRead ? "Đã đọc" : "Chưa đọc"}
                                    color={item.isRead ? "default" : "primary"}
                                />
                            </Box>

                            <Typography mt={1}>{item.message}</Typography>

                            <Typography variant="caption" color="text.secondary">
                                {item.createdAt}
                            </Typography>

                            <Box mt={1}>
                                {!item.isRead && (
                                    <Button size="small" onClick={() => markAsRead(item.id)}>
                                        Đánh dấu đã đọc
                                    </Button>
                                )}

                                {item.targetUrl && (
                                    <Button
                                        size="small"
                                        onClick={() => window.location.href = item.targetUrl}
                                    >
                                        Xem chi tiết
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    ))}

                    {notifications.length === 0 && (
                        <Typography>Chưa có thông báo nào</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminNotification;