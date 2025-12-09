import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateUser } from '../../utils/validators';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Formulario para crear/editar usuarios
 * @param {Object} props
 * @param {Object} props.usuario - Usuario a editar (null para crear nuevo)
 * @param {Function} props.onSubmit - Callback al enviar el formulario
 * @param {Function} props.onCancel - Callback al cancelar
 * @param {boolean} props.loading - Estado de carga
 */
const UsuarioForm = ({ usuario, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    rol: 'user',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        correo: usuario.correo || '',
        password: '',
        rol: usuario.rol || 'user',
      });
    }
  }, [usuario]);

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

    // Si es edición y no se cambió la password, no la enviamos
    const dataToValidate = { ...formData };
    if (usuario && !formData.password) {
      delete dataToValidate.password;
    }

    // Validar datos
    const validation = validateUser(dataToValidate, !!usuario);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(dataToValidate);
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'input-error' : ''}
            placeholder="Nombre del usuario"
            disabled={loading}
          />
          {errors.nombre && (
            <span className="error-message">{errors.nombre}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? 'input-error' : ''}
            placeholder="usuario@email.com"
            disabled={loading}
          />
          {errors.correo && (
            <span className="error-message">{errors.correo}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Contraseña {usuario && '(dejar en blanco para no cambiar)'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            placeholder={usuario ? 'Nueva contraseña (opcional)' : 'Contraseña'}
            disabled={loading}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className={errors.rol ? 'input-error' : ''}
            disabled={loading}
          >
            <option value="">Seleccionar rol...</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.rol && (
            <span className="error-message">{errors.rol}</span>
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
            {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
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

UsuarioForm.propTypes = {
  usuario: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UsuarioForm;
