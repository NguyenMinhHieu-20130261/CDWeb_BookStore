import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";

import categories from "./components/category";
import products from "./components/products";
import blogs from "./components/blogs";
import users from "./components/users";
import reviews from "./components/reviews";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" {...products} />
    <Resource name="categories" {...categories}/>
    <Resource name="blogs" {...blogs}/>
    <Resource name="users" {...users}/>
    <Resource name="reviews" options={{ label: "Đánh giá" }} {...reviews}/>
  </Admin>
);

export default App;