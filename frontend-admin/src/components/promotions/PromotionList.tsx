import {
    BooleanField,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FunctionField,
    List,
    NumberField,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    CreateButton,
} from "react-admin";
import DeleteButton from "../../layout/DeleteButton";
import * as React from "react";
import { PromotionSearch } from "./PromotionSearch";

const adminInfo = JSON.parse(localStorage.getItem("auth") || "{}");

const isAdmin =
    adminInfo?.roles?.includes?.("ADMIN") ||
    adminInfo?.role === "ADMIN" ||
    adminInfo?.role?.description === "ADMIN";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        {isAdmin && <CreateButton />}
        <ExportButton />
    </TopToolbar>
);

export const PromotionList = () => (
    <List
        title="Danh sách mã giảm giá"
        sort={{ field: "id", order: "DESC" }}
        perPage={10}
        filters={PromotionSearch}
        actions={<ListActions />}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="code" label="Mã giảm giá" />
            <TextField source="name" label="Tên" />

            <FunctionField
                label="% Giảm giá"
                render={(record: any) =>
                    record?.discountPercent != null
                        ? `${record.discountPercent}%`
                        : "0%"
                }
            />

            <DateField source="startDate" label="Ngày hiệu lực" showTime />
            <DateField source="endDate" label="Ngày hết hạn" showTime />

            <NumberField source="usageCount" label="Đã sử dụng" />
            <BooleanField source="status" label="Trạng thái" />

            {isAdmin && <EditButton />}
            {isAdmin && <DeleteButton />}
        </DatagridConfigurable>
    </List>
);