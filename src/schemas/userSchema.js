/**
 * User Schema - Define la estructura de datos para usuarios
 */

export const UserSchema = {
  id: null,
  nombre: '',
  email: '',
  password: '',
  rol: 'usuario', // 'admin' | 'usuario'
  createdAt: null,
  updatedAt: null
};

/**
 * Validación de usuario
 */
export const validateUser = (user) => {
  const errors = {};

  if (!user.nombre || user.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!user.email || !isValidEmail(user.email)) {
    errors.email = 'El email no es válido';
  }

  if (!user.password || user.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Crea un objeto usuario basado en el schema
 */
export const createUser = (data = {}) => {
  return {
    ...UserSchema,
    ...data,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
};

/**
 * Validación de email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
