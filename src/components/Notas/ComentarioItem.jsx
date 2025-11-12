import PropTypes from 'prop-types';
import { formatDate } from '../../utils/formatters';
import { mockUsuarios } from '../../services/mockData';

/**
 * Componente para mostrar un comentario individual
 * @param {Object} props
 * @param {Object} props.comentario - Datos del comentario
 */
const ComentarioItem = ({ comentario }) => {
  // Obtener el avatar del usuario que comentó
  const usuario = mockUsuarios.find(u => u._id === comentario.usuario);
  const avatar = usuario?.avatar || '😊';

  return (
    <div style={styles.comentario}>
      <div style={styles.header}>
        <div style={styles.autorInfo}>
          <span style={styles.avatar}>{avatar}</span>
          <span style={styles.autor}>{comentario.autor}</span>
        </div>
        <span style={styles.fecha}>{formatDate(comentario.createdAt)}</span>
      </div>
      <p style={styles.contenido}>{comentario.contenido}</p>
    </div>
  );
};

const styles = {
  comentario: {
    padding: 'var(--spacing-md)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    borderLeft: '3px solid var(--primary-color)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-sm)',
    gap: 'var(--spacing-md)',
  },
  autorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  avatar: {
    fontSize: '20px',
    lineHeight: 1,
  },
  autor: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  fecha: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-light)',
  },
  contenido: {
    margin: 0,
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
};

ComentarioItem.propTypes = {
  comentario: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    contenido: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ComentarioItem;
