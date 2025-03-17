import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Vista para admin
import Products from "./pages/Products"; // Vista para empleados

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
