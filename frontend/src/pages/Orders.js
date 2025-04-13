import React, { useEffect, useState } from "react";
import {
  obtenerOrdenes,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
  obtenerOrdenPorId,
} from "../api/orderService";

const Orders = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState({
    cliente: "",
    producto: "",
    cantidad: "",
    total: "",
  });

  const cargarOrdenes = async () => {
    const res = await obtenerOrdenes();
    setOrdenes(res.data);
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editandoId) {
      await actualizarOrden(editandoId, formulario);
      setEditandoId(null);
    } else {
      await crearOrden(formulario);
    }
    setFormulario({ cliente: "", producto: "", cantidad: "", total: "" });
    cargarOrdenes();
  };

  const handleEditar = async (id) => {
    const res = await obtenerOrdenPorId(id);
    setFormulario(res.data);
    setEditandoId(id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar esta orden?")) {
      await eliminarOrden(id);
      cargarOrdenes();
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Órdenes</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="cliente"
          placeholder="Cliente"
          value={formulario.cliente}
          onChange={handleChange}
          required
        />
        <input
          name="producto"
          placeholder="Producto"
          value={formulario.producto}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formulario.cantidad}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="total"
          placeholder="Total"
          value={formulario.total}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editandoId ? "Actualizar" : "Crear"} Orden
        </button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden._id}>
              <td>{orden.cliente}</td>
              <td>{orden.producto}</td>
              <td>{orden.cantidad}</td>
              <td>${orden.total}</td>
              <td>
                <button onClick={() => handleEditar(orden._id)}>Editar</button>
                <button onClick={() => handleEliminar(orden._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
