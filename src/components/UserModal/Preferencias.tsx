import React from "react";
import { useThemeContext } from "../../ThemeContext";

const Preferencias: React.FC = () => {
  const { theme, setTheme, colors } = useThemeContext();
  const { background, text, textSecondary, background2, hoverBackground, hoverText, border } = colors;

  // Función auxiliar para determinar las clases del botón según el tema activo
  const getButtonClass = (buttonTheme: string) =>
    theme === buttonTheme
      ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600"
      : `${background2} ${textSecondary} border ${border} hover:${hoverBackground} hover:${hoverText}`;

  return (
    <div className={`p-4 rounded-lg ${background} ${text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${textSecondary}`}>
        Preferencias
      </h3>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>
          Tema
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-lg ${getButtonClass("light")}`}
          >
            Claro
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-lg ${getButtonClass("dark")}`}
          >
            Oscuro
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`px-4 py-2 rounded-lg ${getButtonClass("system")}`}
          >
            Automático
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferencias;
