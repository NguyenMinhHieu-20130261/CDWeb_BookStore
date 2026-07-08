import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    useGetList,
    useNotify,
    useRefresh,
    useRecordContext,
    SaveButton,
} from "react-admin";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Stack,
    Chip,
} from "@mui/material";
import { Order, OrderStatus } from "../../type";
import { AddressSection } from "../../layout/general/AddressSelection";

const OrderEditForm = ({ statuses }: { statuses?: OrderStatus[] }) => {
    const record = useRecordContext<Order>();
    if (!record) return null;

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                    Thông tin đơn hàng
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="id" label="ID đơn hàng" disabled fullWidth />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="orderCode" label="Mã đơn hàng" disabled fullWidth />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="shippingAddress.fullName" label="Người mua" fullWidth />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="shippingAddress.phoneNumber" label="Số điện thoại" fullWidth />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="paymentMethod" label="Thanh toán" disabled fullWidth />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextInput source="note" label="Ghi chú khách hàng" disabled fullWidth />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <AddressSection editable={false} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined" sx={{ position: { md: "sticky" }, top: 16 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                Cập nhật đơn
                            </Typography>

                            <Stack spacing={2}>
                                <Chip
                                    label={record.status?.name || "Chưa có trạng thái"}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ width: "fit-content" }}
                                />

                                <Divider />

                                <SelectInput
                                    source="status.id"
                                    label="Trạng thái đơn hàng"
                                    choices={statuses || []}
                                    optionText="name"
                                    optionValue="id"
                                    fullWidth
                                />

                                <TextInput
                                    source="shopReply"
                                    label="Phản hồi của shop"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                />

                                <Divider />

                                <NumberInput source="totalQuantity" label="Tổng số lượng" disabled fullWidth />
                                <NumberInput source="orderTotal" label="Tổng tiền" disabled fullWidth />

                                <SaveButton label="Lưu cập nhật" variant="contained" alwaysEnable />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

const formSx = {
    maxWidth: "100%",
    width: "100%",
    "& .RaSimpleForm-main": {
        width: "100%",
    },
};

export const OrderEdit = () => {
    const notify = useNotify();
    const refresh = useRefresh();

    const { data: statuses } = useGetList<OrderStatus>("order-status", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: {},
    });

    const transform = (data: any) => ({
        status: {
            id: data.status?.id,
        },
        shopReply: data.shopReply,
        shippingAddress: data.shippingAddress,
    });

    return (
        <Edit
            title="Chỉnh sửa đơn hàng"
            transform={transform}
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: () => {
                    notify("Cập nhật đơn hàng thành công", { type: "info" });
                    refresh();
                },
            }}
        >
            <SimpleForm toolbar={false} sx={formSx}>
                <OrderEditForm statuses={statuses} />
            </SimpleForm>
        </Edit>
    );
};