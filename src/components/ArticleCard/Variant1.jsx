// src/components/Notas/Variant1.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatters'
import { getCategoriaColor, CATEGORIAS_NOTAS } from '../../utils/constants'
import useComments from '../../hooks/useComments'
import CommentItem from '../CommentItem/CommentItem'
import {
  PostCard,
  PostHeader,
  PostTitle,
  CategoriaBadge,
  ExcerptContainer,
  PostExcerpt,
  FadeOut,
  ReadMoreLink,
  PostMeta,
  AuthorInfo,
  AuthorName,
  PostDate,
  FooterActions,
  ToggleCommentsBtn,
  CommentCount,
  CommentSection,
  ComentariosTitle,
  ComentariosList,
  NoComments,
  LoadMoreBtn,
  NuevoComentarioForm,
  ComentarioTextarea,
  PublishButton,
  LoginToComment,
} from './Variant1.styled'

// =============================================
// COMPONENTE PRINCIPAL
// =============================================
export const Variant1 = ({ post }) => {
  const { isAuthenticated, user } = useAuth()
  const {
    comments,
    loading,
    commentCount,
    hasComments,
    loadAllComments,
    addComment,
    fetchComments,
    startPolling,
    stopPolling,
  } = useComments(post._id)

  const [showComments, setShowComments] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const toggleComments = () => {
    setShowComments(prev => {
      const next = !prev
      if (next) {
        startPolling()
        if (!hasComments) fetchComments()
      } else stopPolling()
      return next
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.comment.value.trim()
    if (!content) return

    setIsSubmitting(true)
    try {
      await addComment(content)
      e.target.reset()
      setShowAll(false)
      setTimeout(() => fetchComments(), 600)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PostCard>
      <PostHeader>
        <PostTitle>{post.titulo}</PostTitle>
        <CategoriaBadge color={getCategoriaColor(post.categoria)}>
          {CATEGORIAS_NOTAS.find(c => c.value === post.categoria)?.label || post.categoria}
        </CategoriaBadge>
      </PostHeader>

      <ExcerptContainer>
        <PostExcerpt>{post.resumen || post.contenido}</PostExcerpt>
        <FadeOut />
      </ExcerptContainer>

      <ReadMoreLink to={`/article/${post._id}`}>Leer más →</ReadMoreLink>

      <PostMeta>
        <AuthorInfo>
          <AuthorName>Por {post.autor}</AuthorName>
          <PostDate>{formatDate(post.createdAt)}</PostDate>
        </AuthorInfo>
      </PostMeta>

      <FooterActions>
        <ToggleCommentsBtn onClick={toggleComments} $active={showComments}>
          {showComments ? 'Ocultar' : 'Ver'} comentarios
          <CommentCount $active={showComments}>{commentCount}</CommentCount>
        </ToggleCommentsBtn>
      </FooterActions>

      {showComments && (
        <CommentSection>
          <ComentariosTitle>Comentarios</ComentariosTitle>

          {loading && !comments.length ? (
            <NoComments>Cargando comentarios...</NoComments>
          ) : comments.length === 0 ? (
            <NoComments>Sé el primero en comentar</NoComments>
          ) : (
            <>
              <ComentariosList>
                {comments.map(c => (
                  <CommentItem key={c._id} comentario={c} user={user} />
                ))}
              </ComentariosList>

              {!showAll && commentCount > 5 && (
                <LoadMoreBtn
                  onClick={() => {
                    loadAllComments()
                    setShowAll(true)
                  }}
                >
                  Ver todos los {commentCount} comentarios
                </LoadMoreBtn>
              )}
            </>
          )}

          {isAuthenticated ? (
            <NuevoComentarioForm onSubmit={handleSubmit}>
              <ComentarioTextarea
                name="comment"
                placeholder="Escribe tu comentario..."
                required
                disabled={isSubmitting}
              />
              <PublishButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Publicar comentario'}
              </PublishButton>
            </NuevoComentarioForm>
          ) : (
            <LoginToComment>
              <Link to="/login">Inicia sesión</Link> para comentar
            </LoginToComment>
          )}
        </CommentSection>
      )}
    </PostCard>
  )
}

export default Variant1
