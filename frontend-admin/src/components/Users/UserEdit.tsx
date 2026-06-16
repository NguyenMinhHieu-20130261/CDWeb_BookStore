import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    email, ImageField, ImageInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import {useState} from "react";

export const validateForm = (values: Record<string, any>): Record<string, any> => {
    const errors = {} as any;
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên';
    }
    if (!values.phone) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    }
    if (!values.email) {
        errors.email = 'Vui lòng nhập đúng định dạng email';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    return errors;
};
export const UserEdit = () => {
    const [imageSelected, setImageSelected] = useState(false);
    const handleImageChange = (file:any) => {
        if (file) {
            setImageSelected(true);
        } else {
            setImageSelected(false);
        }
    };
    return (
        <Edit>
            <SimpleForm
                sx={{ maxWidth: 500 }}
                defaultValues={{
                    dateOfBirth: new Date(),
                }}
                validate={validateForm}
            >
                <SectionTitle label="Thông tin cá nhân" />
                <TextInput source="id" disabled fullWidth />
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="username" source="username" disabled fullWidth/>
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="fullName" source="fullName" label="Họ và tên" isRequired fullWidth/>
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="phone" source="phone" label="Số điện thoại" isRequired fullWidth />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="email" source="email" isRequired fullWidth />
                    </Box>
                </Box>
                <ImageInput source="image" 
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                label="Link hình ảnh" placeholder={<p>Chọn ảnh</p>} onChange={handleImageChange}>
                    <ImageField source={"src"} title=""/>
                </ImageInput>
                {!imageSelected && <ImageField source={"avatarShow"} title=""/>}
                <Separator />
                <SectionTitle label="Chức năng" />
                <SelectInput
                    source="role"
                    label="Role"
                    choices={[
                        { id: 1, name: 'ADMIN' },
                        { id: 2, name: 'MODERATOR' },
                        { id: 3, name: 'USER' },
                    ]}
                />
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput
                            source="locked"
                            label="Khóa tài khoản"
                            choices={[
                                { id: false, name: 'Unlocked' },
                                { id: true, name: 'Locked' },
                            ]}
                        />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.1em' }}>
                        <SelectInput
                            source="isSocial"
                            choices={[
                                { id: false, name: 'No' },
                                { id: true, name: 'Yes' },
                            ]}
                        />
                    </Box>
                </Box>
            </SimpleForm>
        </Edit>
    );
};
const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};
const Separator = () => <Box pt="1em" />;