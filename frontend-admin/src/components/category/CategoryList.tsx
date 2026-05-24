import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Tên danh mục" />
      <BooleanField source="status" label="Đang hoạt động" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);