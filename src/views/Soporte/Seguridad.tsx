import React, { useState } from "react";

interface Auditoria {
  id: number;
  fecha: string;
  hora: string;
  usuario: string;
  accion: string;
}

interface AccesoSospechoso {
  id: number;
  fecha: string;
  hora: string;
  ip: string;
  descripcion: string;
}

const Seguridad: React.FC = () => {
  const [politicas, setPoliticas] = useState({
    longitudMinima: 8,
    caducidadDias: 90,
    habilitar2FA: false,
  });

  const [auditoria, setAuditoria] = useState<Auditoria[]>([
    { id: 1, fecha: "2023-11-20", hora: "14:30", usuario: "Admin", accion: "Cambiaron políticas de contraseña" },
    { id: 2, fecha: "2023-11-19", hora: "10:15", usuario: "Admin", accion: "Habilitaron 2FA" },
  ]);

  const [accesosSospechosos, setAccesosSospechosos] = useState<AccesoSospechoso[]>([
    {
      id: 1,
      fecha: "2023-11-20",
      hora: "16:45",
      ip: "192.168.1.50",
      descripcion: "Intento fallido de acceso desde ubicación desconocida.",
    },
  ]);

  const handlePoliticasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPoliticas({
      ...politicas,
      [name]: type === "checkbox" ? checked : parseInt(value),
    });
  };

  const handleGuardarPoliticas = () => {
    alert("Políticas de seguridad actualizadas.");
    setAuditoria([
      ...auditoria,
      {
        id: auditoria.length + 1,
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toLocaleTimeString(),
        usuario: "Admin",
        accion: "Actualización de políticas de seguridad",
      },
    ]);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Configuración de Seguridad</h3>

      {/* Configuración de Seguridad General */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Configuración General</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Longitud Mínima de Contraseña</label>
            <input
              type="number"
              name="longitudMinima"
              value={politicas.longitudMinima}
              onChange={handlePoliticasChange}
              min={6}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Caducidad de Contraseña (días)</label>
            <input
              type="number"
              name="caducidadDias"
              value={politicas.caducidadDias}
              onChange={handlePoliticasChange}
              min={30}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 w-full"
            />
          </div>
          <div className="col-span-2 flex items-center">
            <input
              type="checkbox"
              name="habilitar2FA"
              checked={politicas.habilitar2FA}
              onChange={handlePoliticasChange}
              className="mr-2"
            />
            <label className="text-sm">Habilitar Autenticación de Dos Factores (2FA)</label>
          </div>
        </div>
        <button
          onClick={handleGuardarPoliticas}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Auditoría de Seguridad */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Auditoría de Seguridad</h4>
        <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 p-2">Fecha</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Hora</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Usuario</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {auditoria.map((registro) => (
              <tr key={registro.id}>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.fecha}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.hora}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.usuario}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{registro.accion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accesos Sospechosos */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Accesos Sospechosos</h4>
        {accesosSospechosos.length > 0 ? (
          <ul className="space-y-4">
            {accesosSospechosos.map((acceso) => (
              <li
                key={acceso.id}
                className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-lg"
              >
                <p className="text-sm">
                  <strong>Fecha:</strong> {acceso.fecha}
                </p>
                <p className="text-sm">
                  <strong>Hora:</strong> {acceso.hora}
                </p>
                <p className="text-sm">
                  <strong>IP:</strong> {acceso.ip}
                </p>
                <p className="text-sm">
                  <strong>Descripción:</strong> {acceso.descripcion}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No hay accesos sospechosos registrados.
          </p>
        )}
      </div>

      {/* Políticas de Recuperación de Cuenta */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Políticas de Recuperación de Cuenta</h4>
        <p className="text-sm mb-4">
          Configure las políticas para recuperación de cuenta, como preguntas de seguridad o
          verificación por correo electrónico.
        </p>
        <button
          onClick={() => alert("Funcionalidad no implementada aún.")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Configurar Recuperación
        </button>
      </div>
    </div>
  );
};

export default Seguridad;
