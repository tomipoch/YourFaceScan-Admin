import React, { useState, useRef, useEffect } from "react";
import UserMenuModal from "./UserMenuModal";
import { useThemeContext } from "../ThemeContext"; // Ajusta la ruta según tu estructura
import { Navigate } from "react-router-dom";

const Header: React.FC = () => {
  const { colors } = useThemeContext(); // Obtiene los colores desde el contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`h-16 flex items-center justify-between px-4 shadow-sm ${colors.background2} border-b ${colors.border} ${colors.text}`}
        style={{ minHeight: "4rem", maxHeight: "4rem" }}
      >
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Búsqueda global"
              className={`w-full pl-10 p-2 rounded-lg border ${colors.border} focus:ring-2 focus:ring-blue-500 ${colors.background} ${colors.text}`}
            />
            <i className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              search
            </i>
          </div>
        </div>

        {/* Usuario */}
        <div className="relative flex items-center gap-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center border ${colors.border}`}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
              }}
            >
              <i className="material-icons">person</i>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm ml-2">Rafael Morales</span>
              <span className={`text-xs text-gray-500 dark:text-gray-400 ml-2`}>
                Administrador
              </span>
            </div>
            <i className="material-icons ml-2 text-gray-500 dark:text-gray-300">
              arrow_drop_down
            </i>
          </div>

          {/* Dropdown */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`absolute right-0 mt-14 ${colors.background} rounded-2xl shadow-lg border ${colors.border} w-48 z-50`}
            >
              <div
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 ${colors.text} hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm py-2 px-4 cursor-pointer`}
              >
                <i className="material-icons text-base">settings</i>
                <span>Configuraciones</span>
              </div>
              <div
                onClick={() => Navigate}
                className={`flex items-center gap-2 ${colors.text} hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm py-2 px-4 cursor-pointer`}
              >
                <i className="material-icons text-base">logout</i>
                <span>Cerrar Sesión</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modal de configuraciones del usuario */}
      <UserMenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
