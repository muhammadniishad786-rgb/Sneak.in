import api from "./api";

// Get all addresses
export const getAddress = async () => {
  const response = await api.get("/address");

  return response.data;
};


// Add new address
export const addAddress = async (addressData) => {
  const response = await api.post("/address", addressData);

  return response.data;
};


// Update existing address
export const updateAddress = async (id, addressData) => {
  const response = await api.put(`/address/${id}`, addressData);

  return response.data;
};


// Delete address
export const deleteAddress = async (id) => {
  const response = await api.delete(`/address/${id}`);

  return response.data;
};


// Set address as default
export const setDefaultAddress = async (id) => {
  const response = await api.patch(`/address/${id}/default`);

  return response.data;
};
