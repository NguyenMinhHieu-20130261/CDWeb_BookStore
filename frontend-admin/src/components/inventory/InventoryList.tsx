import {
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
import DeleteButton from "../../layout/DeleteButton";
import * as React from "react";
import { InventorySearch } from "./InventorySearch";
import {
    StockStatusField,
    inventoryRowStyle,
} from "../../layout/StockStatus";

const adminInfo = JSON.parse(localStorage.getItem("auth") || "{}");

const isAdmin =
    adminInfo?.roles?.includes("ADMIN") ||
    adminInfo?.role === "ADMIN";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        {isAdmin && <CreateButton />}
        {isAdmin && <DeleteButton />}
        <ExportButton />
    </TopToolbar>
);
export const InventoryList = () => (
    <List
        title="Quản lý lô hàng"
        sort={{ field: "remainingQuantity", order: "DESC" }}
        perPage={10}
        filters={InventorySearch}
        actions={<ListActions />}
    >
        <DatagridConfigurable
            rowStyle={inventoryRowStyle}
            sx={{
                "& .RaDatagrid-headerCell": {
                    fontWeight: 700,
                    backgroundColor: "#fafafa",
                },
                "& .RaDatagrid-row:hover": {
                    backgroundColor: "#f5f7fb !important",
                },
            }}
        >
            <TextField source="batchCode" label="Mã lô" />
            <TextField source="id" label="ID" />
            <TextField source="product.title" label="Tên sản phẩm" />
            <NumberField
                source="importPrice"
                label="Giá nhập"
                options={{ style: "currency", currency: "VND" }}
            />
            <NumberField
                source="salePrice"
                label="Giá bán"
                options={{ style: "currency", currency: "VND" }}
            />
            <NumberField source="importedQuantity" label="SL nhập" />
            <NumberField source="remainingQuantity" label="SL còn lại" />
            <TextField source="createdAt" label="Ngày tạo" />
            <TextField source="importedAt" label="Ngày nhập" />
            <StockStatusField/>
            <ShowButton />
            <EditButton />
        </DatagridConfigurable>
    </List>
);