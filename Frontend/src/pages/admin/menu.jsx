import { useEffect, useState, useCallback } from "react";
import MenuCard from "../../components/AdminComponents/MenuPages/MenuCard";
import MenuModal from "../../components/AdminComponents/MenuPages/MenuModal";
import CreateMenuModal from "../../components/AdminComponents/MenuPages/CreateMenuModal";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import { FiPlus, FiRefreshCw } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;

const MainApp = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMenus = useCallback(async () => {
    try {
      const isInitialLoad = !isRefreshing;
      if (isInitialLoad) setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch menus: ${response.statusText}`);
      }

      const data = await response.json();
      setMenus(
        Array.isArray(data.menus) ? data.menus : Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMenus();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/menus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete menu: ${response.statusText}`);
      }

      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
      setSelectedMenu(null);
    } catch (err) {
      alert("Error deleting menu: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/menu/edit/${id}`;
  };

  const handleCreate = async (formData) => {
    try {
      setIsCreating(true);
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/menus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create menu: ${response.statusText}`);
      }

      const newMenu = await response.json();
      setMenus((prevMenus) => [newMenu, ...prevMenus]);
      setShowCreateModal(false);
    } catch (err) {
      alert("Error creating menu: " + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return <Loading fullPage />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchMenus} />;
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Menu Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {menus.length} {menus.length === 1 ? "item" : "items"} in your menu
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            disabled={isCreating}
          >
            <FiPlus />
            {isCreating ? "Creating..." : "Add Menu"}
          </button>
        </div>
      </div>

      {menus.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No menus yet</h3>
            <p className="mt-1 text-gray-500">
              Get started by creating your first menu item.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                New Menu Item
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {menus.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onClick={() => setSelectedMenu(menu)}
              />
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {menus.length} {menus.length === 1 ? "item" : "items"}
          </div>
        </>
      )}

      {selectedMenu && (
        <MenuModal
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {showCreateModal && (
        <CreateMenuModal
          onClose={() => !isCreating && setShowCreateModal(false)}
          onCreate={handleCreate}
          isCreating={isCreating}
        />
      )}
    </div>
  );
};

export default MainApp;