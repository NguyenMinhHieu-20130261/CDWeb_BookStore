import {
    DateField,
    ImageField,
    NumberField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TextField,
    FunctionField,
    TopToolbar,
    EditButton,
    DeleteButton,
} from "react-admin";
import { Box, Chip, Typography, Divider } from "@mui/material";

const BlogShowActions = () => (
    <TopToolbar>
        <EditButton />
        <DeleteButton />
    </TopToolbar>
);

export const BlogShow = () => (
    <Show title="Chi tiết bài viết" actions={<BlogShowActions />}>
        <SimpleShowLayout>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "260px 1fr",
                    gap: 3,
                    alignItems: "start",
                }}
            >
                <Box>
                    <ImageField
                        source="thumbnail"
                        label="Ảnh thumbnail"
                        sx={{
                            "& img": {
                                width: 260,
                                height: 160,
                                objectFit: "cover",
                                borderRadius: 2,
                                boxShadow: 2,
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={1}>
                        <TextField source="title" />
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                        <FunctionField
                            label="Trạng thái"
                            render={(record) =>
                                record.status === 1 ? (
                                    <Chip label="Đang hiển thị" color="success" size="small" />
                                ) : (
                                    <Chip label="Đã ẩn" color="default" size="small" />
                                )
                            }
                        />
                        <FunctionField
                            label="Danh mục"
                            render={(record) => (
                                <Chip
                                    label={record.category?.name || "Chưa có danh mục"}
                                    color="primary"
                                    size="small"
                                />
                            )}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Slug:
                    </Typography>
                    <TextField source="slug" />
                    <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            Mô tả ngắn:
                        </Typography>
                        <TextField source="shortDescription" />
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        ID
                    </Typography>
                    <TextField source="id" />
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Lượt xem
                    </Typography>
                    <NumberField source="viewCount" />
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Ngày tạo
                    </Typography>
                    <DateField source="createdAt" showTime />
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Ngày cập nhật
                    </Typography>
                    <DateField source="updatedAt" showTime />
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight={700} mb={2}>
                Nội dung bài viết
            </Typography>
            <Box
                sx={{
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                }}
            >
                <RichTextField source="content" />
            </Box>
        </SimpleShowLayout>
    </Show>
);