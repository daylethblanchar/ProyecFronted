import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { mockUsuarios } from '../services/mockData'
import { getAvatarByUserId } from '../utils/constants'
import PropTypes from 'prop-types'

export const AuthContext = createContext(null)

/**
 * Provider del contexto de autenticación
 * Maneja el estado de autenticación del usuario en toda la aplicación
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Verifica si hay un token y usuario guardados al cargar la app
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = authService.getToken()
        let storedUser = authService.getCurrentUser()

        if (token && storedUser) {
          // Migrar usuario antiguo sin avatar
          if (!storedUser.avatar) {
            // Buscar usuario en mockUsuarios para obtener datos actualizados
            const userFromMock = mockUsuarios.find(u => u._id === storedUser._id)

            if (userFromMock) {
              // Actualizar con datos completos de mock
              storedUser = { ...storedUser, ...userFromMock }
            } else {
              // Si no está en mock, asignar avatar basado en ID
              storedUser.avatar = getAvatarByUserId(storedUser._id)
              if (!storedUser.bio) {
                storedUser.bio = 'Miembro de la comunidad.'
              }
            }

            // Guardar usuario actualizado en localStorage
            localStorage.setItem('user_data', JSON.stringify(storedUser))
          }

          setUser(storedUser)
        }
      } catch (err) {
        console.error('Error al inicializar autenticación:', err)
        authService.logout()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  /**
   * Inicia sesión con credenciales
   * @param {string} correo - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Datos del usuario autenticado
   */
  const login = async (correo, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.login({ correo, password })
      setUser(response.usuario)
      return response
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del nuevo usuario
   * @returns {Promise<Object>} Datos del usuario registrado
   */
  const register = async userData => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.register(userData)
      setUser(response.usuario)
      return response
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Cierra la sesión del usuario actual
   */
  const logout = () => {
    authService.logout()
    setUser(null)
    setError(null)
  }

  /**
   * Actualiza los datos del usuario en el contexto
   * @param {Object} updatedUser - Datos actualizados del usuario
   */
  const updateUser = updatedUser => {
    setUser(updatedUser)
    localStorage.setItem('user_data', JSON.stringify(updatedUser))
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} role - Rol a verificar (admin o user)
   * @returns {boolean} True si el usuario tiene el rol
   */
  const hasRole = role => {
    return user?.rol === role
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} True si hay un usuario autenticado
   */
  const isAuthenticated = () => {
    return !!user && !!authService.getToken()
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
