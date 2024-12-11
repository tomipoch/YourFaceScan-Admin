import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

interface UsuarioActivo {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  activo: boolean;
}

interface RegistroAcceso {
  id: number;
  fecha: string;
  hora: string;
  usuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoAcceso: "Autorizado" | "No Autorizado";
}

const ControlDeAcceso: React.FC = () => {
  const { colors } = useThemeContext(); // Uso del ThemeContext

  const [usuariosActivos, setUsuariosActivos] = useState<UsuarioActivo[]>([
    {
      id: 1,
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "Gómez",
      correo: "juan.perez@gmail.com",
      activo: true,
    },
    {
      id: 2,
      nombre: "María",
      apellidoPaterno: "López",
      apellidoMaterno: "Fernández",
      correo: "maria.lopez@gmail.com",
      activo: true,
    },
  ]);

  const [registrosAcceso] = useState<RegistroAcceso[]>([
    {
      id: 1,
      fecha: "2023-11-20",
      hora: "14:30",
      usuario: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "Gómez",
      tipoAcceso: "Autorizado",
    },
    {
      id: 2,
      fecha: "2023-11-20",
      hora: "10:15",
      usuario: "María",
      apellidoPaterno: "López",
      apellidoMaterno: "Fernández",
      tipoAcceso: "No Autorizado",
    },
    {
      id: 3,
      fecha: "2023-11-19",
      hora: "18:00",
      usuario: "Carlos",
      apellidoPaterno: "Martínez",
      apellidoMaterno: "González",
      tipoAcceso: "Autorizado",
    },
  ]);

  const handleToggleActivo = (id: number) => {
    setUsuariosActivos(
      usuariosActivos.map((usuario) =>
        usuario.id === id ? { ...usuario, activo: !usuario.activo } : usuario
      )
    );
  };

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-4">Control de Acceso</h3>

      {/* Usuarios Activos */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Usuarios Activos</h4>
        {usuariosActivos.length > 0 ? (
          <ul className="space-y-4">
            {usuariosActivos.map((usuario) => (
              <li
                key={usuario.id}
                className={`p-4 rounded-lg shadow-lg flex justify-between items-center ${colors.background2} ${colors.border}`}
              >
                <div>
                  <p className="text-sm">
                    <strong>Nombre:</strong> {usuario.nombre} {usuario.apellidoPaterno}{" "}
                    {usuario.apellidoMaterno}
                  </p>
                  <p className="text-sm">
                    <strong>Correo:</strong> {usuario.correo}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleActivo(usuario.id)}
                  className={`px-3 py-1 rounded-lg ${
                    usuario.activo
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  {usuario.activo ? "Desactivar" : "Activar"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${colors.textSecondary}`}>
            No hay usuarios activos actualmente.
          </p>
        )}
      </div>

      {/* Registros de Acceso */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Registros de Acceso</h4>
        <div className={`overflow-x-auto rounded-2xl border ${colors.border}`}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`${colors.background2}`}>
                <th className={`border ${colors.border} p-2`}>Fecha</th>
                <th className={`border ${colors.border} p-2`}>Hora</th>
                <th className={`border ${colors.border} p-2`}>Nombre</th>
                <th className={`border ${colors.border} p-2`}>Apellido Paterno</th>
                <th className={`border ${colors.border} p-2`}>Apellido Materno</th>
                <th className={`border ${colors.border} p-2`}>Tipo de Acceso</th>
              </tr>
            </thead>
            <tbody>
              {registrosAcceso.map((registro) => (
                <tr key={registro.id}>
                  <td className={`border ${colors.border} p-2`}>{registro.fecha}</td>
                  <td className={`border ${colors.border} p-2`}>{registro.hora}</td>
                  <td className={`border ${colors.border} p-2`}>{registro.usuario}</td>
                  <td className={`border ${colors.border} p-2`}>{registro.apellidoPaterno}</td>
                  <td className={`border ${colors.border} p-2`}>{registro.apellidoMaterno}</td>
                  <td
                    className={`border ${colors.border} p-2 ${
                      registro.tipoAcceso === "No Autorizado" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {registro.tipoAcceso}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ControlDeAcceso;
