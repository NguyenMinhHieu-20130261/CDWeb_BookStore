import * as React from "react";
import { BlogCateSearch } from "./BlogCateSearch";
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    DeleteButton,
    DateField,
} from "react-admin";

export const BlogCateList = () => (
    <List
        title="Danh sách danh mục bài viết"
        sort={{ field: "id", order: "DESC" }}
        perPage={10}
        filters={BlogCateSearch}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên danh mục" />
            <BooleanField source="active" label="Đang hoạt động" />
            <DateField source="createdAt" label="Ngày tạo" showTime/>
            <DateField source="updatedAt" label="Ngày cập nhật" showTime/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);