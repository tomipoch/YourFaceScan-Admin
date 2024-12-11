import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext";

const PerfilSeccion: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, text, textSecondary, background2, border } = colors;

  const [formData, setFormData] = useState({
    nombre: "Tomas",
    apellidoPaterno: "Poblete",
    apellidoMaterno: "Chamorro",
    correo: "ft.fernandotomas@gmail.com",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Datos enviados:", { ...formData });
      // Aquí iría la lógica para enviar los datos a una API
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const getInputClass = (isDisabled?: boolean) =>
    isDisabled
      ? `w-full p-2 rounded-lg border ${border} ${background2} ${textSecondary}`
      : `w-full p-2 rounded-lg border ${border} ${background2} ${text}`;

  return (
    <div className={`p-4 rounded-lg ${background} ${text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${textSecondary}`}>
        Mi perfil
      </h3>
      {/* Icono de perfil */}
      <div className="flex items-center mb-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center border ${border}`}
          style={{ backgroundColor: background2 }}
        >
          <i className="material-icons text-4xl" style={{ color: text }}>
            person
          </i>
        </div>
      </div>

      {/* Formulario de perfil */}
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Apellido Paterno</label>
        <input
          type="text"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Apellido Materno</label>
        <input
          type="text"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Correo Electrónico</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>

      {/* Botón de guardar */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default PerfilSeccion;
