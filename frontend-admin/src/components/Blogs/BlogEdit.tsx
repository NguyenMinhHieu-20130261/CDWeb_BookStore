import {
    BooleanInput,
    Edit,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    useGetList,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

const req = [required("Không được để trống")];

export const BlogEdit = () => {
    const { data: categories } = useGetList("blog-cate", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "name", order: "ASC" },
        filter: {},
    });
    const transform = (data: any) => ({
        ...data,
        status: data.status === true || data.status === 1 ? 1 : 0,  
        category: {
            id: data.category?.id,
        },
    });
    return (
        <Edit title="Chỉnh sửa bài viết" transform={transform}>
            <SimpleForm>
                <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />
                <TextInput source="slug" label="Slug" validate={req} fullWidth />
                <TextInput source="thumbnail" label="Link ảnh thumbnail" fullWidth />
                <TextInput
                    source="shortDescription"
                    label="Mô tả ngắn"
                    multiline
                    fullWidth
                />
                <SelectInput
                    source="category.id"
                    label="Danh mục"
                    choices={categories || []}
                    optionText="name"
                    optionValue="id"
                    validate={req}
                />
                <RichTextInput
                    source="content"
                    label="Nội dung"
                    fullWidth
                    validate={req}
                />
                <BooleanInput
                    source="status"
                    label="Hiển thị"
                    format={(value) => value === 1 || value === true}
                    parse={(value) => (value ? 1 : 0)}
                />
                <NumberInput
                    source="viewCount"
                    label="Lượt xem"
                    disabled
                />
            </SimpleForm>
        </Edit>
    );
};