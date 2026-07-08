import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { TextInput, useRecordContext } from "react-admin";
import { useFormContext } from "react-hook-form";

export const AddressSection = ({ editable = true }: { editable?: boolean }) => {
    const record = useRecordContext<any>();
    const { setValue, watch } = useFormContext();

    const [provinces, setProvinces] = React.useState<any[]>([]);
    const [districts, setDistricts] = React.useState<any[]>([]);
    const [wards, setWards] = React.useState<any[]>([]);

    const provinceValue = watch("shippingAddress.provinceCity");
    const districtValue = watch("shippingAddress.countyDistrict");
    const wardValue = watch("shippingAddress.wardCommune");

    const [selectedProvinceCode, setSelectedProvinceCode] = React.useState("");
    const [selectedDistrictCode, setSelectedDistrictCode] = React.useState("");

    React.useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((res) => res.json())
            .then(setProvinces)
            .catch(console.error);
    }, []);

    React.useEffect(() => {
        if (provinces.length && provinceValue) {
            const match = provinces.find((p) => p.name === provinceValue);
            if (match) setSelectedProvinceCode(String(match.code));
        }
    }, [provinces, provinceValue]);

    React.useEffect(() => {
        if (!selectedProvinceCode) return;

        fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`)
            .then((res) => res.json())
            .then((data) => setDistricts(data.districts || []))
            .catch(console.error);
    }, [selectedProvinceCode]);

    React.useEffect(() => {
        if (districts.length && districtValue) {
            const match = districts.find((d) => d.name === districtValue);
            if (match) setSelectedDistrictCode(String(match.code));
        }
    }, [districts, districtValue]);

    React.useEffect(() => {
        if (!selectedDistrictCode) return;

        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`)
            .then((res) => res.json())
            .then((data) => setWards(data.wards || []))
            .catch(console.error);
    }, [selectedDistrictCode]);

    const handleProvinceChange = (e: any) => {
        const code = e.target.value;
        setSelectedProvinceCode(code);

        const name = provinces.find((p) => String(p.code) === String(code))?.name || "";

        setValue("shippingAddress.provinceCity", name, { shouldDirty: true });
        setValue("shippingAddress.countyDistrict", "", { shouldDirty: true });
        setValue("shippingAddress.wardCommune", "", { shouldDirty: true });

        setSelectedDistrictCode("");
        setDistricts([]);
        setWards([]);
    };

    const handleDistrictChange = (e: any) => {
        const code = e.target.value;
        setSelectedDistrictCode(code);

        const name = districts.find((d) => String(d.code) === String(code))?.name || "";

        setValue("shippingAddress.countyDistrict", name, { shouldDirty: true });
        setValue("shippingAddress.wardCommune", "", { shouldDirty: true });

        setWards([]);
    };

    const handleWardChange = (e: any) => {
        setValue("shippingAddress.wardCommune", e.target.value, { shouldDirty: true });
    };

    if (!record) return null;

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Địa chỉ giao hàng
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextInput
                            source="shippingAddress.detailAdrs"
                            label="Địa chỉ chi tiết"
                            disabled={!editable}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth size="small" disabled={!editable}>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={selectedProvinceCode}
                                label="Tỉnh/Thành phố"
                                onChange={handleProvinceChange}
                            >
                                <MenuItem value="">
                                    <em>Chọn tỉnh/thành phố</em>
                                </MenuItem>

                                {provinces.map((p) => (
                                    <MenuItem key={p.code} value={String(p.code)}>
                                        {p.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth size="small" disabled={!editable || !selectedProvinceCode}>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={selectedDistrictCode}
                                label="Quận/Huyện"
                                onChange={handleDistrictChange}
                            >
                                <MenuItem value="">
                                    <em>Chọn quận/huyện</em>
                                </MenuItem>

                                {districts.map((d) => (
                                    <MenuItem key={d.code} value={String(d.code)}>
                                        {d.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth size="small" disabled={!editable || !selectedDistrictCode}>
                            <InputLabel>Phường/Xã</InputLabel>
                            <Select
                                value={wardValue || ""}
                                label="Phường/Xã"
                                onChange={handleWardChange}
                            >
                                <MenuItem value="">
                                    <em>Chọn phường/xã</em>
                                </MenuItem>

                                {wards.map((w) => (
                                    <MenuItem key={w.code} value={w.name}>
                                        {w.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};