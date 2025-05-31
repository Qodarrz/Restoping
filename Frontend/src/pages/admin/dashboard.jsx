import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import StatsCard from "../../components/AdminComponents/DashboardPages/StatsCard";
import OrdersList from "../../components/AdminComponents/DashboardPages/OrderList";
import OrderDetailsModal from "../../components/AdminComponents/DashboardPages/OrderDetailsModal";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totals: {
      users: 0,
      menus: 0,
      orders: 0,
    },
    orders: [],
    loading: {
      totals: true,
      orders: true,
    },
    error: null,
    selectedOrder: null,
    isModalOpen: false,
  });

  const fetchTotals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_URL}/dashboard/totals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch totals: ${response.status}`);
      }

      const data = await response.json();
      setDashboardData((prev) => ({
        ...prev,
        totals: {
          users: data.totalUsers || 0,
          menus: data.totalMenus || 0,
          orders: data.totalOrders || 0,
        },
        loading: { ...prev.loading, totals: false },
      }));
    } catch (err) {
      setDashboardData((prev) => ({
        ...prev,
        error: err.message || "Failed to fetch totals",
        loading: { ...prev.loading, totals: false },
      }));
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      const ordersData = data.orders || data || [];

      if (!Array.isArray(ordersData)) {
        console.error("Expected array but got:", typeof ordersData, ordersData);
        throw new Error("Invalid orders data format");
      }

      setDashboardData((prev) => ({
        ...prev,
        orders: ordersData,
        loading: { ...prev.loading, orders: false },
      }));
    } catch (err) {
      console.error("Fetch orders error:", err);
      setDashboardData((prev) => ({
        ...prev,
        error: err.message || "Failed to fetch orders",
        loading: { ...prev.loading, orders: false },
      }));
    }
  };

  const handleOrderClick = (order) => {
    setDashboardData((prev) => ({
      ...prev,
      selectedOrder: order,
      isModalOpen: true,
    }));
  };

  const handleCloseModal = () => {
    setDashboardData((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  };

  const handleProcessOrder = async (orderId) => {
    try {
      // Implement your order processing logic here
      console.log("Processing order:", orderId);
      handleCloseModal();
      // Optionally refresh orders after processing
      await fetchOrders();
    } catch (err) {
      console.error("Error processing order:", err);
      setDashboardData((prev) => ({
        ...prev,
        error: err.message || "Failed to process order",
      }));
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setDashboardData((prev) => ({ ...prev, error: null }));
      try {
        await Promise.all([fetchTotals(), fetchOrders()]);
      } catch (err) {
        console.error("Error in loadData:", err);
      }
    };

    loadData();
  }, []);

  const pendingOrders = dashboardData.orders.filter((order) => {
    if (!order || !order.status) return false;
    return order.status.toLowerCase().trim() === "pending";
  });

  const isLoading =
    dashboardData.loading.totals || dashboardData.loading.orders;

  if (isLoading) return <Loading />;
  if (dashboardData.error)
    return <p className="text-red-500">Error: {dashboardData.error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Menu"
          value={dashboardData.totals.menus}
          icon="🍽️"
          colorClass="text-green-500"
        />
        <StatsCard
          title="Total Orders"
          value={dashboardData.totals.orders}
          icon="📦"
          colorClass="text-green-500"
        />
        <StatsCard
          title="Customers"
          value={dashboardData.totals.users}
          icon="👥"
          colorClass="text-green-500"
        />
      </div>

      {/* Pending Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <OrdersList
          pendingOrders={pendingOrders}
          allOrdersCount={dashboardData.orders.length}
          onOrderClick={handleOrderClick}
          onRefresh={fetchOrders}
        />
      </div>

      {/* Order Details Modal */}
      {dashboardData.isModalOpen && dashboardData.selectedOrder && (
        <OrderDetailsModal
          order={dashboardData.selectedOrder}
          onClose={handleCloseModal}
          onProcessOrder={handleProcessOrder}
          apiUrl={API_URL}
        />
      )}
    </div>
  );
};

export default Dashboard;
