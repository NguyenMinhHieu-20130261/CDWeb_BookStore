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
        validate={[required()]}
        fullWidth
      />
      <BooleanInput
        source="status"
        label="Đang hoạt động" />
    </SimpleForm>
  </Edit>
);