import { Layout } from "react-admin";
import Menu from "./Menu";

export const MyLayout = (props:any) => (
    <Layout 
        {...props}
        menu={Menu}
    />
);