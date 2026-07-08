import {
    ChipField,
    EditButton,
    ImageField,
    Labeled,
    NumberField,
    RichTextField,
    Show,
    TextField,
    TopToolbar,
    useRecordContext,
} from "react-admin";
import * as React from "react";
import { Product } from "../../type";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const ProductShow = () => {
    const ProductTitle = () => {
        const record = useRecordContext<Product>();
        if (!record) return null;
        return <span>{record.title}</span>;
    };
    const ProductImageShow = () => {
        const record = useRecordContext<Product>();
        if (!record) return null;
        const firstImage = record.image || (record.images && record.images.length > 0
            ? record.images[0].image
            : null);
        return firstImage ? (
            <img
                src={firstImage}
                alt={record.title}
                style={{
                    maxWidth: "100%",
                    maxHeight: 320,
                    objectFit: "contain",
                }}
            />
        ) : (
            <span>Chưa có ảnh</span>
        );
    };
    const ProductShowActions = () => (
        <TopToolbar>
            <EditButton />
        </TopToolbar>
    );
    return (
        <Show title={<ProductTitle />} actions={<ProductShowActions />}>
            <Paper sx={{ p: 3, m: 2 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                border: "1px solid #eee",
                                borderRadius: 2,
                                p: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 350,
                            }}
                        >
                            <ProductImageShow />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={2}>
                            <Labeled label="Mã sản phẩm">
                                <TextField source="detail.productSku" />
                            </Labeled>
                            <Typography variant="h5" fontWeight="bold">
                                <TextField source="title" />
                            </Typography>
                            <ChipField
                                source="category.name"
                                sx={{ width: "fit-content" }}
                            />
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <NumberField
                                    source="currentPrice"
                                    options={{
                                        style: "currency",
                                        currency: "VND",
                                    }}
                                    sx={{
                                        fontSize: 22,
                                        fontWeight: "bold",
                                        color: "error.main",
                                    }}
                                />
                                <NumberField
                                    source="oldPrice"
                                    options={{
                                        style: "currency",
                                        currency: "VND",
                                    }}
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                    }}
                                />
                            </Box>
                            <Divider />
                            <Grid container spacing={2}>
                                <Info label="Nhà cung cấp" source="detail.supplier" />
                                <Info label="Nhà xuất bản" source="detail.publisher" />
                                <Info label="Tác giả" source="detail.author" />
                                <Info label="Năm xuất bản" source="detail.publishYear" />
                                <Info label="Thương hiệu" source="detail.brand" />
                                <Info label="Xuất xứ" source="detail.origin" />
                                <Info label="Màu sắc" source="detail.color" />
                                <Info label="Trọng lượng" source="detail.weight" />
                                <Info label="Kích cỡ" source="detail.size" />
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Labeled label="Số trang">
                                        <NumberField source="detail.quantityOfPage" />
                                    </Labeled>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Mô tả sản phẩm
                        </Typography>
                        <Box
                            sx={{
                                lineHeight: 1.8,
                                fontSize: 15,
                                "& p": {
                                    marginBottom: 2,
                                },
                            }}
                        >
                            <RichTextField source="detail.description" />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                        <Labeled label="Ngày tạo">
                            <TextField source="createdAt" />
                        </Labeled>
                    </Grid>
                </Grid>
            </Paper>
        </Show>
    );
};
const Info = ({ label, source }: { label: string; source: string }) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Labeled label={label}>
            <TextField source={source} />
        </Labeled>
    </Grid>
);