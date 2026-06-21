import { useState } from "react";

import {
    DashboardMenuItem,
    MenuItemLink,
    useSidebarState,
} from "react-admin";
import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import BookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";

import SubMenu from "./SubMenu";
type MenuName = "menuBlogs";
const Menu = ({dense = false}: any) => {
    const [state,setState] = useState({
        menuBlogs:true
    });
    const [open] = useSidebarState();
    const handleToggle = (menu:MenuName)=>{
        setState(state=>({
            ...state,
            [menu]: !state[menu]
        }))
    }
    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop:1,
            }}
        >
            <DashboardMenuItem />
            <MenuItemLink
                to="/products"
                primaryText="Sản phẩm"
                leftIcon={<BookIcon/>}
                dense={dense}
            />
            <MenuItemLink
                to="/category"
                primaryText="Danh mục"
                leftIcon={<CategoryIcon/>}
                dense={dense}
            />
            <SubMenu
                handleToggle={()=>handleToggle("menuBlogs")}
                isOpen={state.menuBlogs}
                name="Blog"
                icon={<ArticleIcon/>}
                dense={dense}

            >
                <MenuItemLink
                    to="/blogs"
                    primaryText="Bài viết"
                    leftIcon={<ArticleIcon/>}
                    dense={dense}
                />
                <MenuItemLink
                    to="/blog-cate"
                    primaryText="Danh mục blog"
                    leftIcon={<CategoryIcon/>}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to="/users"
                primaryText="Người dùng"
                leftIcon={<PeopleIcon/>}
                dense={dense}
            />
        </Box>
    )
}
export default Menu;