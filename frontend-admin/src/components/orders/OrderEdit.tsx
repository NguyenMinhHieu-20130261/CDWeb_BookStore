import {
    Edit,
    EditBase,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    useGetList,
    useNotify,
    useRefresh,
    useRecordContext,
    SaveButton,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    TextField,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import { Order, OrderStatus } from "../../type";

const OrderEditForm = ({
    statuses,
    onClose,
    isDialog,
}: {
    statuses: OrderStatus[] | undefined;
    onClose?: () => void;
    isDialog: boolean;
}) => {
    const record = useRecordContext<Order>();
    if (!record) return null;

    const productNames = record.orderDetails
        ?.map((d: any) => `${d.product?.title || "Sản phẩm"} (x${d.quantity})`)
        .join(", ") || "Không có";

    const { setValue, watch } = useFormContext();
    const [provinces, setProvinces] = React.useState<any[]>([]);
    const [districts, setDistricts] = React.useState<any[]>([]);
    const [wards, setWards] = React.useState<any[]>([]);
    
    const provinceValue = watch("shippingAddress.provinceCity");
    const districtValue = watch("shippingAddress.countyDistrict");
    const wardValue = watch("shippingAddress.wardCommune");

    const [selectedProvinceCode, setSelectedProvinceCode] = React.useState<string>("");
    const [selectedDistrictCode, setSelectedDistrictCode] = React.useState<string>("");

    // 1. Fetch provinces
    React.useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then(res => res.json())
            .then(data => {
                setProvinces(data);
            })
            .catch(err => console.error("Error fetching provinces:", err));
    }, []);

    // Match selected province from record
    React.useEffect(() => {
        if (provinces.length > 0 && provinceValue) {
            const match = provinces.find((p: any) => p.name === provinceValue);
            if (match && match.code !== selectedProvinceCode) {
                setSelectedProvinceCode(match.code);
            }
        }
    }, [provinces, provinceValue]);

    // 2. Fetch districts when selectedProvinceCode changes
    React.useEffect(() => {
        if (!selectedProvinceCode) {
            setDistricts([]);
            return;
        }
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`)
            .then(res => res.json())
            .then(data => {
                const list = data.districts || [];
                setDistricts(list);
            })
            .catch(err => console.error("Error fetching districts:", err));
    }, [selectedProvinceCode]);

    // Match selected district from record
    React.useEffect(() => {
        if (districts.length > 0 && districtValue) {
            const match = districts.find((d: any) => d.name === districtValue);
            if (match && match.code !== selectedDistrictCode) {
                setSelectedDistrictCode(match.code);
            }
        }
    }, [districts, districtValue]);

    // 3. Fetch wards when selectedDistrictCode changes
    React.useEffect(() => {
        if (!selectedDistrictCode) {
            setWards([]);
            return;
        }
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`)
            .then(res => res.json())
            .then(data => {
                setWards(data.wards || []);
            })
            .catch(err => console.error("Error fetching wards:", err));
    }, [selectedDistrictCode]);

    const handleProvinceChange = (e: any) => {
        const code = e.target.value;
        setSelectedProvinceCode(code);
        const name = provinces.find(p => p.code === code)?.name || "";
        setValue("shippingAddress.provinceCity", name, { shouldDirty: true });
        
        // Reset district and ward
        setSelectedDistrictCode("");
        setValue("shippingAddress.countyDistrict", "", { shouldDirty: true });
        setValue("shippingAddress.wardCommune", "", { shouldDirty: true });
    };

    const handleDistrictChange = (e: any) => {
        const code = e.target.value;
        setSelectedDistrictCode(code);
        const name = districts.find(d => d.code === code)?.name || "";
        setValue("shippingAddress.countyDistrict", name, { shouldDirty: true });
        
        // Reset ward
        setValue("shippingAddress.wardCommune", "", { shouldDirty: true });
    };

    const handleWardChange = (e: any) => {
        const name = e.target.value;
        setValue("shippingAddress.wardCommune", name, { shouldDirty: true });
    };

    return (
        <Box sx={{ width: "100%", mt: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextInput source="id" label="ID Đơn hàng" disabled fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput source="orderCode" label="Mã đơn hàng" disabled fullWidth />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextInput source="shippingAddress.fullName" label="Tên người mua" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput source="paymentMethod" label="Phương thức thanh toán" fullWidth />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <NumberInput source="orderTotal" label="Giá (Tổng tiền)" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumberInput source="totalQuantity" label="Số lượng" fullWidth />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        label="Tên sản phẩm (Chỉ xem)"
                        value={productNames}
                        disabled
                        fullWidth
                        multiline
                        maxRows={4}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextInput source="shippingAddress.detailAdrs" label="Địa chỉ chi tiết" fullWidth />
                </Grid>
                
                {/* Row 6: Tỉnh/Thành phố và Quận/Huyện */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="province-select-label">Tỉnh/Thành phố</InputLabel>
                        <Select
                            labelId="province-select-label"
                            value={selectedProvinceCode}
                            label="Tỉnh/Thành phố"
                            onChange={handleProvinceChange}
                        >
                            <MenuItem value="">
                                <em>Chọn Tỉnh/Thành phố</em>
                            </MenuItem>
                            {provinces.map((p) => (
                                <MenuItem key={p.code} value={p.code}>
                                    {p.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" disabled={!selectedProvinceCode}>
                        <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                        <Select
                            labelId="district-select-label"
                            value={selectedDistrictCode}
                            label="Quận/Huyện"
                            onChange={handleDistrictChange}
                        >
                            <MenuItem value="">
                                <em>Chọn Quận/Huyện</em>
                            </MenuItem>
                            {districts.map((d) => (
                                <MenuItem key={d.code} value={d.code}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                {/* Row 7: Phường/Xã và Trạng thái đơn hàng */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" disabled={!selectedDistrictCode}>
                        <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                        <Select
                            labelId="ward-select-label"
                            value={wardValue || ""}
                            label="Phường/Xã"
                            onChange={handleWardChange}
                        >
                            <MenuItem value="">
                                <em>Chọn Phường/Xã</em>
                            </MenuItem>
                            {wards.map((w) => (
                                <MenuItem key={w.code} value={w.name}>
                                    {w.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <SelectInput
                        source="status.id"
                        label="Trạng thái đơn hàng"
                        choices={statuses || []}
                        optionText="name"
                        optionValue="id"
                        fullWidth
                    />
                </Grid>
            </Grid>
            
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                {isDialog && onClose && (
                    <Button variant="outlined" onClick={onClose}>
                        Hủy
                    </Button>
                )}
                <SaveButton label="Lưu thay đổi" />
            </Box>
        </Box>
    );
};

const formSx = {
    maxWidth: "100%",
    width: "100%",
    "& .RaSimpleForm-main": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    "& form": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    "& .MuiGrid-container": {
        width: "100% !important",
        margin: "0 !important",
    },
    "& .MuiGrid-item": {
        boxSizing: "border-box",
    },
    "& .MuiFormControl-root": {
        width: "100%",
    },
};

export const OrderEdit = (props: any) => {
    const isDialog = props.open !== undefined;
    const { id, open, onClose } = props;

    const notify = useNotify();
    const refresh = useRefresh();
    const { data: statuses } = useGetList<OrderStatus>("order-status", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: {},
    });

    const handleSuccess = () => {
        notify("Cập nhật đơn hàng thành công", { type: "info" });
        refresh();
        if (isDialog && onClose) {
            onClose();
        }
    };

    if (isDialog) {
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Chỉnh sửa đơn hàng #{id}</span>
                    <IconButton onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <EditBase
                        resource="orders"
                        id={id}
                        mutationMode="pessimistic"
                        mutationOptions={{ onSuccess: handleSuccess }}
                    >
                        <SimpleForm toolbar={false} sx={formSx}>
                            <OrderEditForm statuses={statuses} onClose={onClose} isDialog={true} />
                        </SimpleForm>
                    </EditBase>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{ onSuccess: handleSuccess }}
        >
            <SimpleForm toolbar={false} sx={formSx}>
                <OrderEditForm statuses={statuses} isDialog={false} />
            </SimpleForm>
        </Edit>
    );
};