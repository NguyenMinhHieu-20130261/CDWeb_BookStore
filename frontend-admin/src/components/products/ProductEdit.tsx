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
import * as React from "react";
import {useEffect, useState} from "react";
import {useWatch} from "react-hook-form";
import Grid from "@mui/material/Grid";
import {RichTextInput} from "ra-input-rich-text";
import {Category, Product} from "../../type";

const validateSubImages = (value: string | any[]) => {
    if (value && value.length > 5) {
        return 'Danh sách ảnh phụ không được vượt quá 5 ảnh';
    }
    return undefined;
};

const MainImage = () => {
    const record = useRecordContext<Product>();
    const imageWatch = useWatch({name: 'image'});
    const isReturn = imageWatch || (record?.images && record.images.length > 0 ? record.images[0].image : null);

    return isReturn ?
        (<>
            <Labeled label="Ảnh chính">
                <img src={isReturn} alt="Ảnh chính" style={{ maxWidth: 200, maxHeight: 200, objectFit: "contain", display: "block", marginBottom: 10 }} />
            </Labeled>
            <ImageInput source="imageNew" label="Thêm ảnh chính mới cho sản phẩm" placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh.">
                <ImageField source="src"/>
            </ImageInput>
        </>)
        :
        (<ImageInput source="image" label="Thêm ảnh chính mới cho sản phẩm" placeholder="Thả ảnh để tải lên hoặc nhấp để chọn ảnh.">
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
            <ImageInput 
                source="imagesNew" 
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                multiple validate={validateSubImages}
                label="Thêm danh sách ảnh phụ mới cho sản phẩm" 
                placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn một hình ảnh.">
                <ImageField source="src"/>
            </ImageInput>
        </>)
        :
        (<ImageInput source="images" multiple placeholder="Thả một số hình ảnh để tải lên hoặc nhấp để chọn một hình ảnh.">
            <ImageField source="src" label="Danh sách ảnh phụ"/>
        </ImageInput>);
}

export const ProductEditForm = () => {
    const record = useRecordContext<Product>();
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = 
        useState<string | any>(record?.category?.parentCategory?.id);
    const {data: mainData}: any = useGetList<Category>('category', {
        filter: {parentCategory: null, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });
    const {data: subData} = useGetList('category', {
        filter: selectedMainCategory
            ? { parentCategory: selectedMainCategory, active: true }
            : { parentCategory: -1, active: true },
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
    useEffect(() => {
        if (record?.category?.parentCategory?.id) {
            setSelectedMainCategory(record.category.parentCategory.id);
        } else if (record?.category?.id) {
            setSelectedMainCategory(record.category.id);
        }
    }, [record]);
    const subCategoryChoices = selectedMainCategory? [
        { id: selectedMainCategory, name: "Không có danh mục con" },
        ...subCategories
    ]: subCategories;
    return (
        <TabbedForm>
            <TabbedForm.Tab label="Thông tin cơ bản">
                <Grid container>
                    <Grid size={{ xs: 12 }}>
                        <SelectInput
                            id="main-category-id"
                            sx={{ marginRight: '20px' }}
                            source="mainCategoryId"
                            label="Danh mục cha"
                            choices={mainCategories}
                            defaultValue={selectedMainCategory}
                            onChange={(e) => {
                                setSelectedMainCategory(e.target.value);
                            }}
                        />
                        <SelectInput
                            id="category-id"
                            sx={{marginRight: '20px'}}
                            source="category.id"
                            label="Danh mục"
                            choices={subCategoryChoices}
                            // value={record?.category?.id}
                        />
                        <SelectInput
                            id="active-status"
                            source="active"
                            label="Trạng thái"
                            validate={req}
                            choices={[
                                {id: true, name: 'Hiển thị'},
                                {id: false, name: 'Ẩn'},
                            ]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextInput sx={{width: 'fit-content'}} 
                            source="title" 
                            label="Tên sản phẩm" 
                            validate={req}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <NumberInput
                            source="oldPrice"
                            label="Giá gốc"
                            validate={[...req, minValue(0)]}
                            sx={{ marginRight: '1em' }}
                        />  
                        <NumberInput
                            source="currentPrice"
                            label="Giá đã giảm"
                            validate={[...req, minValue(0)]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <MainImage/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <SubImages/>
                    </Grid>
                </Grid>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Chi tiết sản phẩm">
                <Grid container>
                    <Grid size={{ xs: 12 }}>
                        <TextInput source="detail.supplier" label="Nhà cung cấp" sx={{marginRight: '1em'}} validate={req}/>
                        <TextInput source="detail.publisher" label="Nhà xuất bản"/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <DateInput source="detail.publishYear" label="Năm xuất bản"
                                    sx={{marginRight: '5em'}}/>
                        <TextInput source="detail.author" label="Tác giả"/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextInput source="detail.brand" label="Thương hiệu" sx={{marginRight: '1em'}}/>
                        <TextInput source="detail.origin" label="Xuất xứ"/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextInput source="detail.color" label="Màu sắc" sx={{marginRight: '1em'}}/>
                        <TextInput source="detail.weight" label="Trọng lượng"/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextInput source="detail.size" label="Kích cỡ" sx={{marginRight: '1em'}}/>
                        <NumberInput source="detail.quantityOfPage" label="Số trang" validate={[minValue(-1)]}/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <RichTextInput source="detail.description" label="Mô tả sản phẩm" fullWidth validate={req}/>
                    </Grid>
                </Grid>
            </TabbedForm.Tab>
        </TabbedForm>
    );

};
export const ProductEdit = () => {
    const ProductTitle = () => {
        const record = useRecordContext<Product>();
                if (!record) return null;
                return <span>{record.title}</span>;
    }
    return(
        <Edit title={<ProductTitle/>}>
            <ProductEditForm />
        </Edit>
    );
};
const req = [required('Không được để trống')];