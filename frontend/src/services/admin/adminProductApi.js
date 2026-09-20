import api from "../api";

export const getAdminProduct = async () => {
  const response = await api.get("/admin/products");

  return response.data;
};

export const getAdminProductById = async (id) => {
  const response = await api.get(`/admin/products/${id}`);

  return response.data;
};

export const updateAdminProduct = async (id, data) => {
  const response = await api.put(
    `/admin/products/${id}`,
    data
  );

  return response.data;
};

export const deleteAdminProduct = async (id) => {
    const response = await api.delete(
        `/admin/products/${id}`
    );

    return response.data
}
