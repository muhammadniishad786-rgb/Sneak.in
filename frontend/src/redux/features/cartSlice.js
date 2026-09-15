import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "../../services/cartApi";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart();

      console.log("CART API RESPONSE:", data);

      return data.cart;
    } catch (error) {
      console.log("CART API ERROR:", error.response);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
