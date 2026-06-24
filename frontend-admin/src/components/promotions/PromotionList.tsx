import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    DateField,
    DeleteButton,
    TopToolbar,
    FunctionField,
    useCreate,
    useUpdate,
    useRefresh,
    useNotify
} from "react-admin";
import { PromotionSearch } from "./PromotionSearch";
import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextFieldMui from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const PromotionListActions = ({ onAddClick }: { onAddClick: () => void }) => (
    <TopToolbar>
        <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={onAddClick}
        >
            Thêm mới
        </Button>
    </TopToolbar>
);

export const PromotionList = () => {
    // State for Create Dialog
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // State for Edit Dialog
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editCode, setEditCode] = useState("");
    const [editName, setEditName] = useState("");
    const [editDiscountPercent, setEditDiscountPercent] = useState("");
    const [editStartDate, setEditStartDate] = useState("");
    const [editEndDate, setEditEndDate] = useState("");
    const [editStatus, setEditStatus] = useState(true);

    const [create, { isLoading }] = useCreate();
    const [update, { isLoading: isUpdating }] = useUpdate();
    const refresh = useRefresh();
    const notify = useNotify();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Reset form
        setCode("");
        setName("");
        setDiscountPercent("");
        setStartDate("");
        setEndDate("");
    };

    const handleEditClick = (record: any) => {
        setEditId(record.id);
        setEditCode(record.code || "");
        setEditName(record.name || "");
        setEditDiscountPercent(record.discountPercent != null ? String(record.discountPercent) : "");
        
        const formatForInput = (dateStr: string) => {
            if (!dateStr) return "";
            return dateStr.length > 16 ? dateStr.substring(0, 16) : dateStr;
        };
        setEditStartDate(formatForInput(record.startDate));
        setEditEndDate(formatForInput(record.endDate));
        setEditStatus(record.status ?? true);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditId(null);
        setEditCode("");
        setEditName("");
        setEditDiscountPercent("");
        setEditStartDate("");
        setEditEndDate("");
        setEditStatus(true);
    };

    const formatDateTime = (dt: string) => {
        if (!dt) return "";
        return dt.includes(":") && dt.split(":").length === 2 ? `${dt}:00` : dt;
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend basic validation
        if (!code.trim()) {
            notify("Mã giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!name.trim()) {
            notify("Tên mã giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!discountPercent) {
            notify("% Giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!startDate) {
            notify("Ngày hiệu lực không được để trống", { type: "warning" });
            return;
        }
        if (!endDate) {
            notify("Ngày hết hạn không được để trống", { type: "warning" });
            return;
        }

        const data = {
            code: code.trim(),
            name: name.trim(),
            discountPercent: Number(discountPercent),
            startDate: formatDateTime(startDate),
            endDate: formatDateTime(endDate),
            status: true,
            usageCount: 0
        };

        create(
            "promotions",
            { data },
            {
                onSuccess: () => {
                    notify("Tạo mã giảm giá thành công", { type: "info" });
                    refresh();
                    handleClose();
                },
                onError: (error: any) => {
                    const errMsg = error?.body?.message || error?.response?.data?.message || error?.message || "Lỗi khi tạo mã giảm giá";
                    notify(errMsg, { type: "warning" });
                }
            }
        );
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend basic validation
        if (!editCode.trim()) {
            notify("Mã giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!editName.trim()) {
            notify("Tên mã giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!editDiscountPercent) {
            notify("% Giảm giá không được để trống", { type: "warning" });
            return;
        }
        if (!editStartDate) {
            notify("Ngày hiệu lực không được để trống", { type: "warning" });
            return;
        }
        if (!editEndDate) {
            notify("Ngày hết hạn không được để trống", { type: "warning" });
            return;
        }

        const data = {
            code: editCode.trim(),
            name: editName.trim(),
            discountPercent: Number(editDiscountPercent),
            startDate: formatDateTime(editStartDate),
            endDate: formatDateTime(editEndDate),
            status: editStatus,
            id: editId
        };

        update(
            "promotions",
            { id: editId, data },
            {
                onSuccess: () => {
                    notify("Cập nhật mã giảm giá thành công", { type: "info" });
                    refresh();
                    handleEditClose();
                },
                onError: (error: any) => {
                    const errMsg = error?.body?.message || error?.response?.data?.message || error?.message || "Lỗi khi cập nhật mã giảm giá";
                    notify(errMsg, { type: "warning" });
                }
            }
        );
    };

    return (
        <>
            <List
                title="Danh sách mã giảm giá"
                sort={{ field: "id", order: "DESC" }}
                perPage={10}
                filters={PromotionSearch}
                actions={<PromotionListActions onAddClick={handleOpen} />}
            >
                <Datagrid>
                    <TextField source="id" label="ID" />
                    <TextField source="code" label="Mã giảm giá" />
                    <TextField source="name" label="Tên" />
                    <FunctionField
                        label="% Giảm giá"
                        render={(record: any) => record?.discountPercent != null ? `${record.discountPercent}%` : "0%"}
                    />
                    <DateField source="startDate" label="Ngày hiệu lực" showTime />
                    <DateField source="endDate" label="Ngày hết hạn" showTime />
                    <NumberField source="usageCount" label="Đã sử dụng" />
                    <BooleanField source="status" label="Trạng thái" />
                    <FunctionField
                        label="Hành động"
                        render={(record: any) => (
                            <Button
                                size="small"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(record);
                                }}
                            >
                                Sửa
                            </Button>
                        )}
                    />
                    <DeleteButton label="Xóa" />
                </Datagrid>
            </List>

            {/* Dialog Create */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <form onSubmit={handleSave}>
                    <DialogTitle>Thêm mới mã giảm giá</DialogTitle>
                    <DialogContent dividers>
                        <Box display="flex" flexDirection="column" gap={2} pt={1}>
                            <TextFieldMui
                                label="Mã giảm giá (Code)"
                                variant="outlined"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Tên mã giảm giá"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="% Giảm giá (Discount %)"
                                type="number"
                                variant="outlined"
                                inputProps={{ min: 0.01, max: 100, step: "0.01" }}
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Ngày hiệu lực"
                                type="datetime-local"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Ngày hết hạn"
                                type="datetime-local"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="inherit" disabled={isLoading}>
                            Hủy
                        </Button>
                        <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
                            {isLoading ? "Đang tạo..." : "Tạo"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Dialog Edit */}
            <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
                <form onSubmit={handleUpdate}>
                    <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                    <DialogContent dividers>
                        <Box display="flex" flexDirection="column" gap={2} pt={1}>
                            <TextFieldMui
                                label="ID"
                                variant="outlined"
                                value={editId || ""}
                                disabled
                                fullWidth
                            />
                            <TextFieldMui
                                label="Mã giảm giá (Code)"
                                variant="outlined"
                                value={editCode}
                                onChange={(e) => setEditCode(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Tên mã giảm giá"
                                variant="outlined"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="% Giảm giá (Discount %)"
                                type="number"
                                variant="outlined"
                                inputProps={{ min: 1, max: 100, step: "0.01" }}
                                value={editDiscountPercent}
                                onChange={(e) => setEditDiscountPercent(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Ngày hiệu lực"
                                type="datetime-local"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={editStartDate}
                                onChange={(e) => setEditStartDate(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextFieldMui
                                label="Ngày hết hạn"
                                type="datetime-local"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={editEndDate}
                                onChange={(e) => setEditEndDate(e.target.value)}
                                required
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={editStatus}
                                        onChange={(e) => setEditStatus(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={editStatus ? "Trạng thái: Hoạt động" : "Trạng thái: Không hoạt động"}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="inherit" disabled={isUpdating}>
                            Hủy
                        </Button>
                        <Button type="submit" color="primary" variant="contained" disabled={isUpdating}>
                            {isUpdating ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
