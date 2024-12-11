import React from "react";
import { useThemeContext } from "../../ThemeContext"; // Ajusta la ruta según tu estructura

const Seguridad: React.FC = () => {
  const { colors } = useThemeContext(); // Uso del ThemeContext

  return (
    <div className={`p-6 ${colors.background} ${colors.text}`}>
      <h3 className="text-2xl font-bold mb-4 text-left">Seguridad y Ayuda</h3>

      {/* Políticas de Seguridad */}
      <h4 className="text-xl font-bold mb-4">Políticas de Seguridad</h4>
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${colors.background2} ${colors.border}`}>
        <p className="text-lg mb-4">
          Garantizamos la protección de tus datos mediante el uso de contraseñas seguras y autenticación de dos factores.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            Longitud mínima de contraseña recomendada: <strong>8 caracteres</strong>.
          </li>
          <li>
            Las contraseñas deben ser actualizadas cada <strong>90 días</strong>.
          </li>
          <li>Habilita la autenticación de dos factores (2FA) para mayor seguridad.</li>
        </ul>
      </div>

      {/* Consejos para la Seguridad */}
      <h4 className="text-2xl font-semibold mb-4">Consejos para la Seguridad</h4>
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${colors.background2} ${colors.border}`}>
        <p className="text-lg mb-4">
          Sigue estas recomendaciones para mantener tus cuentas y datos protegidos:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>No compartas tu contraseña con nadie.</li>
          <li>Usa contraseñas únicas para cada servicio.</li>
          <li>Evita conectarte desde redes públicas no seguras.</li>
          <li>Activa alertas para accesos sospechosos.</li>
        </ul>
      </div>

      {/* Ayuda y Soporte */}
      <h4 className="text-2xl font-semibold mb-4">Ayuda y Soporte</h4>
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${colors.background2} ${colors.border}`}>
        <p className="text-lg mb-4">
          Si tienes problemas relacionados con la seguridad o necesitas ayuda, contacta a nuestro equipo de soporte.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            Correo de soporte:{" "}
            <a
              href="mailto:soporte@empresa.com"
              className="text-blue-500 underline hover:text-blue-600"
            >
              soporte@empresa.com
            </a>
          </li>
          <li>
            Teléfono: <strong>+1 800 123 456</strong>
          </li>
          <li>Horario de atención: Lunes a Viernes, de 9:00 a 18:00.</li>
        </ul>
      </div>

      {/* Botón */}
      <div className="text-center">
        <button
          onClick={() => alert("Gracias por visitar nuestra sección de seguridad y ayuda.")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Más Información
        </button>
      </div>
    </div>
  );
};

export default Seguridad;
