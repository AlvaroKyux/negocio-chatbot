import API from "./axios";

export const obtenerOrdenes = () => API.get("/orders");
export const crearOrden = (orden) => API.post("/orders", orden);
export const actualizarOrden = (id, orden) => API.put(`/orders/${id}`, orden);
export const eliminarOrden = (id) => API.delete(`/orders/${id}`);
export const obtenerOrdenPorId = (id) => API.get(`/orders/${id}`);
