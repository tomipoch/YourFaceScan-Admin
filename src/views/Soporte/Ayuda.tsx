import React, { useState } from "react";

interface FAQ {
  id: number;
  pregunta: string;
  respuesta: string;
}

interface Problema {
  id: number;
  servicio: string;
  estado: "Activo" | "Resuelto";
  descripcion: string;
}

const Ayuda: React.FC = () => {
  const [faqs] = useState<FAQ[]>([
    { id: 1, pregunta: "¿Cómo puedo cambiar mi contraseña?", respuesta: "Ve a Configuración > Seguridad y selecciona 'Cambiar contraseña'." },
    { id: 2, pregunta: "¿Qué hago si olvidé mi contraseña?", respuesta: "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión para recuperarla." },
    { id: 3, pregunta: "¿Cómo habilito la autenticación de dos factores?", respuesta: "Dirígete a Configuración > Seguridad y activa la opción de 2FA." },
  ]);

  const [problemas] = useState<Problema[]>([
    { id: 1, servicio: "Servidor Principal", estado: "Activo", descripcion: "Latencia elevada en consultas." },
    { id: 2, servicio: "Notificaciones", estado: "Resuelto", descripcion: "Fallo temporal en la entrega de notificaciones." },
  ]);

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleEnviarConsulta = () => {
    alert("Tu consulta ha sido enviada al equipo de soporte.");
    setFormulario({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h3 className="text-2xl font-bold mb-4">Ayuda</h3>

      {/* Preguntas Frecuentes */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Preguntas Frecuentes (FAQs)</h4>
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <p className="font-bold">{faq.pregunta}</p>
              <p className="text-sm">{faq.respuesta}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Guías y Manuales */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Guías y Manuales</h4>
        <ul className="space-y-2">
          <li>
            <a
              href="/manuales/guia_usuario.pdf"
              download
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Guía del Usuario (PDF)
            </a>
          </li>
          <li>
            <a
              href="/manuales/guia_administrador.pdf"
              download
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Guía del Administrador (PDF)
            </a>
          </li>
        </ul>
      </div>

      {/* Formulario de Contacto */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Formulario de Contacto</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formulario.nombre}
            onChange={handleInputChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <input
            type="email"
            name="correo"
            placeholder="Tu correo electrónico"
            value={formulario.correo}
            onChange={handleInputChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
        </div>
        <textarea
          name="mensaje"
          placeholder="Tu mensaje"
          value={formulario.mensaje}
          onChange={handleInputChange}
          className="mt-4 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 w-full"
        ></textarea>
        <button
          onClick={handleEnviarConsulta}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Enviar Consulta
        </button>
      </div>

      {/* Estado del Sistema */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Estado del Sistema</h4>
        <ul className="space-y-4">
          {problemas.map((problema) => (
            <li
              key={problema.id}
              className={`p-4 rounded-lg shadow-lg ${
                problema.estado === "Activo" ? "bg-red-100 dark:bg-red-800" : "bg-green-100 dark:bg-green-800"
              }`}
            >
              <p className="font-bold">{problema.servicio}</p>
              <p className="text-sm">{problema.descripcion}</p>
              <p
                className={`text-sm font-bold ${
                  problema.estado === "Activo" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                }`}
              >
                {problema.estado}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Ayuda;
