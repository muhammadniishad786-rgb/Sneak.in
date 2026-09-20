import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAdminUsers,
  getAdminUserById,
  updateAdminUserStatus,
} from "../../services/admin/adminUserApi";

// ============================================
// GET ALL USERS
// ============================================

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminUsers();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

// ============================================
// GET SINGLE USER
// ============================================

export const fetchAdminUserById = createAsyncThunk(
  "adminUsers/fetchAdminUserById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAdminUserById(id);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch user"
      );
    }
  }
);

// ============================================
// BLOCK / UNBLOCK USER
// ============================================

export const editAdminUserStatus =
  createAsyncThunk(
    "adminUsers/editAdminUserStatus",
    async (
      { id, isBlocked },
      { rejectWithValue }
    ) => {
      try {
        const data =
          await updateAdminUserStatus(
            id,
            isBlocked
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to update user status"
        );
      }
    }
  );

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  users: [],
  selectedUser: null,

  loading: false,
  userLoading: false,
  statusLoading: false,

  error: null,
};

// ============================================
// SLICE
// ============================================

const adminUserSlice = createSlice({
  name: "adminUsers",

  initialState,

  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================
      // FETCH ALL USERS
      // ========================================

      .addCase(
        fetchAdminUsers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminUsers.fulfilled,
        (state, action) => {
          state.loading = false;

          state.users =
            action.payload.users ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ========================================
      // FETCH SINGLE USER
      // ========================================

      .addCase(
        fetchAdminUserById.pending,
        (state) => {
          state.userLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminUserById.fulfilled,
        (state, action) => {
          state.userLoading = false;

          state.selectedUser =
            action.payload.user ||
            action.payload;
        }
      )

      .addCase(
        fetchAdminUserById.rejected,
        (state, action) => {
          state.userLoading = false;
          state.error = action.payload;
        }
      )

      // ========================================
      // BLOCK / UNBLOCK USER
      // ========================================

      .addCase(
        editAdminUserStatus.pending,
        (state) => {
          state.statusLoading = true;
          state.error = null;
        }
      )

      .addCase(
        editAdminUserStatus.fulfilled,
        (state, action) => {
          state.statusLoading = false;

          const updatedUser =
            action.payload.user ||
            action.payload;

          // Update selected user
          state.selectedUser = updatedUser;

          // Update user inside users array
          const index =
            state.users.findIndex(
              (user) =>
                user._id === updatedUser._id
            );

          if (index !== -1) {
            state.users[index] = updatedUser;
          }
        }
      )

      .addCase(
        editAdminUserStatus.rejected,
        (state, action) => {
          state.statusLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearSelectedUser,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
