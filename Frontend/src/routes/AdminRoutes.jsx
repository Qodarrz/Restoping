import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import MenuPage from "../pages/admin/menu";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu" element={<MenuPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
