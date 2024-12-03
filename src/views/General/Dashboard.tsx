import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

ChartJS.register(...registerables);

const Dashboard: React.FC = () => {
  const { colors } = useThemeContext(); // Obtiene los colores del contexto

  const alertasRecientes = [
    { id: 1, mensaje: "5 intentos fallidos de acceso desde la IP 192.168.1.10", fecha: "2023-11-20" },
    { id: 2, mensaje: "Acceso no autorizado desde ubicación desconocida", fecha: "2023-11-19" },
  ];

  const actividadReciente = [
    { id: 1, fecha: "2023-11-20", usuario: "Rafael Morales", accion: "Consulta realizada para Pedro López" },
    { id: 2, fecha: "2023-11-20", usuario: "Ana García", accion: "Cambio en configuración de seguridad" },
    { id: 3, fecha: "2023-11-19", usuario: "Rafael Morales", accion: "Nueva alerta creada" },
  ];

  const totalConsultas = 350;
  const usuariosActivos = 25;
  const porcentajeCoincidencias = 78;

  const consultasPorDia = [50, 75, 100, 120, 90, 110, 80];
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const tiposAntecedentes = [40, 30, 20, 10];
  const labelsAntecedentes = ["Penal", "Laboral", "Académico", "Otro"];

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-6">Dashboard</h3>

      {/* Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">Total de Consultas</h4>
          <p className="text-3xl font-bold">{totalConsultas}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">Usuarios Activos</h4>
          <p className="text-3xl font-bold">{usuariosActivos}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
          <h4 className="text-sm font-semibold mb-2">% Coincidencias Recientes</h4>
          <p className="text-3xl font-bold">{porcentajeCoincidencias}%</p>
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
                    display: false, // Oculta el eje Y
                  },
                  x: {
                    grid: {
                      display: false, // Oculta la cuadrícula
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

      {/* Alertas Recientes */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Alertas Recientes</h4>
        <ul className="space-y-4">
          {alertasRecientes.map((alerta) => (
            <li key={alerta.id} className={`p-4 rounded-2xl border ${colors.border} ${colors.background2}`}>
              <p className="text-sm">
                <strong>{alerta.fecha}</strong>: {alerta.mensaje}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Actividad Reciente */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Actividad Reciente</h4>
        <div className={`overflow-x-auto rounded-2xl border ${colors.border}`}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`${colors.background2}`}>
                <th className={`border ${colors.border} p-2`}>Fecha</th>
                <th className={`border ${colors.border} p-2`}>Usuario</th>
                <th className={`border ${colors.border} p-2`}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {actividadReciente.map((actividad) => (
                <tr key={actividad.id}>
                  <td className={`border ${colors.border} p-2`}>{actividad.fecha}</td>
                  <td className={`border ${colors.border} p-2`}>{actividad.usuario}</td>
                  <td className={`border ${colors.border} p-2`}>{actividad.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
