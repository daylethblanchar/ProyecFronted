import PropTypes from 'prop-types';

/**
 * Componente de carga/spinner
 * @param {Object} props
 * @param {string} props.size - Tamaño del spinner (sm, md, lg)
 * @param {string} props.message - Mensaje opcional a mostrar
 * @param {boolean} props.fullScreen - Si debe ocupar toda la pantalla
 */
const Loading = ({ size = 'md', message = '', fullScreen = false }) => {
  const spinnerClass = `spinner ${size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : ''}`;

  if (fullScreen) {
    return (
      <div style={styles.fullScreenContainer}>
        <div style={styles.content}>
          <div className={spinnerClass}></div>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className={spinnerClass}></div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  fullScreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 'var(--z-modal)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    gap: 'var(--spacing-md)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  message: {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-base)',
    textAlign: 'center',
  },
};

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;
