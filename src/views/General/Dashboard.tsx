import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura
import { getRecognitions } from "../../apis/consultasApi"; 

ChartJS.register(...registerables);

const Dashboard: React.FC = () => {
  const { colors } = useThemeContext(); // Obtiene los colores del contexto
  const [consultasPorDia, setConsultasPorDia] = useState<number[]>([]);
  const [diasSemana, setDiasSemana] = useState<string[]>([]);
  const [labelsAntecedentes, setLabelsAntecedentes] = useState<string[]>([]);
  const [tiposAntecedentes, setTiposAntecedentes] = useState<number[]>([]);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [totalRecognitions, setTotalRecognitions] = useState<number>(0);
  const [totalAwards, setTotalAwards] = useState<number>(0);

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        const data = await getRecognitions(); // Llama a la función de la API
        const last7Days = data.last_7_days_recognitions;
        const recordsTypes = data.records_types;

        // Actualizar métricas clave
        setActiveUsers(data.active_users_count);
        setTotalRecognitions(data.recognitions_count);
        setTotalAwards(data.recognitions_awards_count);

        // Procesa los datos para el gráfico de barras
        const counts = last7Days.map((item: any) => item.recognitions_count);
        const days = last7Days.map((item: any) => item.day);

        setConsultasPorDia(counts);
        setDiasSemana(days);

        // Procesa los datos para el gráfico de torta
        const labels = recordsTypes.map((record: any) => record.name);
        const dataCounts = recordsTypes.map((record: any) => record.record_count);

        setLabelsAntecedentes(labels);
        setTiposAntecedentes(dataCounts);
      } catch (error) {
        console.error("Error al obtener los datos de reconocimientos:", error);
      }
    };

    fetchRecognitions();
  }, []);

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-6">Dashboard</h3>

      {/* Contenedores de métricas clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">Usuarios Activos</h4>
          <p className="text-3xl font-bold">{activeUsers}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">Total Reconocimientos</h4>
          <p className="text-3xl font-bold">{totalRecognitions}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">Total Premios</h4>
          <p className="text-3xl font-bold">{totalAwards}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Barras */}
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-lg font-semibold mb-4">Consultas por Día</h4>
          <div className="w-full" style={{ height: "400px" }}>
            <Bar
              data={{
                labels: diasSemana,
                datasets: [
                  {
                    label: "Consultas",
                    data: consultasPorDia,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    grid: {
                      display: true, // Mostrar cuadrícula en eje Y
                    },
                  },
                  x: {
                    grid: {
                      display: false, // Ocultar cuadrícula en eje X
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Gráfico de Torta */}
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-lg font-semibold mb-4">Distribución de Consultas</h4>
          <div className="w-full" style={{ height: "400px" }}>
            <Pie
              data={{
                labels: labelsAntecedentes,
                datasets: [
                  {
                    label: "Tipos de Antecedentes",
                    data: tiposAntecedentes,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.7)",
                      "rgba(54, 162, 235, 0.7)",
                      "rgba(255, 206, 86, 0.7)",
                      "rgba(75, 192, 192, 0.7)",
                      "rgba(153, 102, 255, 0.7)",
                      "rgba(255, 159, 64, 0.7)",
                      "rgba(199, 199, 199, 0.7)",
                      "rgba(83, 102, 255, 0.7)",
                      "rgba(99, 83, 255, 0.7)",
                      "rgba(163, 255, 102, 0.7)",
                      "rgba(64, 162, 192, 0.7)",
                      "rgba(235, 112, 192, 0.7)",
                      "rgba(102, 153, 255, 0.7)",
                      "rgba(192, 102, 75, 0.7)",
                      "rgba(255, 64, 99, 0.7)",
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: "right" } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
