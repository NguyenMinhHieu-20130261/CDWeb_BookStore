import {
    List,
    DatagridConfigurable,
    TextField,
    BooleanField,
    DateField,
    ShowButton,
    TopToolbar,
    ExportButton,
    SelectColumnsButton,
} from "react-admin";
import DeleteButton from "../../layout/general/DeleteButton";

const AddressActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

export const AddressList = () => (
    <List
        title="Quản lý địa chỉ"
        perPage={10}
        sort={{
            field:"id",
            order:"DESC"
        }}
        actions={<AddressActions/>}
    >
        <DatagridConfigurable rowClick="show">
            <TextField
                source="id"
                label="ID"
            />
            <TextField
                source="fullName"
                label="Người nhận"
            />
            <TextField
                source="phoneNumber"
                label="SĐT"
            />
            <TextField
                source="detailAdrs"
                label="Địa chỉ"
            />
            <TextField
                source="provinceCity"
                label="Tỉnh"
            />
            <TextField
                source="countyDistrict"
                label="Quận/Huyện"
            />
            <TextField
                source="wardCommune"
                label="Phường/Xã"
            />
            <BooleanField
                source="isDefault"
                label="Mặc định"
            />
            <DateField
                source="createdAt"
                label="Ngày tạo"
                showTime
            />
            <ShowButton/>
            <DeleteButton/>
        </DatagridConfigurable>

    </List>
);