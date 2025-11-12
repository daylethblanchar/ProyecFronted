import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockNotas, mockComentarios, mockUsuarios, mockUserDescriptions } from '../services/mockData';
import { formatDate } from '../utils/formatters';
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../utils/constants';
import { getRelatedArticles } from '../utils/articleRecommendations';
import ComentarioItem from '../components/Notas/ComentarioItem';
import MarkdownRenderer from '../components/common/MarkdownRenderer';
import TableOfContents from '../components/common/TableOfContents';

/**
 * Página individual de artículo del blog
 * Muestra el contenido completo del artículo con comentarios
 */
const ArticuloPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [comentarios, setComentarios] = useState(mockComentarios);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [mostrarComentarios, setMostrarComentarios] = useState(true);

  // Scroll suave al inicio al cargar el artículo o cambiar de artículo
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  // Buscar el artículo
  const articulo = mockNotas.find(nota => nota._id === id);

  // Obtener artículos relacionados usando el algoritmo
  const articulosRelacionados = useMemo(() => {
    if (!articulo) return [];
    return getRelatedArticles(articulo, mockNotas, 3);
  }, [articulo]);

  if (!articulo) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h1>Artículo no encontrado</h1>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Obtener autor del artículo
  const autor = mockUsuarios.find(u => u._id === articulo.usuario);

  // Obtener biografía del autor desde la tabla userdescriptions
  const autorDescription = mockUserDescriptions.find(desc => desc.usuario === articulo.usuario);
  const autorBio = autorDescription?.biografia || '';

  // Obtener comentarios del artículo
  const getComentariosByPost = (postId) => {
    return comentarios.filter(c => c.notaId === postId);
  };

  // Agregar nuevo comentario
  const handleAgregarComentario = () => {
    const contenido = nuevoComentario.trim();
    if (!contenido || !isAuthenticated()) return;

    const nuevoComent = {
      _id: String(comentarios.length + 1),
      notaId: articulo._id,
      usuario: user._id,
      autor: user.nombre,
      contenido,
      createdAt: new Date().toISOString(),
    };

    setComentarios(prev => [...prev, nuevoComent]);
    setNuevoComentario('');
  };



  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Contenido principal */}
        <div style={styles.mainContent}>
          {/* Botón volver */}
          <button onClick={() => navigate(-1)} className="btn btn-outline" style={styles.backButton}>
            ← Volver
          </button>

          {/* Artículo */}
          <article className="card" style={styles.articleCard}>
        {/* Header */}
        <div style={styles.articleHeader}>
          <div style={styles.headerTop}>
            <span
              style={{
                ...styles.categoriaBadge,
                backgroundColor: getCategoriaColor(articulo.categoria)
              }}
            >
              {CATEGORIAS_NOTAS.find(c => c.value === articulo.categoria)?.label || articulo.categoria}
            </span>
            <span style={styles.fecha}>{formatDate(articulo.createdAt)}</span>
          </div>

          <h1 style={styles.titulo}>{articulo.titulo}</h1>

          {/* Info del autor */}
          <div style={styles.autorSection}>
            <div style={styles.autorInfo}>
              <span style={styles.avatarLarge}>{autor?.avatar || '😊'}</span>
              <div>
                <p style={styles.autorNombre}>{articulo.autor}</p>
                {autorBio && <p style={styles.autorBio}>{autorBio}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del artículo */}
        <div style={styles.articleContent}>
          <MarkdownRenderer content={articulo.contenido} />
        </div>
      </article>

      {/* Sección de comentarios */}
      <div className="card" style={styles.comentariosCard}>
        <div style={styles.comentariosHeader}>
          <h2 style={styles.comentariosTitle}>
            Comentarios ({getComentariosByPost(articulo._id).length})
          </h2>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setMostrarComentarios(!mostrarComentarios)}
          >
            {mostrarComentarios ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {mostrarComentarios && (
          <>
            {/* Lista de comentarios */}
            <div style={styles.comentariosList}>
              {getComentariosByPost(articulo._id).length > 0 ? (
                getComentariosByPost(articulo._id).map((comentario) => (
                  <ComentarioItem key={comentario._id} comentario={comentario} />
                ))
              ) : (
                <p style={styles.noComentarios}>
                  No hay comentarios aún. {isAuthenticated() ? '¡Sé el primero en comentar!' : ''}
                </p>
              )}
            </div>

            {/* Formulario para agregar comentario */}
            {isAuthenticated() ? (
              <div style={styles.nuevoComentarioForm}>
                <h3 style={styles.formTitle}>Deja tu comentario</h3>
                <textarea
                  style={styles.comentarioInput}
                  placeholder="Comparte tu opinión o experiencia..."
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  rows="4"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleAgregarComentario}
                  disabled={!nuevoComentario.trim()}
                >
                  Publicar Comentario
                </button>
              </div>
            ) : (
              <div style={styles.loginPrompt}>
                <p>Inicia sesión para dejar un comentario</p>
                <Link to="/login" className="btn btn-primary">
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </>
        )}
      </div>

          {/* Artículos Relacionados */}
          {articulosRelacionados.length > 0 && (
            <div className="card" style={styles.relatedArticlesCard}>
              <h2 style={styles.relatedTitle}>Artículos Relacionados</h2>
              <div style={styles.relatedGrid}>
            {articulosRelacionados.map((related) => (
              <Link
                key={related._id}
                to={`/articulo/${related._id}`}
                style={styles.relatedCard}
                className="card"
              >
                <div style={styles.relatedHeader}>
                  <span
                    style={{
                      ...styles.relatedBadge,
                      backgroundColor: getCategoriaColor(related.categoria)
                    }}
                  >
                    {CATEGORIAS_NOTAS.find(c => c.value === related.categoria)?.label || related.categoria}
                  </span>
                </div>
                <h3 style={styles.relatedCardTitle}>{related.titulo}</h3>
                <p style={styles.relatedExcerpt}>{related.resumen || related.contenido.substring(0, 120)}...</p>
                <div style={styles.relatedMeta}>
                  <span style={styles.relatedAuthor}>Por {related.autor}</span>
                  <span style={styles.relatedReadMore}>Leer más →</span>
                </div>
              </Link>
            ))}
          </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Contenidos - Sidebar derecho */}
      <TableOfContents />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'var(--spacing-xl)',
  },
  contentWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  mainContent: {
    width: '100%',
  },
  backButton: {
    marginBottom: 'var(--spacing-xl)',
  },
  notFound: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
  },
  articleCard: {
    marginBottom: 'var(--spacing-2xl)',
  },
  articleHeader: {
    padding: 'var(--spacing-2xl)',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-lg)',
  },
  categoriaBadge: {
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: '#ffffff',
  },
  fecha: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-light)',
  },
  titulo: {
    fontSize: 'var(--text-4xl)',
    marginBottom: 'var(--spacing-xl)',
    lineHeight: 1.2,
    color: 'var(--text-primary)',
  },
  autorSection: {
    marginTop: 'var(--spacing-xl)',
  },
  autorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  avatarLarge: {
    fontSize: '48px',
    lineHeight: 1,
  },
  autorNombre: {
    margin: 0,
    fontSize: 'var(--text-lg)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  autorBio: {
    margin: 0,
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
  },
  articleContent: {
    padding: 'var(--spacing-2xl)',
  },
  comentariosCard: {
    padding: 'var(--spacing-xl)',
  },
  comentariosHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)',
  },
  comentariosTitle: {
    margin: 0,
    fontSize: 'var(--text-2xl)',
  },
  comentariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-xl)',
  },
  noComentarios: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: 'var(--spacing-xl)',
    fontStyle: 'italic',
  },
  nuevoComentarioForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
  },
  formTitle: {
    margin: 0,
    fontSize: 'var(--text-lg)',
    color: 'var(--text-primary)',
  },
  comentarioInput: {
    width: '100%',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    fontSize: 'var(--text-md)',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '100px',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: 'var(--spacing-xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    alignItems: 'center',
  },
  relatedArticlesCard: {
    padding: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  },
  relatedTitle: {
    margin: 0,
    marginBottom: 'var(--spacing-xl)',
    fontSize: 'var(--text-2xl)',
    color: 'var(--text-primary)',
    borderBottom: '2px solid var(--border-color)',
    paddingBottom: 'var(--spacing-md)',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--spacing-lg)',
  },
  relatedCard: {
    padding: 'var(--spacing-lg)',
    textDecoration: 'none',
    display: 'block',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
  },
  relatedHeader: {
    marginBottom: 'var(--spacing-md)',
  },
  relatedBadge: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: '#ffffff',
    display: 'inline-block',
  },
  relatedCardTitle: {
    margin: 0,
    marginBottom: 'var(--spacing-sm)',
    fontSize: 'var(--text-lg)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  relatedExcerpt: {
    margin: 0,
    marginBottom: 'var(--spacing-md)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  relatedMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 'var(--text-xs)',
  },
  relatedAuthor: {
    color: 'var(--text-light)',
  },
  relatedReadMore: {
    color: 'var(--primary-color)',
    fontWeight: 600,
  },
};

export default ArticuloPage;
