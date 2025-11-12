/**
 * Servicio de Autenticación con Mock Data
 * NO incluye lógica de backend, solo simulación simple para aprendizaje
 */

import { mockUsuarios, setCurrentUser, clearMockAuth } from './mockData';
import { STORAGE_KEYS, getAvatarByUserId } from '../utils/constants';

/**
 * Simula un pequeño delay como si fuera una llamada HTTP
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Inicia sesión de usuario (MOCK)
 */
export const login = async (credentials) => {
  await delay(); // Simular tiempo de respuesta

  const { correo, password } = credentials;

  // Buscar usuario en mock data
  const user = mockUsuarios.find(u => u.correo === correo);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // En un proyecto real NUNCA se valida así, pero para aprender está bien
  if (password.length < 6) {
    throw new Error('Contraseña inválida');
  }

  // Generar un "token" falso
  const token = `mock-token-${Date.now()}`;

  // Guardar en localStorage
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

  setCurrentUser(user, token);

  return {
    token,
    usuario: user,
  };
};

/**
 * Registra un nuevo usuario (MOCK)
 */
export const register = async (userData) => {
  await delay(); // Simular tiempo de respuesta

  const { nombre, correo, password } = userData;

  // Verificar si el usuario ya existe
  const existingUser = mockUsuarios.find(u => u.correo === correo);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  // Crear nuevo usuario
  const newUserId = String(mockUsuarios.length + 1);
  const newUser = {
    _id: newUserId,
    nombre,
    correo,
    rol: 'user',
    avatar: getAvatarByUserId(newUserId),
    bio: 'Nuevo miembro de la comunidad.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Agregar a mock data
  mockUsuarios.push(newUser);

  // Generar token
  const token = `mock-token-${Date.now()}`;

  // Guardar en localStorage
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));

  setCurrentUser(newUser, token);

  return {
    token,
    usuario: newUser,
  };
};

/**
 * Cierra sesión de usuario
 */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  clearMockAuth();
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
