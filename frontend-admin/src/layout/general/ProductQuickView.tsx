import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Stack,
    Chip,
} from "@mui/material";

type ProductQuickViewProps = {
    product: any;
    open: boolean;
    onClose: () => void;
};

export const ProductQuickView = ({
    product,
    open,
    onClose,
}: ProductQuickViewProps) => {
    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>
                    {(() => {
                        const firstImage = product.image || (product.images && product.images.length > 0
                            ? product.images[0].image
                            : null);
                        return firstImage ? (
                            <Box
                                component="img"
                                src={firstImage}
                                alt={product.title}
                                sx={{
                                    width: "100%",
                                    maxHeight: 260,
                                    objectFit: "contain",
                                    borderRadius: 2,
                                    bgcolor: "#f7f7f7",
                                }}
                            />
                        ) : null;
                    })()}

                    <Typography variant="h6" fontWeight={700}>
                        {product.title}
                    </Typography>

                    <Typography>
                        <strong>ID:</strong> {product.id}
                    </Typography>

                    <Typography color="primary" fontWeight={700}>
                        Giá hiện tại: {product.currentPrice?.toLocaleString("vi-VN")} đ
                    </Typography>

                    {product.oldPrice && (
                        <Typography color="text.secondary">
                            Giá cũ: {product.oldPrice.toLocaleString("vi-VN")} đ
                        </Typography>
                    )}

                    {product.category?.name && (
                        <Chip label={product.category.name} sx={{ width: "fit-content" }} />
                    )}
                </Stack>
            </DialogContent>

            {/* <DialogActions>
                <Button onClick={onClose}>Đóng</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.location.href = `#/products/${product.id}/show`;
                    }}
                >
                    Xem trang sản phẩm
                </Button>
            </DialogActions> */}
        </Dialog>
    );
};