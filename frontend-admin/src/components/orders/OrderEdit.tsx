import * as React from "react";
import { useState, useEffect } from "react";
import {
    useUpdate,
    useNotify,
    useGetList,
    useGetOne
} from "react-admin";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

interface OrderEditProps {
    id: number | null;
    open: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

export const OrderEdit = ({ id, open, onClose, onSaveSuccess }: OrderEditProps) => {
    const notify = useNotify();
    const [update, { isLoading: isUpdating }] = useUpdate();

    // Form fields state
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [detailAdrs, setDetailAdrs] = useState("");
    const [wardCommune, setWardCommune] = useState("");
    const [countyDistrict, setCountyDistrict] = useState("");
    const [provinceCity, setProvinceCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [statusId, setStatusId] = useState<number>(1);
    const [note, setNote] = useState("");
    const [promotionId, setPromotionId] = useState<string | number>("");
    
    // Order items state
    const [items, setItems] = useState<any[]>([]);

    // Fetch order data when ID changes
    const { data: orderData, isLoading: isFetchingOrder } = useGetOne(
        "orders",
        { id: id ?? 0 },
        { enabled: !!id && open }
    );

    // Fetch products list for dropdown
    const { data: productsData } = useGetList("products", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "title", order: "ASC" }
    });

    // Fetch promotions list for dropdown
    const { data: promotionsData } = useGetList("promotions", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "name", order: "ASC" }
    });

    // Populate form fields from orderData
    useEffect(() => {
        if (orderData && open) {
            const addr = orderData.shippingAddress || {};
            setFullName(addr.fullName || "");
            setPhoneNumber(addr.phoneNumber || "");
            setDetailAdrs(addr.detailAdrs || "");
            setWardCommune(addr.wardCommune || "");
            setCountyDistrict(addr.countyDistrict || "");
            setProvinceCity(addr.provinceCity || "");
            setPaymentMethod(orderData.paymentMethod || "");
            setStatusId(orderData.status?.id || 1);
            setNote(orderData.note || "");
            setPromotionId(orderData.promotion?.id || "");
            
            // Map orderDetails to local state
            if (orderData.orderDetails) {
                setItems(orderData.orderDetails.map((detail: any) => ({
                    id: detail.id,
                    product: {
                        id: detail.product?.id || "",
                        title: detail.product?.title || "",
                        currentPrice: detail.product?.currentPrice || 0
                    },
                    quantity: detail.quantity || 1,
                    totalMoney: detail.totalMoney || 0
                })));
            } else {
                setItems([]);
            }
        }
    }, [orderData, open]);

    // Handle item product change
    const handleProductChange = (index: number, productId: number) => {
        const selectedProd = productsData?.find((p: any) => p.id === productId);
        if (selectedProd) {
            const newItems = [...items];
            newItems[index] = {
                ...newItems[index],
                product: {
                    id: selectedProd.id,
                    title: selectedProd.title,
                    currentPrice: selectedProd.currentPrice
                },
                totalMoney: selectedProd.currentPrice * newItems[index].quantity
            };
            setItems(newItems);
        }
    };

    // Handle item quantity change
    const handleQuantityChange = (index: number, qtyStr: string) => {
        const qty = parseInt(qtyStr, 10) || 1;
        const newItems = [...items];
        const currentPrice = newItems[index].product?.currentPrice || 0;
        newItems[index] = {
            ...newItems[index],
            quantity: qty,
            totalMoney: currentPrice * qty
        };
        setItems(newItems);
    };

    // Handle item price change
    const handlePriceChange = (index: number, priceStr: string) => {
        const price = parseInt(priceStr, 10) || 0;
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            product: {
                ...newItems[index].product,
                currentPrice: price
            },
            totalMoney: price * newItems[index].quantity
        };
        setItems(newItems);
    };

    // Add item row
    const handleAddItem = () => {
        setItems([
            ...items,
            {
                product: { id: "", title: "", currentPrice: 0 },
                quantity: 1,
                totalMoney: 0
            }
        ]);
    };

    // Remove item row
    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    // Form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validations
        if (!fullName.trim()) {
            notify("Tên người mua không được để trống", { type: "warning" });
            return;
        }
        if (!paymentMethod.trim()) {
            notify("Phương thức thanh toán không được để trống", { type: "warning" });
            return;
        }
        if (items.length === 0) {
            notify("Đơn hàng phải có ít nhất một sản phẩm", { type: "warning" });
            return;
        }
        for (const item of items) {
            if (!item.product?.id) {
                notify("Vui lòng chọn sản phẩm cho tất cả các dòng", { type: "warning" });
                return;
            }
        }

        const data = {
            id,
            shippingAddress: {
                fullName: fullName.trim(),
                phoneNumber: phoneNumber.trim(),
                detailAdrs: detailAdrs.trim(),
                provinceCity: provinceCity.trim(),
                countyDistrict: countyDistrict.trim(),
                wardCommune: wardCommune.trim()
            },
            paymentMethod: paymentMethod.trim(),
            status: {
                id: statusId
            },
            note: note.trim(),
            promotion: promotionId ? { id: Number(promotionId) } : null,
            orderDetails: items.map(item => ({
                product: { id: item.product.id },
                quantity: item.quantity,
                totalMoney: item.totalMoney
            }))
        };

        update(
            "orders",
            { id, data },
            {
                onSuccess: () => {
                    notify("Cập nhật đơn hàng thành công", { type: "info" });
                    onSaveSuccess();
                },
                onError: (error: any) => {
                    const errMsg = error?.body?.message || error?.message || "Lỗi khi cập nhật đơn hàng";
                    notify(errMsg, { type: "warning" });
                }
            }
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Chỉnh sửa đơn hàng #{id}</DialogTitle>
                <DialogContent dividers>
                    {isFetchingOrder ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <Typography>Đang tải thông tin đơn hàng...</Typography>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={3} pt={1}>
                            {/* Section: Customer / Buyer Info */}
                            <Typography variant="h6" color="primary">Thông tin khách hàng</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Tên người mua"
                                        variant="outlined"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Số điện thoại"
                                        variant="outlined"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            {/* Section: Address Info */}
                            <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>Địa chỉ giao hàng</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Địa chỉ chi tiết"
                                        variant="outlined"
                                        value={detailAdrs}
                                        onChange={(e) => setDetailAdrs(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Phường / Xã"
                                        variant="outlined"
                                        value={wardCommune}
                                        onChange={(e) => setWardCommune(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Quận / Huyện"
                                        variant="outlined"
                                        value={countyDistrict}
                                        onChange={(e) => setCountyDistrict(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Tỉnh / Thành phố"
                                        variant="outlined"
                                        value={provinceCity}
                                        onChange={(e) => setProvinceCity(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Divider />

                            {/* Section: Order Settings */}
                            <Typography variant="h6" color="primary">Thông tin đơn hàng</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="status-select-label">Trạng thái đơn hàng</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            value={statusId}
                                            onChange={(e) => setStatusId(Number(e.target.value))}
                                            label="Trạng thái đơn hàng"
                                        >
                                            <MenuItem value={1}>Đang chờ xử lý</MenuItem>
                                            <MenuItem value={2}>Đã xác nhận</MenuItem>
                                            <MenuItem value={3}>Đang chuẩn bị</MenuItem>
                                            <MenuItem value={4}>Đang giao</MenuItem>
                                            <MenuItem value={5}>Đã giao</MenuItem>
                                            <MenuItem value={6}>Đơn hàng đã hủy</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Phương thức thanh toán"
                                        variant="outlined"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="promotion-select-label">Mã giảm giá</InputLabel>
                                        <Select
                                            labelId="promotion-select-label"
                                            value={promotionId}
                                            onChange={(e) => setPromotionId(e.target.value)}
                                            label="Mã giảm giá"
                                        >
                                            <MenuItem value=""><em>Không áp dụng</em></MenuItem>
                                            {promotionsData?.map((p: any) => (
                                                <MenuItem key={p.id} value={p.id}>
                                                    {p.code} - {p.name} ({p.discountPercent}%)
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Ghi chú"
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Divider />

                            {/* Section: Products List */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="primary">Danh sách sản phẩm</Typography>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddItem}
                                >
                                    Thêm sản phẩm
                                </Button>
                            </Box>

                            {items.map((item, index) => (
                                <Box key={index} display="flex" alignItems="center" gap={2}>
                                    <FormControl sx={{ flex: 3 }} variant="outlined">
                                        <InputLabel id={`product-select-label-${index}`}>Sản phẩm</InputLabel>
                                        <Select
                                            labelId={`product-select-label-${index}`}
                                            value={item.product?.id || ""}
                                            onChange={(e) => handleProductChange(index, Number(e.target.value))}
                                            label="Sản phẩm"
                                        >
                                            <MenuItem value="" disabled>Chọn sản phẩm</MenuItem>
                                            {productsData?.map((p: any) => (
                                                <MenuItem key={p.id} value={p.id}>
                                                    {p.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Giá tiền (đ)"
                                        type="number"
                                        variant="outlined"
                                        value={item.product?.currentPrice || 0}
                                        onChange={(e) => handlePriceChange(index, e.target.value)}
                                        sx={{ flex: 1 }}
                                    />

                                    <TextField
                                        label="Số lượng"
                                        type="number"
                                        variant="outlined"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        inputProps={{ min: 1 }}
                                        sx={{ flex: 0.8 }}
                                    />

                                    <Typography variant="body2" sx={{ flex: 1, textAlign: "right", fontWeight: "bold" }}>
                                        Thành tiền: {(item.totalMoney || 0).toLocaleString("vi-VN")} đ
                                    </Typography>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveItem(index)}
                                        disabled={items.length <= 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit" disabled={isUpdating}>
                        Hủy
                    </Button>
                    <Button type="submit" color="primary" variant="contained" disabled={isUpdating || isFetchingOrder}>
                        {isUpdating ? "Đang lưu..." : "Lưu"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
