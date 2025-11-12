import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../common/Loading';
import PropTypes from 'prop-types';

/**
 * HOC para proteger rutas que requieren autenticación
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si está autenticado
 * @param {string} props.requiredRole - Rol requerido (admin o user)
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <Loading fullScreen message="Verificando autenticación..." />;
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol si es requerido
  if (requiredRole && user?.rol !== requiredRole) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>Acceso Denegado</h2>
          <p style={styles.errorText}>
            No tienes permisos para acceder a esta página.
          </p>
          <p style={styles.errorSubtext}>
            Se requiere rol de: <strong>{requiredRole}</strong>
          </p>
        </div>
      </div>
    );
  }

  return children;
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'var(--spacing-lg)',
  },
  errorCard: {
    maxWidth: 'var(--max-width-md)',
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
  },
  errorTitle: {
    color: 'var(--error-color)',
    marginBottom: 'var(--spacing-md)',
  },
  errorText: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--spacing-sm)',
  },
  errorSubtext: {
    color: 'var(--text-light)',
    fontSize: 'var(--text-sm)',
  },
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOf(['admin', 'user']),
};

export default ProtectedRoute;
