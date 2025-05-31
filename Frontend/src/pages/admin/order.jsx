import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [totals, setTotals] = useState({
    users: 0,
    menus: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTotals = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      const response = await fetch(`${API_URL}/dashboard/totals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch totals");

      const data = await response.json();

      setTotals({
        users: data.totalUsers,
        menus: data.totalMenus,
        orders: data.totalOrders,
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Total Menu</h2>
          <p className="text-2xl font-bold text-blue-500">{totals.menus}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-green-500">{totals.orders}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-2xl font-bold text-purple-500">{totals.users}</p>
        </div>
      </div>

      {/* Contoh recent orders statis, bisa diupdate juga nanti */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        <div className="bg-white p-4 shadow-md rounded-xl">
          <ul className="divide-y">
            <li className="py-2 flex justify-between">
              <span>Order #00123</span>
              <span className="text-sm text-gray-600">Completed</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Order #00122</span>
              <span className="text-sm text-gray-600">Pending</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Order #00121</span>
              <span className="text-sm text-gray-600">Cancelled</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
