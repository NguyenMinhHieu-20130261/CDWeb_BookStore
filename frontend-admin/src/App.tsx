import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";

import category from "./components/category";
import products from "./components/products";
import blogs from "./components/blogs";
import users from "./components/users";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" {...products} />
    <Resource name="category" {...category}/>
    <Resource name="blogs" {...blogs}/>
    <Resource name="users" {...users}/>
  </Admin>
);

export default App;