import {
    useGetOne,
    Loading,
    SaveButton,
    TextInput,
    SimpleForm,
    useUpdate,
} from "react-admin";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Rating,
    Stack,
    Typography,
    Button,
} from "@mui/material";

const Row = ({ label, value }: any) => (
    <Box py={1}>
        <Typography
            variant="caption"
            color="text.secondary"
        >
            {label}
        </Typography>

        <Typography>
            {value || "—"}
        </Typography>
    </Box>
);
const ReviewShow = ({ id, onCancel }: any) => {
    const { data, isLoading } =
        useGetOne("reviews", { id });
    const [update] = useUpdate();
    if (isLoading) return <Loading />;
    const handleReply = (values:any) => {
        update(
            "reviews",
            {
                id,
                data: {
                    reply: values.reply,
                },
                previousData: data,
            }
        );

    };
    return (
        <Box
            width={430}
            p={2}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h6">
                    Chi tiết đánh giá
                </Typography>
                <Button onClick={onCancel}>
                    Đóng
                </Button>
            </Stack>
            <Divider sx={{my:2}}/>
            <Card>
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Avatar>
                            {data.user?.username?.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography fontWeight={600}>
                                {data.user?.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {data.product?.title}
                            </Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{my:2}}/>
                    <Row
                        label="Ngày đánh giá"
                        value={data.createdAt}
                    />


                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Đánh giá
                    </Typography>
                    <Rating
                        value={data.rating}
                        readOnly
                    />
                    <Row
                        label="Nội dung đánh giá"
                        value={data.cmtDetail}
                    />
                </CardContent>
            </Card>
            <Card sx={{mt:2}}>
                <CardContent>
                    <Typography variant="h6">
                        Phản hồi cửa hàng
                    </Typography>
                    <SimpleForm
                        toolbar={
                            <SaveButton label="Gửi phản hồi"/>
                        }
                        onSubmit={handleReply}
                        defaultValues={{
                            reply:data.reply
                        }}
                    >
                        <TextInput
                            source="reply"
                            label="Nội dung phản hồi"
                            multiline
                            fullWidth
                        />
                    </SimpleForm>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReviewShow;