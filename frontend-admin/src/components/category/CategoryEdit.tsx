import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
} from "react-admin";

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput
                source="name"
                label="Tên danh mục"
                validate={[required("Không được để trống")]}
                fullWidth
            />

            <BooleanInput
                source="active"
                label="Đang hoạt động"
            />
        </SimpleForm>
    </Edit>
);