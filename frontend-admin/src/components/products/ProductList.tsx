import {
    ArrayField,
    BooleanField,
    ChipField,
    CreateButton,
    DatagridConfigurable,
    EditButton,
    ExportButton, FilterButton,
    ImageField,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    ShowButton,
    TextField,
    TopToolbar, useTranslate
} from "react-admin";
import * as React from "react";
import DeleteButton from "../../layout/DeleteButton";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";

const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');
const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {adminInfo.roles[0] === 'ADMIN' && <CreateButton/>}
        <ExportButton/>
    </TopToolbar>
);

const QuickFilter = ({label, source, defaultValue}: { label: string, source?: string, defaultValue?: boolean }) => {
    const translate = useTranslate();
    return <Chip sx={{marginBottom: 1}} label={translate(label)}/>;
};

const postFilters = [
    <SearchInput source="title" placeholder="Tìm kiếm" alwaysOn/>,
    <QuickFilter source="active" label="Không hoạt động" defaultValue={false}/>,
];

export const ProductList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
          perPage={10}
          filters={postFilters}
          actions={<ListActions/>}
          sx={{'& .column-title': {minWidth: '10rem'}}}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <ChipField source="category.name" label="Danh mục"/>
            <TextField source="title" label="Tên sản phẩm"/>
            <ImageField source="image" label="Hình ảnh"
                        sx={{'& img': {maxWidth: 70, maxHeight: 70, objectFit: 'contain'}}}/>
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
                    {adminInfo.roles[0] === 'ADMIN' && <EditButton />}
                </Box>
            </Box>
        </DatagridConfigurable>
    </List>
);