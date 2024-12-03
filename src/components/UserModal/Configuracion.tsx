import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext";

const Configuracion: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, text, textSecondary, background2, border } = colors;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!currentPassword) newErrors.currentPassword = "La contraseña actual es obligatoria.";
    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Lógica para enviar datos a la API
      console.log("Datos enviados:", { currentPassword, newPassword });

      // Ejemplo de integración con una API
      /*
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Contraseña cambiada exitosamente:', data);
      } else {
        console.error('Error al cambiar la contraseña:', data);
      }
      */
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 rounded-lg ${background} ${text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${textSecondary}`}>
        Configuración y Seguridad
      </h3>
      <div className="mb-6">
        <h4 className={`font-semibold mb-2 ${textSecondary}`}>Cambio de Contraseña</h4>
        <label className={`block text-sm mb-2 ${text}`}>Contraseña Actual</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Ingresa tu contraseña actual"
          className={`w-full p-2 rounded-lg border ${border} ${background2} ${text}`}
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm">{errors.currentPassword}</p>
        )}
        <label className={`block text-sm mt-4 mb-2 ${text}`}>Nueva Contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Ingresa una nueva contraseña"
          className={`w-full p-2 rounded-lg border ${border} ${background2} ${text}`}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`mt-4 w-full py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Guardando..." : "Cambiar Contraseña"}
        </button>
      </div>
    </div>
  );
};

export default Configuracion;
