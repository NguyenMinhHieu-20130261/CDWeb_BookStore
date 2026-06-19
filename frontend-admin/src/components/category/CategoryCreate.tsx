import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
} from "react-admin";

export const CategoryCreate = () => (
    <Create>
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
                defaultValue={true}
            />
        </SimpleForm>
    </Create>
);