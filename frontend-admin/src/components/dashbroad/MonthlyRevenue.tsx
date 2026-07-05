import CardWithIcon from "./CardWithIcon";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const MonthlyRevenue = () => (
    <CardWithIcon
        to="/products"
        icon={AttachMoneyIcon}
        title="Doanh thu tháng này"
        subtitle="12.500.000đ"
    />
);

export default MonthlyRevenue;