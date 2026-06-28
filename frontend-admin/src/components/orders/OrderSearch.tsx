import { TextInput, SelectInput } from "react-admin";
import * as React from "react";

export const OrderSearch = [
    <TextInput
        key="fullName"
        source="fullName"
        label="Tên người mua"
        placeholder="Tìm kiếm theo tên người mua..."
        alwaysOn
    />,
    <TextInput
        key="orderCode"
        source="orderCode"
        label="Mã đơn hàng"
        placeholder="Tìm theo mã đơn..."
        alwaysOn
    />,
    <SelectInput
        key="statusId"
        source="statusId"
        label="Trạng thái"
        choices={[
            { id: 1, name: "Đang chờ xử lý" },
            { id: 2, name: "Đã xác nhận" },
            { id: 3, name: "Đang chuẩn bị" },
            { id: 4, name: "Đang giao" },
            { id: 5, name: "Đã giao" },
            { id: 6, name: "Đơn hàng đã hủy" },
        ]}
        emptyText="Tất cả trạng thái"
        alwaysOn
    />,
    <TextInput
        key="id"
        source="id"
        label="ID Đơn hàng"
    />,
];