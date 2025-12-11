import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatters'
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../../utils/constants'
import ComentarioItem from '../../components/Notas/ComentarioItem'
import {
  PostCard,
  PostHeader,
  PostTitle,
  CategoriaBadge,
  ExcerptContainer,
  PostExcerpt,
  FadeOut,
  PostMeta,
  AuthorInfo,
  AuthorName,
  PostDate,
  CommentCount,
  ComentariosSection,
  ComentariosTitle,
  ComentariosList,
  NoCommentsFounded,
  NuevoComentarioForm,
  ComentarioInput,
  LoginPrompt,
} from './ArticleCard.style'

export const Variant1 = ({ post }) => {
  const { isAuthenticated, user } = useAuth()
  const [comentarios, setComentarios] = useState([])
  const [nuevoComentario, setNuevoComentario] = useState({})
  const [mostrarComentarios, setMostrarComentarios] = useState({})

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
    if (!contenido || !isAuthenticated) return

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
    <PostCard key={post._id} className="card">
      <div className="card-header">
        <PostHeader>
          <PostTitle>{post.titulo}</PostTitle>
          <CategoriaBadge color={getCategoriaColor(post.categoria)}>
            {CATEGORIAS_NOTAS.find(c => c.value === post.categoria)?.label || post.categoria}
          </CategoriaBadge>
        </PostHeader>
      </div>

      <div className="card-body">
        <ExcerptContainer>
          <PostExcerpt>{post.resumen || post.contenido}</PostExcerpt>
          <FadeOut />
        </ExcerptContainer>

        <Link
          to={`/articulo/${post._id}`}
          className="btn btn-primary"
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          Leer más →
        </Link>

        <PostMeta>
          <AuthorInfo>
            <AuthorName>Por {post.autor}</AuthorName>
            <PostDate>{formatDate(post.createdAt)}</PostDate>
          </AuthorInfo>
        </PostMeta>
      </div>

      <div className="card-footer">
        <button className="btn btn-sm btn-outline" onClick={() => toggleComentarios(post._id)}>
          {mostrarComentarios[post._id] ? 'Ocultar' : 'Ver'} Comentarios
        </button>
        <CommentCount>{getComentariosByPost(post._id).length} comentario(s)</CommentCount>
      </div>

      {/* Sección de Comentarios */}
      {mostrarComentarios[post._id] && (
        <ComentariosSection>
          <ComentariosTitle>Comentarios</ComentariosTitle>

          <ComentariosList>
            {getComentariosByPost(post._id).length > 0 ? (
              getComentariosByPost(post._id).map(comentario => (
                <ComentarioItem key={comentario._id} comentario={comentario} />
              ))
            ) : (
              <NoCommentsFounded>
                No hay comentarios aún.{' '}
                {isAuthenticated
                  ? '¡Sé el primero en comentar!'
                  : 'Inicia sesión para ser el primero en comentar.'}
              </NoCommentsFounded>
            )}
          </ComentariosList>

          {isAuthenticated ? (
            <NuevoComentarioForm>
              <ComentarioInput
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
            </NuevoComentarioForm>
          ) : (
            <LoginPrompt>
              <Link to="/login" className="btn btn-sm btn-primary">
                Inicia sesión para comentar
              </Link>
            </LoginPrompt>
          )}
        </ComentariosSection>
      )}
    </PostCard>
  )
}
