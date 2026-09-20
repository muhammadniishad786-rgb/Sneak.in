import api from "../api";

// Get all orders
export const getAdminOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

// Get single order
export const getAdminOrderById = async (id) => {
  const response = await api.get(`/admin/orders/${id}`);
  return response.data;
};

// Update order status
export const updateAdminOrderStatus = async (id, orderStatus) => {
  const response = await api.put(
    `/admin/orders/${id}/status`,
    { orderStatus }
  );

  return response.data;
};
