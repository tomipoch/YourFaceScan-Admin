import React, { useState } from "react";

interface Antecedente {
  id: number;
  nombre: string;
  tipo: "Penal" | "Laboral" | "Académico" | "Otro";
  descripcion: string;
  fechaCreacion: string;
  ultimaActualizacion: string;
}

const Antecedentes: React.FC = () => {
  const [antecedentes, setAntecedentes] = useState<Antecedente[]>([
    {
      id: 1,
      nombre: "Juan Pérez",
      tipo: "Penal",
      descripcion: "Robo menor en 2018",
      fechaCreacion: "2023-11-20",
      ultimaActualizacion: "2023-11-21",
    },
    {
      id: 2,
      nombre: "María González",
      tipo: "Laboral",
      descripcion: "Despido injustificado en 2020",
      fechaCreacion: "2023-11-18",
      ultimaActualizacion: "2023-11-19",
    },
    {
      id: 3,
      nombre: "Carlos Martínez",
      tipo: "Académico",
      descripcion: "Plagio en tesis en 2019",
      fechaCreacion: "2023-11-15",
      ultimaActualizacion: "2023-11-16",
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
        tipo: nuevoAntecedente.tipo,
        descripcion: nuevoAntecedente.descripcion,
        fechaCreacion: nuevoAntecedente.fechaCreacion,
        ultimaActualizacion: nuevoAntecedente.fechaCreacion,
      },
    ]);
    setNuevoAntecedente({ nombre: "", tipo: "Penal", descripcion: "", fechaCreacion: "" });
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
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Antecedentes</h3>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <select
          name="tipo"
          value={filtros.tipo}
          onChange={handleFiltroChange}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
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
      </div>

      {/* Tabla de Antecedentes */}
      <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-2">Nombre</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Tipo</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Fecha de Creación</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Última Actualización</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {antecedentesFiltrados.map((antecedente) => (
            <tr key={antecedente.id}>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{antecedente.nombre}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{antecedente.tipo}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{antecedente.fechaCreacion}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">{antecedente.ultimaActualizacion}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => alert("Editar funcionalidad no implementada")}
                >
                  Editar
                </button>
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
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <select
            name="tipo"
            value={nuevoAntecedente.tipo}
            onChange={handleNuevoAntecedenteChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
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
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 col-span-2"
          ></textarea>
          <input
            type="date"
            name="fechaCreacion"
            placeholder="Fecha del registro"
            value={nuevoAntecedente.fechaCreacion}
            onChange={handleNuevoAntecedenteChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
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
