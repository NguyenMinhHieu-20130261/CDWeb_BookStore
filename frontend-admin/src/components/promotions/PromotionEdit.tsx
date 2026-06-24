import { Edit, useRecordContext } from "react-admin";
import * as React from "react";
import { PromotionForm } from "./PromotionForm";

const PromotionTitle = () => {
    const record = useRecordContext<any>();
    if (!record) return null;
    return <span>{record.code}</span>;
};
const formatDateTime = (value: string) => {
    if (!value) return value;
    return value.length === 16 ? `${value}:00` : value;
};

const transform = (data: any) => ({
    ...data,
    discountPercent: Number(data.discountPercent),
    discount: data.discount ?? Number(data.discountPercent),
    startDate: formatDateTime(data.startDate),
    endDate: formatDateTime(data.endDate),
    usageCount: data.usageCount ?? 0,
    isCode: data.isCode ?? true,
    status: data.status ?? true,
    product: data.product?.id ? { id: data.product.id } : null,
});

export const PromotionEdit = () => (
    <Edit title={<PromotionTitle />} transform={transform}>
        <PromotionForm />
    </Edit>
);