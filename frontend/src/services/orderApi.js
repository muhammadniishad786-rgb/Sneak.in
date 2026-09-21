import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/order", orderData);
  return response.data;
};

// Get single order
export const getOrderById = async (id) => {
  const response = await api.get(`/order/${id}`);

  return response.data;
};

// Get all orders
export const getOrder = async () => {
  const response = await api.get("/orders");

  return response.data;
};

// Cancel order
export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);

  return response.data;
};