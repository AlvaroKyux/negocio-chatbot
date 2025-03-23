import React, { useEffect, useState } from "react";
import { getProductos, eliminarProducto } from "../api/productService";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = async () => {
    try {
      const respuesta = await getProductos();
      setProductos(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este producto?"
    );
    if (confirmar) {
      try {
        await eliminarProducto(id);
        cargarProductos(); // Recargar productos después de eliminar
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="container">
      <h1>Productos Electrónicos</h1>
      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Cantidad en Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.modelo}</td>
                <td>${producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <button onClick={() => handleEliminar(producto._id)}>
                    Eliminar
                  </button>
                  <button onClick={() => alert("Función de editar pendiente")}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductosPage;
