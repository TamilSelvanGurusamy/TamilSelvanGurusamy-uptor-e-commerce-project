import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchSeller,
  fetchProducts,
  fetchAddresses,
  loginUser,
  registerUser,
  logoutUser,
} from "./appThunks";

const initialState = {
  user: null,
  isSeller: false,
  showUserLogin: false,
  products: [],
  cartItems: {},
  searchQuery: "",
  addresses: [],
  selectedAddress: null,
  currency: import.meta.env.VITE_CURRENCY,
  loading: {
    user: true,
    products: true,
    addresses: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    addToCartLocal: (state, action) => {
      const id = action.payload;
      state.cartItems[id] = (state.cartItems[id] || 0) + 1;
    },

    updateCartItemLocal: (state, action) => {
      const { itemId, quantity } = action.payload;
      state.cartItems[itemId] = quantity;
    },

    removeFromCartLocal: (state, action) => {
      const id = action.payload;
      if (state.cartItems[id] > 1) state.cartItems[id]--;
      else delete state.cartItems[id];
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    logoutLocal: (state) => {
      state.user = null;
      state.cartItems = {};
      state.isSeller = false;
      state.addresses = [];
      state.selectedAddress = null;
      state.showUserLogin = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading.user = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.cartItems = action.payload.cartItems;
        state.loading.user = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading.user = false;
      })

      .addCase(fetchSeller.fulfilled, (state, action) => {
        state.isSeller = action.payload;
      })

      .addCase(fetchProducts.pending, (state) => {
        state.loading.products = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading.products = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading.products = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ FIXED
        state.showUserLogin = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ FIXED
        state.showUserLogin = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.cartItems = {};
        state.isSeller = false;
        state.addresses = [];
        state.selectedAddress = null;
        state.showUserLogin = false;
      })

      .addCase(fetchAddresses.pending, (state) => {
        state.loading.addresses = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.selectedAddress = action.payload[0] || null;
        state.loading.addresses = false;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        state.loading.addresses = false;
      });
  },
});

export const {
  setShowUserLogin,
  setSearchQuery,
  addToCartLocal,
  updateCartItemLocal,
  removeFromCartLocal,
  setSelectedAddress,
  logoutLocal,
} = appSlice.actions;

export default appSlice.reducer;
