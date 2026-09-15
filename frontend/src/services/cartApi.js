import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

export const updateCartItem = async (itemId, data) => {
  const response = await api.put(`/cart/${itemId}`, data);
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};
