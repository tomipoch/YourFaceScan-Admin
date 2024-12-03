import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes diferidos
const Login = lazy(() => import("./auth/Login"));
const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./views/General/Dashboard"));
const Usuarios = lazy(() => import("./views/General/Usuarios"));
const Antecedentes = lazy(() => import("./views/General/Antecedentes"));
const HistorialDeConsultas = lazy(() => import("./views/General/HistorialDeConsultas"));
const Estadisticas = lazy(() => import("./views/Herramientas/Estadisticas"));
const Automatizacion = lazy(() => import("./views/Herramientas/Automatizacion"));
const ControlDeAcceso = lazy(() => import("./views/Herramientas/ControlDeAcceso"));
const Alertas = lazy(() => import("./views/Herramientas/Alertas"));
const Seguridad = lazy(() => import("./views/Soporte/Seguridad"));
const Ayuda = lazy(() => import("./views/Soporte/Ayuda"));

const adminRoutes = [
  { path: "usuarios", element: <Usuarios /> },
  { path: "antecedentes", element: <Antecedentes /> },
  { path: "historial", element: <HistorialDeConsultas /> },
  { path: "estadisticas", element: <Estadisticas /> },
  { path: "automatizacion", element: <Automatizacion /> },
  { path: "control-de-acceso", element: <ControlDeAcceso /> },
  { path: "alertas-notificaciones", element: <Alertas /> },
  { path: "seguridad", element: <Seguridad /> },
  { path: "ayuda", element: <Ayuda /> },
];

const AppRouter = () => {
  return (
    <Suspense fallback="Cargando...">
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Layout */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {adminRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
