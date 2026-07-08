import {
    BooleanField,
    DatagridConfigurable,
    List,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    CreateButton,
    SelectColumnsButton,
} from "react-admin";

const filters = [
    <SearchInput key="q" source="q" placeholder="Tìm thông báo" alwaysOn />,
    <SelectInput
        key="type"
        source="type"
        label="Loại"
        choices={[
            { id: "SYSTEM", name: "Hệ thống" },
            { id: "ORDER", name: "Đơn hàng" },
            { id: "PROMOTION", name: "Khuyến mãi" },
            { id: "PRODUCT", name: "Sản phẩm" },
            { id: "REVIEW", name: "Đánh giá" },
            { id: "INVENTORY", name: "Kho hàng" },
            { id: "ADMIN", name: "Admin" },
        ]}
    />,
];

const ListActions = () => (
    <TopToolbar>
        <CreateButton label="Gửi broadcast" />
        <SelectColumnsButton />
    </TopToolbar>
);

export const NotificationList = () => (
    <List
        filters={filters}
        actions={<ListActions />}
        perPage={10}
        sort={{ field: "createdAt", order: "DESC" }}
    >
        <DatagridConfigurable rowClick={false}>
            <TextField source="id" label="ID" />
            <TextField source="type" label="Loại" />
            <TextField source="title" label="Tiêu đề" />
            <TextField source="message" label="Nội dung" />
            <TextField source="targetUrl" label="Đường dẫn" />
            <TextField source="user.username" label="Người nhận" />
            <BooleanField source="isBroadcast" label="Broadcast" />
            <BooleanField source="isRead" label="Đã đọc" />
            <TextField source="createdAt" label="Ngày tạo" />
        </DatagridConfigurable>
    </List>
);