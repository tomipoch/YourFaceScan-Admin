import React, { useState } from "react";
import { useThemeContext } from "../../ThemeContext";

const PerfilSeccion: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>("/path/to/default-profile.jpg");
  const [formData, setFormData] = useState({
    fullName: "Tomas Poblete Chamorro",
    email: "ft.fernandotomas@gmail.com",
    phone: "+56912345678",
  });
  const { colors } = useThemeContext();
  const { background, text, textSecondary, background2, border } = colors;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Lógica para enviar los datos a la API
      console.log("Datos enviados:", { profileImage, ...formData });

      // Ejemplo de integración con una API
      /*
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileImage, ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Perfil actualizado:', data);
      } else {
        console.error('Error al actualizar el perfil:', data);
      }
      */
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
      <div className="flex items-center mb-6">
        <div className={`w-16 h-16 rounded-full overflow-hidden relative ${background2}`}>
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
          <label
            className={`absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer`}
          >
            <i className="material-icons text-sm">edit</i>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="ml-4 flex-grow">
          <label className={`text-sm block mb-1 ${text}`}>
            Nombre completo
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={getInputClass()}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>
          Número de contacto
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={getInputClass()}
        />
      </div>
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${text}`}>
          Rol Actual
        </label>
        <input
          type="text"
          value="Administrador"
          disabled
          className={getInputClass(true)}
        />
      </div>
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
