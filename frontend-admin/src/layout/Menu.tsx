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
import HouseIcon from "@mui/icons-material/House";
import ArticleIcon from "@mui/icons-material/Article";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ImageIcon from "@mui/icons-material/Image";

import SubMenu from "./SubMenu";
type MenuName =
    | "menuProducts"
    | "menuBlogs"
    | "menuUsers"
    | "menuOrders"
    | "menuOthers";
const Menu = ({dense = false}: any) => {
    const [state, setState] = useState({
        menuProducts: true,
        menuBlogs: true,
        menuUsers: true,
        menuOrders: true,
        menuOthers:true,
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
            {/* Product */}
            <SubMenu
                handleToggle={()=>handleToggle("menuProducts")}
                isOpen={state.menuProducts}
                name="Product"
                icon={<BookIcon/>}
                dense={dense}

            >
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
                <MenuItemLink
                    to="/reviews"
                    primaryText="Đánh giá"
                    leftIcon={<RateReviewIcon/>}
                    dense={dense}
                />
                <MenuItemLink
                    to="/inventory"
                    primaryText="Lô hàng"
                    leftIcon={<InventoryIcon/>}
                    dense={dense}
                />

            </SubMenu>
            {/* Blog */}
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
            {/* User */}
            <SubMenu
                handleToggle={()=>handleToggle("menuUsers")}
                isOpen={state.menuUsers}
                name="Users"
                icon={<PeopleIcon/>}
                dense={dense}

            >
                <MenuItemLink
                    to="/users"
                    primaryText="Người dùng"
                    leftIcon={<PeopleIcon/>}
                    dense={dense}
                />
                {/* Address */}
                <MenuItemLink
                    to="/address"
                    primaryText="Địa chỉ"
                    leftIcon={<HouseIcon/>}
                    dense={dense}
                />
            </SubMenu>
            {/* Order */}
            <SubMenu
                handleToggle={() => handleToggle("menuOrders")}
                isOpen={state.menuOrders}
                name="Orders"
                icon={<ReceiptLongIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/orders"
                    primaryText="Đơn hàng"
                    leftIcon={<ReceiptLongIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/promotions"
                    primaryText="Mã giảm giá"
                    leftIcon={<LocalOfferIcon/>}
                    dense={dense}
                />
            </SubMenu>
            {/* Others */}
            <SubMenu
                handleToggle={() => handleToggle("menuOthers")}
                isOpen={state.menuOthers}
                name="Others"
                icon={<ReceiptLongIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/banners"
                    primaryText="Banner"
                    leftIcon={<ImageIcon />}
                    dense={dense}
                />
            </SubMenu>
        </Box>
    )
}
export default Menu;