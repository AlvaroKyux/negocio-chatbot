import React, { useState, useEffect } from "react";
import ProductoFormulario from "../components/ProductoFormulario";
import ProductoTabla from "../components/ProductoTabla";
import { getProductos, eliminarProducto } from "../api/productService";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Eliminar este producto?");
    if (confirmar) {
      try {
        await eliminarProducto(id);
        cargarProductos();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const handleEditar = (id) => {
    setProductoEditando(id);
  };

  const handleFormularioExito = () => {
    setProductoEditando(null);
    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="container">
      <h1>Gestión de Productos Electrónicos</h1>

      <ProductoFormulario
        productoId={productoEditando}
        onSuccess={handleFormularioExito}
      />

      <hr />

      <ProductoTabla
        productos={productos}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
    </div>
  );
};

export default Products;
