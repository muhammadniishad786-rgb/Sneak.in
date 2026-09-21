import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createOrder,
  getOrder,
  getOrderById,
  cancelOrder,
} from "../../services/orderApi";

// ========================================
// Create Order
// ========================================
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",

  async (orderData, { rejectWithValue }) => {
    try {
      const data = await createOrder(orderData);

      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },
);

// ========================================
// Get Order By ID
// ========================================
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",

  async (id, { rejectWithValue }) => {
    try {
      const data = await getOrderById(id);

      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

// ========================================
// Get All Orders
// ========================================
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrder();

      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// ========================================
// Cancel Order
// ========================================
export const cancelExistingOrder = createAsyncThunk(
  "order/cancelExistingOrder",

  async (id, { rejectWithValue }) => {
    try {
      const data = await cancelOrder(id);

      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);

// ========================================
// Initial State
// ========================================
const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
};

// ========================================
// Order Slice
// ========================================
const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ========================================
      // Create Order
      // ========================================

      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Fetch Order By ID
      // ========================================

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Fetch All Orders
      // ========================================

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Cancel Order
      // ========================================

      .addCase(cancelExistingOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(cancelExistingOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload;

        // Update the order inside orders array
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      .addCase(cancelExistingOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
