import {
    BooleanField,
    DateField,
    ImageField,
    NumberField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const BlogShow = () => (
    <Show title="Chi tiết bài viết">
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ImageField source="thumbnail" label="Ảnh thumbnail" />
            <TextField source="title" label="Tiêu đề" />
            <TextField source="slug" label="Slug" />
            <TextField source="shortDesc" label="Mô tả ngắn" />
            <TextField source="category.name" label="Danh mục" />
            <RichTextField source="content" label="Nội dung" />
            <NumberField source="viewCount" label="Lượt xem" />
            <BooleanField source="status" label="Hiển thị" />
            <DateField source="createdAt" label="Ngày tạo" />
            <DateField source="updatedAt" label="Ngày cập nhật" />
        </SimpleShowLayout>
    </Show>
);