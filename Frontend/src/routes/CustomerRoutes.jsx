import "react";
import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Menu from "../pages/customer/Menu";
import Order from "../pages/customer/Order";
import MenuDetail from "../pages/customer/MenuDetail";
import Profile from "../pages/customer/Profile";
import OrderConfirmation from "../pages/customer/OrderConfirmation";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="menus" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="menus/:id" element={<MenuDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orderconfirmation" element={<OrderConfirmation />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
