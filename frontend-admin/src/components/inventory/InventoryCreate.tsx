import {
    ArrayInput,
    Create,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    useGetList,
} from "react-admin";
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

export const InventoryCreate = () => {
    const { data: products = [] } = useGetList<Product>("products", {
        filter: { active: true },
        sort: { field: "title", order: "ASC" },
        pagination: { page: 1, perPage: 100 },
    });

    const transform = (data: any) => ({
        InventoryRequest: data.InventoryRequest.map((item: any) => ({
            productId: item.productId,
            importPrice: Number(item.importPrice),
            salePrice: Number(item.salePrice),
            quantity: Number(item.quantity),
        })),
    });

    return (
        <Create title="Nhập sản phẩm" transform={transform}>
            <SimpleForm>
                <ArrayInput source="InventoryRequest" label="Danh sách sản phẩm nhập">
                    <SimpleFormIterator sx={{ marginTop: "20px" }} inline>
                        <SelectInput
                            sx={{ maxWidth: "22em" }}
                            source="productId"
                            label="Sản phẩm"
                            choices={products}
                            optionText="title"
                            optionValue="id"
                            validate={req}
                        />

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
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};