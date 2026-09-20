import api from "../api";

// Get admin profile
export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");

  return response.data;
};

// Update admin profile
export const updateAdminProfile = async (data) => {
  const response = await api.put(
    "/admin/profile",
    data
  );

  return response.data;
};
