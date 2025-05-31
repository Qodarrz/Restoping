/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    if (decoded.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Menu", path: "/admin/menu", icon: "📋" },
    { name: "Order", path: "/admin/menu-order", icon: "🛒" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2E8B57] text-white flex flex-col shadow-lg">
        <div className="p-10 border-b border-emerald-700">
          <div className="flex items-center">
            <img
              src="../../images/restoping.png"
              className="w-25 h-auto"
              alt="Logo"
            />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all 
                ${
                  location.pathname === item.path
                    ? "bg-emerald-700 font-medium shadow-md"
                    : "hover:bg-emerald-600 hover:shadow-sm"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
              {location.pathname === item.path && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-emerald-600 transition-all font-medium group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">👋</span>
              <span>Logout</span>
            </div>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Optional: Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {menuItems.find((item) => item.path === location.pathname)?.name ||
              "Dashboard"}
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              Admin
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
