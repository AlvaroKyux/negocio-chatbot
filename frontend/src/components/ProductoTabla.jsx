import React from "react";

const ProductoTabla = ({ productos, onEliminar, onEditar }) => {
  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Modelo</th>
          <th>Precio</th>
          <th>Cantidad</th>
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
              <button onClick={() => onEliminar(producto._id)}>Eliminar</button>
              <button onClick={() => onEditar(producto._id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductoTabla;
