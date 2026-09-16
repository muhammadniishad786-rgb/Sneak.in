import api from "./api"

export const getAddress = async () => {
    const response = await api.get("/address")

    return response.data
}