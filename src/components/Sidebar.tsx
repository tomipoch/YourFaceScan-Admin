import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../ThemeContext"; // Ajusta la ruta según tu estructura

const Sidebar: React.FC = () => {
  const { colors } = useThemeContext(); // Obtiene los colores del tema desde el contexto
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sections = [
    {
      title: "General",
      items: [
        { to: "/admin", label: "Dashboard", icon: "home" },
        { to: "/admin/usuarios", label: "Usuarios", icon: "person" },
        { to: "/admin/antecedentes", label: "Antecedentes", icon: "description" },
        { to: "/admin/historial", label: "Historial de consultas", icon: "history" },
      ],
    },
    {
      title: "Herramientas",
      items: [
        { to: "/admin/control-de-acceso", label: "Control de Acceso", icon: "lock" },
      ],
    },
    {
      title: "Soporte",
      items: [
        { to: "/admin/seguridad", label: "Seguridad y Ayuda", icon: "security" },
      ],
    },
  ];

  return (
    <aside
      className={`relative h-screen flex flex-col p-4 ${colors.background2} border-r ${colors.border} ${
        isSidebarCollapsed ? "collapsed" : "expanded"
      }`}
      style={{
        overflowY: "auto", // Habilita el desplazamiento vertical
        overflowX: "hidden", // Opcional: evita desplazamiento horizontal
      }}
    >
      {/* Logotipo */}
      <div className="flex items-center mb-6 ml-2 relative">
        <img
          src="/Logo.png"
          alt="Logo"
          className="h-10 w-10 mr-2 transition-all duration-300"
        />
        {!isSidebarCollapsed && (
          <div>
            <span className={`text-lg font-bold text-blue-700 dark:text-blue-400`}>YourFace</span>
            <span className="text-lg font-light text-gray-500 dark:text-gray-300 ml-1">Scan</span>
          </div>
        )}

        {/* Botón de colapsar */}
        <button
          onClick={handleToggleSidebar}
          aria-label={isSidebarCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          aria-expanded={!isSidebarCollapsed}
          className={`absolute top-1/2 -right-6 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full hover:scale-110 hover:bg-blue-100 dark:hover:bg-gray-600 z-10`}
        >
          <i className="material-icons text-sm">
            {isSidebarCollapsed ? "chevron_right" : "chevron_left"}
          </i>
        </button>
      </div>

      {/* Renderizado de secciones */}
      {sections.map(({ title, items }) => (
        <div key={title} className="mb-2">
          <h4
            className={`uppercase text-xs mb-3 flex items-center ${colors.text} ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            {isSidebarCollapsed ? title.charAt(0) : title}
          </h4>
          {items.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center w-full p-3 mb-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : `${colors.text} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`
              }
            >
              <i className={`material-icons text-base ml-2`}>{icon}</i>
              {!isSidebarCollapsed && <span className="ml-4 text-sm">{label}</span>}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
