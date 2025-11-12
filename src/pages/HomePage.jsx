import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { mockNotas, mockComentarios } from '../services/mockData'
import { formatDate } from '../utils/formatters'
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../utils/constants'
import ComentarioItem from '../components/Notas/ComentarioItem'
import HeroCarousel from '../components/common/HeroCarousel'

/**
 * Botón personalizado para el hero con estados hover
 */
const HeroButton = ({ to, variant = 'primary', children }) => {
  const [isHovered, setIsHovered] = useState(false)

  const baseStyle = {
    padding: 'var(--spacing-md) var(--spacing-xl)',
    fontSize: 'var(--text-lg)',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all var(--transition-fast)',
    cursor: 'pointer',
  }

  const primaryStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? 'var(--primary-dark)' : 'var(--primary-color)',
    color: 'var(--text-white)',
    border: '2px solid var(--primary-color)',
    boxShadow: isHovered
      ? '0 6px 20px rgba(0, 0, 0, 0.4), 0 3px 10px rgba(0, 175, 185, 0.5)'
      : '0 4px 14px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 175, 185, 0.4)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  const outlineStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.15)',
    color: isHovered ? 'var(--primary-color)' : 'var(--text-white)',
    border: '2px solid rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    boxShadow: isHovered
      ? '0 6px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 14px rgba(0, 0, 0, 0.2)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  const style = variant === 'primary' ? primaryStyle : outlineStyle

  return (
    <Link
      to={to}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  )
}

/**
 * Página principal - Blog público
 * Muestra todos los posts del blog sin necesidad de autenticación
 */
