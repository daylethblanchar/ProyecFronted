import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente de barra de navegación principal con auto-hide/show
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide/show inteligente
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Siempre mostrar en el top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - ocultar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - mostrar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Extraer solo el primer nombre del usuario
  const getPrimerNombre = (nombreCompleto) => {
    if (!nombreCompleto) return '';
    return nombreCompleto.split(' ')[0];
  };

  return (
    <nav style={{
      ...styles.navbar,
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    }}
    className="main-navbar"
    >
      <div className="container">
        <div style={styles.navContent}>
          <div style={styles.brand}>
            <Link to="/" style={styles.brandLink}>
              <h2 style={styles.brandText}>Blog Salud Mental</h2>
            </Link>
          </div>

          <div style={styles.navLinks}>
            {isAuthenticated() ? (
              <>
                <Link to="/notas" style={styles.navLink}>
                  Mis Notas
                </Link>

                {user?.rol === 'admin' && (
                  <Link to="/usuarios" style={styles.navLink}>
                    Usuarios
                  </Link>
                )}

                <div style={styles.userMenu}>
                  <Link to="/perfil" style={styles.profileLink}>
                    <div style={styles.avatarCircle}>
                      <span style={styles.avatar}>{user?.avatar}</span>
                    </div>
                    <span style={styles.userName}>{getPrimerNombre(user?.nombre)}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline">
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-primary">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-sm btn-outline">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    borderBottom: '1px solid rgba(0, 129, 167, 0.1)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 9999,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-md) 0',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  brandLink: {
    textDecoration: 'none',
  },
  brandText: {
    margin: 0,
    color: 'var(--primary-color)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  },
  navLink: {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color var(--transition-fast)',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  profileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    textDecoration: 'none',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--bg-secondary)',
    transition: 'all var(--transition-fast)',
    border: '2px solid transparent',
  },
  avatarCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '2px solid var(--primary-color)',
  },
  avatar: {
    fontSize: '22px',
    lineHeight: 1,
    display: 'block',
  },
  userName: {
    color: 'var(--text-primary)',
    fontWeight: 600,
    fontSize: 'var(--text-sm)',
  },
};

export default Navbar;
