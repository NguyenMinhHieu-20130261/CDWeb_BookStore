import { SearchInput, SelectInput } from "react-admin";
import * as React from "react";

export const PromotionSearch = [
    <SearchInput
        key="q"
        source="q"
        placeholder="Tìm kiếm mã giảm giá"
        alwaysOn
    />,

    <SelectInput
        key="status"
        source="status"
        label="Trạng thái"
        choices={[
            { id: true, name: "Đang hoạt động" },
            { id: false, name: "Không hoạt động" },
        ]}
    />,
];