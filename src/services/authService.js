/**
 * Servicio de Autenticación REAL - Conecta con el backend
 * Reemplaza el servicio mock para conectarse a http://localhost:5000/api
 */

import { STORAGE_KEYS } from '../utils/constants';

// URL base del backend
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Inicia sesión de usuario (REAL API)
 */
export const login = async (credentials) => {
  console.log("🌐 authService.login iniciado con:", credentials);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/auth/login`);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en login');
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.usuario));

    return {
      token: data.token,
      usuario: data.usuario
    };

  } catch (error) {
    console.error("❌ Error en authService.login:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Registra un nuevo usuario (REAL API)
 */
export const register = async (userData) => {
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/auth/login`);
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en registro');
    }

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.usuario));

    return {
      token: data.token,
      usuario: data.usuario
    };

  } catch (error) {
    console.error("❌ Error en authService.login:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Cierra sesión de usuario
 */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Obtiene el usuario actual del localStorage
 */
export const getCurrentUser = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Obtiene el token del localStorage
 */
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Verifica si hay un usuario autenticado
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return !!token;
};

// Exportar como objeto
export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
  getToken,
};

export default authService;
