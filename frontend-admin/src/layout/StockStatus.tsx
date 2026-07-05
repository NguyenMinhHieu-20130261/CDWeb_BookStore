import { FunctionField } from "react-admin";
import { Chip } from "@mui/material";
import { Inventory } from "../type";

const getStockStatus = (record: Inventory) => {
    if (record.remainingQuantity === 0) {
        return {
            label: "Hết hàng",
            bg: "#fdecea",
            color: "#d32f2f",
            row: "#fff5f5",
            border: "#f44336",
        };
    }
    if (!record.active) {
        return {
            label: "Ngưng bán",
            bg: "#eeeeee",
            color: "#616161",
            row: "#fafafa",
            border: "#9e9e9e",
        };
    }
    const percent =
        record?.importedQuantity > 0
            ? record.remainingQuantity / record.importedQuantity
            : 0;
    if (percent <= 0.2) {
        return {
            label: "Sắp hết",
            bg: "#fff4e5",
            color: "#ed6c02",
            row: "#fff8e1",
            border: "#ff9800",
        };
    }
    return {
        label: "Đang bán",
        bg: "#e8f5e9",
        color: "#2e7d32",
        row: "#ffffff",
        border: "transparent",
    };
};
export const StockStatusField = () => (
    <FunctionField
        label="Trạng thái"
        render={(record: Inventory) => {
            const status =
                getStockStatus(record);
            return (
                <Chip
                    label={status.label}
                    size="small"
                    sx={{
                        backgroundColor: status.bg,
                        color: status.color,
                        fontWeight: 600,
                    }}
                />
            );
        }}
    />

);
export const inventoryRowStyle = (
    record: Inventory
) => {
    const status =
        getStockStatus(record);
    return {
        backgroundColor: status.row,
        borderLeft:
            `5px solid ${status.border}`,
    };
};