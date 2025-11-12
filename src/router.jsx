import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotasPage from './pages/NotasPage'
import UsuariosPage from './pages/UsuariosPage'
import PerfilPage from './pages/PerfilPage'
import ArticuloPage from './pages/ArticuloPage'
import ProtectedRoute from './components/Auth/ProtectedRoute'

/**
 * Configuración de rutas de la aplicación
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'articulo/:id',
          element: <ArticuloPage />,
        },
        {
          path: 'notas',
          element: (
            <ProtectedRoute>
              <NotasPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'usuarios',
          element: (
            <ProtectedRoute requiredRole="admin">
              <UsuariosPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'perfil',
          element: (
            <ProtectedRoute>
              <PerfilPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
)
