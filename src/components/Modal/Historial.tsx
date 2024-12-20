import React from "react";

interface HistorialConsultaModalProps {
  isOpen: boolean;
  onClose: () => void;
  detalles: {
    foto: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    identificacion: string;
    fechaNacimiento: string;
    genero: string;
    antecedentes: string[];
  };
}

const HistorialConsultaModal: React.FC<HistorialConsultaModalProps> = ({
  isOpen,
  onClose,
  detalles,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Detalles de la Consulta</h3>
        <div className="flex flex-col items-center gap-4">
          <img
            src={detalles.foto}
            alt="Foto de la Persona"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-sm"
          />
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900">
              {detalles.nombre} {detalles.apellidoPaterno} {detalles.apellidoMaterno}
            </p>
            <p className="text-gray-600 text-sm mt-1">Identificación: {detalles.identificacion}</p>
            <p className="text-gray-600 text-sm">Fecha de Nacimiento: {detalles.fechaNacimiento}</p>
            <p className="text-gray-600 text-sm">Género: {detalles.genero}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">Antecedentes:</h4>
          {detalles.antecedentes.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {detalles.antecedentes.map((antecedente, index) => (
                <li key={index}>{antecedente}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Sin antecedentes registrados.</p>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistorialConsultaModal;
