import {
    BooleanField,
    DateField,
    NumberField,
    Show,
    TextField,
    Labeled,
} from "react-admin";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Stack,
    Divider,
} from "@mui/material";

export const InventoryShow = () => (
    <Show title="Chi tiết lô hàng">
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {/* INFO */}
                    <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Thông tin lô hàng
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={2}>
                                <Labeled>
                                    <TextField
                                        source="id"
                                        label="ID"
                                    />
                                </Labeled>
                                <Labeled>
                                    <TextField
                                        source="batchCode"
                                        label="Mã lô"
                                    />
                                </Labeled>
                                <Labeled>
                                    <TextField
                                        source="product.title"
                                        label="Tên sản phẩm"
                                    />
                                </Labeled>
                                <Labeled>
                                    <BooleanField
                                        source="active"
                                        label="Trạng thái"
                                    />
                                </Labeled>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                {/* PRICE */}
                <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Số lượng & giá
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={2}>
                                <Labeled>
                                    <NumberField
                                        source="importedQuantity"
                                        label="SL nhập"
                                    />
                                </Labeled>
                                <Labeled>
                                    <NumberField
                                        source="remainingQuantity"
                                        label="SL còn lại"
                                    />
                                </Labeled>
                                <Labeled>
                                    <NumberField
                                        source="importPrice"
                                        label="Giá nhập"
                                        options={{
                                            style: "currency",
                                            currency: "VND",
                                        }}
                                    />
                                </Labeled>
                                <Labeled>
                                    <NumberField
                                        source="salePrice"
                                        label="Giá bán"
                                        options={{
                                            style: "currency",
                                            currency: "VND",
                                        }}
                                    />
                                </Labeled>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                {/* DATE */}
                <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Thời gian
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={2}>
                                <Labeled>
                                    <DateField
                                        source="importedAt"
                                        label="Ngày nhập"
                                        showTime
                                    />
                                </Labeled>
                                <Labeled>
                                    <DateField
                                        source="createdAt"
                                        label="Ngày tạo"
                                        showTime
                                    />
                                </Labeled>
                                <Labeled>
                                    <DateField
                                        source="updatedAt"
                                        label="Ngày sửa"
                                        showTime
                                    />
                                </Labeled>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                {/* USER */}
                <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Người thao tác
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={2}>
                                <Labeled>
                                    <TextField
                                        source="createdBy.username"
                                        label="Người tạo"
                                    />
                                </Labeled>
                                <Labeled>
                                    <TextField
                                        source="updatedBy.username"
                                        label="Người cập nhật"
                                    />
                                </Labeled>

                            </Stack>

                        </CardContent>
                    </Card>
                </Grid>
                {/* NOTE */}
                <Grid size={{xs:12}}>
                    <Card>
                        <CardContent>

                            <Typography variant="h6">
                                Ghi chú
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <TextField
                                source="note"
                                emptyText="Không có ghi chú"
                            />
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </Box>
    </Show>
);