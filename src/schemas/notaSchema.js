/**
 * Nota Schema - Define la estructura de datos para notas
 */

export const NotaSchema = {
  id: null,
  titulo: '',
  contenido: '',
  categoria: 'personal', // 'personal' | 'reflexion' | 'consejo' | 'experiencia'
  usuarioId: null,
  publicado: false,
  createdAt: null,
  updatedAt: null
};

/**
 * Validación de nota
 */
export const validateNota = (nota) => {
  const errors = {};

  if (!nota.titulo || nota.titulo.trim().length < 5) {
    errors.titulo = 'El título debe tener al menos 5 caracteres';
  }

  if (!nota.contenido || nota.contenido.trim().length < 10) {
    errors.contenido = 'El contenido debe tener al menos 10 caracteres';
  }

  if (!nota.categoria) {
    errors.categoria = 'Debe seleccionar una categoría';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Crea un objeto nota basado en el schema
 */
export const createNota = (data = {}) => {
  return {
    ...NotaSchema,
    ...data,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
};

/**
 * Categorías disponibles para notas
 */
export const CATEGORIAS_NOTAS = [
  { value: 'personal', label: 'Personal' },
  { value: 'reflexion', label: 'Reflexión' },
  { value: 'consejo', label: 'Consejo' },
  { value: 'experiencia', label: 'Experiencia' }
];
