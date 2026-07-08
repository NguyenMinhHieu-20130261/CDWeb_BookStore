import {
    Card,
    CardContent,
    Typography,
    Stack
} from "@mui/material";


const RevenueSummary = () => {

    return (
        <Card>
            <CardContent>

                <Typography variant="h6">
                    Doanh thu
                </Typography>


                <Stack spacing={1} mt={1}>

                    <Typography>
                        Hôm nay:
                        <b> 1.200.000đ</b>
                    </Typography>


                    <Typography>
                        Tháng này:
                        <b> 12.500.000đ</b>
                    </Typography>

                </Stack>


            </CardContent>
        </Card>
    );
};


export default RevenueSummary;