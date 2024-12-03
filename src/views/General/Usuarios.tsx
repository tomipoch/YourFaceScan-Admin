import React, { useState } from "react";
import { saveAs } from "file-saver";
import { useThemeContext } from "../../ThemeContext";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "Administrador" | "Usuario";
  estado: "Activo" | "Inactivo";
  ultimaActividad: string;
}

const Usuarios: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, background2, text, border, textSecondary } = colors;

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nombre: "Tomas Poblete",
      email: "tomas.poblete@gmail.com",
      rol: "Administrador",
      estado: "Activo",
      ultimaActividad: "2023-11-20 14:35",
    },
    {
      id: 2,
      nombre: "Maria Fernandez",
      email: "maria.fernandez@gmail.com",
      rol: "Usuario",
      estado: "Inactivo",
      ultimaActividad: "2023-11-19 10:15",
    },
    {
      id: 3,
      nombre: "Carlos Gomez",
      email: "carlos.gomez@gmail.com",
      rol: "Usuario",
      estado: "Activo",
      ultimaActividad: "2023-11-21 16:00",
    },
  ]);

  const [filtros, setFiltros] = useState({
    nombre: "",
    rol: "" as "Administrador" | "Usuario" | "",
    estado: "" as "Activo" | "Inactivo" | "",
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    email: "",
    rol: "Usuario" as "Administrador" | "Usuario",
    contrasena: "",
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleNuevoUsuarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleCrearUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.contrasena) {
      alert("Por favor, complete todos los campos antes de crear un usuario.");
      return;
    }

    setUsuarios([
      ...usuarios,
      {
        id: usuarios.length + 1,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        estado: "Activo",
        ultimaActividad: "N/A",
      },
    ]);

    setNuevoUsuario({ nombre: "", email: "", rol: "Usuario", contrasena: "" });
  };

  const handleExportarCSV = () => {
    const encabezados = ["Nombre", "Correo Electrónico", "Rol", "Estado", "Última Actividad"];
    const filas = usuarios.map((usuario) => [
      usuario.nombre,
      usuario.email,
      usuario.rol,
      usuario.estado,
      usuario.ultimaActividad,
    ]);
    const contenido = [encabezados, ...filas]
      .map((fila) => fila.join(","))
      .join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "usuarios.csv");
  };

  const handleEliminarUsuario = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleToggleEstado = (id: number) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id
          ? { ...usuario, estado: usuario.estado === "Activo" ? "Inactivo" : "Activo" }
          : usuario
      )
    );
  };

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      (filtros.rol ? usuario.rol === filtros.rol : true) &&
      (filtros.estado ? usuario.estado === filtros.estado : true)
  );

  return (
    <div className={`p-6 rounded-lg ${background} ${text}`}>
      <h3 className="text-2xl font-bold mb-4">Usuarios</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
        />
        <select
          name="rol"
          value={filtros.rol}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
        >
          <option value="">Filtrar por rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuario">Usuario</option>
        </select>
        <select
          name="estado"
          value={filtros.estado}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
        >
          <option value="">Filtrar por estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Tabla de Usuarios */}
      <div className={`overflow-hidden rounded-2xl border ${border} mb-6`}>
        <table className={`w-full text-sm border-collapse`}>
          <thead>
            <tr className={`${background2}`}>
              <th className={`border ${border} p-2`}>Nombre</th>
              <th className={`border ${border} p-2`}>Correo Electrónico</th>
              <th className={`border ${border} p-2`}>Rol</th>
              <th className={`border ${border} p-2`}>Estado</th>
              <th className={`border ${border} p-2`}>Última Actividad</th>
              <th className={`border ${border} p-2`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td className={`border ${border} p-2`}>{usuario.nombre}</td>
                <td className={`border ${border} p-2`}>{usuario.email}</td>
                <td className={`border ${border} p-2`}>{usuario.rol}</td>
                <td className={`border ${border} p-2`}>{usuario.estado}</td>
                <td className={`border ${border} p-2`}>{usuario.ultimaActividad}</td>
                <td className={`border ${border} p-2 flex gap-2`}>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => alert("Editar funcionalidad no implementada")}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    onClick={() => handleToggleEstado(usuario.id)}
                  >
                    {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Crear Nuevo Usuario */}
      <div className="mt-6">
        <h4 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Crear Nuevo Usuario</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={handleNuevoUsuarioChange}
            className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={nuevoUsuario.email}
            onChange={handleNuevoUsuarioChange}
            className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
          />
          <select
            name="rol"
            value={nuevoUsuario.rol}
            onChange={handleNuevoUsuarioChange}
            className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña Temporal"
            value={nuevoUsuario.contrasena}
            onChange={handleNuevoUsuarioChange}
            className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
          />
        </div>
        <button
          onClick={handleCrearUsuario}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </div>

      {/* Exportar Usuarios */}
      <div className="mt-6">
        <button
          onClick={handleExportarCSV}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Exportar Lista de Usuarios (CSV)
        </button>
      </div>
    </div>
  );
};

export default Usuarios;
