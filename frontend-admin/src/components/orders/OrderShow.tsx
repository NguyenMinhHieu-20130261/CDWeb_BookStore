import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    DateField,
    ArrayField,
    Datagrid,
    FunctionField,
    useRecordContext,
    TopToolbar,
    ListButton
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const OrderTitle = () => {
    const record = useRecordContext();
    return <span>Đơn hàng {record ? `#${record.id}` : ""}</span>;
};

const OrderShowActions = () => (
    <TopToolbar>
        <ListButton label="Quay lại" icon={<ArrowBackIcon />} />
    </TopToolbar>
);

const OrderSummary = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    const addr = record.shippingAddress || {};
    const addressStr = [addr.detailAdrs, addr.wardCommune, addr.countyDistrict, addr.provinceCity].filter(Boolean).join(", ");
    
    return (
        <Box sx={{ width: "100%", my: 0.5 }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body1">
                    <strong>Người mua:</strong> {addr.fullName || "Khách vãng lai"} {addr.phoneNumber ? `- SĐT: ${addr.phoneNumber}` : ""}
                </Typography>
                <Typography variant="body1">
                    <strong>Địa chỉ giao:</strong> {addressStr || "Chưa cập nhật"}
                </Typography>
                <Typography variant="body1">
                    <strong>Phương thức thanh toán:</strong> {record.paymentMethod || "N/A"}
                </Typography>
                {record.promotion && (
                    <Typography variant="body1">
                        <strong>Mã giảm giá:</strong> {record.promotion.code} ({record.promotion.discountPercent}%)
                    </Typography>
                )}
                {record.note && (
                    <Typography variant="body1">
                        <strong>Ghi chú:</strong> {record.note}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export const OrderShow = () => {
    return (
        <Show title={<OrderTitle />} actions={<OrderShowActions />}>
            <SimpleShowLayout>
                <TextField source="orderCode" label="Mã đơn hàng" />
                <DateField source="orderDate" label="Ngày đặt hàng" showTime />
                <TextField source="status.name" label="Trạng thái" />
                
                <Divider sx={{ my: 1 }} />
                
                <OrderSummary />
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Sản phẩm đã mua:
                </Typography>
                
                <ArrayField source="orderDetails" label={false}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="product.title" label="Tên sản phẩm" />
                        <FunctionField
                            label="Đơn giá"
                            render={(record: any) =>
                                record?.product?.currentPrice != null
                                    ? `${record.product.currentPrice.toLocaleString("vi-VN")} đ`
                                    : "0 đ"
                            }
                        />
                        <NumberField source="quantity" label="Số lượng" />
                        <FunctionField
                            label="Thành tiền"
                            render={(record: any) =>
                                record?.totalMoney != null
                                    ? `${record.totalMoney.toLocaleString("vi-VN")} đ`
                                    : "0 đ"
                            }
                        />
                    </Datagrid>
                </ArrayField>
                
                <FunctionField
                    label="Tổng thanh toán"
                    render={(record: any) => (
                        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mt: 1 }}>
                            {record?.orderTotal != null ? `${record.orderTotal.toLocaleString("vi-VN")} đ` : "0 đ"}
                        </Typography>
                    )}
                />
            </SimpleShowLayout>
        </Show>
    );
};
