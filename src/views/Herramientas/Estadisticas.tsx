import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";

ChartJS.register(...registerables);

const Estadisticas: React.FC = () => {
  const [filtros, setFiltros] = useState({
    rangoFechaInicio: "",
    rangoFechaFin: "",
    usuario: "",
    tipoAntecedente: "",
  });

  const [datos, setDatos] = useState({
    consultasPorPeriodo: [50, 100, 75, 120, 200],
    usuariosActivos: [10, 15, 20, 25, 30],
    tiposDeAntecedentes: [40, 60, 20, 10],
  });

  const consultasPorPeriodoLabels = ["Ene", "Feb", "Mar", "Abr", "May"];
  const tiposDeAntecedentesLabels = ["Penal", "Laboral", "Académico", "Otro"];

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleExportarCSV = () => {
    const encabezados = ["Periodo", "Consultas", "Usuarios Activos", "Tipos de Antecedentes"];
    const filas = consultasPorPeriodoLabels.map((label, index) => [
      label,
      datos.consultasPorPeriodo[index],
      datos.usuariosActivos[index] || 0,
      datos.tiposDeAntecedentes[index % datos.tiposDeAntecedentes.length] || 0,
    ]);
    const contenido = [encabezados, ...filas]
      .map((fila) => fila.join(","))
      .join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "estadisticas.csv");
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Estadísticas</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="date"
          name="rangoFechaInicio"
          placeholder="Fecha inicio"
          value={filtros.rangoFechaInicio}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <input
          type="date"
          name="rangoFechaFin"
          placeholder="Fecha fin"
          value={filtros.rangoFechaFin}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <input
          type="text"
          name="usuario"
          placeholder="Filtrar por usuario"
          value={filtros.usuario}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <select
          name="tipoAntecedente"
          value={filtros.tipoAntecedente}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        >
          <option value="">Filtrar por tipo</option>
          <option value="Penal">Penal</option>
          <option value="Laboral">Laboral</option>
          <option value="Académico">Académico</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Consultas por Periodo */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Consultas por Periodo</h4>
          <Bar
            data={{
              labels: consultasPorPeriodoLabels,
              datasets: [
                {
                  label: "Consultas",
                  data: datos.consultasPorPeriodo,
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* Usuarios Activos */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Usuarios Activos</h4>
          <Line
            data={{
              labels: consultasPorPeriodoLabels,
              datasets: [
                {
                  label: "Usuarios Activos",
                  data: datos.usuariosActivos,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* Tipos de Antecedentes */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Tipos de Antecedentes Consultados</h4>
          <Pie
            data={{
              labels: tiposDeAntecedentesLabels,
              datasets: [
                {
                  label: "Tipos de Antecedentes",
                  data: datos.tiposDeAntecedentes,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
            }}
          />
        </div>
      </div>

      {/* Exportar Reportes */}
      <div>
        <button
          onClick={handleExportarCSV}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Exportar Reporte (CSV)
        </button>
      </div>
    </div>
  );
};

export default Estadisticas;
