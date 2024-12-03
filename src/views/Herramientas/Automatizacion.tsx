import React, { useState } from "react";

interface ReporteProgramado {
  id: number;
  frecuencia: "Diaria" | "Semanal" | "Mensual";
  tipo: "Consultas" | "Usuarios" | "Alertas";
  destinatarios: string[];
}

const Automatizacion: React.FC = () => {
  const [reportes, setReportes] = useState<ReporteProgramado[]>([]);
  const [nuevoReporte, setNuevoReporte] = useState({
    frecuencia: "Diaria" as "Diaria" | "Semanal" | "Mensual",
    tipo: "Consultas" as "Consultas" | "Usuarios" | "Alertas",
    destinatarios: "",
  });
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoReporte({ ...nuevoReporte, [name]: value });
  };

  const handleAgregarReporte = () => {
    const destinatariosArray = nuevoReporte.destinatarios.split(",").map((email) => email.trim());
    setReportes([
      ...reportes,
      {
        id: reportes.length + 1,
        frecuencia: nuevoReporte.frecuencia,
        tipo: nuevoReporte.tipo,
        destinatarios: destinatariosArray,
      },
    ]);
    setNuevoReporte({ frecuencia: "Diaria", tipo: "Consultas", destinatarios: "" });
  };

  const handleEliminarReporte = (id: number) => {
    setReportes(reportes.filter((reporte) => reporte.id !== id));
  };

  const handleVistaPrevia = () => {
    setVistaPrevia(
      `Vista previa del reporte:\nFrecuencia: ${nuevoReporte.frecuencia}\nTipo: ${nuevoReporte.tipo}\nDestinatarios: ${nuevoReporte.destinatarios}`
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Automatización</h3>

      {/* Configuración de Reportes Automáticos */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Configurar Reporte Automático</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            name="frecuencia"
            value={nuevoReporte.frecuencia}
            onChange={handleInputChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="Diaria">Diaria</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
          </select>
          <select
            name="tipo"
            value={nuevoReporte.tipo}
            onChange={handleInputChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="Consultas">Consultas</option>
            <option value="Usuarios">Usuarios</option>
            <option value="Alertas">Alertas</option>
          </select>
          <input
            type="text"
            name="destinatarios"
            placeholder="Correos electrónicos (separados por coma)"
            value={nuevoReporte.destinatarios}
            onChange={handleInputChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 col-span-2"
          />
        </div>
        <button
          onClick={handleAgregarReporte}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
        >
          Agregar Reporte
        </button>
        <button
          onClick={handleVistaPrevia}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Vista Previa
        </button>
      </div>

      {/* Vista Previa del Reporte */}
      {vistaPrevia && (
        <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Vista Previa</h4>
          <pre className="text-sm">{vistaPrevia}</pre>
          <button
            onClick={() => setVistaPrevia(null)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cerrar Vista Previa
          </button>
        </div>
      )}

      {/* Lista de Alertas Programadas */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Alertas Programadas</h4>
        {reportes.length > 0 ? (
          <ul className="space-y-4">
            {reportes.map((reporte) => (
              <li
                key={reporte.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">
                    <strong>Frecuencia:</strong> {reporte.frecuencia}
                  </p>
                  <p className="text-sm">
                    <strong>Tipo:</strong> {reporte.tipo}
                  </p>
                  <p className="text-sm">
                    <strong>Destinatarios:</strong> {reporte.destinatarios.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleEliminarReporte(reporte.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">No hay reportes programados.</p>
        )}
      </div>
    </div>
  );
};

export default Automatizacion;
