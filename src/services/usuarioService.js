/**
 * Servicio de Usuarios REAL - Conecta con el backend
 * Reemplaza el servicio mock para conectarse a http://localhost:5000/api/usuarios
 */

import { STORAGE_KEYS } from '../utils/constants';

// URL base del backend
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Obtiene el token de autorización del localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Headers comunes para peticiones autenticadas
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Obtiene todos los usuarios con paginación REAL
 */
export const getUsuarios = async (page = 1, limit = 10) => {
  console.log("🌐 usuarioService.getUsuarios iniciado con:", { page, limit });
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios?page=${page}&limit=${limit}`);
    const response = await fetch(`${API_BASE_URL}/usuarios?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener usuarios');
    }

    return {
      usuarios: data.data?.usuarios || data.usuarios || data.data || [],
      totalUsuarios: data.data?.totalUsuarios || data.totalUsuarios || data.total || 0,
      paginaActual: data.data?.paginaActual || data.paginaActual || data.currentPage || page,
      totalPaginas: data.data?.totalPaginas || data.totalPaginas || data.totalPages || 1,
    };

  } catch (error) {
    console.error("❌ Error en usuarioService.getUsuarios:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Obtiene un usuario por ID REAL
 */
export const getUsuarioById = async (id) => {
  console.log("🌐 usuarioService.getUsuarioById iniciado con:", id);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios/${id}`);
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Usuario no encontrado');
    }

    return data.data?.usuario || data.usuario || data.data || data;

  } catch (error) {
    console.error("❌ Error en usuarioService.getUsuarioById:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Obtiene un usuario por correo REAL
 */
export const getUsuarioByEmail = async (correo) => {
  console.log("🌐 usuarioService.getUsuarioByEmail iniciado con:", correo);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios/search?correo=${correo}`);
    const response = await fetch(`${API_BASE_URL}/usuarios/search?correo=${correo}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Usuario no encontrado');
    }

    return data.data?.usuario || data.usuario || data.data || data;

  } catch (error) {
    console.error("❌ Error en usuarioService.getUsuarioByEmail:", error);
    throw new Error(error.message || 'Usuario no encontrado');
  }
};

/**
 * Crea un nuevo usuario REAL
 */
export const createUsuario = async (userData) => {
  console.log("🌐 usuarioService.createUsuario iniciado con:", userData);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios`);
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear usuario');
    }

    return data.data?.usuario || data.usuario || data.data || data;

  } catch (error) {
    console.error("❌ Error en usuarioService.createUsuario:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Actualiza un usuario existente REAL
 */
export const updateUsuario = async (id, userData) => {
  console.log("🌐 usuarioService.updateUsuario iniciado con:", { id, userData });
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios/${id}`);
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar usuario');
    }

    return data.data?.usuario || data.usuario || data.data || data;

  } catch (error) {
    console.error("❌ Error en usuarioService.updateUsuario:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Elimina un usuario REAL
 */
export const deleteUsuario = async (id) => {
  console.log("🌐 usuarioService.deleteUsuario iniciado con:", id);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios/${id}`);
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar usuario');
    }

    return data;

  } catch (error) {
    console.error("❌ Error en usuarioService.deleteUsuario:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Busca usuarios por nombre o correo REAL
 */
export const searchUsuarios = async (query) => {
  console.log("🌐 usuarioService.searchUsuarios iniciado con:", query);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/usuarios/search?q=${query}`);
    const response = await fetch(`${API_BASE_URL}/usuarios/search?q=${query}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en búsqueda');
    }

    return data.data?.usuarios || data.usuarios || data.data || [];

  } catch (error) {
    console.error("❌ Error en usuarioService.searchUsuarios:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

// Exportar como objeto
export const usuarioService = {
  getAll: getUsuarios,
  getById: getUsuarioById,
  getByEmail: getUsuarioByEmail,
  create: createUsuario,
  update: updateUsuario,
  delete: deleteUsuario,
  search: searchUsuarios,
};

export default usuarioService;
