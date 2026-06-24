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
    usageCount: 0,
    isCode: data.isCode ?? true,
    status: data.status ?? true,
    product: null,
});