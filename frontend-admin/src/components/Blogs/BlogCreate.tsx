import {
    BooleanInput,
    Create,
    ImageField,
    ImageInput,
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

    const transform = (data:any)=>({
        ...data,

        thumbnail:
            typeof data.thumbnail === "string"
                ? data.thumbnail
                : data.thumbnail?.src,

        status:data.status ? 1 : 0,

        category:{
            id:data.category.id
        }
    })

    return (
        <Create title="Tạo bài viết" transform={transform}>
            <SimpleForm>
                <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />
                <TextInput source="slug" label="Slug" validate={req} fullWidth />

                <ImageInput
                    source="thumbnail"
                    label="Ảnh thumbnail"
                    accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                    validate={req}
                    placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh."
                >
                    <ImageField source="src" />
                </ImageInput>

                <TextInput
                    source="shortDescription"
                    label="Mô tả ngắn"
                    multiline
                    fullWidth
                    validate={req}
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
                    defaultValue={true}
                />

                <NumberInput
                    source="viewCount"
                    label="Lượt xem"
                    defaultValue={0}
                    disabled
                />
            </SimpleForm>
        </Create>
    );
};