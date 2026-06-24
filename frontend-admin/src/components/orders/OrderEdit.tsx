import {
    Edit,
    SelectInput,
    SimpleForm,
    TextInput,
    NumberInput,
    useGetList,
    useRecordContext,
} from "react-admin";
import * as React from "react";
import { Order, OrderStatus } from "../../type";

const OrderTitle = () => {
    const record = useRecordContext<Order>();
    if (!record) return null;
    return <span>{record.orderCode}</span>;
};

const transform = (data: any) => ({
    status: {
        id: data.status?.id,
    },
});

export const OrderEdit = () => {
    const { data: statuses } = useGetList<OrderStatus>("order-status", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: {},
    });

    return (
        <Edit title={<OrderTitle />} transform={transform}>
            <SimpleForm>
                <TextInput source="orderCode" label="Mã đơn" disabled />

                <NumberInput
                    source="orderTotal"
                    label="Tổng tiền"
                    disabled
                />

                <TextInput
                    source="paymentMethod"
                    label="Phương thức thanh toán"
                    disabled
                />

                <SelectInput
                    source="status.id"
                    label="Trạng thái đơn hàng"
                    choices={statuses || []}
                    optionText="name"
                    optionValue="id"
                />
            </SimpleForm>
        </Edit>
    );
};