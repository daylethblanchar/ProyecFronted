import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateNota } from '../../utils/validators';
import { CATEGORIAS_NOTAS } from '../../utils/constants';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Formulario para crear/editar notas
 * @param {Object} props
 * @param {Object} props.nota - Nota a editar (null para crear nueva)
 * @param {Function} props.onSubmit - Callback al enviar el formulario
 * @param {Function} props.onCancel - Callback al cancelar
 * @param {boolean} props.loading - Estado de carga
 */
const NotaForm = ({ nota, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    categoria: 'otros',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (nota) {
      setFormData({
        titulo: nota.titulo || '',
        contenido: nota.contenido || '',
        categoria: nota.categoria || 'otros',
      });
    }
  }, [nota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar datos
    const validation = validateNota(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          {nota ? 'Editar Nota' : 'Nueva Nota'}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className={errors.titulo ? 'input-error' : ''}
            placeholder="Título de la nota"
            disabled={loading}
          />
          {errors.titulo && (
            <span className="error-message">{errors.titulo}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            className={errors.contenido ? 'input-error' : ''}
            placeholder="Escribe el contenido de tu nota..."
            disabled={loading}
            rows="6"
          />
          {errors.contenido && (
            <span className="error-message">{errors.contenido}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={errors.categoria ? 'input-error' : ''}
            disabled={loading}
          >
            {CATEGORIAS_NOTAS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.categoria && (
            <span className="error-message">{errors.categoria}</span>
          )}
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : nota ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: 'var(--bg-primary)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
  },
  header: {
    marginBottom: 'var(--spacing-lg)',
    paddingBottom: 'var(--spacing-md)',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    margin: 0,
    fontSize: 'var(--text-2xl)',
  },
  actions: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacing-xl)',
  },
};

NotaForm.propTypes = {
  nota: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default NotaForm;
