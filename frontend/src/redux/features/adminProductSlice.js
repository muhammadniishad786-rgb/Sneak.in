import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAdminProduct,
  getAdminProductById,
  updateAdminProduct,
  deleteAdminProduct as deleteAdminProductApi,
} from "../../services/admin/adminProductApi";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

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

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

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

// ==========================================
// UPDATE PRODUCT
// ==========================================

export const editAdminProduct = createAsyncThunk(
  "adminProducts/editAdminProduct",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateAdminProduct(
        id,
        data
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  }
);

// ==========================================
// DELETE PRODUCT
// ==========================================

export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/deleteAdminProduct",

  async (id, { rejectWithValue }) => {
    try {
      const response =
        await deleteAdminProductApi(id);

      return {
        id,
        ...response,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  }
);

// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {
  products: [],

  selectedProduct: null,

  loading: false,
  productLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,
};

// ==========================================
// SLICE
// ==========================================

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

      // ==========================================
      // FETCH ALL PRODUCTS
      // ==========================================

      .addCase(
        fetchAdminProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload.products ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // FETCH SINGLE PRODUCT
      // ==========================================

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
            action.payload.product ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminProductById.rejected,
        (state, action) => {
          state.productLoading = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // UPDATE PRODUCT
      // ==========================================

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
            action.payload.product ||
            action.payload;

          // Update selected product
          state.selectedProduct =
            updatedProduct;

          // Find product in products array
          const index =
            state.products.findIndex(
              (product) =>
                product._id ===
                updatedProduct._id
            );

          // Replace old product
          if (index !== -1) {
            state.products[index] =
              updatedProduct;
          }
        }
      )

      .addCase(
        editAdminProduct.rejected,
        (state, action) => {
          state.updateLoading = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // DELETE PRODUCT
      // ==========================================

      .addCase(
        deleteAdminProduct.pending,
        (state) => {
          state.deleteLoading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteAdminProduct.fulfilled,
        (state, action) => {
          state.deleteLoading = false;

          // Remove deleted product
          state.products =
            state.products.filter(
              (product) =>
                product._id !== action.payload.id
            );

          // If deleted product was selected
          if (
            state.selectedProduct?._id ===
            action.payload.id
          ) {
            state.selectedProduct = null;
          }
        }
      )

      .addCase(
        deleteAdminProduct.rejected,
        (state, action) => {
          state.deleteLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearSelectedProduct,
} = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
