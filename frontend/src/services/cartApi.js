import api from "./api";

export const getCart = async() => {
    const response = await api.get("/cart")

    return response.data
}