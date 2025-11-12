import { useState, useEffect } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import UsuarioCard from './UsuarioCard';
import UsuarioForm from './UsuarioForm';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Lista de usuarios con paginación y funcionalidad CRUD
 */
const UsuariosList = () => {
  const {
    usuarios,
    loading,
    error,
    pagination,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    clearError,
  } = useUsuarios();

  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsuarios(currentPage);
  }, [currentPage, fetchUsuarios]);

  const handleCreate = () => {
    setSelectedUsuario(null);
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUsuario(id);
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUsuario) {
        await updateUsuario(selectedUsuario._id, formData);
      } else {
        await createUsuario(formData);
      }
      setShowForm(false);
      setSelectedUsuario(null);
      fetchUsuarios(currentPage);
    } catch (err) {
      console.error('Error al guardar usuario:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedUsuario(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && usuarios.length === 0) {
    return <Loading fullScreen message="Cargando usuarios..." />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Gestión de Usuarios</h2>
        {!showForm && (
          <button onClick={handleCreate} className="btn btn-primary">
            Nuevo Usuario
          </button>
        )}
      </div>

      {error && (
        <ErrorMessage message={error} onClose={clearError} type="error" />
      )}

      {showForm && (
        <div style={styles.formSection}>
          <UsuarioForm
            usuario={selectedUsuario}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      )}

      {!showForm && (
        <>
          {usuarios.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No hay usuarios registrados</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3">
                {usuarios.map((usuario) => (
                  <UsuarioCard
                    key={usuario._id}
                    usuario={usuario}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div style={styles.pagination}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline"
                  >
                    Anterior
                  </button>
                  <span style={styles.pageInfo}>
                    Página {pagination.currentPage} de {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="btn btn-sm btn-outline"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 'var(--spacing-xl)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)',
  },
  title: {
    margin: 0,
  },
  formSection: {
    marginBottom: 'var(--spacing-xl)',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    color: 'var(--text-secondary)',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    marginTop: 'var(--spacing-xl)',
  },
  pageInfo: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-sm)',
  },
};

export default UsuariosList;
