import {
    Show,
    TopToolbar,
    EditButton,
    useShowContext,
} from "react-admin";
import DeleteButton from "../../layout/DeleteButton";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

const UserShowActions = () => (
    <TopToolbar>
        <EditButton />
        <DeleteButton />
    </TopToolbar>
);

const InfoRow = ({ label, value }: any) => (
    <Box display="flex" justifyContent="space-between" py={1}>
        <Typography color="text.secondary">{label}</Typography>
        <Typography fontWeight={500}>{value || "—"}</Typography>
    </Box>
);

const UserShowContent = () => {
    const { record } = useShowContext();

    if (!record) return null;

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Avatar
                                    src={record.userInformation?.avatar}
                                    sx={{ width: 110, height: 110 }}
                                />

                                <Typography variant="h6">
                                    {record.userInformation?.fullName || record.username}
                                </Typography>

                                <Typography color="text.secondary">
                                    {record.email}
                                </Typography>

                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        label={record.role?.description || "USER"}
                                        color="primary"
                                        size="small"
                                    />

                                    <Chip
                                        label={record.isLocked ? "Bị khóa" : "Hoạt động"}
                                        color={record.isLocked ? "error" : "success"}
                                        size="small"
                                    />
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={1}>
                                Thông tin chi tiết
                            </Typography>

                            <Divider />

                            <InfoRow label="ID" value={record.id} />
                            <InfoRow label="Tên đăng nhập" value={record.username} />
                            <InfoRow label="Email" value={record.email} />
                            <InfoRow label="Họ tên" value={record.userInformation?.fullName} />
                            <InfoRow label="Số điện thoại" value={record.userInformation?.phoneNumber} />
                            <InfoRow label="Giới tính" value={record.userInformation?.gender} />
                            <InfoRow label="Ngày sinh" value={record.userInformation?.birthday} />
                            <InfoRow label="Ngày tạo" value={record.createdAt} />
                            <InfoRow label="Ngày cập nhật" value={record.updatedAt} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export const UserShow = () => (
    <Show title="Chi tiết người dùng" actions={<UserShowActions />}>
        <UserShowContent />
    </Show>
);