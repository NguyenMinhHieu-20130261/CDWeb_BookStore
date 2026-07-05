import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";

export const LoginPage = () => {
    const login = useLogin();
    const notify = useNotify();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
        } catch (error) {
            notify("Sai tài khoản hoặc mật khẩu", { type: "error" });
        }
    };
    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" mb={3} textAlign="center">
                        Đăng nhập Admin
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Tên đăng nhập"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};