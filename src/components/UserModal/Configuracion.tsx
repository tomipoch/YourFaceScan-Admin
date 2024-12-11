import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext";
import { changePassword } from "../../apis/consultasApi"; // Importa la función desde tu archivo de consultas

const Configuracion: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, text, textSecondary, background2, border } = colors;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {};

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setSuccessMessage(null);
    setErrors({}); // Limpiar errores previos

    try {
      await changePassword(newPassword); // Llama a la función de cambio de contraseña
      setSuccessMessage("Contraseña cambiada exitosamente.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setErrors({ general: (error as Error).message });
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

        {/* Mensaje de éxito */}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {/* Mensaje de error general */}
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}

        <label className={`block text-sm mb-2 ${text}`}>Nueva Contraseña</label>
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

        <label className={`block text-sm mt-4 mb-2 ${text}`}>
          Confirmar Nueva Contraseña
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirma la nueva contraseña"
          className={`w-full p-2 rounded-lg border ${border} ${background2} ${text}`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
