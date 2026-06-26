import {
    BooleanInput,
    Edit,
    ImageField,
    ImageInput,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
    useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { uploadImage } from "../../service/ImageUploader";

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

const transform = async (data: any) => {
    let image = data.image;

    if (data.uploadImage?.rawFile instanceof File) {
        image = await uploadImage(data.uploadImage.rawFile);
    }

    return {
        ...data,
        image,
        uploadImage: undefined,
    };
};

export const BannerEdit = () => (
    <Edit title="Chỉnh sửa banner" transform={transform}>
        <SimpleForm>
            <BannerPreview />

            <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />

            <TextInput source="subtitle" label="Mô tả" fullWidth />

            <TextInput
                source="image"
                label="Option 1: Link ảnh"
                fullWidth
                helperText="Dán URL ảnh trực tiếp"
            />
            <ImageField source="image" label="Ảnh hiện tại" />
            <ImageInput
                source="uploadImage"
                label="Option 2: Chèn ảnh từ máy"
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                multiple={false}
                helperText="Chọn ảnh nếu muốn thay ảnh hiện tại"
            >
                <ImageField source="src" title="title" />
            </ImageInput>

            <TextInput source="link" label="Đường dẫn khi bấm" fullWidth />

            <NumberInput source="position" label="Vị trí hiển thị" />

            <BooleanInput source="active" label="Hiển thị" />
        </SimpleForm>
    </Edit>
);