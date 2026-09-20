import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAdminProduct,
  getAdminProductById,
  updateAdminProduct,
} from "../../services/admin/adminProductApi";

// Get all products
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

// Get single product
export const fetchAdminProductById = createAsyncThunk(
  "adminProducts/fetchAdminProductById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAdminProductById(id);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  }
);

// Update product
export const editAdminProduct = createAsyncThunk(
  "adminProducts/editAdminProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateAdminProduct(id, data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,

  loading: false,
  productLoading: false,
  updateLoading: false,

  error: null,
};

const adminProductsSlice = createSlice({
  name: "adminProducts",

  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH ALL PRODUCTS
      // =========================

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
      )

      // =========================
      // FETCH SINGLE PRODUCT
      // =========================

      .addCase(
        fetchAdminProductById.pending,
        (state) => {
          state.productLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminProductById.fulfilled,
        (state, action) => {
          state.productLoading = false;

          state.selectedProduct =
            action.payload.product || action.payload;
        }
      )

      .addCase(
        fetchAdminProductById.rejected,
        (state, action) => {
          state.productLoading = false;
          state.error = action.payload;
        }
      )

      // =========================
      // UPDATE PRODUCT
      // =========================

      .addCase(
        editAdminProduct.pending,
        (state) => {
          state.updateLoading = true;
          state.error = null;
        }
      )

      .addCase(
        editAdminProduct.fulfilled,
        (state, action) => {
          state.updateLoading = false;

          const updatedProduct =
            action.payload.product || action.payload;

          // Update selected product
          state.selectedProduct = updatedProduct;

          // Update product inside products array
          const index = state.products.findIndex(
            (product) =>
              product._id === updatedProduct._id
          );

          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      )

      .addCase(
        editAdminProduct.rejected,
        (state, action) => {
          state.updateLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearSelectedProduct,
} = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
