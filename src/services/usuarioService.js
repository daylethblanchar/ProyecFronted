/**
 * Servicio de Usuarios con Mock Data
 * NO incluye lógica de backend, solo simulación simple para aprendizaje
 */

import { mockUsuarios } from './mockData';

/**
 * Simula un pequeño delay como si fuera una llamada HTTP
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene todos los usuarios con paginación simulada
 */
export const getUsuarios = async (page = 1, limit = 10) => {
  await delay();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = mockUsuarios.slice(startIndex, endIndex);

  return {
    usuarios: paginatedUsers,
    totalUsuarios: mockUsuarios.length,
    paginaActual: page,
    totalPaginas: Math.ceil(mockUsuarios.length / limit),
  };
};

/**
 * Obtiene un usuario por ID
 */
export const getUsuarioById = async (id) => {
  await delay();

  const usuario = mockUsuarios.find(u => u._id === id);

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  return usuario;
};

/**
 * Obtiene un usuario por correo
 */
export const getUsuarioByEmail = async (correo) => {
  await delay();

  const usuario = mockUsuarios.find(u => u.correo === correo);

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  return usuario;
};

/**
 * Crea un nuevo usuario
 */
export const createUsuario = async (userData) => {
  await delay();

  // Verificar si ya existe
  const exists = mockUsuarios.find(u => u.correo === userData.correo);
  if (exists) {
    throw new Error('El correo ya está registrado');
  }

  const newUser = {
    _id: String(mockUsuarios.length + 1),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockUsuarios.push(newUser);
  return newUser;
};

/**
 * Actualiza un usuario existente
 */
export const updateUsuario = async (id, userData) => {
  await delay();

  const index = mockUsuarios.findIndex(u => u._id === id);

  if (index === -1) {
    throw new Error('Usuario no encontrado');
  }

  const updatedUser = {
    ...mockUsuarios[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  };

  mockUsuarios[index] = updatedUser;
  return updatedUser;
};

/**
 * Elimina un usuario
 */
export const deleteUsuario = async (id) => {
  await delay();

  const index = mockUsuarios.findIndex(u => u._id === id);

  if (index === -1) {
    throw new Error('Usuario no encontrado');
  }

  mockUsuarios.splice(index, 1);
  return { message: 'Usuario eliminado correctamente' };
};

/**
 * Busca usuarios por nombre o correo
 */
export const searchUsuarios = async (query) => {
  await delay();

  const results = mockUsuarios.filter(u =>
    u.nombre.toLowerCase().includes(query.toLowerCase()) ||
    u.correo.toLowerCase().includes(query.toLowerCase())
  );

  return results;
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
