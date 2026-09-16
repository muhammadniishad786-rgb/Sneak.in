import api from "./api"

export const getAddress = async () => {
    const response = await api.get("/address")

    return response.data
}

// for add address / addressApi.js
export const addAddress = async (data) => {
  const response = await api.post("/address", data);
  return response.data;
};