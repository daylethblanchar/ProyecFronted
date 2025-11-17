import {
  PageContainer,
  PageTitle,
  PageDescription,
  Section,
  SectionTitle,
  ComponentGrid,
  ComponentCard,
  ComponentName,
  ComponentDescription,
  ComponentPreview,
  CodeBlock,
  Badge,
  FilePathBadge
} from './StyleGuidePage.styles';

// Importar componentes para demostración
import { Hero, HeroTitle, HeroSubtitle, HeroButtonLink } from './HomePage.styles';
import { Nav, NavLink, BrandText } from '../components/common/Navbar.styles';
import {
  TocToggleButton,
  TableOfContentsContainer,
  TocTitle,
  TocLink
} from '../components/common/TableOfContents.styles';
import {
  CategoriaBadge,
  Titulo,
  RelatedCard
} from './ArticuloPage.styles';
import { FooterContainer, Link as FooterLink } from '../components/common/Footer.styles';

/**
 * Página de documentación de styled-components
 * Muestra todos los componentes de estilo disponibles en la aplicación
 */
const StyleGuidePage = () => {
  const components = [
    {
      category: 'HomePage Components',
      file: 'src/pages/HomePage.styles.js',
      items: [
        {
          name: 'Hero',
          description: 'Contenedor principal del hero con imagen de fondo',
          code: '<Hero>\n  <HeroTitle>Título</HeroTitle>\n  <HeroSubtitle>Subtítulo</HeroSubtitle>\n</Hero>',
          preview: <div style={{ width: '100%', height: '150px', background: 'linear-gradient(135deg, rgba(142, 202, 230, 0.35) 0%, rgba(33, 158, 188, 0.3) 50%, rgba(2, 48, 71, 0.4) 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Hero Preview</div>
        },
        {
          name: 'HeroTitle',
          description: 'Título principal del hero',
          code: '<HeroTitle>Bienvenido</HeroTitle>',
          preview: <HeroTitle style={{ position: 'relative', fontSize: '2rem' }}>Bienvenido</HeroTitle>
        },
        {
          name: 'HeroButtonLink',
          description: 'Botón de CTA del hero (Link estilizado)',
          code: '<HeroButtonLink to="/registro" variant="primary">Click Me</HeroButtonLink>',
          preview: <HeroButtonLink to="#" variant="primary">Comenzar</HeroButtonLink>
        }
      ]
    },
    {
      category: 'Navbar Components',
      file: 'src/components/common/Navbar.styles.js',
      items: [
        {
          name: 'Nav',
          description: 'Contenedor principal de la barra de navegación con efecto glassmorphism',
          code: '<Nav $isVisible={true}>\n  {/* Contenido */}\n</Nav>',
          preview: <div style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 129, 167, 0.1)' }}>Navbar Preview</div>
        },
        {
          name: 'BrandText',
          description: 'Texto del logo/marca',
          code: '<BrandText>Mi App</BrandText>',
          preview: <BrandText>Blog Salud Mental</BrandText>
        },
        {
          name: 'NavLink',
          description: 'Enlaces de navegación',
          code: '<NavLink as={Link} to="/ruta">Link</NavLink>',
          preview: <NavLink href="#">Inicio</NavLink>
        }
      ]
    },
    {
      category: 'Table of Contents Components',
      file: 'src/components/common/TableOfContents.styles.js',
      items: [
        {
          name: 'TableOfContentsContainer',
          description: 'Contenedor del índice de contenidos',
          code: '<TableOfContentsContainer>\n  {/* Items */}\n</TableOfContentsContainer>',
          preview: <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 175, 185, 0.15)', borderRadius: '12px', padding: '1rem', maxWidth: '280px' }}>TOC Container</div>
        },
        {
          name: 'TocTitle',
          description: 'Título del TOC',
          code: '<TocTitle>En este artículo</TocTitle>',
          preview: <TocTitle>En este artículo</TocTitle>
        },
        {
          name: 'TocLink',
          description: 'Enlaces del TOC',
          code: '<TocLink href="#section">Sección 1</TocLink>',
          preview: <TocLink href="#">Introducción</TocLink>
        },
        {
          name: 'TocToggleButton',
          description: 'Botón flotante para abrir TOC en móvil',
          code: '<TocToggleButton onClick={handleOpen}>\n  {/* Icon */}\n</TocToggleButton>',
          preview: <TocToggleButton style={{ position: 'relative', margin: '0 auto' }}>☰</TocToggleButton>
        }
      ]
    },
    {
      category: 'ArticuloPage Components',
      file: 'src/pages/ArticuloPage.styles.js',
      items: [
        {
          name: 'Titulo',
          description: 'Título principal del artículo',
          code: '<Titulo>Título del Artículo</Titulo>',
          preview: <Titulo style={{ fontSize: '1.5rem' }}>Título del Artículo</Titulo>
        },
        {
          name: 'CategoriaBadge',
          description: 'Badge de categoría con color dinámico',
          code: '<CategoriaBadge $color="#00afb9">\n  Categoría\n</CategoriaBadge>',
          preview: <CategoriaBadge $color="#00afb9">Ansiedad</CategoriaBadge>
        },
        {
          name: 'RelatedCard',
          description: 'Tarjeta de artículo relacionado',
          code: '<RelatedCard as={Link} to="/articulo/1">\n  {/* Contenido */}\n</RelatedCard>',
          preview: <RelatedCard className="card" style={{ padding: '1rem', maxWidth: '250px' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Artículo Relacionado</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0' }}>Descripción breve...</p>
          </RelatedCard>
        }
      ]
    },
    {
      category: 'Footer Components',
      file: 'src/components/common/Footer.styles.js',
      items: [
        {
          name: 'FooterContainer',
          description: 'Contenedor del pie de página',
          code: '<FooterContainer>\n  {/* Contenido */}\n</FooterContainer>',
          preview: <FooterContainer style={{ padding: '1.5rem', marginTop: 0 }}>
            <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>© 2025 Mi Aplicación</div>
          </FooterContainer>
        },
        {
          name: 'Link',
          description: 'Enlaces del footer',
          code: '<Link href="#">Términos</Link>',
          preview: <FooterLink href="#">Política de Privacidad</FooterLink>
        }
      ]
    }
  ];

  return (
    <PageContainer>
      <PageTitle>📚 Guía de Styled Components</PageTitle>
      <PageDescription>
        Documentación completa de todos los styled-components disponibles en la aplicación.
        Cada componente incluye una descripción, código de ejemplo y vista previa interactiva.
      </PageDescription>

      {components.map((category, idx) => (
        <Section key={idx}>
          <SectionTitle>
            {category.category}
          </SectionTitle>
          <FilePathBadge>{category.file}</FilePathBadge>

          <ComponentGrid>
            {category.items.map((component, itemIdx) => (
              <ComponentCard key={itemIdx}>
                <ComponentName>{component.name}</ComponentName>
                <ComponentDescription>{component.description}</ComponentDescription>

                <Badge $color="#00afb9">Preview</Badge>
                <ComponentPreview>
                  {component.preview}
                </ComponentPreview>

                <Badge $color="#0081a7">Code</Badge>
                <CodeBlock>{component.code}</CodeBlock>
              </ComponentCard>
            ))}
          </ComponentGrid>
        </Section>
      ))}

      <Section>
        <SectionTitle>🎨 Paleta de Colores</SectionTitle>
        <ComponentGrid>
          <ComponentCard>
            <ComponentName>Primary Color</ComponentName>
            <div style={{ background: 'var(--primary-color)', height: '60px', borderRadius: '8px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--primary-color)</CodeBlock>
          </ComponentCard>
          <ComponentCard>
            <ComponentName>Text Primary</ComponentName>
            <div style={{ background: 'var(--text-primary)', height: '60px', borderRadius: '8px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--text-primary)</CodeBlock>
          </ComponentCard>
          <ComponentCard>
            <ComponentName>Background Secondary</ComponentName>
            <div style={{ background: 'var(--bg-secondary)', height: '60px', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}></div>
            <CodeBlock>var(--bg-secondary)</CodeBlock>
          </ComponentCard>
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>📏 Espaciado</SectionTitle>
        <ComponentGrid>
          <ComponentCard>
            <ComponentName>spacing-sm</ComponentName>
            <div style={{ background: 'var(--primary-color)', width: 'var(--spacing-sm)', height: '20px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--spacing-sm)</CodeBlock>
          </ComponentCard>
          <ComponentCard>
            <ComponentName>spacing-md</ComponentName>
            <div style={{ background: 'var(--primary-color)', width: 'var(--spacing-md)', height: '20px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--spacing-md)</CodeBlock>
          </ComponentCard>
          <ComponentCard>
            <ComponentName>spacing-lg</ComponentName>
            <div style={{ background: 'var(--primary-color)', width: 'var(--spacing-lg)', height: '20px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--spacing-lg)</CodeBlock>
          </ComponentCard>
          <ComponentCard>
            <ComponentName>spacing-xl</ComponentName>
            <div style={{ background: 'var(--primary-color)', width: 'var(--spacing-xl)', height: '20px', marginBottom: '0.5rem' }}></div>
            <CodeBlock>var(--spacing-xl)</CodeBlock>
          </ComponentCard>
        </ComponentGrid>
      </Section>
    </PageContainer>
  );
};

export default StyleGuidePage;