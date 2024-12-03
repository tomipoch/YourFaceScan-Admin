import React, { useState } from "react";

interface AlertaActiva {
  id: number;
  tipo: "Intento Fallido" | "Acceso No Autorizado" | "Consulta Masiva";
  metodo: "Correo" | "Mensaje Interno";
  frecuencia: "En Tiempo Real" | "Diario" | "Semanal";
  activa: boolean;
}

interface HistorialAlerta {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  detalles: string;
}

const AlertasYNotificaciones: React.FC = () => {
  const [alertasActivas, setAlertasActivas] = useState<AlertaActiva[]>([
    { id: 1, tipo: "Intento Fallido", metodo: "Correo", frecuencia: "En Tiempo Real", activa: true },
    { id: 2, tipo: "Acceso No Autorizado", metodo: "Mensaje Interno", frecuencia: "Diario", activa: true },
    { id: 3, tipo: "Consulta Masiva", metodo: "Correo", frecuencia: "Semanal", activa: false },
  ]);

  const [historialAlertas, setHistorialAlertas] = useState<HistorialAlerta[]>([
    {
      id: 1,
      fecha: "2023-11-20",
      hora: "14:30",
      tipo: "Intento Fallido",
      detalles: "Se registraron 5 intentos fallidos desde la IP 192.168.1.10.",
    },
    {
      id: 2,
      fecha: "2023-11-19",
      hora: "16:00",
      tipo: "Acceso No Autorizado",
      detalles: "Acceso desde ubicación desconocida (IP: 192.168.2.15).",
    },
  ]);

  const [nuevaAlerta, setNuevaAlerta] = useState({
    tipo: "Intento Fallido" as "Intento Fallido" | "Acceso No Autorizado" | "Consulta Masiva",
    metodo: "Correo" as "Correo" | "Mensaje Interno",
    frecuencia: "En Tiempo Real" as "En Tiempo Real" | "Diario" | "Semanal",
  });

  const handleNuevaAlertaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevaAlerta({ ...nuevaAlerta, [name]: value });
  };

  const handleAgregarAlerta = () => {
    setAlertasActivas([
      ...alertasActivas,
      {
        id: alertasActivas.length + 1,
        tipo: nuevaAlerta.tipo,
        metodo: nuevaAlerta.metodo,
        frecuencia: nuevaAlerta.frecuencia,
        activa: true,
      },
    ]);
    setNuevaAlerta({ tipo: "Intento Fallido", metodo: "Correo", frecuencia: "En Tiempo Real" });
  };

  const handleToggleAlerta = (id: number) => {
    setAlertasActivas(
      alertasActivas.map((alerta) =>
        alerta.id === id ? { ...alerta, activa: !alerta.activa } : alerta
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Alertas y Notificaciones</h3>

      {/* Lista de Alertas Activas */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Alertas Activas</h4>
        {alertasActivas.length > 0 ? (
          <ul className="space-y-4">
            {alertasActivas.map((alerta) => (
              <li
                key={alerta.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">
                    <strong>Tipo:</strong> {alerta.tipo}
                  </p>
                  <p className="text-sm">
                    <strong>Método:</strong> {alerta.metodo}
                  </p>
                  <p className="text-sm">
                    <strong>Frecuencia:</strong> {alerta.frecuencia}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleAlerta(alerta.id)}
                  className={`px-3 py-1 rounded-lg ${
                    alerta.activa
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {alerta.activa ? "Desactivar" : "Activar"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No hay alertas configuradas.
          </p>
        )}
      </div>

      {/* Crear Nueva Alerta */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Crear Nueva Alerta</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="tipo"
            value={nuevaAlerta.tipo}
            onChange={handleNuevaAlertaChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="Intento Fallido">Intento Fallido</option>
            <option value="Acceso No Autorizado">Acceso No Autorizado</option>
            <option value="Consulta Masiva">Consulta Masiva</option>
          </select>
          <select
            name="metodo"
            value={nuevaAlerta.metodo}
            onChange={handleNuevaAlertaChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="Correo">Correo</option>
            <option value="Mensaje Interno">Mensaje Interno</option>
          </select>
          <select
            name="frecuencia"
            value={nuevaAlerta.frecuencia}
            onChange={handleNuevaAlertaChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="En Tiempo Real">En Tiempo Real</option>
            <option value="Diario">Diario</option>
            <option value="Semanal">Semanal</option>
          </select>
        </div>
        <button
          onClick={handleAgregarAlerta}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Agregar Alerta
        </button>
      </div>

      {/* Historial de Alertas */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Historial de Alertas</h4>
        <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 p-2">Fecha</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Hora</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Tipo</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {historialAlertas.map((alerta) => (
              <tr key={alerta.id}>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{alerta.fecha}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{alerta.hora}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{alerta.tipo}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{alerta.detalles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertasYNotificaciones;
