import {
    Create,
    SimpleForm,
    SelectInput,
    TextInput,
    BooleanInput,
    NumberInput,
    required,
} from "react-admin";

const req = [required("Không được để trống")];

export const NotificationCreate = () => (
    <Create
        transform={(data) => ({
            userId: data.isBroadcast ? null : data.userId,
            type: data.type,
            title: data.title,
            message: data.message,
            targetUrl: data.targetUrl,
            isBroadcast: data.isBroadcast,
        })}
    >
        <SimpleForm defaultValues={{ type: "SYSTEM", isBroadcast: true }}>
            <BooleanInput source="isBroadcast" label="Gửi cho tất cả user" />

            <NumberInput
                source="userId"
                label="User ID nếu gửi riêng"
            />

            <SelectInput
                source="type"
                label="Loại thông báo"
                validate={req}
                choices={[
                    { id: "SYSTEM", name: "Hệ thống" },
                    { id: "ORDER", name: "Đơn hàng" },
                    { id: "PROMOTION", name: "Khuyến mãi" },
                    { id: "PRODUCT", name: "Sản phẩm" },
                    { id: "REVIEW", name: "Đánh giá" },
                    { id: "INVENTORY", name: "Kho hàng" },
                    { id: "ADMIN", name: "Admin" },
                ]}
            />

            <TextInput source="title" label="Tiêu đề" validate={req} fullWidth />
            <TextInput source="message" label="Nội dung" validate={req} multiline fullWidth />
            <TextInput source="targetUrl" label="Đường dẫn" placeholder="/promotion" fullWidth />
        </SimpleForm>
    </Create>
);