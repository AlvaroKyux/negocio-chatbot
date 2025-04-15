
import axios from "./axios";

export const obtenerUsuarios = () => axios.get("/usuarios");
export const crearUsuario = (usuario) => axios.post("/usuarios", usuario);
export const actualizarUsuario = (id, usuario) =>
  axios.put(`/usuarios/${id}`, usuario);
export const eliminarUsuario = (id) => axios.delete(`/usuarios/${id}`);
