import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";

import categories from "./components/category";
import products from "./components/products";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" {...products} />
    <Resource name="categories" {...categories}/>
  </Admin>
);

export default App;