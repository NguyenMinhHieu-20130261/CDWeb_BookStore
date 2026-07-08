import {
    BooleanInput,
    Create,
    Edit,
    ImageField,
    ImageInput,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
} from "react-admin";
import { uploadImage } from "../../service/ImageUploader";

const req = [required("Không được để trống")];

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

export const BannerCreate = () => (
    <Create transform={transform}>
        <SimpleForm>
            <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />

            <TextInput source="subtitle" label="Mô tả" fullWidth />

            {/* Option 1 */}
            <TextInput
                source="image"
                label="Link ảnh"
                helperText="Dán URL ảnh nếu có"
                fullWidth
            />

            {/* Option 2 */}
            <ImageInput
                source="uploadImage"
                label="Hoặc tải ảnh lên"
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            >
                <ImageField source="src" />
            </ImageInput>

            <TextInput source="link" label="Đường dẫn khi bấm" fullWidth />

            <NumberInput source="position" label="Vị trí" defaultValue={0} />

            <BooleanInput source="active" label="Hiển thị" defaultValue />
        </SimpleForm>
    </Create>
);