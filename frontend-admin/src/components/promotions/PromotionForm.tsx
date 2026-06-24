import {
    BooleanInput,
    DateTimeInput,
    maxValue,
    minValue,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
} from "react-admin";
import * as React from "react";
import Grid from "@mui/material/Grid";

const req = [required("Không được để trống")];

export const PromotionForm = () => (
    <SimpleForm>
        <Grid container spacing={2}>

            <Grid size={{ xs: 12 }}>
                <TextInput
                    source="code"
                    label="Mã giảm giá"
                    validate={req}
                    fullWidth
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <TextInput
                    source="name"
                    label="Tên chương trình"
                    validate={req}
                    fullWidth
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <NumberInput
                    source="discountPercent"
                    label="Phần trăm giảm (%)"
                    validate={[
                        ...req,
                        minValue(0.01),
                        maxValue(100),
                    ]}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <NumberInput
                    source="discount"
                    label="Giá trị giảm"
                    defaultValue={0}
                    validate={[
                        minValue(0)
                    ]}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <DateTimeInput
                    source="startDate"
                    label="Ngày bắt đầu"
                    validate={req}
                    fullWidth
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <DateTimeInput
                    source="endDate"
                    label="Ngày kết thúc"
                    validate={req}
                    fullWidth
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <NumberInput
                    source="usageCount"
                    label="Số lượt đã dùng"
                    defaultValue={0}
                    disabled
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <BooleanInput
                    source="isCode"
                    label="Sử dụng mã code"
                    defaultValue={true}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <BooleanInput
                    source="status"
                    label="Hoạt động"
                    defaultValue={true}
                />
            </Grid>

        </Grid>
    </SimpleForm>
);