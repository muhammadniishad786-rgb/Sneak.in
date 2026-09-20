import api from "../api";

// Get all users
export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};

// Get single user
export const getAdminUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);

  return response.data;
};

// Block / Unblock user
export const updateAdminUserStatus = async (
  id,
  isBlocked
) => {
  const response = await api.put(
    `/admin/users/${id}/status`,
    { isBlocked }
  );

  return response.data;
};
