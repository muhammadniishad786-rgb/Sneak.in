import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice"
import cartReducer from "../features/cartSlice"
import addressReducer from "../features/addressSlice"

export const store = configureStore({
    reducer:{
        products: productReducer,
        cart: cartReducer,
        address: addressReducer
    }
})
