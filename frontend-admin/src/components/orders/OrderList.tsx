import * as React from "react";
import { useState } from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    FunctionField,
    useRefresh,
    useNotify,
    useDelete,
    useUpdate,
    useRecordContext
} from "react-admin";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { OrderEdit } from "./OrderEdit";
import { OrderSearch } from "./OrderSearch";

const getStatusStyles = (statusId: number) => {
    switch (statusId) {
        case 1: // Pending (yellow)
            return { bg: "rgba(237, 108, 2, 0.08)", color: "#b78103", border: "rgba(237, 108, 2, 0.3)" };
        case 2: // Confirmed (blue)
            return { bg: "rgba(2, 136, 209, 0.08)", color: "#0288d1", border: "rgba(2, 136, 209, 0.3)" };
        case 3: // Preparing (indigo)
            return { bg: "rgba(63, 81, 181, 0.08)", color: "#3f51b5", border: "rgba(63, 81, 181, 0.3)" };
        case 4: // Shipping (violet)
            return { bg: "rgba(156, 39, 176, 0.08)", color: "#9c27b0", border: "rgba(156, 39, 176, 0.3)" };
        case 5: // Delivered (green)
            return { bg: "rgba(46, 125, 50, 0.08)", color: "#2e7d32", border: "rgba(46, 125, 50, 0.3)" };
        case 6: // Cancelled (red)
            return { bg: "rgba(211, 47, 47, 0.08)", color: "#d32f2f", border: "rgba(211, 47, 47, 0.3)" };
        default:
            return { bg: "rgba(0, 0, 0, 0.04)", color: "#666", border: "rgba(0, 0, 0, 0.15)" };
    }
};

const StatusSelectField = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();
    const [update, { isLoading }] = useUpdate();

    if (!record) return null;

    const handleChange = (e: any) => {
        const newStatusId = Number(e.target.value);
        
        const updatedRecord = {
            ...record,
            status: {
                id: newStatusId
            }
        };

        update(
            "orders",
            { id: record.id, data: updatedRecord },
            {
                onSuccess: () => {
                    notify("Cập nhật trạng thái đơn hàng thành công", { type: "info" });
                    refresh();
                },
                onError: (error: any) => {
                    const errMsg = error?.body?.message || error?.message || "Lỗi khi cập nhật trạng thái";
                    notify(errMsg, { type: "warning" });
                }
            }
        );
    };

    const statusStyles = getStatusStyles(record.status?.id || 1);

    return (
        <Select
            value={record.status?.id || 1}
            onChange={handleChange}
            size="small"
            disabled={isLoading}
            variant="outlined"
            onClick={(e) => e.stopPropagation()} // Chặn hành động click dòng
            sx={{ 
                minWidth: 150,
                height: 28, // Chiều cao giống Chip nhỏ
                fontSize: "0.75rem",
                fontWeight: 600,
                borderRadius: "14px", // Tạo hình bo tròn kiểu Chip
                backgroundColor: statusStyles.bg,
                color: statusStyles.color,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: statusStyles.border,
                    borderRadius: "14px"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: statusStyles.color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: statusStyles.color
                },
                "& .MuiSelect-select": {
                    py: 0.5,
                    pl: 1.5,
                    pr: 3.5, // Chừa khoảng trống cho mũi tên xổ xuống
                    display: "flex",
                    alignItems: "center"
                },
                "& .MuiSvgIcon-root": {
                    color: statusStyles.color // Định màu cho mũi tên xổ xuống
                }
            }}
        >
            <MenuItem value={1}>Đang chờ xử lý</MenuItem>
            <MenuItem value={2}>Đã xác nhận</MenuItem>
            <MenuItem value={3}>Đang chuẩn bị</MenuItem>
            <MenuItem value={4}>Đang giao</MenuItem>
            <MenuItem value={5}>Đã giao</MenuItem>
            <MenuItem value={6}>Đơn hàng đã hủy</MenuItem>
        </Select>
    );
};

export const OrderList = () => {
    const refresh = useRefresh();
    const notify = useNotify();
    const [deleteOne] = useDelete();

    // Dialog state
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const handleEditClick = (id: number) => {
        setEditId(id);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditId(null);
    };

    const handleSaveSuccess = () => {
        handleEditClose();
        refresh();
    };

    const handleDelete = (id: number) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${id}?`)) {
            deleteOne(
                "orders",
                { id },
                {
                    onSuccess: () => {
                        notify("Xóa đơn hàng thành công", { type: "info" });
                        refresh();
                    },
                    onError: (error: any) => {
                        const errMsg = error?.body?.message || error?.message || "Lỗi khi xóa đơn hàng";
                        notify(errMsg, { type: "warning" });
                    }
                }
            );
        }
    };

    // Format address helper
    const getFullAddress = (addr: any) => {
        if (!addr) return "";
        const parts = [addr.detailAdrs, addr.wardCommune, addr.countyDistrict, addr.provinceCity].filter(Boolean);
        return parts.join(", ");
    };

    return (
        <>
            <List
                title="Danh sách đơn hàng"
                sort={{ field: "id", order: "DESC" }}
                perPage={10}
                filters={OrderSearch}
            >
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID" />
                    
                    {/* Buyer Name */}
                    <FunctionField
                        label="Tên người mua"
                        render={(record: any) => record.shippingAddress?.fullName || record.user?.username || "Khách vãng lai"}
                    />
                    
                    {/* Products list */}
                    <FunctionField
                        label="Sản phẩm"
                        render={(record: any) => {
                            if (!record.orderDetails || record.orderDetails.length === 0) return "Không có sản phẩm";
                            return record.orderDetails.map((detail: any) => 
                                `${detail.product?.title || "Sản phẩm không tên"} (x${detail.quantity})`
                            ).join(", ");
                        }}
                    />
                    
                    {/* Price */}
                    <FunctionField
                        label="Giá tiền"
                        render={(record: any) => 
                            record.orderTotal != null 
                                ? `${record.orderTotal.toLocaleString("vi-VN")} đ` 
                                : "0 đ"
                        }
                    />
                    
                    {/* Quantity */}
                    <NumberField source="totalQuantity" label="Số lượng" />
                    
                    {/* Date */}
                    <DateField source="orderDate" label="Ngày đặt hàng" showTime />
                    
                    {/* Payment Method */}
                    <TextField source="paymentMethod" label="Thanh toán" />
                    
                    {/* Order Code */}
                    <TextField source="orderCode" label="Mã đơn hàng" />
                    
                    {/* Address */}
                    <FunctionField
                        label="Địa chỉ"
                        render={(record: any) => getFullAddress(record.shippingAddress)}
                    />
                    
                    {/* Status */}
                    <FunctionField
                        label="Trạng thái"
                        render={() => <StatusSelectField />}
                    />

                    {/* Actions */}
                    <FunctionField
                        label="Hành động"
                        render={(record: any) => (
                            <Box display="flex" gap={0.5}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(record.id);
                                    }}
                                    title="Sửa đơn hàng"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(record.id);
                                    }}
                                    title="Xóa đơn hàng"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    />
                </Datagrid>
            </List>

            {/* Edit Dialog */}
            <OrderEdit
                id={editId}
                open={editOpen}
                onClose={handleEditClose}
                onSaveSuccess={handleSaveSuccess}
            />
        </>
    );
};
