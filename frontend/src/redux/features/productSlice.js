import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",

    async () => {
        const response = await axios.get("http://localhost:3000/api/product")

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
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer