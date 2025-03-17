import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Chilltec</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
