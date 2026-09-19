import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminDashboard } from "../../services/admin/adminDashboardApi";


// Fetch dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetchAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminDashboard();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard data"
      );
    }
  }
);


const initialState = {
  stats: {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  },

  lowStockProducts: [],

  recentOrders: [],

  loading: false,

  error: null,
};


const adminDashboardSlice = createSlice({
  name: "adminDashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(
        fetchAdminDashboard.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Success
      .addCase(
        fetchAdminDashboard.fulfilled,
        (state, action) => {
          state.loading = false;

          state.stats = action.payload.stats;

          state.lowStockProducts =
            action.payload.lowStockProducts;

          state.recentOrders =
            action.payload.recentOrders;
        }
      )

      // Error
      .addCase(
        fetchAdminDashboard.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});


export default adminDashboardSlice.reducer;
