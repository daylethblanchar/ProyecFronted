/**
 * Funciones de validación reutilizables
 */

/**
 * Valida que un campo no esté vacío
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

/**
 * Valida longitud mínima
 */
export const minLength = (value, min) => {
  return value && value.length >= min;
};

/**
 * Valida longitud máxima
 */
export const maxLength = (value, max) => {
  return value && value.length <= max;
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que la contraseña tenga al menos una mayúscula, una minúscula y un número
 */
export const isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Valida que dos valores sean iguales
 */
export const isEqual = (value1, value2) => {
  return value1 === value2;
};

/**
 * Valida formato de URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida número de teléfono (formato simple)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida que un valor sea numérico
 */
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Valida rango numérico
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return num >= min && num <= max;
};

/**
 * Sanitiza HTML para prevenir XSS
 */
export const sanitizeHtml = (html) => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Valida formato de fecha (YYYY-MM-DD)
 */
export const isValidDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Valida datos de login
 */
export const validateAuthLogin = (data) => {
  const errors = {};

  if (!isRequired(data.correo)) {
    errors.correo = 'El email es requerido';
  } else if (!isValidEmail(data.correo)) {
    errors.correo = 'El email no es válido';
  }

  if (!isRequired(data.password)) {
    errors.password = 'La contraseña es requerida';
  } else if (!minLength(data.password, 6)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida datos de registro
 */
export const validateAuthRegister = (data) => {
  const errors = {};

  if (!isRequired(data.nombre)) {
    errors.nombre = 'El nombre es requerido';
  } else if (!minLength(data.nombre, 3)) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!isRequired(data.email)) {
    errors.email = 'El email es requerido';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'El email no es válido';
  }

  if (!isRequired(data.password)) {
    errors.password = 'La contraseña es requerida';
  } else if (!minLength(data.password, 6)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (data.confirmPassword !== undefined) {
    if (!isRequired(data.confirmPassword)) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (!isEqual(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida datos de usuario
 */
export const validateUser = (data, isUpdate = false) => {
  const errors = {};

  if (!isRequired(data.nombre)) {
    errors.nombre = 'El nombre es requerido';
  } else if (!minLength(data.nombre, 3)) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!isRequired(data.correo)) {
    errors.correo = 'El email es requerido';
  } else if (!isValidEmail(data.correo)) {
    errors.correo = 'El email no es válido';
  }

  // Si es creación o si se proporcionó password en actualización
  if (!isUpdate || data.password) {
    if (!isRequired(data.password)) {
      errors.password = 'La contraseña es requerida';
    } else if (!minLength(data.password, 6)) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
  }

  if (data.rol && !['admin', 'user'].includes(data.rol)) {
    errors.rol = 'El rol debe ser admin o user';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida datos de nota
 */
export const validateNota = (data) => {
  const errors = {};

  if (!isRequired(data.titulo)) {
    errors.titulo = 'El título es requerido';
  } else if (!minLength(data.titulo, 5)) {
    errors.titulo = 'El título debe tener al menos 5 caracteres';
  } else if (!maxLength(data.titulo, 100)) {
    errors.titulo = 'El título no puede tener más de 100 caracteres';
  }

  if (!isRequired(data.contenido)) {
    errors.contenido = 'El contenido es requerido';
  } else if (!minLength(data.contenido, 10)) {
    errors.contenido = 'El contenido debe tener al menos 10 caracteres';
  }

  if (!isRequired(data.categoria)) {
    errors.categoria = 'La categoría es requerida';
  } else if (!['personal', 'reflexion', 'consejo', 'experiencia'].includes(data.categoria)) {
    errors.categoria = 'La categoría no es válida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
