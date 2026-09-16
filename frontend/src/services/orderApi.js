import api from "./api"

export const createOrder = async (orderData) => {
    const response = await api.post("/order", orderData)
    return response.data
}