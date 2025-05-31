import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4500/api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
    profile_picture: "",
    Orders: [],
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const uploadFormData = new FormData();
    uploadFormData.append("profile_picture", image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update profile picture"
        );
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setImage(null);

      // Show success feedback
      document.getElementById("uploadSuccess").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("uploadSuccess").classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      document.getElementById("uploadError").textContent = error.message;
      document.getElementById("uploadError").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("uploadError").classList.add("hidden");
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);

      // Show success feedback
      document.getElementById("updateSuccess").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("updateSuccess").classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Update error:", error);
      document.getElementById("updateError").textContent = error.message;
      document.getElementById("updateError").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("updateError").classList.add("hidden");
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      processing: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success/Error Messages */}
        <div id="uploadSuccess" className="hidden fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Profile picture updated successfully!
          </div>
        </div>

        <div id="uploadError" className="hidden fixed top-4 right-4 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Failed to update profile picture
          </div>
        </div>

        <div id="updateSuccess" className="hidden fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Profile updated successfully!
          </div>
        </div>

        <div id="updateError" className="hidden fixed top-4 right-4 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Failed to update profile
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-64 w-full flex items-center justify-center">
            <img
              src="/images/restoping.png"
              alt="Deskripsi Gambar"
              className="w-56 h-56 object-contain"
            />
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-20 sm:-mt-24 mb-6">
              {/* Profile Picture */}
              <div className="relative group">
                <img
                  src={
                    user.profile_picture || "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {editMode && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">
                      Change Photo
                    </span>
                  </div>
                )}
              </div>

              {/* Profile Actions */}
              <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-3">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`${
                    activeTab === "profile"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`${
                    activeTab === "orders"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Order History
                  {user.Orders?.length > 0 && (
                    <span className="ml-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {user.Orders.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "profile" ? (
              <div className="space-y-6">
                {!editMode ? (
                  <>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.name || "No name"}
                      </h1>
                      <p className="text-gray-600">
                        {user.email || "No email"}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Role: {user.role || "No role"}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        About
                      </h2>
                      <p className="text-gray-600">
                        {user.bio || "No bio available"}
                      </p>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Update Profile Picture
                      </h2>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          id="profile_picture"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="hidden"
                        />
                        <label
                          htmlFor="profile_picture"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-gray-500">
                          {image ? image.name : "No file chosen"}
                        </span>
                        {image && (
                          <button
                            onClick={handleUpload}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Order History
                </h2>

                {user.Orders?.length > 0 ? (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {user.Orders.map((order) => (
                          <tr key={order.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              #{order.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.created_at
                                ? formatDate(order.created_at)
                                : "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${parseFloat(order.total_amount).toFixed(2)}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => navigate(`/customer/orders/${order.id}`)}
                                className="text-green-600 hover:text-green-900"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No orders
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven&apos;t placed any orders yet.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
