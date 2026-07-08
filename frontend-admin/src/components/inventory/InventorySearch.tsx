import {
    SearchInput,
    SelectInput,
} from "react-admin";
import * as React from "react";

export const InventorySearch = [
    <SearchInput
        key="q"
        source="q"
        placeholder="Tìm kiếm lô hàng"
        alwaysOn
    />,
    <SelectInput
        key="stockStatus"
        source="stockStatus"
        label="Trạng thái"
        choices={[
            {
                id: "ACTIVE",
                name: "Đang bán",
            },
            {
                id: "OUT_OF_STOCK",
                name: "Hết hàng",
            },
            {
                id: "LOW_STOCK",
                name: "Sắp hết",
            },
            {
                id: "DISABLED",
                name: "Ngưng bán",
            },
        ]}
    />,
];