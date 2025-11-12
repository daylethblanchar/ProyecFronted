import PropTypes from 'prop-types';
import { formatDate } from '../../utils/formatters';
import { CATEGORIAS_NOTAS } from '../../utils/constants';

/**
 * Card para mostrar una nota individual
 * @param {Object} props
 * @param {Object} props.nota - Datos de la nota
 * @param {Function} props.onEdit - Callback para editar nota
 * @param {Function} props.onDelete - Callback para eliminar nota
 */
const NotaCard = ({ nota, onEdit, onDelete }) => {
  const getCategoriaColor = (categoria) => {
    const colors = {
      trabajo: '#3b82f6',
      personal: '#8b5cf6',
      estudio: '#10b981',
      otros: '#6b7280',
    };
    return colors[categoria] || colors.otros;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={styles.header}>
          <h3 className="card-title">{nota.titulo}</h3>
          <span style={{ ...styles.categoriaBadge, backgroundColor: getCategoriaColor(nota.categoria) }}>
            {CATEGORIAS_NOTAS.find(c => c.value === nota.categoria)?.label || nota.categoria}
          </span>
        </div>
      </div>

      <div className="card-body">
        <p style={styles.contenido}>{nota.contenido}</p>
        <div style={styles.metadata}>
          <span style={styles.date}>
            Creada: {formatDate(nota.createdAt)}
          </span>
          {nota.updatedAt && nota.updatedAt !== nota.createdAt && (
            <span style={styles.date}>
              Actualizada: {formatDate(nota.updatedAt)}
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <button
          onClick={() => onEdit(nota)}
          className="btn btn-sm btn-primary"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(nota._id)}
          className="btn btn-sm btn-danger"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: 'var(--spacing-md)',
  },
  categoriaBadge: {
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--text-white)',
    flexShrink: 0,
  },
  contenido: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: 'var(--spacing-md)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  },
  date: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-light)',
  },
};

NotaCard.propTypes = {
  nota: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    contenido: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotaCard;
