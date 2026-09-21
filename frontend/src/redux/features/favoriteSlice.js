import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addFavorite,
  getFavorites,
  checkFavorite,
  removeFavorite,
} from "../../services/favoriteApi";

// Get all favorites
export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavorites();
      return data.favorites;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorites"
      );
    }
  }
);

// Add favorite
export const addToFavorites = createAsyncThunk(
  "favorite/addToFavorites",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await addFavorite(productId);
      return data.favorite;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add favorite"
      );
    }
  }
);

// Remove favorite
export const removeFromFavorites = createAsyncThunk(
  "favorite/removeFromFavorites",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFavorite(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove favorite"
      );
    }
  }
);

// Check favorite
export const checkProductFavorite = createAsyncThunk(
  "favorite/checkProductFavorite",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await checkFavorite(productId);

      return {
        productId,
        isFavorite: data.isFavorite,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check favorite"
      );
    }
  }
);

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Fetch favorites
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })

      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add favorite
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;

        state.favorites.push(action.payload);
      })

      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove favorite
    builder
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;

        state.favorites = state.favorites.filter(
          (favorite) => favorite.product._id !== action.payload
        );
      })

      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Check favorite
    builder
      .addCase(checkProductFavorite.fulfilled, (state, action) => {
        const { productId, isFavorite } = action.payload;

        if (isFavorite) {
          const alreadyExists = state.favorites.some(
            (favorite) => favorite.product._id === productId
          );

          if (!alreadyExists) {
            state.favorites.push({
              product: {
                _id: productId,
              },
            });
          }
        } else {
          state.favorites = state.favorites.filter(
            (favorite) => favorite.product._id !== productId
          );
        }
      });
  },
});

export default favoriteSlice.reducer;