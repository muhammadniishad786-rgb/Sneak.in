import api from "./api";

// Get all reviews for a product
export const getProductReviews = async (productId) => {
  const response = await api.get(`/review/${productId}`);
  return response.data;
};

// Add a review
export const addReview = async (productId, formData) => {
  const response = await api.post(
    `/review/${productId}`,
    formData
  );

  return response.data;
};

// Update a review
export const updateReview = async (reviewId, formData) => {
  const response = await api.patch(
    `/review/${reviewId}`,
    formData
  );

  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId) => {
  const response = await api.delete(
    `/review/${reviewId}`
  );

  return response.data;
};