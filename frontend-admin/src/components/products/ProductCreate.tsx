import * as React from "react";
import { useEffect, useState } from "react";
import { Category } from "../../type";
import {
    Create,
    ImageField,
    ImageInput,
    minValue,
    NumberInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    useGetList,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import Grid from "@mui/material/Grid";

const req = [required("Không được để trống")];

export const ProductCreate = () => {
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<number | null>(null);

    const { data: mainData } = useGetList<Category>("category", {
        filter: { parentCategory: null, active: true },
        sort: { field: "name", order: "ASC" },
        pagination: { page: 1, perPage: 100 },
    });

    const { data: subData } = useGetList<Category>("category", {
        filter: selectedMainCategory
            ? { parentCategory: selectedMainCategory, active: true }
            : { parentCategory: null, active: false },
        sort: { field: "name", order: "ASC" },
        pagination: { page: 1, perPage: 100 },
    });

    useEffect(() => {
        if (mainData) setMainCategories(mainData);
    }, [mainData]);

    useEffect(() => {
        if (subData) setSubCategories(subData);
    }, [subData]);

    const validateMainImage = [required("Ảnh chính không được để trống")];

    const validateSubImages = (value: any[]) => {
        if (!value || value.length === 0) {
            return "Danh sách ảnh phụ phải có ít nhất 1 ảnh";
        }
        if (value.length > 5) {
            return "Danh sách ảnh phụ không được vượt quá 5 ảnh";
        }
        return undefined;
    };

    return (
        <Create title="Thêm sản phẩm">
            <TabbedForm>
                <TabbedForm.Tab label="Thông tin cơ bản">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <SelectInput
                                sx={{ marginRight: "20px" }}
                                source="parentCategory.id"
                                label="Danh mục cha"
                                choices={mainCategories}
                                optionText="name"
                                optionValue="id"
                                validate={req}
                                onChange={(e) => {
                                    setSelectedMainCategory(Number(e.target.value));
                                    setSubCategories([]);
                                }}
                            />

                            <SelectInput
                                source="category.id"
                                label="Danh mục"
                                choices={subCategories}
                                optionText="name"
                                optionValue="id"
                                validate={req}
                                disabled={!selectedMainCategory}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextInput source="title" label="Tên sản phẩm" validate={req} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <NumberInput
                                source="oldPrice"
                                label="Giá gốc"
                                validate={[...req, minValue(0)]}
                                sx={{ marginRight: "1em" }}
                            />
                            <NumberInput
                                source="currentPrice"
                                label="Giá đã giảm"
                                validate={[...req, minValue(0)]}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <ImageInput
                                source="image"
                                label="Ảnh chính"
                                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                                validate={validateMainImage}
                                placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh."
                            >
                                <ImageField source="src" />
                            </ImageInput>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <ImageInput
                                source="images"
                                label="Danh sách ảnh phụ"
                                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                                multiple
                                validate={validateSubImages}
                                placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn ảnh."
                            >
                                <ImageField source="src" />
                            </ImageInput>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Chi tiết sản phẩm">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextInput source="detail.supplier" label="Nhà cung cấp" validate={req} />
                            <TextInput source="detail.publisher" label="Nhà xuất bản" />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <NumberInput source="detail.publishYear" label="Năm xuất bản" />
                            <TextInput source="detail.author" label="Tác giả" />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextInput source="detail.brand" label="Thương hiệu" />
                            <TextInput source="detail.origin" label="Xuất xứ" />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextInput source="detail.color" label="Màu sắc" />
                            <TextInput source="detail.weight" label="Trọng lượng" />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextInput source="detail.size" label="Kích cỡ" />
                            <NumberInput
                                source="detail.quantityOfPage"
                                label="Số trang"
                                defaultValue={-1}
                                validate={[minValue(-1)]}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <RichTextInput
                                source="detail.description"
                                label="Mô tả sản phẩm"
                                fullWidth
                                validate={req}
                            />
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};