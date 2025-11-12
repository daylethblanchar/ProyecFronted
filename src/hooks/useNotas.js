import { useState, useCallback } from 'react';
import { notaService } from '../services/notaService';

/**
 * Hook personalizado para operaciones CRUD de notas
 * @returns {Object} Métodos y estado para gestión de notas
 */
export const useNotas = () => {
  const [notas, setNotas] = useState([]);
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene todas las notas del usuario autenticado
   */
  const fetchNotas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notaService.getAll();
      setNotas(response);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener notas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una nota por su ID
   * @param {string} id - ID de la nota
   */
  const fetchNotaById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notaService.getById(id);
      setNota(response);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener nota';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filtra notas por categoría
   * @param {string} categoria - Categoría a filtrar
   */
  const fetchNotasByCategoria = useCallback(async (categoria) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notaService.getByCategoria(categoria);
      setNotas(response);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al filtrar notas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea una nueva nota
   * @param {Object} notaData - Datos de la nueva nota
   */
  const createNota = useCallback(async (notaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notaService.create(notaData);
      setNotas((prev) => [response, ...prev]);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear nota';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza una nota existente
   * @param {string} id - ID de la nota
   * @param {Object} notaData - Datos actualizados
   */
  const updateNota = useCallback(async (id, notaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notaService.update(id, notaData);
      setNotas((prev) =>
        prev.map((n) => (n._id === id ? response : n))
      );
      if (nota?._id === id) {
        setNota(response);
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar nota';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [nota]);

  /**
   * Elimina una nota
   * @param {string} id - ID de la nota a eliminar
   */
  const deleteNota = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await notaService.delete(id);
      setNotas((prev) => prev.filter((n) => n._id !== id));
      if (nota?._id === id) {
        setNota(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar nota';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [nota]);

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Limpia la nota seleccionada
   */
  const clearNota = useCallback(() => {
    setNota(null);
  }, []);

  return {
    notas,
    nota,
    loading,
    error,
    fetchNotas,
    fetchNotaById,
    fetchNotasByCategoria,
    createNota,
    updateNota,
    deleteNota,
    clearError,
    clearNota,
  };
};
