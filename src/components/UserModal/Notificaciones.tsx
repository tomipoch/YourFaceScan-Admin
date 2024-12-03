import React from "react";
import { useThemeContext } from "../../ThemeContext";

const Notificaciones: React.FC = () => {
  const { colors } = useThemeContext();

  return (
    <div className={`p-4 rounded-lg ${colors.background} ${colors.text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${colors.textSecondary}`}>
        Notificaciones y Alertas
      </h3>
      <div className="mb-6">
        <h4 className={`font-semibold mb-2 ${colors.textSecondary}`}>
          Preferencias de Notificaciones
        </h4>
        <div className="mb-4 flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>
            Consultas realizadas
          </span>
          <input
            type="checkbox"
            className={`w-5 h-5 ${colors.border} ${colors.background2}`}
          />
        </div>
        <div className="mb-4 flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>
            Alertas de seguridad
          </span>
          <input
            type="checkbox"
            className={`w-5 h-5 ${colors.border} ${colors.background2}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;
