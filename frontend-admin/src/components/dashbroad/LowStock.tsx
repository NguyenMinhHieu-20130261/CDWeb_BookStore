import { Card, CardContent, Typography, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const LowStock = () => (
    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 1 }}>
        <CardContent sx={{ minHeight: 120 }}>
            <Box display="flex" gap={2} alignItems="center">
                <WarningIcon color="warning" fontSize="large" />
                <Box>
                    <Typography color="text.secondary">Sắp hết hàng</Typography>
                    <Typography variant="h5" fontWeight={700}>
                        5 sản phẩm
                    </Typography>
                    <Typography variant="caption">Cần nhập thêm kho</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export default LowStock;