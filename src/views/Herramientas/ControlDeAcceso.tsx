import React, { useState } from "react";

interface UsuarioActivo {
  id: number;
  nombre: string;
  dispositivo: string;
  ip: string;
  ubicacion: string;
}

interface RegistroAcceso {
  id: number;
  fecha: string;
  hora: string;
  usuario: string;
  ubicacion: string;
  tipoAcceso: "Autorizado" | "No Autorizado";
}

const ControlDeAcceso: React.FC = () => {
  const [usuariosActivos, setUsuariosActivos] = useState<UsuarioActivo[]>([
    { id: 1, nombre: "Juan Pérez", dispositivo: "Chrome - Windows", ip: "192.168.1.10", ubicacion: "México" },
    { id: 2, nombre: "María López", dispositivo: "Safari - iOS", ip: "192.168.1.20", ubicacion: "Argentina" },
  ]);

  const [registrosAcceso, setRegistrosAcceso] = useState<RegistroAcceso[]>([
    { id: 1, fecha: "2023-11-20", hora: "14:30", usuario: "Juan Pérez", ubicacion: "México", tipoAcceso: "Autorizado" },
    { id: 2, fecha: "2023-11-20", hora: "10:15", usuario: "María López", ubicacion: "Argentina", tipoAcceso: "No Autorizado" },
    { id: 3, fecha: "2023-11-19", hora: "18:00", usuario: "Carlos Martínez", ubicacion: "España", tipoAcceso: "Autorizado" },
  ]);

  const [alertasAcceso, setAlertasAcceso] = useState<RegistroAcceso[]>(
    registrosAcceso.filter((registro) => registro.tipoAcceso === "No Autorizado")
  );

  const handleCerrarSesion = (id: number) => {
    setUsuariosActivos(usuariosActivos.filter((usuario) => usuario.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Control de Acceso</h3>

      {/* Usuarios Activos */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Usuarios Activos</h4>
        {usuariosActivos.length > 0 ? (
          <ul className="space-y-4">
            {usuariosActivos.map((usuario) => (
              <li
                key={usuario.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">
                    <strong>Nombre:</strong> {usuario.nombre}
                  </p>
                  <p className="text-sm">
                    <strong>Dispositivo:</strong> {usuario.dispositivo}
                  </p>
                  <p className="text-sm">
                    <strong>IP:</strong> {usuario.ip}
                  </p>
                  <p className="text-sm">
                    <strong>Ubicación:</strong> {usuario.ubicacion}
                  </p>
                </div>
                <button
                  onClick={() => handleCerrarSesion(usuario.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cerrar Sesión
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">No hay usuarios activos actualmente.</p>
        )}
      </div>

      {/* Registros de Acceso */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Registros de Acceso</h4>
        <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 p-2">Fecha</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Hora</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Usuario</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Ubicación</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Tipo de Acceso</th>
            </tr>
          </thead>
          <tbody>
            {registrosAcceso.map((registro) => (
              <tr key={registro.id}>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.fecha}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.hora}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.usuario}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.ubicacion}</td>
                <td
                  className={`border border-gray-300 dark:border-gray-600 p-2 ${
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

      {/* Alertas de Acceso */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Alertas de Acceso</h4>
        {alertasAcceso.length > 0 ? (
          <ul className="space-y-4">
            {alertasAcceso.map((alerta) => (
              <li
                key={alerta.id}
                className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-lg"
              >
                <p className="text-sm">
                  <strong>Fecha:</strong> {alerta.fecha}
                </p>
                <p className="text-sm">
                  <strong>Hora:</strong> {alerta.hora}
                </p>
                <p className="text-sm">
                  <strong>Usuario:</strong> {alerta.usuario}
                </p>
                <p className="text-sm">
                  <strong>Ubicación:</strong> {alerta.ubicacion}
                </p>
                <p className="text-sm">
                  <strong>Tipo de Acceso:</strong> {alerta.tipoAcceso}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">No hay alertas de acceso recientes.</p>
        )}
      </div>
    </div>
  );
};

export default ControlDeAcceso;
