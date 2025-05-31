const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

const handleResponse = async (response) => {
  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!response.ok) {
    if (responseData.errors) {
      const errors = responseData.errors.map((err) => err.msg);
      throw new Error(errors.join(", "));
    }
    throw new Error(responseData.message || "Something went wrong");
  }

  return responseData;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const getUserProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const updateUserProfile = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  if (userData.profile_picture) {
    formData.append("profile_picture", userData.profile_picture);
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  });
  return handleResponse(response);
};

export const deleteUser = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getMenus = async () => {
  const response = await fetch(`${API_URL}/menus`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getMenu = async (menuId) => {
  const response = await fetch(`${API_URL}/menus/${menuId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createMenu = async (menuData) => {
  const formData = new FormData();
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("description", menuData.description);
  if (menuData.image) {
    formData.append("image", menuData.image);
  }

  const response = await fetch(`${API_URL}/menus`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  return handleResponse(response);
};

export const updateMenu = async (menuId, menuData) => {
  const formData = new FormData();
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("description", menuData.description);
  if (menuData.image) {
    formData.append("image", menuData.image);
  }

  const response = await fetch(`${API_URL}/menus/${menuId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  });
  return handleResponse(response);
};

export const deleteMenu = async (menuId) => {
  const response = await fetch(`${API_URL}/menus/${menuId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};
