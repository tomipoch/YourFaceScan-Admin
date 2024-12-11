import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

interface EditarUsuarioModalProps {
  usuario: {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUsuario: any) => void;
}

const EditarUsuarioModal: React.FC<EditarUsuarioModalProps> = ({
  usuario,
  isOpen,
  onClose,
  onSave,
}) => {
  const { colors } = useThemeContext(); // Obtenemos los colores del contexto
  const [formData, setFormData] = useState({ ...usuario });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
      <div className={`p-6 rounded-lg shadow-lg w-96 ${colors.background2} ${colors.text}`}>
        <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
        <div className="grid gap-4 mb-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background}`}
          />
          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background}`}
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background}`}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 rounded-lg border ${colors.border} ${colors.background}`}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${colors.border} ${colors.hoverBackground} ${colors.text}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700`}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuarioModal;
