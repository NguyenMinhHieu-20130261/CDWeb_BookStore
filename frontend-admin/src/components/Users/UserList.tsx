import * as React from 'react';
import {UserSearch} from "./UserSearch";
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SelectColumnsButton,DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    TextField,
    DateField,
    BooleanField
} from "react-admin";
import { Avatar} from '@mui/material';

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const UserList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<UserSearch/>}
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
          }}
    >
        <DatagridConfigurable
            rowClick="show"
            bulkActionButtons={
                <>
                    <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                    <BulkDeleteButton/>
                </>
            }
        >
            <TextField source="id" label="ID"/>
            <TextField source="fullName" label="Người tạo"/>
            <Avatar
                src="avatar"
                style={{ width: parseInt("25", 10), height: parseInt("25", 10) }}
            />
            <TextField source="email" label="Email"/>
            <TextField source="phoneNumber" label="Số điện thoại"/>
            <BooleanField
                source="locked"
                sx={{ mt: -0.5, mb: -0.5 }}
            />
            <BooleanField
                source="isSocial"
                sx={{ mt: -0.5, mb: -0.5 }}
            />
            <DateField source="createdAt" label="Ngày tạo" showTime/>
            <DateField source="updatedAt" label="Ngày cập nhật" showTime/>
        </DatagridConfigurable>
    </List>
);