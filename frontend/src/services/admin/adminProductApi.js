import api from "../api"

export const getAdminProduct = async() => {
    const respsonse = await api.get("/admin/products")

    return respsonse.data
} 

