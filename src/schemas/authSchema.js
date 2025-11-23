/**
 * Auth Schema - Define estructuras para autenticación
 */

export const LoginSchema = {
  email: '',
  password: ''
};

export const RegisterSchema = {
  nombre: '',
  email: '',
  password: '',
  confirmPassword: ''
};

/**
 * Validación de login
 * @param credentials.email
 * @param credentials.password
 */
export const validateLogin = (credentials) => {
  const errors = {};

  if (!credentials.email || !isValidEmail(credentials.email)) {
    errors.email = 'El email no es válido';
  }

  if (!credentials.password || credentials.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validación de registro
 * @param data.nombre
 * @param data.email
 * @param data.password
 * @return Objecto { isValida, errors}
 */
export const validateRegister = (data) => {
  const errors = {};

  if (!data.nombre || data.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'El email no es válido';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Auth Response Schema
 */
export const AuthResponseSchema = {
  user: null,
  token: null,
  expiresIn: null
};

/**
 * Validación de email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
