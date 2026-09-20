import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getAdminProduct } from "../../services/admin/adminProductApi";

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminProduct();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products data"
      );
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const adminProductsSlice = createSlice({
  name: "adminProducts",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload.products || action.payload;
        }
      )

      .addCase(
        fetchAdminProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default adminProductsSlice.reducer;
