import {
    SearchInput,
    SelectInput,
} from "react-admin";

export const BlogCateSearch = [
    <SearchInput
        key="q"
        source="q"
        placeholder="Tìm kiếm danh mục"
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