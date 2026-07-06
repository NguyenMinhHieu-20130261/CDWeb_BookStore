import { Admin, Resource,CustomRoutes  } from "react-admin";
import dataProvider from "./provider/dataProvider";
import authProvider from "./provider/authProvider";

import Dashboard from "./components/dashbroad/Dashbroad";
import { LoginPage } from "./layout/Login";
import { MyLayout } from "./layout/MainLayout";
import { Route } from "react-router-dom";
import AdminNotification from "./components/notifications/AdminNotification";
import { SystemLogList } from "./components/log/SystemLogList";

import category from "./components/category";
import products from "./components/products";
import blogs from "./components/blogs";
import blogCate from "./components/blogCate";
import users from "./components/users";
import address from "./components/address";
import reviews from "./components/reviews";
import inventory from "./components/inventory";
import promotions from "./components/promotions";
import orders from "./components/orders";
import banners from "./components/banners";
import notifications from "./components/notifications";

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    layout={MyLayout}
    dashboard={Dashboard}    
    >
    <CustomRoutes>
        <Route
            path="/admin-notifications"
            element={<AdminNotification/>}
        />
    </CustomRoutes>
    <Resource name="notifications"  options={{ label: "Thông báo" }} {...notifications}/>
    <Resource name="logs" list={SystemLogList} />
    <Resource name="products" {...products} />
    <Resource name="category" {...category}/>
    <Resource name="blogs" {...blogs}/>
    <Resource name="blog-cate" {...blogCate}/>
    <Resource name="users" {...users}/>
    <Resource name="address" {...address} />
    <Resource name="reviews" options={{ label: "Đánh giá" }} {...reviews}/>
    <Resource name="inventory" {...inventory} />
    <Resource name="promotions" {...promotions} />
    <Resource name="orders" {...orders} />
    <Resource name="order-status" />
    <Resource name="banners" {...banners} />
  </Admin>
);

export default App;