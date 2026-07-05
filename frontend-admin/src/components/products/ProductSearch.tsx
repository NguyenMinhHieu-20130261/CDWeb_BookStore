import {
    SearchInput,
    SelectInput,
} from "react-admin";
import * as React from "react";

export const ProductSearch = [
    <SearchInput
        key="q"
        source="q"
        placeholder="Tìm kiếm sản phẩm"
        alwaysOn
    />,
    <SelectInput
        key="active"
        source="active"
        label="Trạng thái"
        choices={[
            { id: true, name: "Đang hoạt động" },
            { id: false, name: "Không hoạt động" },
        ]}
    />,
];