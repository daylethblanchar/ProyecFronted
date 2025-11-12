/**
 * Servicio de Notas con Mock Data
 * NO incluye lógica de backend, solo simulación simple para aprendizaje
 */

import { mockNotas } from './mockData';
import { getCurrentUser } from './authService';

/**
 * Simula un pequeño delay como si fuera una llamada HTTP
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene todas las notas del usuario actual
 */
export const getNotas = async () => {
  await delay();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  // Filtrar notas del usuario actual
  const userNotas = mockNotas.filter(n => n.usuario === currentUser._id);
  return userNotas;
};

/**
 * Obtiene una nota por ID
 */
export const getNotaById = async (id) => {
  await delay();

  const nota = mockNotas.find(n => n._id === id);

  if (!nota) {
    throw new Error('Nota no encontrada');
  }

  return nota;
};

/**
 * Filtra notas por categoría
 */
export const getNotasByCategoria = async (categoria) => {
  await delay();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const userNotas = mockNotas.filter(
    n => n.usuario === currentUser._id && n.categoria === categoria
  );

  return userNotas;
};

/**
 * Crea una nueva nota
 */
export const createNotaService = async (notaData) => {
  await delay();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const newNota = {
    _id: String(mockNotas.length + 1),
    ...notaData,
    usuario: currentUser._id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockNotas.push(newNota);
  return newNota;
};

/**
 * Actualiza una nota existente
 */
export const updateNota = async (id, notaData) => {
  await delay();

  const index = mockNotas.findIndex(n => n._id === id);

  if (index === -1) {
    throw new Error('Nota no encontrada');
  }

  const updatedNota = {
    ...mockNotas[index],
    ...notaData,
    updatedAt: new Date().toISOString(),
  };

  mockNotas[index] = updatedNota;
  return updatedNota;
};

/**
 * Elimina una nota
 */
export const deleteNota = async (id) => {
  await delay();

  const index = mockNotas.findIndex(n => n._id === id);

  if (index === -1) {
    throw new Error('Nota no encontrada');
  }

  mockNotas.splice(index, 1);
  return { message: 'Nota eliminada correctamente' };
};

/**
 * Busca notas por título o contenido
 */
export const searchNotas = async (query) => {
  await delay();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const results = mockNotas.filter(
    n =>
      n.usuario === currentUser._id &&
      (n.titulo.toLowerCase().includes(query.toLowerCase()) ||
        n.contenido.toLowerCase().includes(query.toLowerCase()))
  );

  return results;
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
