import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";

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
            <Route path="/admin" element={<Admin />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;