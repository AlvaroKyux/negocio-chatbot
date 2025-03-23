import "./User.css";
import React, { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../api/userService";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const camposIniciales = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    curp: "",
    rfc: "",
    nss: "",
    estadoCivil: "",
    direccion: "",
    email: "",
    password: "",
    sueldo: "",
    gradoEstudios: "",
    role: "empleado",
    intentosFallidos: 0,
    bloqueado: false,
  };

  const [formulario, setFormulario] = useState(camposIniciales);

  const cargarUsuarios = async () => {
    try {
      const res = await obtenerUsuarios();
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuarioEditando) {
        await actualizarUsuario(usuarioEditando, formulario);
      } else {
        await crearUsuario(formulario);
      }
      setFormulario(camposIniciales);
      setUsuarioEditando(null);
      cargarUsuarios();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };

  const handleEditar = (usuario) => {
    setFormulario(usuario);
    setUsuarioEditando(usuario._id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="apellidoPaterno"
          value={formulario.apellidoPaterno}
          onChange={handleChange}
          placeholder="Apellido Paterno"
        />
        <input
          name="apellidoMaterno"
          value={formulario.apellidoMaterno}
          onChange={handleChange}
          placeholder="Apellido Materno"
        />
        <input
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          name="curp"
          value={formulario.curp}
          onChange={handleChange}
          placeholder="CURP"
        />
        <input
          name="rfc"
          value={formulario.rfc}
          onChange={handleChange}
          placeholder="RFC"
        />
        <input
          name="nss"
          value={formulario.nss}
          onChange={handleChange}
          placeholder="NSS"
        />
        <input
          name="estadoCivil"
          value={formulario.estadoCivil}
          onChange={handleChange}
          placeholder="Estado Civil"
        />
        <input
          name="direccion"
          value={formulario.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={handleChange}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          name="password"
          value={formulario.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <input
          type="number"
          name="sueldo"
          value={formulario.sueldo}
          onChange={handleChange}
          placeholder="Sueldo"
        />
        <input
          name="gradoEstudios"
          value={formulario.gradoEstudios}
          onChange={handleChange}
          placeholder="Grado de Estudios"
        />

        <select name="role" value={formulario.role} onChange={handleChange}>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>

        <label>
          Intentos Fallidos:
          <input
            type="number"
            name="intentosFallidos"
            value={formulario.intentosFallidos}
            onChange={handleChange}
          />
        </label>

        <label>
          Bloqueado:
          <input
            type="checkbox"
            name="bloqueado"
            checked={formulario.bloqueado}
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          {usuarioEditando ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Bloqueado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.telefono}</td>
              <td>{u.bloqueado ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => handleEditar(u)}>Editar</button>
                <button onClick={() => handleEliminar(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
