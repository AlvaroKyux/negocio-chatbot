import React, { useState, useEffect } from "react";
import {
  crearProducto,
  actualizarProducto,
  getProductoById,
} from "../api/productService";

const ProductoFormulario = ({ productoId, onSuccess }) => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    modelo: "",
    precio: "",
    cantidad: "",
  });

  const obtenerProducto = async () => {
    try {
      const res = await getProductoById(productoId);
      setFormulario(res.data);
    } catch (error) {
      console.error("Error al cargar producto:", error);
    }
  };

  useEffect(() => {
    if (productoId) {
      obtenerProducto();
    }
  }, [productoId]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productoId) {
        await actualizarProducto(productoId, formulario);
      } else {
        await crearProducto(formulario);
      }
      onSuccess();
      setFormulario({ nombre: "", modelo: "", precio: "", cantidad: "" });
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{productoId ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formulario.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="modelo"
        placeholder="Modelo"
        value={formulario.modelo}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formulario.precio}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad en stock"
        value={formulario.cantidad}
        onChange={handleChange}
        required
      />
      <button type="submit">{productoId ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default ProductoFormulario;
