import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Vista para admin
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/usuarios" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
