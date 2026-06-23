import {
    BooleanInput,
    Edit,
    SimpleForm,
    TextInput,
    TextField,
    NumberField,
    DateField,
} from "react-admin";

export const InventoryEdit = () => (
    <Edit title="Cập nhật trạng thái lô hàng">
        <SimpleForm>
            <TextField source="id" label="ID" />
            <TextField source="batchCode" label="Mã lô" />
            <TextField source="product.title" label="Tên sản phẩm" />

            <NumberField source="remainingQuantity" label="Số lượng còn lại" />
            <DateField source="importedAt" label="Ngày nhập" showTime />

            <BooleanInput source="active" label="Đang hoạt động" />

            <TextInput source="note" label="Ghi chú" fullWidth multiline rows={3} />
        </SimpleForm>
    </Edit>
);