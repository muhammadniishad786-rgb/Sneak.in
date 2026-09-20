import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAdminProfile,
  updateAdminProfile,
} from "../../services/admin/adminProfileApi";


// ============================================
// GET ADMIN PROFILE
// ============================================

export const fetchAdminProfile = createAsyncThunk(
  "adminProfile/fetchAdminProfile",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminProfile();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch admin profile"
      );
    }
  }
);


// ============================================
// UPDATE ADMIN PROFILE
// ============================================

export const editAdminProfile = createAsyncThunk(
  "adminProfile/editAdminProfile",

  async (data, { rejectWithValue }) => {
    try {
      const response = await updateAdminProfile(data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update admin profile"
      );
    }
  }
);


// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  profile: null,

  loading: false,

  updateLoading: false,

  error: null,
};


// ============================================
// SLICE
// ============================================

const adminProfileSlice = createSlice({
  name: "adminProfile",

  initialState,

  reducers: {
    clearAdminProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================
      // FETCH PROFILE
      // ========================================

      .addCase(
        fetchAdminProfile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.profile =
            action.payload.user ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )


      // ========================================
      // UPDATE PROFILE
      // ========================================

      .addCase(
        editAdminProfile.pending,
        (state) => {
          state.updateLoading = true;
          state.error = null;
        }
      )

      .addCase(
        editAdminProfile.fulfilled,
        (state, action) => {
          state.updateLoading = false;

          state.profile =
            action.payload.user ||
            action.payload;
        }
      )

      .addCase(
        editAdminProfile.rejected,
        (state, action) => {
          state.updateLoading = false;

          state.error = action.payload;
        }
      );
  },
});


export const {
  clearAdminProfile,
} = adminProfileSlice.actions;


export default adminProfileSlice.reducer;
