import PropTypes from 'prop-types';

/**
 * Componente para mostrar mensajes de error
 * @param {Object} props
 * @param {string} props.message - Mensaje de error a mostrar
 * @param {Function} props.onClose - Función para cerrar el mensaje
 * @param {string} props.type - Tipo de alerta (error, warning, info, success)
 */
const ErrorMessage = ({ message, onClose, type = 'error' }) => {
  if (!message) return null;

  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} style={styles.container}
    >,
      <div style={styles.content}>
        <span style={styles.icon}>
          {type === 'error' && '⚠️'}
          {type === 'warning' && '⚡'}
          {type === 'info' && 'ℹ️'}
          {type === 'success' && '✓'}
        </span>
        <p style={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} style={styles.closeButton} aria-label="Cerrar">
          ✕
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    flex: 1,
  },
  icon: {
    fontSize: 'var(--text-xl)',
    flexShrink: 0,
  },
  message: {
    margin: 0,
    flex: 1,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: 'var(--text-xl)',
    cursor: 'pointer',
    padding: 'var(--spacing-xs)',
    opacity: 0.7,
    transition: 'opacity var(--transition-fast)',
    color: 'inherit',
  },
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

export default ErrorMessage;
