import {
    ArrayField,
    Datagrid,
    DateField,
    FunctionField,
    NumberField,
    Show,
    TextField,
    TopToolbar,
    EditButton,
    useRecordContext,
} from "react-admin";
import * as React from "react";
import { Order } from "../../type";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const OrderTitle = () => {
    const record = useRecordContext<Order>();
    if (!record) return null;
    return <span>{record.orderCode}</span>;
};

const OrderShowActions = () => (
    <TopToolbar>
        <EditButton label="Cập nhật trạng thái" />
    </TopToolbar>
);

const Info = ({ label, children }: any) => (
    <Box>
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
            {children}
        </Typography>
    </Box>
);

export const OrderShow = () => (
    <Show title={<OrderTitle />} actions={<OrderShowActions />}>
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Thông tin đơn hàng
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Mã đơn">
                                    <TextField source="orderCode" />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Ngày đặt">
                                    <DateField source="orderDate" showTime />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Khách hàng">
                                    <FunctionField
                                        render={(record: any) =>
                                            record?.user?.username ||
                                            record?.user?.email ||
                                            "Khách"
                                        }
                                    />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Trạng thái">
                                    <TextField source="status.name" />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Thanh toán">
                                    <TextField source="paymentMethod" />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Info label="Tổng số lượng">
                                    <NumberField source="totalQuantity" />
                                </Info>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Thanh toán
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Stack spacing={2}>
                            <Info label="Tổng tiền">
                                <NumberField
                                    source="orderTotal"
                                    options={{
                                        style: "currency",
                                        currency: "VND",
                                    }}
                                />
                            </Info>

                            <Info label="Phí vận chuyển">
                                <NumberField
                                    source="shippingCost"
                                    options={{
                                        style: "currency",
                                        currency: "VND",
                                    }}
                                />
                            </Info>

                            <Info label="Mã giảm giá">
                                <TextField source="promotion.code" emptyText="Không có" />
                            </Info>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Địa chỉ giao hàng
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Info label="Người nhận">
                                    <TextField source="shippingAddress.fullName" />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Info label="Số điện thoại">
                                    <TextField source="shippingAddress.phoneNumber" />
                                </Info>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Info label="Địa chỉ">
                                    <FunctionField
                                        render={(record: any) => {
                                            const a = record?.shippingAddress;
                                            if (!a) return "Không có";
                                            return [
                                                a.detailAdrs,
                                                a.wardCommune || a.ward,
                                                a.countyDistrict || a.district,
                                                a.provinceCity || a.province,
                                            ]
                                                .filter(Boolean)
                                                .join(", ");
                                        }}
                                    />
                                </Info>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Sản phẩm trong đơn
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <ArrayField source="orderDetails">
                            <Datagrid bulkActionButtons={false}>
                                <TextField source="product.title" label="Sản phẩm" />
                                <NumberField source="quantity" label="Số lượng" />
                                <NumberField
                                    source="totalMoney"
                                    label="Thành tiền"
                                    options={{
                                        style: "currency",
                                        currency: "VND",
                                    }}
                                />
                            </Datagrid>
                        </ArrayField>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Ghi chú
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <TextField source="note" emptyText="Không có ghi chú" />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Show>
);