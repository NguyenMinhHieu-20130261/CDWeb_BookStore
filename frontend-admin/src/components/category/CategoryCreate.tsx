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
        validate={[required()]}
        fullWidth
      />

      <BooleanInput
        source="status"
        label="Đang hoạt động"
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);