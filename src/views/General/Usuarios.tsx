import React, { useState } from "react";
import { saveAs } from "file-saver";
import { useThemeContext } from "../../ThemeContext";

interface Usuario {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  estado: "Activo" | "Inactivo";
  ultimaActividad: string;
}

const Usuarios: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, background2, text, border, textSecondary } = colors;

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nombre: "Tomas",
      apellidoPaterno: "Poblete",
      apellidoMaterno: "Soto",
      email: "tomas.poblete@gmail.com",
      estado: "Activo",
      ultimaActividad: "2023-11-20 14:35",
    },
    {
      id: 2,
      nombre: "Maria",
      apellidoPaterno: "Fernandez",
      apellidoMaterno: "Gomez",
      email: "maria.fernandez@gmail.com",
      estado: "Inactivo",
      ultimaActividad: "2023-11-19 10:15",
    },
    {
      id: 3,
      nombre: "Carlos",
      apellidoPaterno: "Gomez",
      apellidoMaterno: "Lopez",
      email: "carlos.gomez@gmail.com",
      estado: "Activo",
      ultimaActividad: "2023-11-21 16:00",
    },
  ]);

  const [filtros, setFiltros] = useState({
    nombre: "",
    estado: "" as "Activo" | "Inactivo" | "",
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    estado: "Activo" as "Activo" | "Inactivo",
    ultimaActividad: "N/A",
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleNuevoUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleCrearUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellidoPaterno || !nuevoUsuario.email) {
      alert("Por favor, complete todos los campos antes de crear un usuario.");
      return;
    }

    setUsuarios([
      ...usuarios,
      {
        id: usuarios.length + 1,
        nombre: nuevoUsuario.nombre,
        apellidoPaterno: nuevoUsuario.apellidoPaterno,
        apellidoMaterno: nuevoUsuario.apellidoMaterno,
        email: nuevoUsuario.email,
        estado: nuevoUsuario.estado,
        ultimaActividad: nuevoUsuario.ultimaActividad,
      },
    ]);

    setNuevoUsuario({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      email: "",
      estado: "Activo",
      ultimaActividad: "N/A",
    });
  };

  const handleEliminarUsuario = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
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
              <th className={`border ${border} p-2`}>Apellido Paterno</th>
              <th className={`border ${border} p-2`}>Apellido Materno</th>
              <th className={`border ${border} p-2`}>Correo Electrónico</th>
              <th className={`border ${border} p-2`}>Estado</th>
              <th className={`border ${border} p-2`}>Última Actividad</th>
              <th className={`border ${border} p-2`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td className={`border ${border} p-2`}>{usuario.nombre}</td>
                <td className={`border ${border} p-2`}>{usuario.apellidoPaterno}</td>
                <td className={`border ${border} p-2`}>{usuario.apellidoMaterno}</td>
                <td className={`border ${border} p-2`}>{usuario.email}</td>
                <td className={`border ${border} p-2`}>{usuario.estado}</td>
                <td className={`border ${border} p-2`}>{usuario.ultimaActividad}</td>
                <td className={`border ${border} p-2 flex gap-2`}>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => alert("Función de edición no implementada")}
                  >
                    Editar
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
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={nuevoUsuario.apellidoPaterno}
            onChange={handleNuevoUsuarioChange}
            className={`p-2 rounded-lg border ${border} ${background2} ${text}`}
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={nuevoUsuario.apellidoMaterno}
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
        </div>
        <button
          onClick={handleCrearUsuario}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </div>
    </div>
  );
};

export default Usuarios;
