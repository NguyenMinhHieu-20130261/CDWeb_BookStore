import {
    DatagridConfigurable,
    DateField,
    EditButton,
    FunctionField,
    List,
    NumberField,
    SelectColumnsButton,
    TextField,
    TopToolbar,
} from "react-admin";
import * as React from "react";
import { OrderSearch } from "./OrderSearch";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

export const OrderList = () => (
    <List
        title="Quản lý đơn hàng"
        sort={{ field: "id", order: "DESC" }}
        perPage={10}
        filters={OrderSearch}
        actions={<ListActions />}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="orderCode" label="Mã đơn" />

            <FunctionField
                label="Khách hàng"
                render={(record: any) =>
                    record?.user?.username || record?.user?.email || "Khách"
                }
            />

            <DateField source="orderDate" label="Ngày đặt" showTime />

            <NumberField
                source="orderTotal"
                label="Tổng tiền"
                options={{
                    style: "currency",
                    currency: "VND",
                }}
            />

            <NumberField source="totalQuantity" label="Số lượng" />

            <TextField source="paymentMethod" label="Thanh toán" />
            <TextField source="status.name" label="Trạng thái" />

            <EditButton label="Cập nhật" />
        </DatagridConfigurable>
    </List>
);