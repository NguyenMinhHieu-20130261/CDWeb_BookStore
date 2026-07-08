import { Layout, AppBar, TitlePortal } from "react-admin";
import { Box } from "@mui/material";
import Menu from "./Menu";
import AdminNotificationBell from "./general/AdminNotificationBell";

const MyAppBar = () => (
    <AppBar>
        <TitlePortal />
        <Box flex="1" />
        <AdminNotificationBell />
    </AppBar>
);

export const MyLayout = (props: any) => (
    <Layout
        {...props}
        menu={Menu}
        appBar={MyAppBar}
    />
);