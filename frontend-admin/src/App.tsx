import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";
import authProvider from "./provider/authProvider";

import Dashboard from "./components/dashbroad/Dashbroad";
import { LoginPage } from "./layout/Login";
import { MyLayout } from "./layout/MainLayout";

import category from "./components/category";
import products from "./components/products";
import blogs from "./components/blogs";
import blogCate from "./components/blogCate";
import users from "./components/users";
import address from "./components/address";
import reviews from "./components/reviews";

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    layout={MyLayout}
    dashboard={Dashboard}    
    >
    <Resource name="products" {...products} />
    <Resource name="category" {...category}/>
    <Resource name="blogs" {...blogs}/>
    <Resource name="blog-cate" {...blogCate}/>
    <Resource name="users" {...users}/>
    <Resource name="address" {...address} />
    <Resource name="reviews" options={{ label: "Đánh giá" }} {...reviews}/>
  </Admin>
);

export default App;