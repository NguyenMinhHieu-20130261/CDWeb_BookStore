import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    NumberField,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    ShowButton,
    EditButton,
} from "react-admin";
import * as React from "react";
import { Inventory } from "../../type";
import { InventorySearch } from "./InventorySearch";

const adminInfo = JSON.parse(localStorage.getItem("auth") || "{}");
const isAdmin =
    adminInfo?.roles?.includes("ADMIN") ||
    adminInfo?.role === "ADMIN";
const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {isAdmin && <CreateButton />}
        <ExportButton/>
    </TopToolbar>
);
const rowStyle = (record: Inventory, index: number) => {
    if (record.remainingQuantity === 0) {
        return {backgroundColor: '#ff6666'};
    } else if (record.remainingQuantity < 10) {
        return {backgroundColor: '#ffcccc'};
    } else {
        return {backgroundColor: 'white'};
    }
};
export const InventoryList = () => (
    <List sort={{field: 'remainingQuantity', order: 'DESC'}}
          perPage={10}
          filters={InventorySearch}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowStyle={rowStyle}>
            <TextField source="batchCode" label="Mã lô" />
            <TextField source="id" label="ID"/>
            <TextField source="product.title" label="Tên sản phẩm"/>
            <NumberField source="importPrice"
                         options={{
                             style: 'currency',
                             currency: 'VND',
                         }}
                         label="Giá nhập"/>
            <NumberField source="salePrice"
                         options={{
                             style: 'currency',
                             currency: 'VND',
                         }}
                         label="Giá bán"/>
            <NumberField source="importedQuantity" label="Số lượng nhập"/>
            <NumberField source="remainingQuantity" label="Số lượng còn lại"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="importedAt"  label="Ngày nhập" />
            <BooleanField source="active" label="Trạng thái"/>

            <ShowButton />
            <EditButton/>
        </DatagridConfigurable>
    </List>
);