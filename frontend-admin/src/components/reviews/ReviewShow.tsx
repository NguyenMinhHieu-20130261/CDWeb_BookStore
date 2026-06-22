import * as React from 'react';
import {
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
    TextField,
    EditBase,
    Toolbar,
    SaveButton,
    useRecordContext
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Review } from '../../type';
import RatingField from './RatingField';

interface Props extends EditProps<Review> {
    onCancel: () => void;
}

const ReviewEditToolbar = (props: any) => (
    <Toolbar {...props} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SaveButton label="Gửi phản hồi" alwaysEnable />
    </Toolbar>
);

const CustomerAvatar = () => {
    const record = useRecordContext<Review>();
    if (!record) return null;
    return (
        <Avatar
            src={record.user?.userInfo?.avatar || ''}
            style={{ width: 25, height: 25 }}
            alt={record.user?.userInfo?.fullName || record.user?.username}
        />
    );
};

const CustomerName = () => {
    const record = useRecordContext<Review>();
    if (!record) return null;
    return (
        <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            {record.user?.userInfo?.fullName || record.user?.username || 'Khách hàng'}
        </Typography>
    );
};

const ReviewShow = ({ id, onCancel }: Props) => {
    return (
        <EditBase id={id} mutationMode="pessimistic" redirect={false}>
            <Box pt={5} width={{ xs: '100vw', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2} alignItems="center">
                    <Typography variant="h6" flex="1">
                        {"Chi tiết đánh giá"}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<ReviewEditToolbar />}
                >
                    <Grid container rowSpacing={1} mb={2}>
                        <Grid item xs={6}>
                            <Labeled label="Khách hàng">
                                <Box display="flex" alignItems="center" mt={0.5}>
                                    <CustomerAvatar />
                                    <CustomerName />
                                </Box>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Sản phẩm">
                                <TextField source="product.title" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Ngày đánh giá">
                                <TextField source="createdAt" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Đánh giá">
                                <RatingField source="rating" />
                            </Labeled>
                        </Grid>
                    </Grid>
                    <TextInput
                        source="cmtDetail"
                        maxRows={10}
                        label={"Nội dung đánh giá"}
                        multiline
                        fullWidth
                        readOnly
                        disabled
                        sx={{ mb: 2 }}
                    />
                    <TextInput
                        source="reply"
                        maxRows={10}
                        label={"Phản hồi của cửa hàng"}
                        multiline
                        fullWidth
                    />
                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default ReviewShow;
