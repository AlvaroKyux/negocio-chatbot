import API from "./axios";

export const getProductos = () => API.get("/productos");
export const getProductoById = (id) => API.get(`/productos/${id}`);
export const crearProducto = (producto) => API.post("/productos", producto);
export const actualizarProducto = (id, producto) =>
  API.put(`/productos/${id}`, producto);
export const eliminarProducto = (id) => API.delete(`/productos/${id}`);
