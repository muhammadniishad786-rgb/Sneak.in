// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";
// import Admin from "../pages/Admin";

// import ProtectedRoutes from "./ProtectedRoutes";
// import MainLayout from "../layouts/MainLayout";
// import Products from "../pages/Products";
// import CreateProduct from "../pages/admin/CreateProducts";
// import ProductDetails from "../component/ProductDetails";
// import CartPage from "../pages/CartPage";
// import AddressPage from "../pages/AddressPage";
// import Checkout from "../pages/CheckOut";
// import AddressForm from "../pages/AddressPage";
// import OrderStatus from "../pages/OrderStatus";
// import OrderHistory from "../pages/OrderHistory";
// import AdminDashboard from "../pages/admin/AdminDashboard";

// function AuthRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />

//           <Route path="/register" element={<Register />} />

//           <Route path="/login" element={<Login />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoutes />}>
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/admin" element={<CreateProduct />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="//product/:id" element={<ProductDetails /> } />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/address" element={<AddressPage /> } />
//             <Route path="/checkout" element={<Checkout /> } />
//             <Route path="/orders/:id" element={<OrderStatus /> } />
//             <Route path="/orders" element={<OrderHistory /> } />

//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             {/* <Route path="/address-form" element={<AddressForm /> } /> */}

//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AuthRoutes;

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
import CreateProduct from "../pages/admin/CreateProducts";

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Protected Route
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";


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

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/address" element={<AddressPage />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/orders/:id"
              element={<OrderStatus />}
            />

            <Route
              path="/orders"
              element={<OrderHistory />}
            />

          </Route>

        </Route>


        {/* ================= ADMIN ROUTES ================= */}

        <Route element={<ProtectedRoutes />}>

          <Route path="/admin" element={<AdminLayout />}>

            {/* /admin */}
            <Route
              index
              element={<AdminDashboard />}
            />

            {/* /admin/products */}
            <Route
              path="products"
              element={<CreateProduct />}
            />

            {/* We'll add these pages later */}

            {/* 
            <Route
              path="orders"
              element={<AdminOrders />}
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

      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
