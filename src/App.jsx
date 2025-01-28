import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import SellProduct from "./pages/Product/SellProduct";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ProductDetail from "./pages/Product/productDetail";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