const HomePage = () => {
  const { isAuthenticated, user } = useAuth()

  const [comentarios, setComentarios] = useState(mockComentarios)

  const [nuevoComentario, setNuevoComentario] = useState({})

  const [mostrarComentarios, setMostrarComentarios] = useState({})

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  // Obtener comentarios de un post específico
  const getComentariosByPost = postId => {
    return comentarios.filter(c => c.notaId === postId)
  }

  // Toggle mostrar/ocultar comentarios
  const toggleComentarios = postId => {
    setMostrarComentarios(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  // Manejar cambio en el input de comentario
  const handleComentarioChange = (postId, value) => {
    setNuevoComentario(prev => ({
      ...prev,
      [postId]: value,
    }))
  }

  // Agregar nuevo comentario
  const handleAgregarComentario = postId => {
    const contenido = nuevoComentario[postId]?.trim()
    if (!contenido || !isAuthenticated()) return

    const nuevoComent = {
      _id: String(comentarios.length + 1),
      notaId: postId,
      usuario: user._id,
      autor: user.nombre,
      contenido,
      createdAt: new Date().toISOString(),
    }

    setComentarios(prev => [...prev, nuevoComent])
    setNuevoComentario(prev => ({
      ...prev,
      [postId]: '',
    }))
  }

  return (
    <div style={styles.container}>
      {/* Header del Blog superpuesto sobre el carousel */}
      <header style={styles.hero}>
        {/* Hero carrousel de fondo */}
        <HeroCarousel />

        {/* Contenido superpuesto */}
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Blog de Salud Mental y Bienestar</h1>
          <p style={styles.subtitle}>
            Un espacio seguro para compartir experiencias, consejos y recursos sobre salud mental
          </p>

          {!isAuthenticated() && (
            <div style={styles.ctaButtons}>
              <HeroButton to="/register" variant="primary">
                Únete a la Comunidad
              </HeroButton>
              <HeroButton to="/login" variant="outline">
                Iniciar Sesión
              </HeroButton>
            </div>
          )}
        </div>
      </header>

      {/* Lista de Posts del Blog */}
      <div style={styles.postsSection}>
        <div style={styles.postsHeader}>
          <h2 style={styles.sectionTitle}>Últimos Artículos</h2>
          {isAuthenticated() && (user?.rol === 'admin' || user?.rol === 'user') && (
            <Link to="/notas" className="btn btn-sm btn-primary">
              {user?.rol === 'admin' ? 'Gestionar Posts' : 'Mis Posts'}
            </Link>
          )}
        </div>

        <div style={styles.postsGrid}>
          {mockNotas.map(post => (
            <article key={post._id} className="card" style={styles.postCard}>
              <div className="card-header">
                <div style={styles.postHeader}>
                  <h3 style={styles.postTitle}>{post.titulo}</h3>
                  <span
                    style={{
                      ...styles.categoriaBadge,
                      backgroundColor: getCategoriaColor(post.categoria),
                    }}
                  >
                    {CATEGORIAS_NOTAS.find(c => c.value === post.categoria)?.label ||
                      post.categoria}
                  </span>
                </div>
              </div>

              <div className="card-body">
                {/* Vista previa con fade-out */}
                <div style={styles.excerptContainer}>
                  <p style={styles.postExcerpt}>{post.resumen || post.contenido}</p>
                  <div style={styles.fadeOut} />
                </div>

                <Link
                  to={`/articulo/${post._id}`}
                  className="btn btn-primary"
                  style={styles.readMoreButton}
                >
                  Leer más →
                </Link>

                <div style={styles.postMeta}>
                  <div style={styles.authorInfo}>
                    <span style={styles.authorName}>Por {post.autor}</span>
                    <span style={styles.postDate}>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => toggleComentarios(post._id)}
                >
                  {mostrarComentarios[post._id] ? 'Ocultar' : 'Ver'} Comentarios
                </button>
                <span style={styles.commentCount}>
                  {getComentariosByPost(post._id).length} comentario(s)
                </span>
              </div>

              {/* Sección de Comentarios */}
              {mostrarComentarios[post._id] && (
                <div style={styles.comentariosSection}>
                  <h4 style={styles.comentariosTitle}>Comentarios</h4>

                  {/* Lista de comentarios existentes */}
                  <div style={styles.comentariosList}>
                    {getComentariosByPost(post._id).length > 0 ? (
                      getComentariosByPost(post._id).map(comentario => (
                        <ComentarioItem key={comentario._id} comentario={comentario} />
                      ))
                    ) : (
                      <p style={styles.noComentarios}>
                        No hay comentarios aún.{' '}
                        {isAuthenticated()
                          ? '¡Sé el primero en comentar!'
                          : 'Inicia sesión para ser el primero en comentar.'}
                      </p>
                    )}
                  </div>

                  {/* Formulario para agregar comentario (solo usuarios autenticados) */}
                  {isAuthenticated() ? (
                    <div style={styles.nuevoComentarioForm}>
                      <textarea
                        style={styles.comentarioInput}
                        placeholder="Escribe tu comentario..."
                        value={nuevoComentario[post._id] || ''}
                        onChange={e => handleComentarioChange(post._id, e.target.value)}
                        rows="3"
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAgregarComentario(post._id)}
                        disabled={!nuevoComentario[post._id]?.trim()}
                      >
                        Publicar Comentario
                      </button>
                    </div>
                  ) : (
                    <div style={styles.loginPrompt}>
                      <Link to="/login" className="btn btn-sm btn-primary">
                        Inicia sesión para comentar
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Sección informativa */}
      <div style={styles.infoSection}>
        <h2 style={styles.infoSectionTitle}>Sobre este Blog</h2>
        <div className="grid grid-cols-3">
          <div className="card">
            <div className="card-body">
              <h3 style={styles.featureTitle}>Recursos de Apoyo</h3>
              <p style={styles.featureText}>
                Encuentra artículos, guías y recursos sobre salud mental, ansiedad, depresión y
                bienestar emocional.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 style={styles.featureTitle}>Comunidad de Apoyo</h3>
              <p style={styles.featureText}>
                Únete a una comunidad que entiende tus luchas. Comparte experiencias y encuentra
                apoyo.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 style={styles.featureTitle}>Contenido Profesional</h3>
              <p style={styles.featureText}>
                Artículos escritos por profesionales y personas con experiencias reales sobre salud
                mental.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      {!isAuthenticated() && (
        <div style={styles.finalCta}>
          <h2 style={styles.ctaTitle}>¿Quieres compartir tu historia?</h2>
          <p style={styles.ctaText}>
            Únete a nuestra comunidad y ayuda a otros compartiendo tus experiencias y aprendizajes
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Crear Cuenta Gratis
          </Link>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 'var(--max-width-6xl)',
    margin: '0 auto',
    padding: 'var(--spacing-md) 0 var(--spacing-lg)',
  },
  hero: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: 'var(--spacing-3xl)',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 5,
    width: '100%',
    maxWidth: '900px',
    padding: 'var(--spacing-xl)',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: 'var(--spacing-lg)',
    color: 'var(--text-white)',
    fontWeight: 700,
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    color: 'var(--text-white)',
    maxWidth: '700px',
    margin: '0 auto var(--spacing-2xl) auto',
    lineHeight: 1.7,
    fontWeight: 400,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4)',
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'var(--spacing-2xl)',
  },
  postsSection: {
    marginBottom: 'var(--spacing-3xl)',
  },
  postsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)',
  },
  sectionTitle: {
    margin: 0,
    fontSize: 'var(--text-3xl)',
  },
  postsGrid: {
    display: 'grid',
    gap: 'var(--spacing-xl)',
  },
  postCard: {
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 'var(--spacing-md)',
    width: '100%',
  },
  postTitle: {
    fontSize: 'var(--text-2xl)',
    marginBottom: 0,
    flex: 1,
  },
  categoriaBadge: {
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: '#ffffff',
    flexShrink: 0,
  },
  excerptContainer: {
    position: 'relative',
    maxHeight: '100px',
    overflow: 'hidden',
    marginBottom: 'var(--spacing-md)',
  },
  postExcerpt: {
    color: 'var(--text-secondary)',
    lineHeight: 1.8,
    margin: 0,
  },
  fadeOut: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
    background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
    pointerEvents: 'none',
  },
  readMoreButton: {
    marginBottom: 'var(--spacing-lg)',
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  },
  authorName: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  postDate: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-light)',
  },
  commentCount: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
  },
  comentariosSection: {
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
  },
  comentariosTitle: {
    fontSize: 'var(--text-lg)',
    marginBottom: 'var(--spacing-md)',
    color: 'var(--text-primary)',
  },
  comentariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-lg)',
  },
  noComentarios: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-sm)',
    padding: 'var(--spacing-lg)',
    fontStyle: 'italic',
  },
  nuevoComentarioForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  },
  comentarioInput: {
    width: '100%',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    fontSize: 'var(--text-sm)',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '80px',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: 'var(--spacing-md)',
  },
  infoSection: {
    marginBottom: 'var(--spacing-3xl)',
  },
  infoSectionTitle: {
    margin: 0,
    marginBottom: 'var(--spacing-xl)',
    fontSize: 'var(--text-3xl)',
    color: 'var(--text-primary)',
  },
  featureTitle: {
    color: 'var(--primary-color)',
    marginBottom: 'var(--spacing-md)',
  },
  featureText: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  finalCta: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    marginBottom: 'var(--spacing-md)',
  },
  ctaTitle: {
    margin: 0,
    marginBottom: 'var(--spacing-md)',
    color: 'var(--text-primary)',
  },
  ctaText: {
    fontSize: 'var(--text-lg)',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto var(--spacing-xl) auto',
    lineHeight: 1.6,
  },
}

export default HomePage
