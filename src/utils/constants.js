/**
 * Constantes de la aplicación
 */

// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify'
  },
  USUARIOS: {
    BASE: '/usuarios',
    BY_ID: (id) => `/usuarios/${id}`,
    UPDATE: (id) => `/usuarios/${id}`,
    DELETE: (id) => `/usuarios/${id}`
  },
  NOTAS: {
    BASE: '/notas',
    BY_ID: (id) => `/notas/${id}`,
    BY_USER: (userId) => `/notas/usuario/${userId}`,
    UPDATE: (id) => `/notas/${id}`,
    DELETE: (id) => `/notas/${id}`
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference'
};

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  USUARIO: 'usuario'
};

// Estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  GENERIC: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN: 'Sesión iniciada correctamente',
  REGISTER: 'Registro exitoso. Bienvenido!',
  CREATED: 'Creado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  DELETED: 'Eliminado exitosamente'
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
};

// Timeouts
export const TIMEOUTS = {
  REQUEST: 30000, // 30 segundos
  NOTIFICATION: 3000 // 3 segundos
};

// Categorías de notas con colores de ambas paletas
export const CATEGORIAS_NOTAS = [
  { value: 'personal', label: 'Personal', color: '#F07167' },      // Coral (Paleta 2)
  { value: 'reflexion', label: 'Reflexión', color: '#219EBC' },    // Teal (Paleta 1)
  { value: 'consejo', label: 'Consejo', color: '#FFB703' },        // Amarillo (Paleta 1)
  { value: 'experiencia', label: 'Experiencia', color: '#00AFB9' } // Cyan (Paleta 2)
];

/**
 * Obtiene el color de una categoría
 * @param {string} categoria - Categoría de la nota
 * @returns {string} - Color hexadecimal
 */
export const getCategoriaColor = (categoria) => {
  const cat = CATEGORIAS_NOTAS.find(c => c.value === categoria);
  return cat ? cat.color : '#00AFB9'; // Default: Cyan
};

// Avatares de emojis para usuarios
export const AVATARES_EMOJIS = [
  '😊', // Sonriente
  '🌟', // Estrella
  '🎨', // Paleta de arte
  '🌈', // Arcoíris
  '🦋', // Mariposa
  '🌸', // Flor de cerezo
  '🎭', // Máscaras de teatro
  '🌺', // Hibisco
  '🦄', // Unicornio
  '💫'  // Estrella brillante
];

// Función helper para obtener avatar aleatorio
export const getRandomAvatar = () => {
  return AVATARES_EMOJIS[Math.floor(Math.random() * AVATARES_EMOJIS.length)];
};

// Función helper para obtener avatar por ID de usuario (consistente)
export const getAvatarByUserId = (userId) => {
  const id = typeof userId === 'string' ? parseInt(userId) : userId;
  return AVATARES_EMOJIS[id % AVATARES_EMOJIS.length];
};
