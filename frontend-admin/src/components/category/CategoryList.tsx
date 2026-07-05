import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    DateField,
} from "react-admin";
import DeleteButton from "../../layout/general/DeleteButton";
import { CategorySearch } from "./CategorySearch";
export const CategoryList = () => (
    <List
        title="Quản lý danh mục"
        sort={{ field: "id", order: "DESC" }}
        perPage={10}
        filters={CategorySearch}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên danh mục" />
            <TextField source="parentCategory.name" label="Danh mục cha" />
            <BooleanField source="active" label="Đang hoạt động" />
            <DateField source="createdAt" label="Ngày tạo" showTime/>
            <DateField source="updatedAt" label="Ngày cập nhật" showTime/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);