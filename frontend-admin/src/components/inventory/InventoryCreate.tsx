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

    const items = allValues?.InventoryRequest || [];

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
        name: `InventoryRequest.${index}.productId`
    });

    const product = products.find(
        (p: any) => p.id === productId
    );

    return (
        <Box sx={{ minWidth: "10em", mt: 1 }}>
            <Typography variant="caption">
                Tồn hiện có
            </Typography>

            <Typography fontWeight={600}>
                {product?.remainingQuantity ?? 0}
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
        supplierId: data.supplierId,
        InventoryRequest: data.InventoryRequest.map((item: any) => ({
            productId: item.productId,
            importPrice: Number(item.importPrice),
            salePrice: Number(item.salePrice),
            quantity: Number(item.quantity),
            note: item.note || "",
        })),
    });

    return (
        <Create title="Nhập sản phẩm" transform={transform}>
            <SimpleForm>
                <ReferenceInput
                    source="supplierId"
                    reference="suppliers"
                >
                    <AutocompleteInput
                        label="Nhà cung cấp"
                        optionText="name"
                        optionValue="id"
                        validate={req}
                        fullWidth
                    />
                </ReferenceInput>

                <ArrayInput source="InventoryRequest" label="Danh sách sản phẩm nhập">
                    <SimpleFormIterator sx={{ mt: 2 }} inline>
                        <AutocompleteInput
                            sx={{ minWidth: "28em" }}
                            source="productId"
                            label="Tìm sản phẩm theo mã hoặc tên"
                            choices={products}
                            optionValue="id"
                            optionText={(record: any) =>
                                record
                                    ? `${record.code || record.id} - ${record.title}`
                                    : ""
                            }
                            matchSuggestion={(filter, choice: any) => {
                                const keyword = filter.toLowerCase();

                                return (
                                    choice.title?.toLowerCase().includes(keyword) ||
                                    String(choice.code || choice.id)
                                        .toLowerCase()
                                        .includes(keyword)
                                );
                            }}
                            validate={req}
                        />

                        <ProductStockInfo products={products} />

                        <NumberInput
                            sx={{ maxWidth: "10em" }}
                            source="importPrice"
                            label="Giá nhập"
                            step={1000}
                            helperText={false}
                            validate={[required("Không được để trống"), minValueCustom(1000)]}
                        />

                        <NumberInput
                            sx={{ maxWidth: "10em" }}
                            source="salePrice"
                            label="Giá bán"
                            step={1000}
                            helperText={false}
                            validate={[salePriceValidate, minValueCustom(1000)]}
                        />

                        <NumberInput
                            sx={{ maxWidth: "9em" }}
                            source="quantity"
                            label="Số lượng"
                            helperText={false}
                            validate={[required("Không được để trống"), minValueCustom(1)]}
                        />

                        <TextInput
                            sx={{ minWidth: "18em" }}
                            source="note"
                            label="Ghi chú"
                            helperText="VD: Tặng kèm từ nhà cung cấp"
                            multiline
                        />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};