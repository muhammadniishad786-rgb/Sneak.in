import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
} from "../../services/admin/AdminOrderApi"

// ============================================
// GET ALL ORDERS
// ============================================

export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminOrders();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    }
  }
);

// ============================================
// GET SINGLE ORDER
// ============================================

export const fetchAdminOrderById = createAsyncThunk(
  "adminOrders/fetchAdminOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAdminOrderById(id);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch order"
      );
    }
  }
);

// ============================================
// UPDATE ORDER STATUS
// ============================================

export const editAdminOrderStatus = createAsyncThunk(
  "adminOrders/editAdminOrderStatus",
  async (
    { id, orderStatus },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateAdminOrderStatus(
        id,
        orderStatus
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  orders: [],
  selectedOrder: null,

  loading: false,
  orderLoading: false,
  statusLoading: false,

  error: null,
};

// ============================================
// SLICE
// ============================================

const adminOrderSlice = createSlice({
  name: "adminOrders",

  initialState,

  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================
      // FETCH ALL ORDERS
      // ========================================

      .addCase(
        fetchAdminOrders.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminOrders.fulfilled,
        (state, action) => {
          state.loading = false;

          state.orders =
            action.payload.orders ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ========================================
      // FETCH SINGLE ORDER
      // ========================================

      .addCase(
        fetchAdminOrderById.pending,
        (state) => {
          state.orderLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminOrderById.fulfilled,
        (state, action) => {
          state.orderLoading = false;

          state.selectedOrder =
            action.payload.order ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminOrderById.rejected,
        (state, action) => {
          state.orderLoading = false;
          state.error = action.payload;
        }
      )

      // ========================================
      // UPDATE ORDER STATUS
      // ========================================

      .addCase(
        editAdminOrderStatus.pending,
        (state) => {
          state.statusLoading = true;
          state.error = null;
        }
      )

      .addCase(
        editAdminOrderStatus.fulfilled,
        (state, action) => {
          state.statusLoading = false;

          const updatedOrder =
            action.payload.order ||
            action.payload;

          // Update selected order
          state.selectedOrder = updatedOrder;

          // Update order inside orders array
          const index = state.orders.findIndex(
            (order) =>
              order._id === updatedOrder._id
          );

          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      )

      .addCase(
        editAdminOrderStatus.rejected,
        (state, action) => {
          state.statusLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearSelectedOrder,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
