import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createOrder } from "../../services/orderApi";


// Create Order
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",

  async (orderData, { rejectWithValue }) => {
    try {
      console.log("ORDER DATA SENT:", orderData);

      const data = await createOrder(orderData);

      console.log("ORDER API RESPONSE:", data);

      return data.order;
    } catch (error) {
      console.log("ORDER API ERROR:", error);
      console.log("ORDER API ERROR RESPONSE:", error.response?.data);
      console.log("ORDER API ERROR STATUS:", error.response?.status);

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create order"
      );
    }
  }
);


const initialState = {
  order: null,
  loading: false,
  error: null,
};


const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      // Error
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default orderSlice.reducer;
