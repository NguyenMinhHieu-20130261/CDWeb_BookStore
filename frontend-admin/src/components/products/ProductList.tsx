import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    EditButton,
    ExportButton,
    FilterButton,
    FunctionField,
    List,
    NumberField,
    SelectColumnsButton,
    TextField,
    TopToolbar,
} from "react-admin";
import DeleteButton from "../../layout/general/DeleteButton";
import { ProductSearch } from "./ProductSearch";
import * as React from "react";
import Box from "@mui/material/Box";
// import {Chip} from "@mui/material";

const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');
const isAdmin =
    adminInfo?.roles?.includes?.("ADMIN") ||
    adminInfo?.role === "ADMIN" ||
    adminInfo?.role?.description === "ADMIN";
    const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {isAdmin && <CreateButton />}
        {/* <CreateButton/> */}
        <ExportButton/>
    </TopToolbar>
);
export const ProductList = () => (
    <List 
        title="Quản lý sản phẩm"
        sort={{field: 'id', order: 'ASC'}}
        perPage={10}
        filters={ProductSearch}
        actions={<ListActions/>}
        sx={{'& .column-title': {minWidth: '10rem'}}}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <FunctionField
                label="Danh mục"
                render={(record: any) => record?.category?.name || "Chưa có danh mục"}
            />            
            <TextField source="title" label="Tên sản phẩm"/>
            <FunctionField
                label="Hình ảnh"
                render={(record: any) => {
                    const firstImage = record?.image || (record?.images && record.images.length > 0
                        ? record.images[0].image
                        : null);
                    return firstImage ? (
                        <img
                            src={firstImage}
                            alt={record.title}
                            style={{ maxWidth: 70, maxHeight: 70, objectFit: "contain" }}
                        />
                    ) : (
                        "Chưa có ảnh"
                    );
                }}
            />
            <NumberField source="oldPrice" options={{
                style: 'currency',
                currency: 'VND',
            }}
                         label="Giá gốc"/>
            <NumberField source="currentPrice" options={{
                style: 'currency',
                currency: 'VND',
            }}
                         label="Giá hiện tại"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
            <BooleanField source="active" label="Trạng thái"/>
            <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                    {isAdmin && <EditButton />}
                    {/* <EditButton/> */}
                    {isAdmin && <DeleteButton/>}
                </Box>
            </Box>
        </DatagridConfigurable>
    </List>
);