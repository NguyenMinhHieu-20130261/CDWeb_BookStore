import {
    BooleanField,
    Datagrid,
    EditButton,
    ImageField,
    List,
    NumberField,
    TextField,
} from "react-admin";

export const BannerList = () => (
    <List>
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <ImageField source="image" label="Ảnh" />
            <TextField source="title" label="Tiêu đề" />
            <TextField source="subtitle" label="Mô tả" />
            <TextField source="link" label="Link" />
            <NumberField source="position" label="Vị trí" />
            <BooleanField source="active" label="Hiển thị" />
            <EditButton />
        </Datagrid>
    </List>
);