import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../apis/consultasApi";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(user).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Llama a la función getLogin con el email y la contraseña
      const response = await getLogin(user.email, user.password);

      // Valida si la respuesta incluye un token o indica éxito
      if (response?.access) {
        console.log("Autenticación exitosa:", response);
        navigate("/admin", { replace: true });
      } else {
        setError("Credenciales inválidas, inténtalo de nuevo");
      }
    } catch (err) {
      console.error("Error al autenticar:", err);
      setError("Credenciales Incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-700 relative">
      {/* Logo fuera del encuadre blanco */}
      <div className="absolute top-10">
        <div>
          <img
            src="/Logo.png"
            alt="YourFace Scan Logo"
            className="h-16 w-16"
          />
        </div>
      </div>
      {/* Contenedor blanco */}
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center relative">
        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido a</h1>
        <h2 className="text-3xl font-bold text-blue-700 mb-2">YourFace Scan</h2>
        <p className="text-gray-700 mb-4">
          Conéctate para acceder a todo lo que necesitas en un solo lugar.
        </p>
        {/* Muestra error si existe */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Dirección de Correo Electrónico"
              value={user.email}
              onChange={handleForm}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleForm}
              value={user.password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-blue-700 font-semibold hover:underline"
            >
              ¿Olvidaste la contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
