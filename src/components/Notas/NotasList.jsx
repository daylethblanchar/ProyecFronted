import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNotas } from '../../hooks/useNotas';
import NotaCard from './NotaCard';
import NotaForm from './NotaForm';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { CATEGORIAS_NOTAS } from '../../utils/constants';

/**
 * Lista de notas con filtros por categoría y funcionalidad CRUD
 */
const NotasList = () => {
  const { user } = useAuth();
  const {
    notas,
    loading,
    error,
    fetchNotas,
    fetchNotasByCategoria,
    createNota,
    updateNota,
    deleteNota,
    clearError,
  } = useNotas();

  const [showForm, setShowForm] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState('todas');

  useEffect(() => {
    if (selectedCategoria === 'todas') {
      fetchNotas();
    } else {
      fetchNotasByCategoria(selectedCategoria);
    }
  }, [selectedCategoria, fetchNotas, fetchNotasByCategoria]);

  const handleCreate = () => {
    setSelectedNota(null);
    setShowForm(true);
  };

  const handleEdit = (nota) => {
    setSelectedNota(nota);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      try {
        await deleteNota(id);
      } catch (err) {
        console.error('Error al eliminar nota:', err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedNota) {
        await updateNota(selectedNota._id, formData);
      } else {
        await createNota(formData);
      }
      setShowForm(false);
      setSelectedNota(null);
      // Recargar notas según filtro actual
      if (selectedCategoria === 'todas') {
        fetchNotas();
      } else {
        fetchNotasByCategoria(selectedCategoria);
      }
    } catch (err) {
      console.error('Error al guardar nota:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedNota(null);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
  };

  // Filtrar notas del usuario actual
  const notasDelUsuario = notas.filter(nota => nota.usuario === user?._id);

  if (loading && notasDelUsuario.length === 0) {
    return <Loading fullScreen message="Cargando notas..." />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mis Notas</h2>
        <div style={styles.headerActions}>
          {!showForm && (
            <>
              <select
                value={selectedCategoria}
                onChange={handleCategoriaChange}
                style={styles.categoriaSelect}
              >
                <option value="todas">Todas las categorías</option>
                {CATEGORIAS_NOTAS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <button onClick={handleCreate} className="btn btn-primary">
                Nueva Nota
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onClose={clearError} type="error" />
      )}

      {showForm && (
        <div style={styles.formSection}>
          <NotaForm
            nota={selectedNota}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      )}

      {!showForm && (
        <>
          {notasDelUsuario.length === 0 ? (
            <div style={styles.emptyState}>
              <p>
                {selectedCategoria === 'todas'
                  ? 'No tienes notas creadas aún'
                  : `No tienes notas en la categoría "${CATEGORIAS_NOTAS.find(c => c.value === selectedCategoria)?.label}"`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {notasDelUsuario.map((nota) => (
                <NotaCard
                  key={nota._id}
                  nota={nota}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
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
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)',
  },
  title: {
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    alignItems: 'center',
  },
  categoriaSelect: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: 'var(--text-base)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  formSection: {
    marginBottom: 'var(--spacing-xl)',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    color: 'var(--text-secondary)',
  },
};

export default NotasList;
