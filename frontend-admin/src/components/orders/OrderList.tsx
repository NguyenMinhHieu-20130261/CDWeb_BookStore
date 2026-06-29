import {
    DatagridConfigurable,
    DateField,
    FunctionField,
    List,
    NumberField,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    EditButton,
} from "react-admin";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { OrderSearch } from "./OrderSearch";
import { OrderEdit } from "./OrderEdit";
import DeleteButton from "../../layout/general/DeleteButton";

const getStatusStyles = (slug: string) => {
    switch (slug) {
        case "pending":
            return {
                color: "#e67e22",
                backgroundColor: "rgba(230, 126, 34, 0.08)",
                borderColor: "rgba(230, 126, 34, 0.3)",
            };
        case "confirmed":
            return {
                color: "#2980b9",
                backgroundColor: "rgba(41, 128, 185, 0.08)",
                borderColor: "rgba(41, 128, 185, 0.3)",
            };
        case "preparing":
            return {
                color: "#8e44ad",
                backgroundColor: "rgba(142, 68, 173, 0.08)",
                borderColor: "rgba(142, 68, 173, 0.3)",
            };
        case "shipping":
            return {
                color: "#d35400",
                backgroundColor: "rgba(211, 84, 0, 0.08)",
                borderColor: "rgba(211, 84, 0, 0.3)",
            };
        case "delivered":
            return {
                color: "#27ae60",
                backgroundColor: "rgba(39, 174, 96, 0.08)",
                borderColor: "rgba(39, 174, 96, 0.3)",
            };
        case "cancelled":
            return {
                color: "#c0392b",
                backgroundColor: "rgba(192, 57, 43, 0.08)",
                borderColor: "rgba(192, 57, 43, 0.3)",
            };
        default:
            return {
                color: "#7f8c8d",
                backgroundColor: "rgba(127, 140, 141, 0.08)",
                borderColor: "rgba(127, 140, 141, 0.3)",
            };
    }
};

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

export const OrderList = () => {
    // const [editOpen, setEditOpen] = useState(false);
    // const [editId, setEditId] = useState<number | null>(null);

    // const handleEditClick = (id: number, event: React.MouseEvent) => {
    //     event.stopPropagation(); // Ngăn chặn sự kiện rowClick="show"
    //     setEditId(id);
    //     setEditOpen(true);
    // };

    // const handleClose = () => {
    //     setEditOpen(false);
    //     setEditId(null);
    // };

    return (
        <>
            <List
                title="Quản lý đơn hàng"
                sort={{ field: "id", order: "DESC" }}
                perPage={10}
                filters={OrderSearch}
                actions={<ListActions />}
            >
                <DatagridConfigurable rowClick="show">
                    <TextField source="id" label="ID" />
                    
                    <FunctionField
                        label="Tên người mua"
                        render={(record: any) =>
                            record?.shippingAddress?.fullName || 
                            record?.user?.username || 
                            record?.user?.email || 
                            "Khách hàng"
                        }
                    />

                    <FunctionField
                        label="Tên sản phẩm"
                        render={(record: any) => {
                            if (!record?.orderDetails || record.orderDetails.length === 0) return "Không có";
                            return record.orderDetails
                                .map((d: any) => `${d.product?.title || "Sản phẩm"} (x${d.quantity})`)
                                .join(", ");
                        }}
                    />

                    <NumberField
                        source="orderTotal"
                        label="Giá tiền"
                        options={{
                            style: "currency",
                            currency: "VND",
                        }}
                    />

                    <NumberField source="totalQuantity" label="Số lượng" />
                    
                    <DateField source="orderDate" label="Ngày đặt hàng" showTime />
                    
                    <TextField source="paymentMethod" label="Phương thức thanh toán" />

                    <TextField source="orderCode" label="Mã đơn hàng" />

                    <FunctionField
                        label="Địa chỉ"
                        render={(record: any) => {
                            const a = record?.shippingAddress;
                            if (!a) return "Không có";
                            return [
                                a.detailAdrs,
                                a.wardCommune,
                                a.countyDistrict,
                                a.provinceCity,
                            ]
                                .filter(Boolean)
                                .join(", ");
                        }}
                    />

                    <FunctionField
                        label="Trạng thái đơn hàng"
                        render={(record: any) => {
                            const status = record?.status;
                            if (!status) return null;
                            const styles = getStatusStyles(status.slug);
                            return (
                                <Box
                                    component="span"
                                    sx={{
                                        display: "inline-block",
                                        padding: "4px 10px",
                                        borderRadius: "20px",
                                        fontSize: "0.825rem",
                                        fontWeight: 600,
                                        border: "1px solid",
                                        color: styles.color,
                                        backgroundColor: styles.backgroundColor,
                                        borderColor: styles.borderColor,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {status.name}
                                </Box>
                            );
                        }}
                    />
                    {/* <FunctionField
                        label="Hành động"
                        render={(record: any) => (
                            <Button
                                startIcon={<EditIcon />}
                                size="small"
                                variant="outlined"
                                // onClick={(e) => handleEditClick(record.id, e)}
                            >
                                Sửa
                            </Button>
                        )}
                    /> */}
                    <EditButton/>
                    <DeleteButton param="đơn hàng" />
                </DatagridConfigurable>
            </List>
        </>
    );
};