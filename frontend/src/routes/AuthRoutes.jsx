import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import Products from "../pages/Products";
import CreateProduct from "../pages/admin/CreateProducts";
import ProductDetails from "../component/ProductDetails";
import CartPage from "../pages/CartPage";
import AddressPage from "../pages/AddressPage";
import Checkout from "../pages/CheckOut";
import AddressForm from "../pages/AddressPage";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<CreateProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="//product/:id" element={<ProductDetails /> } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/address" element={<AddressPage /> } />
            <Route path="/checkout" element={<Checkout /> } />
            {/* <Route path="/address-form" element={<AddressForm /> } /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
