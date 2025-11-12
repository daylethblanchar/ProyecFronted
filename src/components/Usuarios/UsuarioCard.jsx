import PropTypes from 'prop-types';
import { formatDate } from '../../utils/formatters';

/**
 * Card para mostrar información de un usuario individual
 * @param {Object} props
 * @param {Object} props.usuario - Datos del usuario
 * @param {Function} props.onEdit - Callback para editar usuario
 * @param {Function} props.onDelete - Callback para eliminar usuario
 */
const UsuarioCard = ({ usuario, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div style={styles.header}>
          <h3 className="card-title">{usuario.nombre}</h3>
          <span style={styles.rolBadge(usuario.rol)}>
            {usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div style={styles.infoRow}>
          <span style={styles.label}>Correo:</span>
          <span style={styles.value}>{usuario.correo}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Registrado:</span>
          <span style={styles.value}>{formatDate(usuario.createdAt)}</span>
        </div>

        {usuario.updatedAt && (
          <div style={styles.infoRow}>
            <span style={styles.label}>Última actualización:</span>
            <span style={styles.value}>{formatDate(usuario.updatedAt)}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          onClick={() => onEdit(usuario)}
          className="btn btn-sm btn-primary"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(usuario._id)}
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
    alignItems: 'center',
    width: '100%',
  },
  rolBadge: (rol) => ({
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    backgroundColor: rol === 'admin' ? 'var(--secondary-color)' : 'var(--primary-color)',
    color: 'var(--text-white)',
  }),
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-sm)',
  },
  label: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
  },
  value: {
    color: 'var(--text-primary)',
    fontSize: 'var(--text-sm)',
  },
};

UsuarioCard.propTypes = {
  usuario: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsuarioCard;
