import InventoryIcon from "@mui/icons-material/Inventory";
import {InventoryCreate} from "./InventoryCreate";
import {InventoryList} from "./InventoryList";
import {InventorySearch} from "./InventorySearch";
import {InventoryShow} from "./InventoryShow";
import {InventoryEdit} from "./InventoryEdit";
import { Edit } from "react-admin";


export default {
    list: InventoryList,
    create: InventoryCreate,
    show:InventoryShow,
    search:InventorySearch,
    edit:InventoryEdit,
    icon: InventoryIcon,
};