import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
} from "react-admin";

const CateEditForm = () => {
    return (
        <SimpleForm>
            <TextInput
                source="name"
                label="Tên danh mục"
                validate={[required("Không được để trống")]}
                fullWidth
            />
            <BooleanInput
                source="active"
                label="Đang hoạt động" />
        </SimpleForm>
    );
};
export const BlogCateEdit = () => (
    <Edit>
        <CateEditForm />
    </Edit>
);