import { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import { useAuth } from '../hooks/useAuth'
import useArticles from '../hooks/useArticles'
import { useUsuarios } from '../hooks/useUsuarios'
import { formatDate } from '../utils/formatters'
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../utils/constants'
import { getRelatedArticles } from '../utils/articleRecommendations'
import ComentarioItem from '../components/Notas/ComentarioItem'
import MarkdownRenderer from '../components/common/MarkdownRenderer'
import TableOfContents from '../components/common/TableOfContents'
import {
  Container,
  BackButton,
  ContentWrapper,
  TocSidebar,
  MainContent,
  NotFound,
  ArticleCard,
  ArticleHeader,
  HeaderTop,
  CategoriaBadge,
  Fecha,
  Titulo,
  AutorSection,
  AutorInfo,
  AvatarLarge,
  AutorNombre,
  AutorBio,
  ArticleContent,
  ComentariosCard,
  ComentariosHeader,
  ComentariosTitle,
  ComentariosList,
  NoCommentsFounded,
  NuevoComentarioForm,
  FormTitle,
  ComentarioInput,
  LoginPrompt,
  RelatedArticlesCard,
  RelatedTitle,
  RelatedGrid,
  RelatedCard,
  RelatedHeader,
  RelatedBadge,
  RelatedCardTitle,
  RelatedExcerpt,
  RelatedMeta,
  RelatedAuthor,
  RelatedReadMore,
} from './ArticlePage.styles'

/**
 * Página individual de artículo del blog
 * Muestra el contenido completo del artículo con comentarios
 */
const ArticlePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { articles, currentArticle: article, loading, fetchById } = useArticles()
  const { usuarios, fetchUsuarios } = useUsuarios()

  const [comentarios, setComentarios] = useState([])
  const [nuevoComentario, setNuevoComentario] = useState('')
  const [mostrarComentarios, setMostrarComentarios] = useState(true)

  // Scroll suave al inicio al cargar el artículo o cambiar de artículo
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    fetchUsuarios()

    if (id) {
      fetchById(id)
    }
  }, [id, fetchUsuarios, fetchById])

  // Obtener artículos relacionados usal algoritmo
  const articulosRelacionados = useMemo(() => {
    if (!article || !article.length) return []
    return getRelatedArticles(article, articles, 3)
  }, [articles, article])

  if (loading) {
    return <Loading />
  }

  if (!article) {
    return (
      <Container>
        <NotFound>
          <h1>Artículo no encontrado</h1>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </NotFound>
      </Container>
    )
  }

  // Obtener autor del artículo
  const autor = usuarios.find(u => u._id === article.usuario) || {
    nombre: article.autor || 'Usuario',
    _id: article.usuario,
  }

  // Biografía simple del autor
  const autorBio =
    'Miembro de la comunidad dedicado a compartir experiencias sobre salud mental y bienestar.'

  // Obtener comentarios del artículo
  const getComentariosByPost = postId => {
    return comentarios.filter(c => c.notaId === postId)
  }

  // Agregar nuevo comentario
  const handleAgregarComentario = () => {
    const contenido = nuevoComentario.trim()
    if (!contenido || !isAuthenticated) return

    const nuevoComent = {
      _id: String(comentarios.length + 1),
      notaId: article._id,
      usuario: user._id,
      autor: user.nombre,
      contenido,
      createdAt: new Date().toISOString(),
    }

    setComentarios(prev => [...prev, nuevoComent])
    setNuevoComentario('')
  }

  return (
    <Container className="article-container">
      <ContentWrapper className="contentWrapper">
        {/* Tabla de Contenidos - Sidebar en desktop / Popup en mobile */}
        <TocSidebar className="toc-wrapper">
          <TableOfContents key={`toc-${id}`} articleId={id} />
        </TocSidebar>

        {/* Contenido principal */}
        <MainContent>
          {/* Botón volver */}
          <BackButton onClick={() => navigate(-1)} className="btn btn-outline">
            ← Volver
          </BackButton>
          {/* Artículo */}
          <ArticleCard className="card">
            {/* Header */}
            <ArticleHeader>
              <HeaderTop>
                <span className=".estilos-del-span"> ... </span>
                <CategoriaBadge $color={getCategoriaColor(article.categoria)}>
                  {CATEGORIAS_NOTAS.find(c => c.value === article.categoria)?.label ||
                    article.categoria}
                </CategoriaBadge>
                <Fecha>{formatDate(article.createdAt)}</Fecha>
              </HeaderTop>

              <Titulo data-article-title>{article.titulo}</Titulo>

              {/* Info del autor */}
              <AutorSection>
                <AutorInfo>
                  <AvatarLarge>{autor?.avatar || '😊'}</AvatarLarge>
                  <div>
                    <AutorNombre>{article.autor}</AutorNombre>
                    {autorBio && <AutorBio>{autorBio}</AutorBio>}
                  </div>
                </AutorInfo>
              </AutorSection>
            </ArticleHeader>

            {/* Contenido del artículo */}
            <ArticleContent>
              <MarkdownRenderer key={article._id} content={article.contenido} />
            </ArticleContent>
          </ArticleCard>

          {/* Sección de comentarios */}
          <ComentariosCard className="card">
            <ComentariosHeader>
              <ComentariosTitle>
                Comentarios ({getComentariosByPost(article._id).length})
              </ComentariosTitle>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setMostrarComentarios(!mostrarComentarios)}
              >
                {mostrarComentarios ? 'Ocultar' : 'Mostrar'}
              </button>
            </ComentariosHeader>

            {mostrarComentarios && (
              <>
                {/* Lista de comentarios */}
                <ComentariosList>
                  {getComentariosByPost(article._id).length > 0 ? (
                    getComentariosByPost(article._id).map(comentario => (
                      <ComentarioItem key={comentario._id} comentario={comentario} />
                    ))
                  ) : (
                    <NoCommentsFounded>
                      No hay comentarios aún. {isAuthenticated ? '¡Sé el primero en comentar!' : ''}
                    </NoCommentsFounded>
                  )}
                </ComentariosList>

                {/* Formulario para agregar comentario */}
                {isAuthenticated ? (
                  <NuevoComentarioForm>
                    <FormTitle>Deja tu comentario</FormTitle>
                    <ComentarioInput
                      placeholder="Comparte tu opinión o experiencia..."
                      value={nuevoComentario}
                      onChange={e => setNuevoComentario(e.target.value)}
                      rows="4"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleAgregarComentario}
                      disabled={!nuevoComentario.trim()}
                    >
                      Publicar Comentario
                    </button>
                  </NuevoComentarioForm>
                ) : (
                  <LoginPrompt>
                    <p>Inicia sesión para dejar un comentario</p>
                    <Link to="/login" className="btn btn-primary">
                      Iniciar Sesión
                    </Link>
                  </LoginPrompt>
                )}
              </>
            )}
          </ComentariosCard>

          {/* Artículos Relacionados */}
          {articulosRelacionados.length > 0 && (
            <RelatedArticlesCard className="card">
              <RelatedTitle>Artículos Relacionados</RelatedTitle>
              <RelatedGrid>
                {articulosRelacionados.map(related => (
                  <RelatedCard
                    key={related._id}
                    as={Link}
                    to={`/articulo/${related._id}`}
                    className="card"
                  >
                    <RelatedHeader>
                      <RelatedBadge $color={getCategoriaColor(related.categoria)}>
                        {CATEGORIAS_NOTAS.find(c => c.value === related.categoria)?.label ||
                          related.categoria}
                      </RelatedBadge>
                    </RelatedHeader>
                    <RelatedCardTitle>{related.titulo}</RelatedCardTitle>
                    <RelatedExcerpt>
                      {related.resumen || related.contenido.substring(0, 120)}...
                    </RelatedExcerpt>
                    <RelatedMeta>
                      <RelatedAuthor>Por {related.autor}</RelatedAuthor>
                      <RelatedReadMore>Leer más →</RelatedReadMore>
                    </RelatedMeta>
                  </RelatedCard>
                ))}
              </RelatedGrid>
            </RelatedArticlesCard>
          )}
        </MainContent>
      </ContentWrapper>
    </Container>
  )
}

export default ArticlePage
