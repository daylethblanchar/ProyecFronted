import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ArticleCardList from './components/ArticleCard/ArticleCardList'
import UsuariosPage from './pages/UsuariosPage'
import ProfilePage from './pages/ProfilePage'
import ArticlePage from './pages/ArticlePage'
import StyleGuidePage from './pages/StyleGuidePage'
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
          element: <ArticlePage />,
        },
        {
          path: 'style-guide',
          element: <StyleGuidePage />,
        },
        {
          path: 'notas',
          element: (
            <ProtectedRoute>
              <ArticleCardList />
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
          path: 'profile',
          element: (
            <ProtectedRoute>
              <ProfilePage />
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
