import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // Íconos para mejorar el diseño
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // O "/products" según el rol guardado
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    console.log("🔍 Iniciando sesión con:", { email, password });

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("📡 Respuesta del servidor recibida");
      const data = await response.json();
      console.log("📡 Datos del servidor:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      console.log("✅ Inicio de sesión exitoso. Token recibido:", data.token);
      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir según el rol
      if (data.role === "admin") {
        console.log("🔀 Redirigiendo a /dashboard");
        navigate("/Dashboard");
      } else {
        console.log("🔀 Redirigiendo a /products");
        navigate("/Products");
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              className="input-field"
              placeholder="admin@negocio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              className="input-field"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
