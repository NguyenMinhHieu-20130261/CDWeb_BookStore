import {
    BooleanInput,
    Edit,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
    ImageField,
    useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const req = [required("Không được để trống")];

const BannerPreview = () => {
    const record = useRecordContext();

    if (!record?.image) return null;

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Ảnh hiện tại
            </Typography>

            <img
                src={record.image}
                alt={record.title}
                style={{
                    width: "100%",
                    maxWidth: 600,
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                }}
            />
        </Box>
    );
};

export const BannerEdit = () => {
    return (
        <Edit title="Chỉnh sửa banner">
            <SimpleForm>
                <BannerPreview />

                <TextInput
                    source="title"
                    label="Tiêu đề"
                    validate={req}
                    fullWidth
                />

                <TextInput
                    source="subtitle"
                    label="Mô tả"
                    fullWidth
                />

                <TextInput
                    source="image"
                    label="Link ảnh"
                    validate={req}
                    fullWidth
                />

                <TextInput
                    source="link"
                    label="Đường dẫn khi bấm"
                    fullWidth
                />

                <NumberInput
                    source="position"
                    label="Vị trí hiển thị"
                    defaultValue={0}
                />

                <BooleanInput
                    source="active"
                    label="Hiển thị"
                />
            </SimpleForm>
        </Edit>
    );
};