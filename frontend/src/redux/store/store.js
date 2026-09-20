import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice"
import cartReducer from "../features/cartSlice"
import addressReducer from "../features/addressSlice"
import orderReducer from "../features/orderSlice"
import adminReducer from "../features/adminDashboardSlice"
import adminProductsReducer from "../features/adminProductSlice"
import adminOrdersReducer from "../features/adminOrderSlice"
import adminUsersReducer from "../features/adminUserSlice"

export const store = configureStore({
    reducer:{
        products: productReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
        admin: adminReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
        adminUsers: adminUsersReducer
    }
})
