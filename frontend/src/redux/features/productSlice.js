import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getProducts } from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",

    async (params = {}) => {
        const response = await getProducts(params)

        return response.data; 
    }

)

const initialState = {
    products: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer