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
        key="active"
        source="active"
        label="Trạng thái"
        choices={[
            {
                id: true,
                name: "Còn hàng",
            },
            {
                id: false,
                name: "Hết hàng",
            },
        ]}
    />,
];