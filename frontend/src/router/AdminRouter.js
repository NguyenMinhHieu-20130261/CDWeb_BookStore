import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../admin/page/DashBoard/AdminDashboard";
import AdminLayout from "../admin/components/general/AdminLayout";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>

        <Route index element={<AdminDashboard />} />

        <Route path="test" element={<AdminDashboard />} />
        
      </Route>
    </Routes>
  );
};

export default AdminRouter;