import { useState, useCallback } from 'react';
import { usuarioService } from '../services/usuarioService';

/**
 * Hook personalizado para operaciones CRUD de usuarios
 * @returns {Object} Métodos y estado para gestión de usuarios
 */
export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsuarios: 0,
  });

  /**
   * Obtiene todos los usuarios con paginación
   * @param {number} page - Número de página
   * @param {number} limit - Límite de usuarios por página
   */
  const fetchUsuarios = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioService.getAll(page, limit);
      setUsuarios(response.usuarios);
      setPagination({
        currentPage: response.paginaActual,
        totalPages: response.totalPaginas,
        totalUsuarios: response.totalUsuarios,
      });
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener usuarios';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene un usuario por su ID
   * @param {string} id - ID del usuario
   */
  const fetchUsuarioById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioService.getById(id);
      setUsuario(response);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca usuarios por correo
   * @param {string} correo - Email a buscar
   */
  const searchUsuarioByEmail = useCallback(async (correo) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioService.getByEmail(correo);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Usuario no encontrado';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo usuario
   * @param {Object} usuarioData - Datos del nuevo usuario
   */
  const createUsuario = useCallback(async (usuarioData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioService.create(usuarioData);
      setUsuarios((prev) => [response, ...prev]);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza un usuario existente
   * @param {string} id - ID del usuario
   * @param {Object} usuarioData - Datos actualizados
   */
  const updateUsuario = useCallback(async (id, usuarioData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioService.update(id, usuarioData);
      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? response : u))
      );
      if (usuario?._id === id) {
        setUsuario(response);
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [usuario]);

  /**
   * Elimina un usuario
   * @param {string} id - ID del usuario a eliminar
   */
  const deleteUsuario = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await usuarioService.delete(id);
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
      if (usuario?._id === id) {
        setUsuario(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [usuario]);

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Limpia el usuario seleccionado
   */
  const clearUsuario = useCallback(() => {
    setUsuario(null);
  }, []);

  return {
    usuarios,
    usuario,
    loading,
    error,
    pagination,
    fetchUsuarios,
    fetchUsuarioById,
    searchUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    clearError,
    clearUsuario,
  };
};
