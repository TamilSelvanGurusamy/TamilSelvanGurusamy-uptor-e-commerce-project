import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../../services/axios";

export const fetchUser = createAsyncThunk(
  "app/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        return {
          user: data.user,
          cartItems: data.user.cartItems
        };
      }
      return rejectWithValue();
    } catch {
      return rejectWithValue();
    }
  }
);

export const fetchSeller = createAsyncThunk(
  "app/fetchSeller",
  async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      return data.success;
    } catch {
      return false;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "app/fetchProducts",
  async () => {
    const { data } = await axios.get("/api/product/list");
    if (!data.success) {
      toast.error(data.message);
      return [];
    }
    return data.products;
  }
);

export const updateCart = createAsyncThunk(
  "app/updateCart",
  async ({ userId, cartItems }) => {
    await axios.post("/api/cart/update", { userId, cartItems });
  }
);

export const logoutUser = createAsyncThunk(
  "app/logoutUser",
  async (_, { dispatch }) => {
    const { data } = await axios.get("/api/user/logout");
    if (data.success) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "app/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password
      });

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }

      toast.success("User Login Successful");
      //toast.success(data.message);

      // 🔥 RETURN CONSISTENT SHAPE
      return {
        user: data.user
      };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);


export const registerUser = createAsyncThunk(
  "app/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password
      });

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }

      //toast.success(data.message);
      toast.success("User Registration Successful");
      return data.user;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const sellerLogin = createAsyncThunk(
  "app/sellerLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password
      });

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }

      toast.success("Seller login successful");
      return true;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const addProduct = createAsyncThunk(
  "app/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/product/add", formData);
      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const sellerLogout = createAsyncThunk(
  "app/sellerLogout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const toggleProductStock = createAsyncThunk(
  "app/toggleProductStock",
  async ({ id, inStock }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        id,
        inStock
      });

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }

      toast.success(data.message);
      dispatch(fetchProducts()); // refresh list
      return true;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const addAddress = createAsyncThunk(
  "app/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue();
      }
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue();
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "app/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/address");
      if (!data.success) return rejectWithValue();
      return data.addresses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);