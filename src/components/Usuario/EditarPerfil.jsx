import { useState } from 'react';
import PropTypes from 'prop-types';
import { AVATARES_EMOJIS } from '../../utils/constants';

/**
 * Componente para editar información del perfil del usuario
 * Permite editar nombre y biografía
 */
const EditarPerfil = ({ user, userBio, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    avatar: user.avatar || AVATARES_EMOJIS[0],
    biografia: userBio || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo al editarlo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarSelect = (emoji) => {
    setFormData(prev => ({
      ...prev,
      avatar: emoji
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (formData.biografia && formData.biografia.length > 500) {
      newErrors.biografia = 'La biografía no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="card" style={styles.container}>
      <div className="card-header">
        <h2 className="card-title">Editar Perfil</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Selector de Avatar */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Avatar</label>
            <div style={styles.avatarGrid}>
              {AVATARES_EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAvatarSelect(emoji)}
                  style={{
                    ...styles.avatarButton,
                    ...(formData.avatar === emoji ? styles.avatarButtonActive : {})
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre */}
          <div style={styles.formGroup}>
            <label htmlFor="nombre" style={styles.label}>
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.nombre ? styles.inputError : {})
              }}
              placeholder="Ingresa tu nombre completo"
            />
            {errors.nombre && (
              <span style={styles.errorText}>{errors.nombre}</span>
            )}
          </div>

          {/* Biografía */}
          <div style={styles.formGroup}>
            <label htmlFor="biografia" style={styles.label}>
              Biografía
            </label>
            <textarea
              id="biografia"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              rows="4"
              style={{
                ...styles.textarea,
                ...(errors.biografia ? styles.inputError : {})
              }}
              placeholder="Cuéntanos sobre ti... (opcional)"
            />
            <div style={styles.charCount}>
              {formData.biografia.length}/500 caracteres
            </div>
            {errors.biografia && (
              <span style={styles.errorText}>{errors.biografia}</span>
            )}
          </div>

          {/* Botones de acción */}
          <div style={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditarPerfil.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  userBio: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const styles = {
  container: {
    maxWidth: 'var(--max-width-2xl)',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xl)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
  },
  label: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  input: {
    padding: 'var(--spacing-md)',
    fontSize: 'var(--text-base)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: 'var(--spacing-md)',
    fontSize: 'var(--text-base)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '100px',
  },
  inputError: {
    borderColor: 'var(--error-color)',
  },
  errorText: {
    fontSize: 'var(--text-xs)',
    color: 'var(--error-color)',
    marginTop: 'var(--spacing-xs)',
  },
  charCount: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
    textAlign: 'right',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
    gap: 'var(--spacing-sm)',
  },
  avatarButton: {
    fontSize: '32px',
    padding: 'var(--spacing-sm)',
    border: '2px solid transparent',
    borderRadius: 'var(--radius-md)',
    background: 'var(--bg-secondary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '1',
  },
  avatarButtonActive: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--primary-color)',
    transform: 'scale(1.1)',
  },
  actions: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacing-lg)',
  },
};

export default EditarPerfil;
