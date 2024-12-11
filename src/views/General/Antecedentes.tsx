import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

interface Antecedente {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipo: "Penal" | "Laboral" | "Académico" | "Otro";
  descripcion: string;
  fechaCreacion: string;
}

const Antecedentes: React.FC = () => {
  const { colors } = useThemeContext(); // Obtiene los colores del contexto

  const [antecedentes, setAntecedentes] = useState<Antecedente[]>([
    {
      id: 1,
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "Gómez",
      tipo: "Penal",
      descripcion: "Robo menor en 2018",
      fechaCreacion: "2023-11-20",
    },
    {
      id: 2,
      nombre: "María",
      apellidoPaterno: "González",
      apellidoMaterno: "Fernández",
      tipo: "Laboral",
      descripcion: "Despido injustificado en 2020",
      fechaCreacion: "2023-11-18",
    },
    {
      id: 3,
      nombre: "Carlos",
      apellidoPaterno: "Martínez",
      apellidoMaterno: "Lopez",
      tipo: "Académico",
      descripcion: "Plagio en tesis en 2019",
      fechaCreacion: "2023-11-15",
    },
  ]);

  const [filtros, setFiltros] = useState({
    nombre: "",
    tipo: "" as "Penal" | "Laboral" | "Académico" | "Otro" | "",
    rangoFechaInicio: "",
    rangoFechaFin: "",
  });

  const [nuevoAntecedente, setNuevoAntecedente] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    tipo: "Penal" as "Penal" | "Laboral" | "Académico" | "Otro",
    descripcion: "",
    fechaCreacion: "",
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleNuevoAntecedenteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevoAntecedente({ ...nuevoAntecedente, [name]: value });
  };

  const handleCrearAntecedente = () => {
    setAntecedentes([
      ...antecedentes,
      {
        id: antecedentes.length + 1,
        nombre: nuevoAntecedente.nombre,
        apellidoPaterno: nuevoAntecedente.apellidoPaterno,
        apellidoMaterno: nuevoAntecedente.apellidoMaterno,
        tipo: nuevoAntecedente.tipo,
        descripcion: nuevoAntecedente.descripcion,
        fechaCreacion: nuevoAntecedente.fechaCreacion,
      },
    ]);
    setNuevoAntecedente({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      tipo: "Penal",
      descripcion: "",
      fechaCreacion: "",
    });
  };

  const handleEliminarAntecedente = (id: number) => {
    setAntecedentes(antecedentes.filter((antecedente) => antecedente.id !== id));
  };

  const antecedentesFiltrados = antecedentes.filter(
    (antecedente) =>
      antecedente.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      (filtros.tipo ? antecedente.tipo === filtros.tipo : true) &&
      (!filtros.rangoFechaInicio ||
        new Date(antecedente.fechaCreacion) >= new Date(filtros.rangoFechaInicio)) &&
      (!filtros.rangoFechaFin ||
        new Date(antecedente.fechaCreacion) <= new Date(filtros.rangoFechaFin))
  );

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-4">Antecedentes</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
        <select
          name="tipo"
          value={filtros.tipo}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        >
          <option value="">Filtrar por tipo</option>
          <option value="Penal">Penal</option>
          <option value="Laboral">Laboral</option>
          <option value="Académico">Académico</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          type="date"
          name="rangoFechaInicio"
          placeholder="Fecha inicio"
          value={filtros.rangoFechaInicio}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
        <input
          type="date"
          name="rangoFechaFin"
          placeholder="Fecha fin"
          value={filtros.rangoFechaFin}
          onChange={handleFiltroChange}
          className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
        />
      </div>

      {/* Tabla de Antecedentes */}
      <div className={`overflow-x-auto rounded-2xl border ${colors.border}`}>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className={`${colors.background2}`}>
              <th className={`border ${colors.border} p-2`}>Nombre</th>
              <th className={`border ${colors.border} p-2`}>Apellido Paterno</th>
              <th className={`border ${colors.border} p-2`}>Apellido Materno</th>
              <th className={`border ${colors.border} p-2`}>Tipo</th>
              <th className={`border ${colors.border} p-2`}>Fecha de Creación</th>
              <th className={`border ${colors.border} p-2`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {antecedentesFiltrados.map((antecedente) => (
              <tr key={antecedente.id}>
                <td className={`border ${colors.border} p-2`}>{antecedente.nombre}</td>
                <td className={`border ${colors.border} p-2`}>{antecedente.apellidoPaterno}</td>
                <td className={`border ${colors.border} p-2`}>{antecedente.apellidoMaterno}</td>
                <td className={`border ${colors.border} p-2`}>{antecedente.tipo}</td>
                <td className={`border ${colors.border} p-2`}>{antecedente.fechaCreacion}</td>
                <td className={`border ${colors.border} p-2 flex gap-2`}>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleEliminarAntecedente(antecedente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Crear Nuevo Antecedente */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Crear Nuevo Registro</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la persona"
            value={nuevoAntecedente.nombre}
            onChange={handleNuevoAntecedenteChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
          />
          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={nuevoAntecedente.apellidoPaterno}
            onChange={handleNuevoAntecedenteChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={nuevoAntecedente.apellidoMaterno}
            onChange={handleNuevoAntecedenteChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
          />
          <select
            name="tipo"
            value={nuevoAntecedente.tipo}
            onChange={handleNuevoAntecedenteChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background2}`}
          >
            <option value="Penal">Penal</option>
            <option value="Laboral">Laboral</option>
            <option value="Académico">Académico</option>
            <option value="Otro">Otro</option>
          </select>
          <textarea
            name="descripcion"
            placeholder="Descripción detallada"
            value={nuevoAntecedente.descripcion}
            onChange={handleNuevoAntecedenteChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background2} col-span-2`}
          ></textarea>
        </div>
        <button
          onClick={handleCrearAntecedente}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Crear Antecedente
        </button>
      </div>
    </div>
  );
};

export default Antecedentes;
