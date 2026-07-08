import {
    ArrayInput,
    Create,
    NumberInput,
    required,
    ReferenceInput,
    AutocompleteInput,
    SimpleForm,
    SimpleFormIterator,
    SelectInput,
    TextInput,
    useGetList,
    useSimpleFormIteratorItem,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Product } from "../../type";

const req = [required("Không được để trống")];

const minValueCustom = (min: number) => (value: number) => {
    if (value == null) return undefined;
    return value < min ? `Giá trị phải >= ${min}` : undefined;
};

const salePriceValidate = (value: number, allValues: any) => {
    if (!value) return "Không được để trống";

    const items = allValues?.inventoryRequest || [];

    for (const item of items) {
        if (
            item?.salePrice &&
            item?.importPrice &&
            Number(item.salePrice) < Number(item.importPrice)
        ) {
            return "Giá bán không được nhỏ hơn giá nhập";
        }
    }

    return undefined;
};

const ProductStockInfo = ({ products }: any) => {
    const { index } = useSimpleFormIteratorItem();

    const productId = useWatch({
        name: `inventoryRequest.${index}.productId`
    });

    const product = products.find(
        (p: any) => Number(p.id) === Number(productId)
    );

    return (
        <Box sx={{ minWidth: "10em", mt: 1 }}>
            <Typography variant="caption">
                Tồn hiện có
            </Typography>

            <Typography fontWeight={600}>
                {product?.detail?.quantity ?? 0}
            </Typography>
        </Box>
    );
};

export const InventoryCreate = () => {
    const { data: products = [] } = useGetList<Product>("products", {
        filter: { active: true },
        sort: { field: "title", order: "ASC" },
        pagination: { page: 1, perPage: 100 },
    });

    const transform = (data: any) => ({
        supplierId: data.supplierId || null,
        inventoryRequest: data.inventoryRequest?.map((item: any) => ({
            productId: item.productId,
            importPrice: Number(item.importPrice),
            salePrice: Number(item.salePrice),
            quantity: Number(item.quantity),
            note: item.note || "",
        })) || [],
    });
    return (
        <Create title="Nhập sản phẩm" transform={transform}>
            <SimpleForm>
                <ReferenceInput source="supplierId" reference="suppliers">
                    <AutocompleteInput
                        label="Nhà cung cấp"
                        optionText="name"
                        optionValue="id"
                        fullWidth
                        helperText="Có thể bỏ trống"
                    />
                </ReferenceInput>

                <ArrayInput source="inventoryRequest" label="Danh sách sản phẩm nhập">
                        <SimpleFormIterator
                        sx={{
                            mt: 2,
                            "& .RaSimpleFormIterator-line": {
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                alignItems: "flex-start",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "2fr 120px 140px 140px 120px 1.5fr",
                                gap: 2,
                                width: "100%",
                                alignItems: "start",
                            }}
                        >
                            <AutocompleteInput
                                source="productId"
                                label="Sản phẩm"
                                choices={products}
                                optionValue="id"
                                optionText={(record: any) =>
                                    record ? `${record.code || record.id} - ${record.title}` : ""
                                }
                                matchSuggestion={(filter, choice: any) => {
                                    const keyword = filter.toLowerCase();
                                    return (
                                        choice.title?.toLowerCase().includes(keyword) ||
                                        String(choice.code || choice.id).toLowerCase().includes(keyword)
                                    );
                                }}
                                validate={req}
                                fullWidth
                            />

                            <ProductStockInfo products={products} />

                            <NumberInput
                                source="importPrice"
                                label="Giá nhập"
                                step={1000}
                                helperText={false}
                                validate={[required("Không được để trống"), minValueCustom(1000)]}
                                fullWidth
                            />

                            <NumberInput
                                source="salePrice"
                                label="Giá bán"
                                step={1000}
                                helperText={false}
                                validate={[salePriceValidate, minValueCustom(1000)]}
                                fullWidth
                            />

                            <NumberInput
                                source="quantity"
                                label="Số lượng"
                                helperText={false}
                                validate={[required("Không được để trống"), minValueCustom(1)]}
                                fullWidth
                            />

                            <TextInput
                                source="note"
                                label="Ghi chú"
                                helperText="VD: Tặng kèm"
                                multiline
                                fullWidth
                            />
                        </Box>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};