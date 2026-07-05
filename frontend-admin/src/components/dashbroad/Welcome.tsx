import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { useGetIdentity } from "react-admin";

const Welcome = () => {
    const { identity } = useGetIdentity();
    return (
        <Card
            sx={{mb: 2,}}
        >
            <CardContent>
                <Box>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Xin chào {identity?.fullName || "Admin"} 👋
                    </Typography>
                    <Typography color="text.secondary">
                        Chào mừng bạn quay lại trang quản trị BookShop.
                    </Typography>
                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        Quản lý sản phẩm, danh mục,
                        bài viết và người dùng tại đây.
                    </Typography>

                </Box>
            </CardContent>
        </Card>
    )
}
export default Welcome;