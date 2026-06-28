import {
    SearchInput,
    SelectInput,
    TextInput,
} from "react-admin";
import * as React from "react";

export const OrderSearch = [
    <SearchInput
        key="q"
        source="q"
        placeholder="Tìm theo tên người mua..."
        alwaysOn
    />,
    <TextInput
        key="orderCode"
        source="orderCode"
        label="Mã đơn hàng"
    />,
    <SelectInput
        key="status"
        source="status"
        label="Trạng thái đơn"
        choices={[
            { id: 1, name: "Đang chờ xử lý" },
            { id: 2, name: "Đã xác nhận" },
            { id: 3, name: "Đang chuẩn bị" },
            { id: 4, name: "Đang giao" },
            { id: 5, name: "Đã giao" },
            { id: 6, name: "Đơn hàng đã hủy" },
        ]}
    />,
];
