import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  Nav,
  NavContent,
  Brand,
  BrandLink,
  BrandText,
  NavLinks,
  NavLink,
  UserMenu,
  ProfileLink,
  AvatarCircle,
  Avatar,
  UserName,
} from './Navbar.styles'

/**
 * Componente de barra de navegación principal con auto-hide/show
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto-hide/show inteligente
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Siempre mostrar en el top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - ocultar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - mostrar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Extraer solo el primer nombre del usuario
  const getPrimerNombre = nombreCompleto => {
    if (!nombreCompleto) return ''
    return nombreCompleto.split(' ')[0]
  }

  return (
    <Nav $isVisible={isVisible} className="main-navbar">
      <div className="container">
        <NavContent>
          <Brand>
            <BrandLink as={Link} to="/">
              <BrandText>Clarity Blog</BrandText>
            </BrandLink>
          </Brand>

          <NavLinks>
            {isAuthenticated ? (
              <>
                <NavLink as={Link} to="/notas">
                  Mis Notas
                </NavLink>

                {user?.rol === 'admin' && (
                  <NavLink as={Link} to="/usuarios">
                    Usuarios
                  </NavLink>
                )}

                <UserMenu>
                  <ProfileLink as={Link} to="/profile">
                    <AvatarCircle>
                      <Avatar>{user?.avatar}</Avatar>
                    </AvatarCircle>
                    <UserName>{getPrimerNombre(user?.nombre)}</UserName>
                  </ProfileLink>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline">
                    Cerrar Sesión
                  </button>
                </UserMenu>
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
          </NavLinks>
        </NavContent>
      </div>
    </Nav>
  )
}

export default Navbar
