import * as React from "react";
import { BlogSearch } from "./BlogSearch";
import {
    BulkDeleteButton,
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton,
    ImageField,
    List,
    NumberField,
    SelectColumnsButton,
    ShowButton,
    EditButton,
    TextField,
    TopToolbar,
} from "react-admin";
import DeleteButton from "../../layout/DeleteButton";

const BlogListActions = () => (
    <TopToolbar>
        <CreateButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);

export const BlogList = () => (
    <List
        title="Danh sách bài viết"
        sort={{ field: "id", order: "DESC" }}
        perPage={5}
        actions={<BlogListActions />}
        filters={<BlogSearch />}
    >
        <DatagridConfigurable
            rowClick="show"
            bulkActionButtons={<BulkDeleteButton />}
        >
            <TextField source="id" label="ID" />
            <ImageField
                source="thumbnail"
                label="Ảnh"
                sx={{ "& img": { maxWidth: 100, maxHeight: 60, objectFit: "cover" } }}
            />
            <TextField source="title" label="Tiêu đề" />
            <TextField source="slug" label="Slug" />
            <TextField source="category.name" label="Danh mục" />
            <NumberField source="viewCount" label="Lượt xem" />
            <BooleanField source="status" label="Hiển thị" />
            <DateField source="createdAt" label="Ngày tạo" />
            <DateField source="updatedAt" label="Ngày cập nhật" showTime/>
            <ShowButton />
            <EditButton />
        </DatagridConfigurable>
    </List>
);