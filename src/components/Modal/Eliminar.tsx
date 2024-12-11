import React from "react";

interface EliminarUsuarioModalProps {
  isOpen: boolean;
  usuarioNombre: string;
  onClose: () => void;
  onConfirm: () => void;
}

const EliminarUsuarioModal: React.FC<EliminarUsuarioModalProps> = ({
  isOpen,
  usuarioNombre,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Eliminar Usuario</h3>
        <p className="mb-4">
          ¿Estás seguro que deseas eliminar a <span className="font-semibold">{usuarioNombre}</span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarUsuarioModal;
