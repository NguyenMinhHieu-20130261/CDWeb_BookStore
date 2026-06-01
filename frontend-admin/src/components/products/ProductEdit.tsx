import {
    DateInput,
    Edit,
    ImageField,
    ImageInput,
    Labeled,
    minValue,
    NumberInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    useGetList,
    useRecordContext
} from "react-admin";
import {Grid} from "@mui/material";
import {RichTextInput} from "ra-input-rich-text";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category, Product} from "../../type";
import {useWatch} from "react-hook-form";

const validateSubImages = (value: string | any[]) => {
    if (value && value.length > 5) {
        return 'Danh sách ảnh phụ không được vượt quá 5 ảnh';
    }
    return undefined;
};

const MainImage = () => {
    const isReturn = useWatch({name: 'image'});
    return isReturn ?
        (<>
            <Labeled label="Ảnh chính">
                <ImageField source="image"/>
            </Labeled>
            <ImageInput source="imageNew" label="Thêm ảnh chính mới cho sản phẩm" placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh.">
                <ImageField source="src"/>
            </ImageInput>
        </>)
        :
        (<ImageInput name="image" source="image" label="Thêm ảnh chính mới cho sản phẩm" placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh.">
            <ImageField source="src" label="Ảnh chính"/>
        </ImageInput>);
}

const SubImages = () => {
    const isReturn = useWatch({name: 'images'});
    return isReturn ?
        (<>
            <Labeled label="Danh sách ảnh phụ">
                <ImageField source="images" src="image"/>
            </Labeled>
            <ImageInput source="imagesNew" accept="image/*" multiple validate={validateSubImages}
                        label="Thêm danh sách ảnh phụ mới cho sản phẩm" placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn một hình ảnh.">
                <ImageField source="src"/>
            </ImageInput>
        </>)
        :
        (<ImageInput name="images" source="images" multiple placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn một hình ảnh.">
            <ImageField source="src" label="Danh sách ảnh phụ"/>
        </ImageInput>);
}

export const ProductEdit = () => {
    const record = useRecordContext<Product>();
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | any>(record?.category?.parentCategory?.id);

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

    const ProductTitle = () => {
        const record = useRecordContext<Product>();
        if (!record) return null;
        return <span>{record.title}</span>;
    };
    return (
        <Edit title={<ProductTitle/>}>
            <TabbedForm>
                <TabbedForm.Tab label="Thông tin cơ bản">
                    <Grid container>
                        <Grid item xs={12}>
                            <SelectInput
                                sx={{marginRight: '20px'}}
                                source="category.parentCategory.id"
                                label="Danh mục cha"
                                choices={mainCategories}
                                validate={req}
                                onChange={(e) => setSelectedMainCategory(e.target.value)}
                            />
                            <SelectInput
                                sx={{marginRight: '20px'}}
                                source="category.id"
                                label="Danh mục"
                                choices={subCategories}
                                value={record?.category?.id}
                            />
                            <SelectInput
                                source="active"
                                label="Trạng thái"
                                validate={req}
                                choices={[
                                    {id: true, name: 'Hiển thị'},
                                    {id: false, name: 'Ẩn'},
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput sx={{width: 'fit-content'}} source="title" label="Tên sản phẩm" validate={req}/>
                        </Grid>
                        <Grid item xs={12}>
                            <MainImage/>
                        </Grid>
                        <Grid item xs={12}>
                            <SubImages/>
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
                            <NumberInput source="detail.quantityOfPage" label="Số trang" validate={[minValue(-1)]}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RichTextInput source="detail.description" label="Mô tả sản phẩm" fullWidth validate={req}/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};
const req = [required('Không được để trống')];