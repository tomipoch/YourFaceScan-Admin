import React, { useState } from "react";
import { saveAs } from "file-saver";

interface Consulta {
  id: number;
  fecha: string;
  hora: string;
  usuario: string;
  personaConsultada: string;
  resultado: string;
  foto: string;
  antecedentes: string[];
  detallesEscaneo: string;
}

const HistorialDeConsultas: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: 1,
      fecha: "2023-11-20",
      hora: "14:35",
      usuario: "Juan Pérez",
      personaConsultada: "Carlos Gómez",
      resultado: "Sin antecedentes",
      foto: "/path/to/foto1.jpg",
      antecedentes: [],
      detallesEscaneo: "No se encontraron antecedentes relevantes.",
    },
    {
      id: 2,
      fecha: "2023-11-19",
      hora: "10:15",
      usuario: "Maria Gonzalez",
      personaConsultada: "Luis Martínez",
      resultado: "Con antecedentes",
      foto: "/path/to/foto2.jpg",
      antecedentes: ["Robo en 2018", "Fraude en 2020"],
      detallesEscaneo: "Se detectaron antecedentes penales relevantes.",
    },
  ]);

  const [filtros, setFiltros] = useState({
    usuario: "",
    personaConsultada: "",
    rangoFechaInicio: "",
    rangoFechaFin: "",
    resultado: "",
  });

  const [consultaSeleccionada, setConsultaSeleccionada] = useState<Consulta | null>(null);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const consultasFiltradas = consultas.filter(
    (consulta) =>
      consulta.usuario.toLowerCase().includes(filtros.usuario.toLowerCase()) &&
      consulta.personaConsultada
        .toLowerCase()
        .includes(filtros.personaConsultada.toLowerCase()) &&
      (filtros.resultado ? consulta.resultado === filtros.resultado : true) &&
      (!filtros.rangoFechaInicio ||
        new Date(consulta.fecha) >= new Date(filtros.rangoFechaInicio)) &&
      (!filtros.rangoFechaFin ||
        new Date(consulta.fecha) <= new Date(filtros.rangoFechaFin))
  );

  const handleExportarExcel = () => {
    const encabezados = ["Fecha", "Hora", "Usuario", "Persona Consultada", "Resultado"];
    const filas = consultas.map((consulta) => [
      consulta.fecha,
      consulta.hora,
      consulta.usuario,
      consulta.personaConsultada,
      consulta.resultado,
    ]);
    const contenido = [encabezados, ...filas]
      .map((fila) => fila.join(","))
      .join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "historial_consultas.csv");
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Historial de Consultas</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="usuario"
          placeholder="Filtrar por usuario"
          value={filtros.usuario}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <input
          type="text"
          name="personaConsultada"
          placeholder="Filtrar por persona consultada"
          value={filtros.personaConsultada}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <select
          name="resultado"
          value={filtros.resultado}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        >
          <option value="">Filtrar por resultado</option>
          <option value="Sin antecedentes">Sin antecedentes</option>
          <option value="Con antecedentes">Con antecedentes</option>
        </select>
        <input
          type="date"
          name="rangoFechaInicio"
          value={filtros.rangoFechaInicio}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <input
          type="date"
          name="rangoFechaFin"
          value={filtros.rangoFechaFin}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
      </div>

      {/* Tabla de Consultas */}
      <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-2">Fecha</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Hora</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Usuario</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Persona Consultada</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Resultado</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consultasFiltradas.map((consulta) => (
            <tr key={consulta.id}>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{consulta.fecha}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{consulta.hora}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{consulta.usuario}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{consulta.personaConsultada}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{consulta.resultado}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setConsultaSeleccionada(consulta)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exportar Historial */}
      <div className="mt-6">
        <button
          onClick={handleExportarExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Exportar Historial (CSV)
        </button>
      </div>

      {/* Modal de Detalles */}
      {consultaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Detalles de la Consulta</h3>
            <img
              src={consultaSeleccionada.foto}
              alt="Foto de la consulta"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <p className="text-sm mb-2">
              <strong>Usuario:</strong> {consultaSeleccionada.usuario}
            </p>
            <p className="text-sm mb-2">
              <strong>Persona Consultada:</strong> {consultaSeleccionada.personaConsultada}
            </p>
            <p className="text-sm mb-2">
              <strong>Resultado:</strong> {consultaSeleccionada.resultado}
            </p>
            <p className="text-sm mb-4">
              <strong>Detalles:</strong> {consultaSeleccionada.detallesEscaneo}
            </p>
            <p className="text-sm mb-4">
              <strong>Antecedentes:</strong>{" "}
              {consultaSeleccionada.antecedentes.length > 0
                ? consultaSeleccionada.antecedentes.join(", ")
                : "Ninguno"}
            </p>
            <button
              onClick={() => setConsultaSeleccionada(null)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialDeConsultas;
