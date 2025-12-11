import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import useArticles from '../hooks/useArticles'
import { formatDate } from '../utils/formatters'
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../utils/constants'
import EditarPerfil from '../components/Usuario/EditarPerfil'

/**
 * Página de perfil de usuario
 * Muestra información del usuario, sus posts y comentarios
 */
const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const { articles, fetchAll, fetchAllByUserId } = useArticles()
  const [activeTab, setActiveTab] = useState('posts') // 'posts', 'comentarios', 'editar'
  const [isEditing, setIsEditing] = useState(false)
  const [userBio, setUserBio] = useState('')

  // Cargar biografía del usuario y notas
  useEffect(() => {
    // Intentar cargar desde localStorage primero
    const savedBio = localStorage.getItem(`user_bio_${user._id}`)
    if (savedBio) {
      setUserBio(savedBio)
    } else {
      // Si no hay datos, usar valores por defecto
      setUserBio('Nuevo miembro de la comunidad.')
    }

    if (!user) {
      return
    }

    // Cargar notas del usuario
    fetchAllByUserId(user.id)
  }, [user, fetchAllByUserId])

  // Obtener posts del usuario (filtrar por usuario actual)
  const userPosts = articles.filter(nota => nota.usuario === user._id)

  // Comentarios simplificados (por ahora vacío hasta implementar comentarios reales)
  const userComentarios = []

  // Manejar guardado de cambios en el perfil
  const handleSaveProfile = formData => {
    // Actualizar usuario en el contexto de autenticación
    const updatedUser = {
      ...user,
      nombre: formData.nombre,
      avatar: formData.avatar,
    }

    updateUser(updatedUser)

    // Guardar biografía en localStorage (simulando actualización de userdescriptions)
    localStorage.setItem(`user_bio_${user._id}`, formData.biografia)
    setUserBio(formData.biografia)

    // Aquí en el futuro se hará la llamada al API para actualizar
    // tanto la tabla users como userdescriptions
    console.log('Perfil actualizado:', {
      user: updatedUser,
      biografia: formData.biografia,
    })

    setIsEditing(false)
    setActiveTab('posts')
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setActiveTab('posts')
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <p>Debes iniciar sesión para ver tu perfil</p>
      </div>
    )
  }
  return (
    <div style={styles.container}>
      {/* Mostrar formulario de edición o perfil normal */}
      {isEditing ? (
        <EditarPerfil
          user={user}
          userBio={userBio}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          {/* Header del perfil */}
          <div className="card" style={styles.profileCard}>
            <div style={styles.profileHeader}>
              <div style={styles.avatarContainer}>
                <span style={styles.avatarLarge}>{user.avatar}</span>
              </div>
              <div style={styles.profileInfo}>
                <h1 style={styles.userName}>{user.nombre}</h1>
                <p style={styles.userEmail}>{user.correo}</p>
                <span style={styles.roleBadge}>
                  {user.rol === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(true)}
                style={styles.editButton}
              >
                Editar Perfil
              </button>
            </div>

            {userBio && (
              <div style={styles.bioSection}>
                <h3 style={styles.bioTitle}>Biografía</h3>
                <p style={styles.bioText}>{userBio}</p>
              </div>
            )}

            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>{userPosts.length}</span>
                <span style={styles.statLabel}>Posts publicados</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>{userComentarios.length}</span>
                <span style={styles.statLabel}>Comentarios</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>
                  {formatDate(user.createdAt, { year: 'numeric', month: 'short' })}
                </span>
                <span style={styles.statLabel}>Miembro desde</span>
              </div>
            </div>
          </div>

          {/* Tabs para posts y comentarios */}
          <div style={styles.tabsContainer}>
            <button
              className={activeTab === 'posts' ? 'btn btn-primary' : 'btn btn-outline'}
              onClick={() => setActiveTab('posts')}
              style={styles.tabButton}
            >
              Mis Posts ({userPosts.length})
            </button>
            <button
              className={activeTab === 'comentarios' ? 'btn btn-primary' : 'btn btn-outline'}
              onClick={() => setActiveTab('comentarios')}
              style={styles.tabButton}
            >
              Mis Comentarios ({userComentarios.length})
            </button>
          </div>

          {/* Contenido según tab activo */}
          <div style={styles.contentContainer}>
            {activeTab === 'posts' && (
              <div style={styles.postsGrid}>
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <article key={post._id} className="card">
                      <div className="card-header">
                        <div style={styles.postHeader}>
                          <h3 className="card-title">{post.titulo}</h3>
                          <span
                            style={{
                              ...styles.categoriaBadge,
                              backgroundColor: getCategoriaColor(post.categoria),
                            }}
                          >
                            {CATEGORIAS_articles.find(c => c.value === post.categoria)?.label ||
                              post.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div style={styles.excerptContainer}>
                          <p style={styles.postContent}>{post.resumen || post.contenido}</p>
                          <div style={styles.fadeOut}></div>
                        </div>
                        <div style={styles.postMetaActions}>
                          <p style={styles.postDate}>Publicado: {formatDate(post.createdAt)}</p>
                          <Link to={`/articulo/${post._id}`} className="btn btn-sm btn-primary">
                            Ver artículo →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div style={styles.emptyState}>
                    <p>No has publicado ningún post aún</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'comentarios' && (
              <div style={styles.comentariosGrid}>
                {userComentarios.length > 0 ? (
                  userComentarios.map(comentario => {
                    const post = articles.find(n => n._id === comentario.notaId)
                    return (
                      <div key={comentario._id} className="card">
                        <div className="card-body">
                          <p style={styles.comentarioText}>"{comentario.contenido}"</p>
                          <div style={styles.comentarioMetaFull}>
                            <div style={styles.comentarioMeta}>
                              <span style={styles.comentarioPost}>
                                En: {post?.titulo || 'Post eliminado'}
                              </span>
                              <span style={styles.comentarioDate}>
                                {formatDate(comentario.createdAt)}
                              </span>
                            </div>
                            {post && (
                              <Link
                                to={`/articulo/${comentario.notaId}`}
                                className="btn btn-sm btn-outline"
                              >
                                Ver artículo →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div style={styles.emptyState}>
                    <p>No has comentado en ningún post aún</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 'var(--max-width-5xl)',
    margin: '0 auto',
    padding: 'var(--spacing-xl)',
  },
  profileCard: {
    marginBottom: 'var(--spacing-2xl)',
  },
  profileHeader: {
    display: 'flex',
    gap: 'var(--spacing-xl)',
    alignItems: 'flex-start',
    marginBottom: 'var(--spacing-xl)',
    padding: 'var(--spacing-xl)',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 'var(--spacing-lg)',
    right: 'var(--spacing-lg)',
  },
  avatarContainer: {
    flexShrink: 0,
  },
  avatarLarge: {
    fontSize: '80px',
    lineHeight: 1,
    display: 'block',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    margin: 0,
    marginBottom: 'var(--spacing-sm)',
    fontSize: 'var(--text-3xl)',
  },
  userEmail: {
    margin: 0,
    marginBottom: 'var(--spacing-md)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-lg)',
  },
  roleBadge: {
    display: 'inline-block',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--primary-color)',
    color: '#ffffff',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
  },
  bioSection: {
    padding: '0 var(--spacing-xl)',
    marginBottom: 'var(--spacing-xl)',
  },
  bioTitle: {
    fontSize: 'var(--text-lg)',
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--text-primary)',
  },
  bioText: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'var(--spacing-lg)',
    padding: 'var(--spacing-xl)',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
    color: 'var(--primary-color)',
    marginBottom: 'var(--spacing-xs)',
  },
  statLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
  },
  tabsContainer: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-xl)',
  },
  tabButton: {
    flex: 1,
  },
  contentContainer: {
    minHeight: '300px',
  },
  postsGrid: {
    display: 'grid',
    gap: 'var(--spacing-lg)',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 'var(--spacing-md)',
    width: '100%',
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
    maxHeight: '80px',
    overflow: 'hidden',
    marginBottom: 'var(--spacing-md)',
  },
  postContent: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  fadeOut: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
    pointerEvents: 'none',
  },
  postMetaActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  postDate: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-light)',
    margin: 0,
  },
  comentariosGrid: {
    display: 'grid',
    gap: 'var(--spacing-md)',
  },
  comentarioText: {
    fontSize: 'var(--text-md)',
    color: 'var(--text-primary)',
    fontStyle: 'italic',
    marginBottom: 'var(--spacing-md)',
  },
  comentarioMetaFull: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    flexWrap: 'wrap',
  },
  comentarioMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  },
  comentarioPost: {
    fontSize: 'var(--text-sm)',
    color: 'var(--primary-color)',
    fontWeight: 600,
  },
  comentarioDate: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-light)',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    color: 'var(--text-secondary)',
  },
}

export default ProfilePage
