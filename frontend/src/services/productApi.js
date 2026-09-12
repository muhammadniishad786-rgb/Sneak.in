import api from "./api";

export const getProducts = (params) => {
  return api.get("/product", {
    params
  });
};

export const createProduct = (data) => {
  return api.post("/product", data);
};