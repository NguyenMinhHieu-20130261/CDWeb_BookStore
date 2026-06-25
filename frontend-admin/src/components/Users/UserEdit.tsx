import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    BooleanInput,
    ImageField,
    ImageInput,
} from "react-admin";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

export const UserEdit = () => {
    const transform = (data: any) => ({
        roleId: data.role?.id,
        isLocked: data.isLocked,
        userInformation: {
            id: data.userInformation?.id,
            fullName: data.userInformation?.fullName,
            phoneNumber: data.userInformation?.phoneNumber,
            avatar:
                typeof data.userInformation?.avatar === "string"
                    ? data.userInformation.avatar
                    : data.userInformation?.avatar?.src,
        },
    });

    return (
        <Edit redirect="list" transform={transform}>
            <SimpleForm
                sx={{
                    maxWidth: "100%",
                    width: "100%",
                    "& .RaSimpleForm-main": {
                        width: "100%",
                    },
                    "& .MuiFormControl-root": {
                        width: "100%",
                    },
                }}
            >
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600}>
                            Thông tin tài khoản
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <TextInput source="id" label="ID" disabled fullWidth />
                            <TextInput source="username" label="Tên đăng nhập" disabled fullWidth />
                            <TextInput source="email" label="Email" disabled fullWidth />
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ width: "100%", mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600}>
                            Thông tin cá nhân
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <TextInput
                                source="userInformation.fullName"
                                label="Họ và tên"
                                fullWidth
                            />

                            <TextInput
                                source="userInformation.phoneNumber"
                                label="Số điện thoại"
                                fullWidth
                            />
                        </Box>

                        <Box mt={2}>
                            <ImageInput
                                source="userInformation.avatar"
                                label="Ảnh đại diện"
                                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                                format={(value) => {
                                    if (!value) return null;
                                    if (typeof value === "string") {
                                        return {
                                            src: value,
                                            title: "avatar",
                                        };
                                    }
                                    return value;
                                }}
                                parse={(value) => {
                                    if (!value) return null;
                                    return typeof value === "string" ? value : value.src;
                                }}
                                placeholder="Chọn ảnh"
                            >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ width: "100%", mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600}>
                            Quản lý tài khoản
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <SelectInput
                                source="role.id"
                                label="Vai trò"
                                choices={[
                                    { id: 1, name: "ADMIN" },
                                    { id: 2, name: "USER" },
                                ]}
                                fullWidth
                            />

                            <BooleanInput
                                source="isLocked"
                                label="Khóa tài khoản"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Edit>
    );
};