import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/Seller/SellerLayout";
import AddProduct from "./pages/Seller/AddProduct";
import ProductList from "./pages/Seller/ProductList";
import Orders from "./pages/Seller/Orders";

import {
  fetchUser,
  fetchSeller,
  fetchProducts,
  updateCart
} from "./features/app/appThunks";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isSellerPath = location.pathname.includes("seller");

  //const { showUserLogin, isSeller } = useSelector(state => state.app);
  const {
    showUserLogin,
    isSeller,
    cartItems,
    user
  } = useSelector(state => state.app);

  // 🔁 replaces useEffect in AppContext
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSeller());
    dispatch(fetchProducts());
  }, [dispatch]);

   // 🔥 SINGLE SOURCE OF CART → DB SYNC
  useEffect(() => {
    if (user) {
      dispatch(updateCart({ cartItems }));
    }
  }, [cartItems, user, dispatch]);

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Seller Routes */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
}
