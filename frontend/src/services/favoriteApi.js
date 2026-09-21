import api from "./api";

// Add product to favorites
export const addFavorite = async (productId) => {
  const response = await api.post("/favorite", {
    productId,
  });

  return response.data;
};

// Get all favorites
export const getFavorites = async () => {
  const response = await api.get("/favorite");

  return response.data;
};

// Check if a product is in favorites
export const checkFavorite = async (productId) => {
  const response = await api.get(`/favorite/check/${productId}`);

  return response.data;
};

// Remove product from favorites
export const removeFavorite = async (productId) => {
  const response = await api.delete(`/favorite/${productId}`);

  return response.data;
};