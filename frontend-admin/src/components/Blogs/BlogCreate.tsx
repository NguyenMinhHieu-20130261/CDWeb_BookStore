import {
    BooleanInput,
    Create,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    useGetList,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

const req = [required("Không được để trống")];

export const BlogCreate = () => {
    const { data: categories } = useGetList("blog-cate", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "name", order: "ASC" },
        filter: {},
    });

    return (
        <Create title="Tạo bài viết">
            <SimpleForm>
                <TextInput source="title" label="Tiêu đề" validate={req} />
                <TextInput source="slug" label="Slug" validate={req} />
                <TextInput source="thumbnail" label="Link ảnh thumbnail" />
                <TextInput source="shortDesc" label="Mô tả ngắn" multiline fullWidth />
                <SelectInput
                    source="category.id"
                    label="Danh mục"
                    choices={categories || []}
                    optionText="name"
                    optionValue="id"
                    validate={req}
                />
                <RichTextInput source="content" label="Nội dung" fullWidth validate={req} />
                <BooleanInput source="status" label="Hiển thị" defaultValue={true} />
                <NumberInput source="viewCount" label="Lượt xem" defaultValue={0} disabled />
            </SimpleForm>
        </Create>
    );
};