import api from "./api";

export const registerUser = (userData) => {
    return api.post("/register", userData)
}

export const loginUser = (userData) => {
    return api.post("/login", userData)
}