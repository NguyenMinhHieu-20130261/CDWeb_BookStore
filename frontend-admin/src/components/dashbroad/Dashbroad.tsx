import { useGetList } from "react-admin";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Welcome from "./Welcome";
import MonthlyRevenue from "./MonthlyRevenue";
import NewCustomers from "./NewCustomers";

import CardWithIcon from "./CardWithIcon";

const Dashboard = () => {
    const { total: totalProducts } = useGetList("products", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        filter: {},
    });

    const { total: totalCategory } = useGetList("category", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        filter: {},
    });

    const { total: totalBlogs } = useGetList("blogs", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        filter: {},
    });

    const { total: totalBlogCate } = useGetList("blog-cate", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        filter: {},
    });

    const { total: totalUsers } = useGetList("users", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        filter: {},
    });

    return (
        <Box p={2}>
            <Welcome />
            <Typography variant="h5" mb={2}>
                Dashboard quản trị BookShop
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/products"
                        icon={InventoryIcon}
                        title="Sản phẩm"
                        subtitle={totalProducts ?? 0}
                    />
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/category"
                        icon={CategoryIcon}
                        title="Danh mục sản phẩm"
                        subtitle={totalCategory ?? 0}
                    />
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/blogs"
                        icon={ArticleIcon}
                        title="Bài viết"
                        subtitle={totalBlogs ?? 0}
                    />
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/blog-cate"
                        icon={CategoryIcon}
                        title="Danh mục bài viết"
                        subtitle={totalBlogCate ?? 0}
                    />
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/users"
                        icon={PeopleIcon}
                        title="Người dùng"
                        subtitle={totalUsers ?? 0}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <MonthlyRevenue />
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <CardWithIcon
                        to="/products"
                        icon={ShoppingCartIcon}
                        title="Đơn hàng mới"
                        subtitle={8}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={1}>
                                Thống kê nhanh
                            </Typography>
                            <Typography>
                                Sản phẩm đang bán: {totalProducts ?? 0}
                            </Typography>
                            <Typography>
                                Danh mục sản phẩm: {totalCategory ?? 0}
                            </Typography>
                            <Typography>
                                Bài viết tin tức: {totalBlogs ?? 0}
                            </Typography>
                            <Typography>
                                Danh mục bài viết: {totalBlogCate ?? 0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12 ,md:4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={1}>
                                Dữ liệu mẫu
                            </Typography>
                            <Typography>Đơn hàng chờ xử lý: 5</Typography>
                            <Typography>Đánh giá mới: 12</Typography>
                            <Typography>Sản phẩm sắp hết hàng: 3</Typography>
                            <Typography>Doanh thu hôm nay: 1.200.000đ</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <NewCustomers />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;