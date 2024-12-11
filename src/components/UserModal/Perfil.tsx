import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../ThemeContext";
import { getProfile, updateProfile } from "../../apis/consultasApi";

const PerfilSeccion: React.FC = () => {
  const { colors } = useThemeContext();
  const { background, text, textSecondary, background2, border } = colors;

  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
  });
  const [originalData, setOriginalData] = useState(formData); // Almacena los datos originales
  const [isEditing, setIsEditing] = useState(false); // Controla si el formulario está en modo edición
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProfile();
        const userData = {
          id: data.id,
          nombre: data.first_name || "",
          apellido: data.last_name || "",
          correo: data.email || "",
        };
        setFormData(userData);
        setOriginalData(userData); // Almacena los datos originales al cargar
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Cambia el modo entre edición y visualización
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    setFormData(originalData); // Restaura los datos originales
    setIsEditing(false); // Salir del modo edición
  };

  const handleSubmit = async () => {
    try {
      setSuccess(null);
      setError(null);

      const { id, nombre, apellido, correo } = formData;
      const updatedData = {
        first_name: nombre,
        last_name: apellido,
        email: correo,
      };

      await updateProfile(id, updatedData);

      setOriginalData(formData); // Actualiza los datos originales tras guardar
      setSuccess("Perfil actualizado correctamente.");
      setIsEditing(false); // Salir del modo edición tras guardar
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al actualizar el perfil. Inténtalo nuevamente.");
    }
  };

  const getInputClass = (isDisabled?: boolean) =>
    isDisabled
      ? `w-full p-2 rounded-lg border ${border} ${background2} ${textSecondary}`
      : `w-full p-2 rounded-lg border ${border} ${background2} ${text}`;

  if (loading) {
    return <p className={`text-center ${textSecondary}`}>Cargando...</p>;
  }

  if (error) {
    return <p className={`text-center ${textSecondary}`}>{error}</p>;
  }

  return (
    <div className={`p-4 rounded-lg ${background} ${text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${textSecondary}`}>
        Mi perfil
      </h3>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulario de perfil */}
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className={getInputClass(!isEditing)}
          disabled={!isEditing}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          className={getInputClass(!isEditing)}
          disabled={!isEditing}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>Correo Electrónico</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          className={getInputClass(!isEditing)}
          disabled={!isEditing}
        />
      </div>

      {/* Botones de editar, guardar y cancelar */}
      {isEditing ? (
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditToggle}
          className="w-full py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
        >
          Editar
        </button>
      )}
    </div>
  );
};

export default PerfilSeccion;
