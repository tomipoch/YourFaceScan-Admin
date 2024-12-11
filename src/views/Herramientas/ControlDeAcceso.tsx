import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../ThemeContext";
import { getUsers, toggleUserState } from "../../apis/consultasApi";

interface UsuarioRegistro {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
  ultimoInicioSesion: string; // Combina fecha y hora
}

const ControlDeAcceso: React.FC = () => {
  const { colors } = useThemeContext();
  const [registrosAcceso, setRegistrosAcceso] = useState<UsuarioRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Cargar registros al montar el componente
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        setLoading(true);
        setError(null);

        const users = await getUsers();
        console.log("Usuarios obtenidos desde la API:", users);

        setRegistrosAcceso(
          users.map((user: any) => ({
            id: user.id,
            nombre: user.first_name,
            apellido: user.last_name,
            correo: user.email,
            estado: user.is_active ? "Habilitado" : "Deshabilitado",
            ultimoInicioSesion: user.last_login
              ? new Date(user.last_login).toLocaleString("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              : "Sin registro",
          }))
        );
      } catch (error) {
        console.error("Error al obtener los registros:", error);
        setError("No se pudieron cargar los registros de acceso.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  const handleToggleActivo = async (id: number) => {
    try {
      const response = await toggleUserState(id);
      console.log("Respuesta del servidor:", response);
      setModalMessage(response.message);

      setRegistrosAcceso((prevRegistros) =>
        prevRegistros.map((usuario) =>
          usuario.id === id
            ? {
                ...usuario,
                estado: usuario.estado === "Habilitado" ? "Deshabilitado" : "Habilitado",
              }
            : usuario
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
      setError(error instanceof Error ? error.message : "Error desconocido.");
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-4">Control de Acceso</h3>

      {loading ? (
        <p className={`text-center ${colors.textSecondary}`}>Cargando registros...</p>
      ) : error ? (
        <p className={`text-center text-red-500`}>{error}</p>
      ) : (
        <div>
          {/* Tarjetas de usuarios */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Usuarios Activos</h4>
            <ul className="space-y-4">
              {registrosAcceso.map((usuario) => (
                <li
                  key={usuario.id}
                  className={`p-4 rounded-lg shadow-lg flex justify-between items-center ${colors.background2} ${colors.border}`}
                >
                  <div>
                    <p className="text-sm">
                      <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
                    </p>
                    <p className="text-sm">
                      <strong>Correo:</strong> {usuario.correo}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleActivo(usuario.id)}
                    className={`px-3 py-1 rounded-lg ${
                      usuario.estado === "Habilitado"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {usuario.estado === "Habilitado" ? "Desactivar" : "Activar"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tabla de registros de acceso */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Registros de Acceso</h4>
            <div className={`overflow-x-auto rounded-2xl border ${colors.border}`}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className={`${colors.background2}`}>
                    <th className={`border ${colors.border} p-2`}>Fecha y Hora</th>
                    <th className={`border ${colors.border} p-2`}>Nombre</th>
                    <th className={`border ${colors.border} p-2`}>Apellido</th>
                    <th className={`border ${colors.border} p-2`}>Correo</th>
                    <th className={`border ${colors.border} p-2`}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosAcceso.map((registro) => (
                    <tr key={registro.id}>
                      <td className={`border ${colors.border} p-2`}>
                        {registro.ultimoInicioSesion}
                      </td>
                      <td className={`border ${colors.border} p-2`}>{registro.nombre}</td>
                      <td className={`border ${colors.border} p-2`}>{registro.apellido}</td>
                      <td className={`border ${colors.border} p-2`}>{registro.correo}</td>
                      <td
                        className={`border ${colors.border} p-2 ${
                          registro.estado === "Deshabilitado"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {registro.estado}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg ${colors.background} ${colors.text}`}>
            <p className="text-center mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlDeAcceso;
