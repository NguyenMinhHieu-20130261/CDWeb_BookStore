import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
} from "react-admin";

export const BlogCateCreate = () => {
    return(
        <Create title="Thêm danh mục">
            <SimpleForm>
                <TextInput
                    source="name"
                    label="Tên danh mục"
                    validate={[required("Không được để trống")]}
                    fullWidth
                />
                <BooleanInput
                    source="active"
                    label="Hoạt động"
                    defaultValue={true}
                />
            </SimpleForm>
        </Create>
    );
};