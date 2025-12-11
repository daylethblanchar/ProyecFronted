import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ArticleCardList from '../components/ArticleCard/ArticleCardList'
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

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

          {!isAuthenticated && (
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
            {isAuthenticated && (user?.rol === 'admin' || user?.rol === 'user') && (
              <Link to="/notas" className="btn btn-sm btn-primary">
                {user?.rol === 'admin' ? 'Gestionar Posts' : 'Mis Posts'}
              </Link>
            )}
          </PostsHeader>

          {/* Articles list */}
          <ArticleCardList />
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
        {!isAuthenticated && (
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
