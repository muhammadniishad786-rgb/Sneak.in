import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Products from "../pages/Products";
import ProductDetails from "../component/ProductDetails";
import CartPage from "../pages/CartPage";
import AddressPage from "../pages/AddressPage";
import Checkout from "../pages/CheckOut";
import OrderStatus from "../pages/OrderStatus";
import OrderHistory from "../pages/OrderHistory";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/adminProducts";
import CreateProduct from "../pages/admin/CreateProducts";

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Protected Routes
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import AdminRoute from "./AdminRoutes";
import EditProduct from "../pages/admin/EditProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetails from "../pages/admin/OrderDetails";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC + MAIN LAYOUT ================= */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          {/* ================= PROTECTED USER ROUTES ================= */}

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />

            <Route path="/products" element={<Products />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/address" element={<AddressPage />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/orders/:id" element={<OrderStatus />} />

            <Route path="/orders" element={<OrderHistory />} />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}

        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* ================= DASHBOARD ================= */}

              {/* /admin */}
              <Route index element={<AdminDashboard />} />

              {/* ================= PRODUCTS ================= */}

              {/* /admin/products */}
              <Route path="products" element={<AdminProducts />} />

              {/* /admin/products/create */}
              <Route path="products/create" element={<CreateProduct />} />
              {/* /admin/products/edit */}
              <Route path="products/:id/edit" element={<EditProduct />} />

              {/* ================= ORDERS ================= */}
              <Route path="orders" element={<AdminOrders />} />

              <Route path="orders/:id" element={<AdminOrderDetails />} />

              {/* ================= FUTURE ROUTES ================= */}

              {/*

              <Route
                path="orders/:id"
                element={<AdminOrderDetails />}
              />

              <Route
                path="users"
                element={<AdminUsers />}
              />

              <Route
                path="profile"
                element={<AdminProfile />}
              />
              */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
