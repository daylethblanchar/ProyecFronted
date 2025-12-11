// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux'
import {
  selectUser,
  selectLoading,
  selectError,
  selectIsAuthenticated,
  login,
  register,
  logout,
  updateUser,
} from '../store/slices/authSlice'

/**
 * Hook for authentication state and actions
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  /**
   * Login user
   * @param {string} correo - User email
   * @param {string} password - User password
   */
  const handleLogin = async (correo, password) => {
    return dispatch(login({ correo, password })).unwrap()
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   */
  const handleRegister = async userData => {
    return dispatch(register(userData)).unwrap()
  }

  /**
   * Logout current user
   */
  const handleLogout = () => {
    dispatch(logout())
  }

  /**
   * Update user data
   * @param {Object} updatedUser - Updated user data
   */
  const handleUpdateUser = updatedUser => {
    dispatch(updateUser(updatedUser))
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  const hasRole = role => {
    return user?.rol === role
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser: handleUpdateUser,
    hasRole,
  }
}

export default useAuth
