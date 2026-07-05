import {
    Card,
    CardContent,
    Typography,
    Stack
} from "@mui/material";

const OrderStatus = () => {
    return (
        <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 1 }}>            
            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Trạng thái đơn hàng
                </Typography>


                <Stack spacing={1}>

                    <Typography>
                        🕒 Chờ xác nhận: 5
                    </Typography>

                    <Typography>
                        🚚 Đang giao: 12
                    </Typography>

                    <Typography>
                        ✔ Hoàn thành: 40
                    </Typography>

                </Stack>

            </CardContent>
        </Card>
    );
};

export default OrderStatus;