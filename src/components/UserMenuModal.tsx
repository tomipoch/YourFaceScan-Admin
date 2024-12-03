import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../ThemeContext";
import PerfilSeccion from "../components/UserModal/Perfil";
import Configuracion from "../components/UserModal/Configuracion";
import Notificaciones from "../components/UserModal/Notificaciones";
import Preferencias from "../components/UserModal/Preferencias";

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenuModal: React.FC<UserMenuModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedSection, setSelectedSection] = useState("Información Personal");
  const { colors } = useThemeContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sections = [
    { label: "Información Personal", icon: "person" },
    { label: "Configuración y Seguridad", icon: "settings" },
    { label: "Notificaciones y Alertas", icon: "notifications" },
    { label: "Preferencias", icon: "tune" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[90%] h-[90%] lg:w-[80%] lg:h-[80%] flex overflow-hidden rounded-2xl shadow-xl ${colors.background2} border ${colors.border}`}
      >
        {/* Sidebar */}
        <div className={`w-16 lg:w-auto ${colors.background2} border-r ${colors.border} p-4 flex flex-col items-center lg:items-start`}>
          <h2 className="hidden lg:block text-lg font-bold text-blue-700 dark:text-blue-400 mb-6">
            Configuración
          </h2>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.label}
                onClick={() => setSelectedSection(section.label)}
                className={`flex flex-col lg:flex-row items-center lg:items-start p-3 rounded-lg cursor-pointer ${
                  selectedSection === section.label
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <i className="material-icons text-xl">{section.icon}</i>
                <span className="hidden lg:block ml-4">{section.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section Content */}
        <div className={`w-full lg:flex-grow ${colors.background} ${colors.text} p-6 overflow-y-auto`}>
          {selectedSection === "Información Personal" && <PerfilSeccion />}
          {selectedSection === "Configuración y Seguridad" && <Configuracion />}
          {selectedSection === "Notificaciones y Alertas" && <Notificaciones />}
          {selectedSection === "Preferencias" && <Preferencias />}
        </div>
      </div>
    </div>
  );
};

export default UserMenuModal;
