import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
} from "react-admin";

export const SystemLogList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="action" label="Hành động" />
            <TextField source="level" label="Mức độ" />
            <TextField source="description" label="Mô tả" />
            <NumberField source="userId" label="User ID" />
            <TextField source="username" label="Người dùng" />
            <DateField source="createdAt" label="Thời gian" showTime />
        </Datagrid>
    </List>
);