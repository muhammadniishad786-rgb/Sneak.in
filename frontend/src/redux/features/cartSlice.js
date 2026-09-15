import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart, removeCartItem, updateCartItem } from "../../services/cartApi";




// ==========================================
// GET CART
// ==========================================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();

      return response.cart;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch cart"
      );
    }
  }
);


// ==========================================
// ADD TO CART
// ==========================================

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",

  async (cartData, { rejectWithValue }) => {
    try {
      const response = await addToCart(cartData);

      return response.cart;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to add product to cart"
      );
    }
  }
);


// ==========================================
// UPDATE CART ITEM
// ==========================================

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",

  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(
        itemId,
        { quantity }
      );

      return response.cart;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update cart item"
      );
    }
  }
);


// ==========================================
// REMOVE CART ITEM
// ==========================================

export const removeCartItemThunk = createAsyncThunk(
  "cart/removeCartItem",

  async (itemId, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(itemId);

      return response.cart;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to remove cart item"
      );
    }
  }
);


// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {
  cart: null,
  loading: false,
  adding: false,
  error: null,
};


// ==========================================
// CART SLICE
// ==========================================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // ======================================
      // FETCH CART
      // ======================================

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
      })


      // ======================================
      // ADD TO CART
      // ======================================

      .addCase(addCartItem.pending, (state) => {
        state.adding = true;
        state.error = null;
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        state.adding = false;
        state.cart = action.payload;
      })

      .addCase(addCartItem.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload;
      })


      // ======================================
      // UPDATE CART ITEM
      // ======================================

      .addCase(updateCartItemThunk.pending, (state) => {
        state.error = null;
      })

      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.error = action.payload;
      })


      // ======================================
      // REMOVE CART ITEM
      // ======================================

      .addCase(removeCartItemThunk.pending, (state) => {
        state.error = null;
      })

      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(removeCartItemThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

  },
});

export default cartSlice.reducer;
