import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes diferidos
const Login = lazy(() => import("./auth/Login"));
const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./views/General/Dashboard"));
const Usuarios = lazy(() => import("./views/General/Usuarios"));
const Antecedentes = lazy(() => import("./views/General/Antecedentes"));
const HistorialDeConsultas = lazy(() => import("./views/General/HistorialDeConsultas"));
const ControlDeAcceso = lazy(() => import("./views/Herramientas/ControlDeAcceso"));

const Seguridad = lazy(() => import("./views/Soporte/Seguridad"));


const adminRoutes = [
  { path: "/admin/usuarios", element: <Usuarios /> },
  { path: "/admin/antecedentes", element: <Antecedentes /> },
  { path: "/admin/historial", element: <HistorialDeConsultas /> },
  { path: "/admin/control-de-acceso", element: <ControlDeAcceso /> },
  { path: "/admin/seguridad", element: <Seguridad /> },
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
