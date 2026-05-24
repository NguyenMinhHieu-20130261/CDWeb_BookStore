import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";

import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
} from "./components/category";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="categories"
      list={CategoryList}
      create={CategoryCreate}
      edit={CategoryEdit}
    />
  </Admin>
);

export default App;