import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
      navigate("/");
    }
    setRole(userRole);
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-card">
        <h1>Panel de Control</h1>
        
        {role === "admin" ? (
          <div className="button-grid">
            <button onClick={() => navigate("/users")} className="dashboard-button blue">
              Gestionar Usuarios
            </button>
            <button onClick={() => navigate("/products")} className="dashboard-button green">
              Gestionar Productos
            </button>
            <button onClick={() => navigate("/orders")} className="dashboard-button yellow">
              Gestionar Pedidos
            </button>
          </div>
        ) : (
          <div className="employee-section">
            <h2>Bienvenido Jefe</h2>
            
            <div className="button-group">
              <button onClick={() => navigate("/products")} className="dashboard-button green">
                Ver Productos
              </button>
              <button onClick={() => navigate("/orders")} className="dashboard-button yellow">
                Ver Pedidos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
