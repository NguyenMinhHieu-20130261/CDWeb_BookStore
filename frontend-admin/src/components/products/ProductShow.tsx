import {
    ChipField, DateField,
    EditButton,
    ImageField,
    Labeled, NumberField,
    RichTextField,
    Show,
    TextField,
    TopToolbar,
    useRecordContext,
} from "react-admin";
import * as React from "react";
import {Product} from "../../type";
import {jsxs} from "react/jsx-runtime";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
// interface TruncatedRichTextFieldProps {
//     source: string;
//     limit?: number;
//
//     [key: string]: any; // Để cho phép các prop khác như `sx`
// }
//
// const TruncatedRichTextField: React.FC<TruncatedRichTextFieldProps> = ({source, limit = 100, ...rest}) => {
//     const record = useRecordContext();
//     if (!record) return null;
//     const content = record[source] as string; // Ép kiểu để TypeScript hiểu đây là chuỗi
//     const truncatedContent = content.length > limit ? content.substring(0, limit) + '...' : content;
//
//     return <div {...rest} dangerouslySetInnerHTML={{__html: truncatedContent}}/>;
// };

export const ProductShow = () => {
    const ProductTitle = () => {
        const record = useRecordContext<Product>();
        if (!record) return null;
        return <span>{record.title}</span>;
    };

    const PostShowActions = () => (
        <TopToolbar>
            <EditButton/>
        </TopToolbar>
    );
    return (
        <Show title={<ProductTitle/>}
              actions={<PostShowActions/>}>
            <Grid container spacing={2} sx={{margin: 1}}>
                <Grid 
                    size={{ xs: 12,sm:3 }}
                    display='flex' 
                    alignContent="center" 
                    justifyContent="center">
                    <ImageField source="image"
                                sx={{
                                    '& .RaImageField-image': {
                                        minHeight: '200px',
                                    }
                                }}/>
                </Grid>
                <Grid 
                    size={{ xs: 11, sm:8 }}>
                    <Stack spacing={2}>
                        <Labeled label="Mã sản phẩm">
                            <TextField source="detail.productSku" sx={{fontSize: 'larger'}}/>
                        </Labeled>
                        <TextField source="title" sx={{fontSize: '25px', fontWeight: 'bold'}}/>
                        <ChipField source="category.name" sx={{width: 'fit-content'}}/>
                        <Grid size={{ xs: 12 }}>
                            <Labeled label="Giá đã giảm">
                                <NumberField source="currentPrice"
                                             options={{
                                                 style: 'currency',
                                                 currency: 'VND',
                                             }}
                                             sx={{fontSize: 'medium'}}
                                />
                            </Labeled>
                            <Labeled label="Giá gốc" sx={{marginLeft: '10px'}}>
                                <NumberField source="oldPrice"
                                             options={{
                                                 style: 'currency',
                                                 currency: 'VND',
                                             }}
                                             sx={{textDecoration: 'line-through', fontSize: 'medium'}}/>
                            </Labeled>
                        </Grid>
                        <RichTextField source="detail.description"/>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12 ,sm:6 }} >
                    <Labeled label="Ngày tạo">
                        <TextField source="createdAt"/>
                    </Labeled>
                </Grid>
            </Grid>
        </Show>
    );
};