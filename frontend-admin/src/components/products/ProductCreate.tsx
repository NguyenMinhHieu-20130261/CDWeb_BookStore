import * as React from "react";
import {useEffect, useState} from "react";
import {Category} from "../../type";
import {
    Create,
    DateInput,
    ImageField,
    ImageInput,
    minValue,
    NumberInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    useGetList
} from "react-admin";
import {RichTextInput} from "ra-input-rich-text";
import {Grid} from "@mui/material";

export const ProductCreate = () => {
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

    const {data: mainData}: any = useGetList<Category>('categories', {
        filter: {parentCategory: 1, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });
    const {data: subData} = useGetList('categories', {
        filter: {parentCategory: selectedMainCategory, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });


    useEffect(() => {
        if (mainData) {
            setMainCategories(mainData);
        }
    }, [mainData]);

    useEffect(() => {
        if (subData) {
            setSubCategories(subData);
        }
    }, [subData, selectedMainCategory]);

    const validateMainImage = [required('Ảnh chính không được để trống')];

    const validateSubImages = (value: string | any[]) => {
        if (!value || value.length === 0) {
            return 'Danh sách ảnh phụ phải có ít nhất 1 ảnh';
        }
        if (value && value.length > 5) {
            return 'Danh sách ảnh phụ không được vượt quá 5 ảnh';
        }
        return undefined;
    };
    return (
        <Create title="Thêm sản phẩm">
            <TabbedForm>
                <TabbedForm.Tab label="Thông tin cơ bản">
                    <Grid container>
                        <Grid item xs={12}>
                            <SelectInput
                                sx={{marginRight: '20px'}}
                                source="parentCategory.id"
                                label="Danh mục cha"
                                choices={mainCategories}
                                validate={req}
                                onChange={(e) => setSelectedMainCategory(e.target.value)}
                            />
                            <SelectInput
                                source="category.id"
                                label="Danh mục"
                                choices={subCategories}
                                validate={req}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput source="title" label="Tên sản phẩm" validate={req}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageInput source="image" label="Ảnh chính" accept="image/*" validate={validateMainImage} placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh.">
                                <ImageField source="src"/>
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageInput source="images" label="Danh sách ảnh phụ" accept="image/*" multiple
                                        validate={validateSubImages} placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn một hình ảnh.">
                                <ImageField source="src"/>
                            </ImageInput>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Chi tiết sản phẩm">
                    <Grid container>
                        <Grid item xs={12}>
                            <TextInput source="detail.supplier" label="Nhà cung cấp" sx={{marginRight: '1em'}} validate={req}/>
                            <TextInput source="detail.publisher" label="Nhà xuất bản"/>
                        </Grid>
                        <Grid item xs={12}>
                            <DateInput source="detail.publishYear" label="Năm xuất bản"
                                       sx={{marginRight: '5em'}}/>
                            <TextInput source="detail.author" label="Tác giả"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput source="detail.brand" label="Thương hiệu" sx={{marginRight: '1em'}}/>
                            <TextInput source="detail.origin" label="Xuất xứ"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput source="detail.color" label="Màu sắc" sx={{marginRight: '1em'}}/>
                            <TextInput source="detail.weight" label="Trọng lượng"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput source="detail.size" label="Kích cỡ" sx={{marginRight: '1em'}}/>
                            <NumberInput source="detail.quantityOfPage" label="Số trang" defaultValue={-1}
                                         validate={[minValue(-1)]}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RichTextInput source="detail.description" label="Mô tả sản phẩm" fullWidth validate={req}/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};
const req = [required('Không được để trống')];