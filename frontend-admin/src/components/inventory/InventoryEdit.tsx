import {
    BooleanInput,
    Edit,
    SimpleForm,
    TextInput,
    TextField,
    NumberField,
    DateField,
    FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";

export const InventoryEdit = () => (
    <Edit title="Cập nhật lô hàng">
        <SimpleForm>
            <TextField 
                source="batchCode" 
                label="Mã lô" 
            />
            <TextField 
                source="product.title" 
                label="Sản phẩm" 
            />
            <NumberField 
                source="remainingQuantity" 
                label="Số lượng còn"
            />
            <FunctionField
                label="Tình trạng kho"
                render={(record:any)=>{
                    if(record.remainingQuantity === 0)
                        return (
                            <Chip
                              label="Hết hàng"
                              color="error"
                            />
                        )
                    if(record.remainingQuantity < 10)
                        return (
                            <Chip
                              label="Sắp hết"
                              color="warning"
                            />
                        )
                    return (
                        <Chip
                          label="Còn hàng"
                          color="success"
                        />
                    )
                }}
            />
            <DateField 
                source="importedAt" 
                label="Ngày nhập"
                showTime 
            />
            <BooleanInput 
                source="active"
                label="Cho phép bán"
            />
            <TextInput 
                source="note"
                label="Ghi chú"
                multiline
                rows={3}
                fullWidth
            />
        </SimpleForm>
    </Edit>
);