import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice"
import cartReducer from "../features/cartSlice"
import addressReducer from "../features/addressSlice"
import orderReducer from "../features/orderSlice"

export const store = configureStore({
    reducer:{
        products: productReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer
    }
})
