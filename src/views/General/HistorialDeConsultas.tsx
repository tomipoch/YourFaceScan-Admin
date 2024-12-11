import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

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
  const { colors } = useThemeContext(); // Uso del ThemeContext

  const consultas: Consulta[] = [
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
  ];

  const [filtros, setFiltros] = useState({
    usuario: "",
    personaConsultada: "",
    rangoFechaInicio: "",
    rangoFechaFin: "",
    resultado: "",
  });

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
    const dataParaExportar = consultasFiltradas.map((consulta) => ({
      Fecha: consulta.fecha,
      Hora: consulta.hora,
      Usuario: consulta.usuario,
      "Persona Consultada": consulta.personaConsultada,
      Resultado: consulta.resultado,
      "Antecedentes (si aplica)": consulta.antecedentes.length
        ? consulta.antecedentes.join(", ")
        : "Ninguno",
      "Detalles del Escaneo": consulta.detallesEscaneo,
    }));

    const hojaDeCalculo = XLSX.utils.json_to_sheet(dataParaExportar);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hojaDeCalculo, "HistorialDeConsultas");

    const archivoExcel = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const blob = new Blob([archivoExcel], { type: "application/octet-stream" });

    saveAs(blob, "HistorialDeConsultas.xlsx");
  };

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-4">Historial de Consultas</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="usuario"
          placeholder="Filtrar por usuario"
          value={filtros.usuario}
          onChange={(e) =>
            setFiltros({ ...filtros, [e.target.name]: e.target.value })
          }
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
        <input
          type="text"
          name="personaConsultada"
          placeholder="Filtrar por persona consultada"
          value={filtros.personaConsultada}
          onChange={(e) =>
            setFiltros({ ...filtros, [e.target.name]: e.target.value })
          }
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
        <select
          name="resultado"
          value={filtros.resultado}
          onChange={(e) =>
            setFiltros({ ...filtros, [e.target.name]: e.target.value })
          }
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        >
          <option value="">Filtrar por resultado</option>
          <option value="Sin antecedentes">Sin antecedentes</option>
          <option value="Con antecedentes">Con antecedentes</option>
        </select>
        <input
          type="date"
          name="rangoFechaInicio"
          value={filtros.rangoFechaInicio}
          onChange={(e) =>
            setFiltros({ ...filtros, [e.target.name]: e.target.value })
          }
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
        <input
          type="date"
          name="rangoFechaFin"
          value={filtros.rangoFechaFin}
          onChange={(e) =>
            setFiltros({ ...filtros, [e.target.name]: e.target.value })
          }
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
      </div>

      {/* Tabla de Consultas */}
      <div className={`overflow-x-auto rounded-2xl border ${colors.border}`}>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className={`${colors.background2}`}>
              <th className={`border ${colors.border} p-2`}>Fecha</th>
              <th className={`border ${colors.border} p-2`}>Hora</th>
              <th className={`border ${colors.border} p-2`}>Usuario</th>
              <th className={`border ${colors.border} p-2`}>
                Persona Consultada
              </th>
              <th className={`border ${colors.border} p-2`}>Resultado</th>
              <th className={`border ${colors.border} p-2`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultasFiltradas.map((consulta) => (
              <tr key={consulta.id}>
                <td className={`border ${colors.border} p-2`}>{consulta.fecha}</td>
                <td className={`border ${colors.border} p-2`}>{consulta.hora}</td>
                <td className={`border ${colors.border} p-2`}>{consulta.usuario}</td>
                <td className={`border ${colors.border} p-2`}>
                  {consulta.personaConsultada}
                </td>
                <td className={`border ${colors.border} p-2`}>{consulta.resultado}</td>
                <td className={`border ${colors.border} p-2`}>
                  <button
                    onClick={() => console.log("Ver detalles")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exportar a Excel */}
      <div className="mt-6">
        <button
          onClick={handleExportarExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default HistorialDeConsultas;
