import {
    Show,
    TopToolbar,
    DeleteButton,
    useShowContext,
} from "react-admin";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

const Actions = () => (
    <TopToolbar>
        <DeleteButton/>
    </TopToolbar>
);

const Row = ({label,value}:any)=>(
    <Box
        display="flex"
        justifyContent="space-between"
        py={1}
    >
        <Typography color="text.secondary">
            {label}
        </Typography>

        <Typography fontWeight={500}>
            {value || "—"}
        </Typography>
    </Box>
);

const AddressContent = ()=>{
    const {record}=useShowContext();
    if(!record) return null;

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid size={{xs:12,md:5}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Người nhận
                            </Typography>
                            <Divider sx={{my:1}}/>
                            <Row
                                label="Họ tên"
                                value={record.fullName}
                            />
                            <Row
                                label="SĐT"
                                value={record.phoneNumber}
                            />
                            <Row
                                label="Mặc định"
                                value={
                                    record.isDefault
                                    ?"Có"
                                    :"Không"
                                }
                            />
                            <Chip
                                label={
                                  record.isDefault
                                  ?"Địa chỉ mặc định"
                                  :"Địa chỉ phụ"
                                }
                                color={
                                  record.isDefault
                                  ?"success"
                                  :"default"
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs:12,md:7}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Chi tiết địa chỉ
                            </Typography>
                            <Divider sx={{my:1}}/>
                            <Row
                                label="Địa chỉ"
                                value={record.detailAdrs}
                            />
                            <Row
                                label="Phường/Xã"
                                value={record.wardCommune}
                            />
                            <Row
                                label="Quận/Huyện"
                                value={record.countyDistrict}
                            />
                            <Row
                                label="Tỉnh"
                                value={record.provinceCity}
                            />
                            <Row
                                label="Ngày tạo"
                                value={record.createdAt}
                            />
                            <Row
                                label="Cập nhật"
                                value={record.updatedAt}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )

}
export const AddressShow = ()=>(
    <Show
        title="Chi tiết địa chỉ"
        actions={<Actions/>}
    >
        <AddressContent/>
    </Show>
);