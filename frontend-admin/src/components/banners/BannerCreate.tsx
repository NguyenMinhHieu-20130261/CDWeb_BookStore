import {
    BooleanInput,
    Create,
    Edit,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
} from "react-admin";

const req = [required("Không được để trống")];

export const BannerCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />
            <TextInput source="subtitle" label="Mô tả" fullWidth />
            <TextInput source="image" label="Link ảnh" validate={req} fullWidth />
            <TextInput source="link" label="Đường dẫn khi bấm" fullWidth />
            <NumberInput source="position" label="Vị trí" defaultValue={0} />
            <BooleanInput source="active" label="Hiển thị" defaultValue />
        </SimpleForm>
    </Create>
);

export const BannerEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />
            <TextInput source="subtitle" label="Mô tả" fullWidth />
            <TextInput source="image" label="Link ảnh" validate={req} fullWidth />
            <TextInput source="link" label="Đường dẫn khi bấm" fullWidth />
            <NumberInput source="position" label="Vị trí" />
            <BooleanInput source="active" label="Hiển thị" />
        </SimpleForm>
    </Edit>
);