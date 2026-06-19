import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    DeleteButton,
} from "react-admin";
import { CategorySearch } from "./CategorySearch";

export const CategoryList = () => (
    <List
        title="Danh sách danh mục"
        sort={{ field: "id", order: "DESC" }}
        perPage={10}
        filters={CategorySearch}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên danh mục" />
            <TextField source="parentCategory.name" label="Danh mục cha" />
            <BooleanField source="active" label="Đang hoạt động" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);