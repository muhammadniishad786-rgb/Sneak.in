import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../services/addressApi";

// ===============================
// Fetch All Addresses
// ===============================

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAddress();

      return data.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

// ===============================
// Add New Address
// ===============================

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const data = await addAddress(addressData);

      return data.address;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

// ===============================
// Update Address
// ===============================

export const updateExistingAddress = createAsyncThunk(
  "address/updateExistingAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const data = await updateAddress(id, addressData);

      return data.address;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address",
      );
    }
  },
);

// ===============================
// Delete Address
// ===============================

export const deleteExistingAddress = createAsyncThunk(
  "address/deleteExistingAddress",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAddress(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

// ===============================
// Set Default Address
// ===============================

export const makeDefaultAddress = createAsyncThunk(
  "address/makeDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const data = await setDefaultAddress(id);

      return data.address;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set default address",
      );
    }
  },
);

// ===============================
// Initial State
// ===============================

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

// ===============================
// Address Slice
// ===============================

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===========================
      // FETCH ADDRESSES
      // ===========================

      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // ADD ADDRESS
      // ===========================

      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses.push(action.payload);
      })

      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // UPDATE ADDRESS
      // ===========================

      .addCase(updateExistingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateExistingAddress.fulfilled, (state, action) => {
        state.loading = false;

        const updatedAddress = action.payload;

        const index = state.addresses.findIndex(
          (address) => address._id === updatedAddress._id,
        );

        if (index !== -1) {
          state.addresses[index] = updatedAddress;
        }
      })

      .addCase(updateExistingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // DELETE ADDRESS
      // ===========================

      .addCase(deleteExistingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteExistingAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload,
        );
      })

      .addCase(deleteExistingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // MAKE DEFAULT ADDRESS
      // ===========================

      .addCase(makeDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(makeDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;

        const defaultAddress = action.payload;

        state.addresses = state.addresses.map((address) => ({
          ...address,
          isDefault: address._id === defaultAddress._id,
        }));
      })

      .addCase(makeDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
