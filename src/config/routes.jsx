
import { Navigate } from "react-router-dom";

// Layouts
/* import AuthLayout from "../context/layouts/AuthLayout";
import AdminLayout from "../context/layouts/AdminLayout";
import CoordinadorLayout from "../context/layouts/CoordinadorLayout";
import OperadorLayout from "../context/layouts/OperadorLayout"; */
import AdminLayout from "../layouts/admind.layaut";
// Pages generales
/* import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound'; */

// Features - Auth
/* import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import PlansPage from "../features/auth/pages/PlansPage"; */

// Features - Agendacion
/* import AgendacionPage from "../features/Agendacion/AgendacionPage";
import AgendacionPageWrapper from "../features/Agendacion/AgendacionPageWrapper"; */

// ============ ADMIN PAGES ============
/* import AdminDashboardPage from "../pages/admin/Dashboard";
import AdminAsambleasPage from "../pages/admin/Asambleas";
import AdminCoordinadoresPage from "../pages/admin/Coordinadores";
import AdminParticipantesPage from "../pages/admin/Participantes";
import AdminInformesPage from "../pages/admin/Informes";
import AdminAnaliticasPage from "../pages/admin/Analiticas"; */
import AdminDashboardPage from "../pages/admin/view/dashboard/dashboard.page"
import AdminAsambleas from "../pages/admin/view/asambleas/asambleas.page"
import AdminCoordinadores from "../pages/admin/view/coordinadores/coordinador.page"
import AdminParticipantes from "../pages/admin/view/participantes/participates.page"
// ============ COORDINADOR PAGES ============
/* import CoordinadorDashboardPage from "../pages/coordinador/Dashboard";
import CoordinadorAsambleasPage from "../pages/coordinador/Asambleas";
import CoordinadorParticipantesPage from "../pages/coordinador/Participantes";
import CoordinadorInformesPage from "../pages/coordinador/Informes"; */



// ============ OPERADOR PAGES ============
//import OperadorDashboardPage from "../pages/operador/Registro"
/* import Layaoutoperador from "../layouts/operador.layaut"
import OperadorContent from "../pages/operador/views/asambleas-view" */
import operatorPage from "../pages/operador/registro-operador"
export const routes = [
  // ============ RUTAS PÚBLICAS ============
  {
    path: "/",
    element: "",
    children: [
      { 
        index: true, 
        element: <div className="w-full h-full bg-lime-50 flex justify-center items-center">landingpage</div> 
      },
      { 
        path: "login", 
        element:"login" 
      },
      { 
        path: "register", 
        element: "" 
      },
      { 
        path: "plans", 
        element: ""
      },

      // Redirect para compatibilidad
      { 
        path: "Plans", 
        element: ""
      },
    ],
  },

  // ============ RUTAS ADMIN ============
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      { 
        index: true, 
        element: <AdminDashboardPage></AdminDashboardPage>
      },
      { 
        path: "", 
        element: "dashboard"
      },
      { 
        path: "asambleas", 
        element: <AdminAsambleas></AdminAsambleas>
      },
      { 
        path: "coordinadores", 
        element: <AdminCoordinadores></AdminCoordinadores>
      },
      { 
        path: "participantes", 
        element: <AdminParticipantes></AdminParticipantes>
      },
      { 
        path: "informes", 
        element:"informes"
      },
      { 
        path: "analiticas", 
        element: "analiticas"
      },
    ],
  },

  // ============ RUTAS COORDINADOR ============
  {
    path: "/coordinador",
    element: "layautcoordinador",
    children: [
      { 
        index: true, 
        element: "sss"
      },
      { 
        path: "dashboard", 
        element: "corrdinador"
      },
      { 
        path: "asambleas", 
        element: "asambleas"
      },
      { 
        path: "participantes", 
        element: "participantes"
      },
      { 
        path: "informes", 
        element: "infromes"
      },
    ],
  },

  // ============ RUTAS OPERADOR ============
  {
    path: "/operador",
    element:"",
    children: [
      { 
        index: true, 
        element: <operatorPage/> 
      },
      { 
        path: "dashboard", 
        element: "<OperadorDashboardPage /> "
      },
      { 
        path: "registro", 
        element: "<OperadorRegistroPage /> "
      },
      { 
        path: "participantes", 
        element: "<OperadorParticipantesPage /> "
      },
    ],
  },

  // ============ RUTA AGENDACION INDEPENDIENTE ============
  {
    path: "/agendacion",
    element: "<AgendacionPage />"
  },

  // ============ REDIRECTS COMPATIBILIDAD ============
  {
    path: "/dashboard",
    element: <Navigate to="/admin" replace />
  },

  // ============ RUTA 404 ============
  {
    path: "*",
    element: "<NotFound />"
  }
];

// ============ UTILIDADES PARA ROLES ============
export const roleRoutes = {
  admin: '/admin',
  coordinador: '/coordinador',
  operador: '/operador'
};

export const getDefaultRouteForRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'coordinador':
      return '/coordinador';
    case 'operador':
      return '/operador';
    default:
      return '/';
  }
};

// ============ NAVEGACIÓN POR ROLES ============
export const getNavigationForRole = (role) => {
  switch (role) {
    case 'admin':
      return [
        { name: 'Dashboard', href: '/admin/dashboard', icon: 'home' },
        { name: 'Asambleas', href: '/admin/asambleas', icon: 'calendar' },
        { name: 'Coordinadores', href: '/admin/coordinadores', icon: 'users' },
        { name: 'Participantes', href: '/admin/participantes', icon: 'user-group' },
        { name: 'Informes', href: '/admin/informes', icon: 'document' },
        { name: 'Analíticas', href: '/admin/analiticas', icon: 'chart-bar' },
      ];
    
    case 'coordinador':
      return [
        { name: 'Dashboard', href: '/coordinador/dashboard', icon: 'home' },
        { name: 'Asambleas', href: '/coordinador/asambleas', icon: 'calendar' },
        { name: 'Participantes', href: '/coordinador/participantes', icon: 'user-group' },
        { name: 'Informes', href: '/coordinador/informes', icon: 'document' },
      ];
    
    case 'operador':
      return [
        { name: 'Dashboard', href: '/operador/dashboard', icon: 'home' },
        { name: 'Registro', href: '/operador/registro', icon: 'plus' },
        { name: 'Participantes', href: '/operador/participantes', icon: 'user-group' },
      ];
    
    default:
      return [];
  }
};

// Configuración adicional para el router
export const routerConfig = {
  routes,
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};