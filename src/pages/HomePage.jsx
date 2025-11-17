import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { mockNotas, mockComentarios } from '../services/mockData'
import { formatDate } from '../utils/formatters'
import { CATEGORIAS_NOTAS, getCategoriaColor } from '../utils/constants'
import ComentarioItem from '../components/Notas/ComentarioItem'
import HeroCarousel from '../components/common/HeroCarousel'
import {
  PageWrapper,
  Container,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CtaButtons,
  PostsSection,
  PostsHeader,
  SectionTitle,
  PostsGrid,
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
  NoComentarios,
  NuevoComentarioForm,
  ComentarioInput,
  LoginPrompt,
  InfoSection,
  InfoSectionTitle,
  FeatureTitle,
  FeatureText,
  FinalCta,
  CtaTitle,
  CtaText,
  HeroButtonLink,
} from './HomePage.styles'

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
    <PageWrapper>
      {/* Header del Blog superpuesto sobre el carousel */}
      <Hero>
        <HeroCarousel />
        <HeroContent>
          <HeroTitle>Blog de Salud Mental y Bienestar</HeroTitle>
          <HeroSubtitle>
            Un espacio seguro para compartir experiencias, consejos y recursos sobre salud mental
          </HeroSubtitle>

          {!isAuthenticated() && (
            <CtaButtons>
              <HeroButtonLink to="/register" variant="primary">
                Únete a la Comunidad
              </HeroButtonLink>
              <HeroButtonLink to="/login" variant="outline">
                Iniciar Sesión
              </HeroButtonLink>
            </CtaButtons>
          )}
        </HeroContent>
      </Hero>

      {/* Lista de Posts del Blog */}
      <Container>
        <PostsSection>
          <PostsHeader>
            <SectionTitle>Últimos Artículos</SectionTitle>
            {isAuthenticated() && (user?.rol === 'admin' || user?.rol === 'user') && (
              <Link to="/notas" className="btn btn-sm btn-primary">
                {user?.rol === 'admin' ? 'Gestionar Posts' : 'Mis Posts'}
              </Link>
            )}
          </PostsHeader>

          <PostsGrid>
            {mockNotas.map(post => (
              <PostCard key={post._id} className="card">
                <div className="card-header">
                  <PostHeader>
                    <PostTitle>{post.titulo}</PostTitle>
                    <CategoriaBadge color={getCategoriaColor(post.categoria)}>
                      {CATEGORIAS_NOTAS.find(c => c.value === post.categoria)?.label ||
                        post.categoria}
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
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => toggleComentarios(post._id)}
                  >
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
                        <NoComentarios>
                          No hay comentarios aún.{' '}
                          {isAuthenticated()
                            ? '¡Sé el primero en comentar!'
                            : 'Inicia sesión para ser el primero en comentar.'}
                        </NoComentarios>
                      )}
                    </ComentariosList>

                    {isAuthenticated() ? (
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
            ))}
          </PostsGrid>
        </PostsSection>

        {/* Sección informativa */}
        <InfoSection>
          <InfoSectionTitle>Sobre este Blog</InfoSectionTitle>
          <div className="grid grid-cols-3">
            <div className="card">
              <div className="card-body">
                <FeatureTitle>Recursos de Apoyo</FeatureTitle>
                <FeatureText>
                  Encuentra artículos, guías y recursos sobre salud mental, ansiedad, depresión y
                  bienestar emocional.
                </FeatureText>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <FeatureTitle>Comunidad de Apoyo</FeatureTitle>
                <FeatureText>
                  Únete a una comunidad que entiende tus luchas. Comparte experiencias y encuentra
                  apoyo.
                </FeatureText>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <FeatureTitle>Contenido Profesional</FeatureTitle>
                <FeatureText>
                  Artículos escritos por profesionales y personas con experiencias reales sobre
                  salud mental.
                </FeatureText>
              </div>
            </div>
          </div>
        </InfoSection>

        {/* Call to Action Final */}
        {!isAuthenticated() && (
          <FinalCta>
            <CtaTitle>¿Quieres compartir tu historia?</CtaTitle>
            <CtaText>
              Únete a nuestra comunidad y ayuda a otros compartiendo tus experiencias y aprendizajes
            </CtaText>
            <Link to="/register" className="btn btn-primary btn-lg">
              Crear Cuenta Gratis
            </Link>
          </FinalCta>
        )}
      </Container>
    </PageWrapper>
  )
}

export default HomePage
