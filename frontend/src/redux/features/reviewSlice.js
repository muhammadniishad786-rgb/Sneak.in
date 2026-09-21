import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../../services/reviewApi";

// =========================
// Fetch Reviews
// =========================
export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await getProductReviews(productId);

      return data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// =========================
// Add Review
// =========================
export const addNewReview = createAsyncThunk(
  "review/addNewReview",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const data = await addReview(productId, formData);

      return data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add review"
      );
    }
  }
);

// =========================
// Update Review
// =========================
export const updateExistingReview = createAsyncThunk(
  "review/updateExistingReview",
  async ({ reviewId, formData }, { rejectWithValue }) => {
    try {
      const data = await updateReview(reviewId, formData);

      return data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

// =========================
// Delete Review
// =========================
export const deleteExistingReview = createAsyncThunk(
  "review/deleteExistingReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await deleteReview(reviewId);

      return reviewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// =========================
// Initial State
// =========================
const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

// =========================
// Slice
// =========================
const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // Fetch Reviews
    // =========================
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })

      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Add Review
    // =========================
    builder
      .addCase(addNewReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addNewReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews.unshift(action.payload);
      })

      .addCase(addNewReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Update Review
    // =========================
    builder
      .addCase(updateExistingReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateExistingReview.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );

        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })

      .addCase(updateExistingReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Delete Review
    // =========================
    builder
      .addCase(deleteExistingReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteExistingReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })

      .addCase(deleteExistingReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError } = reviewSlice.actions;

export default reviewSlice.reducer;