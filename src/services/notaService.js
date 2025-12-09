/**
 * Servicio de Notas REAL - Conecta con el backend
 * Reemplaza el servicio mock para conectarse a http://localhost:5000/api/notas
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
 * Obtiene todas las notas del usuario actual REAL
 */
export const getNotas = async () => {
  console.log("🌐 notaService.getNotas iniciado");
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas`);
    const response = await fetch(`${API_BASE_URL}/notas`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener notas');
    }

    return data.notas || data.data || [];

  } catch (error) {
    console.error("❌ Error en notaService.getNotas:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Obtiene una nota por ID REAL
 */
export const getNotaById = async (id) => {
  console.log("🌐 notaService.getNotaById iniciado con:", id);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas/${id}`);
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Nota no encontrada');
    }

    return data.nota || data.data || data;

  } catch (error) {
    console.error("❌ Error en notaService.getNotaById:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Filtra notas por categoría REAL
 */
export const getNotasByCategoria = async (categoria) => {
  console.log("🌐 notaService.getNotasByCategoria iniciado con:", categoria);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas?categoria=${categoria}`);
    const response = await fetch(`${API_BASE_URL}/notas?categoria=${categoria}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener notas por categoría');
    }

    return data.notas || data.data || [];

  } catch (error) {
    console.error("❌ Error en notaService.getNotasByCategoria:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Crea una nueva nota REAL
 */
export const createNotaService = async (notaData) => {
  console.log("🌐 notaService.createNotaService iniciado con:", notaData);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas`);
    const response = await fetch(`${API_BASE_URL}/notas`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notaData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear nota');
    }

    return data.nota || data.data || data;

  } catch (error) {
    console.error("❌ Error en notaService.createNotaService:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Actualiza una nota existente REAL
 */
export const updateNota = async (id, notaData) => {
  console.log("🌐 notaService.updateNota iniciado con:", { id, notaData });
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas/${id}`);
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(notaData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar nota');
    }

    return data.nota || data.data || data;

  } catch (error) {
    console.error("❌ Error en notaService.updateNota:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Elimina una nota REAL
 */
export const deleteNota = async (id) => {
  console.log("🌐 notaService.deleteNota iniciado con:", id);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas/${id}`);
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar nota');
    }

    return data;

  } catch (error) {
    console.error("❌ Error en notaService.deleteNota:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

/**
 * Busca notas por título o contenido REAL
 */
export const searchNotas = async (query) => {
  console.log("🌐 notaService.searchNotas iniciado con:", query);
  try {
    console.log("📡 Enviando petición a:", `${API_BASE_URL}/notas/search?q=${query}`);
    const response = await fetch(`${API_BASE_URL}/notas/search?q=${query}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en búsqueda de notas');
    }

    return data.notas || data.data || [];

  } catch (error) {
    console.error("❌ Error en notaService.searchNotas:", error);
    throw new Error(error.message || 'Error de conexión');
  }
};

// Exportar como objeto
export const notaService = {
  getAll: getNotas,
  getById: getNotaById,
  getByCategoria: getNotasByCategoria,
  create: createNotaService,
  update: updateNota,
  delete: deleteNota,
  search: searchNotas,
};

export default notaService;
