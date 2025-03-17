import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Orders from "../pages/Orders";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
