import * as React from 'react';
import { ReviewSearch } from "./ReviewSearch";
import {
    ExportButton,
    TopToolbar,
    SelectColumnsButton,
    DatagridConfigurable,
    BulkUpdateButton,
    BulkDeleteButton, 
    ArrayField, 
    ShowButton,
    List,
    TextField,
    DateField,
} from "react-admin";
import RatingField from './RatingField';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Box, Drawer } from '@mui/material';
import ReviewShow from "./ReviewShow";
import DeleteButton from "../../layout/DeleteButton";

const VisitorListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

export const ReviewList = () => {
    const location = useLocation();
    const match = matchPath('/reviews/:id/show', location.pathname);
    const navigate = useNavigate();
    const handleClose = useCallback(() => {
        navigate('/reviews');
    }, [navigate]);

    return (
        <Box display="flex">
            <List
                sort={{field: 'createdAt', order: 'DESC'}}
                perPage={10}
                actions={<VisitorListActions/>}
                filters={<ReviewSearch/>}
                sx={{
                    '& .column-title': {
                        maxWidth: '16em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                    '& .column-commentable': {
                        maxWidth: '4em',
                    },
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
            >
                <DatagridConfigurable
                    rowClick={false}
                    bulkActionButtons={
                        <>
                            <BulkDeleteButton/>
                        </>
                    }
                >
                    <TextField source="id" label="ID"/>
                    <TextField source="user.username" label="Người đánh giá"/>
                    <TextField source="product.title" label="Tên sách"/>
                    <TextField source="cmtDetail" label="Nội dung"/>
                    <RatingField source="rating" label="Số sao"/>
                    <TextField source="createdAt" label="Ngày tạo" />

                    <ArrayField label={"Hành động"} textAlign={"center"}>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <ShowButton label="Chi tiết"/>
                            </Box>
                            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                <DeleteButton param={"đánh giá"}/>
                            </Box>
                        </Box>
                    </ArrayField>
                </DatagridConfigurable>
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{zIndex: 100}}
            >
                {!!match && (
                    <ReviewShow
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
        </Box>
    );
};
