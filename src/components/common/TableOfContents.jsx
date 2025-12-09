import { useState, useEffect, useRef } from 'react';
import {
  TocToggleButton,
  TocOverlay,
  TableOfContentsContainer,
  TocHeader,
  TocCloseButton,
  TocTitle,
  TocList,
  TocItem,
  TocLink
} from './TableOfContents.styles';

/**
 * Componente de Tabla de Contenidos (TOC)
 * Muestra un índice fijo a la derecha con los headings del artículo
 * Permite navegación rápida y resalta la sección activa
 * En pantallas pequeñas se convierte en un popup/modal
 */
const TableOfContents = ({ articleId }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [currentArticleId, setCurrentArticleId] = useState(articleId);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const retryTimeoutsRef = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    // Verificar si el artículo ha cambiado
    if (currentArticleId !== articleId) {
      console.log(`TableOfContents: Cambiando de artículo ${currentArticleId} → ${articleId}`);
      setCurrentArticleId(articleId);
    }
    
    // Limpiar timeouts pendientes del artículo anterior
    retryTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    retryTimeoutsRef.current = [];
    
    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    // Reset COMPLETO del estado
    setHeadings([]);
    setActiveId('');
    setIsFadingIn(false);
    setIsOpen(false);

    // Forzar re-render con delay más largo para asegurar limpieza
    setTimeout(() => {
      setIsFadingIn(true);
    }, 50);
    // Función para procesar los headings
    const processHeadings = () => {
      // Obtener el título principal del artículo desde diferentes posibles ubicaciones
      const articleTitle = 
        document.querySelector('[data-article-title]') || // Buscar por atributo específico
        document.querySelector('article h1') || 
        document.querySelector('.article-title') ||
        document.querySelector('h1');

      // Obtener todos los headings del contenido markdown
      const articleContent = document.querySelector('.markdown-content');
      if (!articleContent) {
        console.log('TableOfContents: No se encontró .markdown-content');
        // Verificar si hay contenido markdown presente
        const markdownDiv = document.querySelector('[class*="markdown"]');
        if (markdownDiv) {
          console.log('TableOfContents: Se encontró elemento markdown alternativo:', markdownDiv.className);
        }
        return null;
      }

      const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      console.log('TableOfContents: Encontrados', headingElements.length, 'headings en .markdown-content');
      
      // Log del contenido si no hay headings
      if (headingElements.length === 0) {
        console.log('TableOfContents: Contenido del markdown-content:', articleContent.innerHTML.substring(0, 200) + '...');
        console.log('TableOfContents: Esta nota solo tiene texto plano, sin headings de markdown (##, ###, etc.)');
        console.log('TableOfContents: Para mostrar TOC, la nota necesita secciones como "## Mi Sección"');
        return null;
      }

      const headingData = [];

      // Agregar el título principal del artículo
      if (articleTitle) {
        if (!articleTitle.id) {
          articleTitle.id = 'article-title';
        }
        headingData.push({
          id: articleTitle.id,
          text: articleTitle.textContent,
          level: 0, // Nivel especial para el título principal
        });
      }

      // Agregar los headings del contenido markdown
      Array.from(headingElements).forEach((heading, index) => {
        // Solo agregar si tiene ID (generado por rehype-slug) o generar uno como fallback
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        // Solo agregar headings que tengan texto
        if (heading.textContent && heading.textContent.trim()) {
          headingData.push({
            id: heading.id,
            text: heading.textContent,
            level: parseInt(heading.tagName.charAt(1)),
          });
        }
      });

      return { headingData, articleTitle, headingElements };
    };

    // Función para reintentar múltiples veces
    const retryProcessHeadings = (attempt = 0, maxAttempts = 5) => {
      // Verificar que seguimos en el mismo artículo
      if (currentArticleId !== articleId) {
        console.log('TableOfContents: Artículo cambió durante reintento, cancelando...');
        return;
      }
      
      const result = processHeadings();
      
      if (result) {
        // Verificar una vez más antes de configurar el observer
        if (currentArticleId === articleId) {
          setupObserver(result);
        }
        return;
      }
      
      // Si no hay resultado y aún hay intentos restantes
      if (attempt < maxAttempts) {
        const delay = Math.min(200 * Math.pow(2, attempt), 2000); // Backoff exponencial, max 2s
        console.log(`TableOfContents: Reintentando ${attempt + 1}/${maxAttempts} en ${delay}ms para artículo ${articleId}...`);
        
        const timeoutId = setTimeout(() => {
          // Verificar artículo antes de continuar
          if (currentArticleId === articleId) {
            retryProcessHeadings(attempt + 1, maxAttempts);
          }
        }, delay);
        
        // Guardar el timeout para poder limpiarlo después
        retryTimeoutsRef.current.push(timeoutId);
      } else {
        console.log(`TableOfContents: No se encontraron headings después de todos los intentos para artículo ${articleId}`);
      }
    };

    // Iniciar el proceso de reintento
    retryProcessHeadings();

    function setupObserver({ headingData, articleTitle, headingElements }) {
      // Verificar que seguimos en el artículo correcto
      if (currentArticleId !== articleId) {
        console.log('TableOfContents: Artículo cambió, cancelando setup del observer...');
        return;
      }
      
      console.log(`TableOfContents: Configurando observer para artículo ${articleId} con ${headingData.length} headings`);
      setHeadings(headingData);

      // Limpiar observer anterior si existe
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Observer para detectar qué sección está visible
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // No actualizar si estamos haciendo scroll programático
          if (isScrollingRef.current) return;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -66% 0px',
          threshold: 0.5,
        }
      );

      // Observar el título del artículo
      if (articleTitle) {
        observerRef.current.observe(articleTitle);
      }

      // Observar los headings del contenido
      headingElements.forEach((heading) => {
        if (heading && observerRef.current) {
          observerRef.current.observe(heading);
        }
      });
    }

    return () => {
      // Limpiar todos los timeouts pendientes
      retryTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      retryTimeoutsRef.current = [];
      
      // Limpiar observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [articleId]); // Re-ejecutar cuando cambie el artículo

  // No mostrar si no hay headings o solo hay el título del artículo
  if (headings.length === 0) {
    console.log('TableOfContents: No se muestra porque no hay headings');
    return null;
  }
  
  // Si solo hay el título del artículo (level 0), no mostrar TOC
  if (headings.length === 1 && headings[0].level === 0) {
    console.log('TableOfContents: No se muestra porque solo hay el título del artículo');
    return null;
  }

  console.log('TableOfContents: Renderizando con', headings.length, 'headings');

  // Función para cerrar con animación
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Duración de la animación (300ms)
  };

  // Abrir popup
  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  // Cerrar popup al hacer click en un enlace (mobile y desktop)
  const handleLinkClick = (e, id) => {
    e.preventDefault();

    // Limpiar timeout anterior si existe
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Marcar que estamos haciendo scroll
    isScrollingRef.current = true;
    setActiveId(id);

    const element = document.getElementById(id);
    if (!element) return;

    // Si está en modo mobile (popup abierto), cerrar el popup
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    }

    // Hacer scroll
    const offset = 100; // Offset para la navbar fixed
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Restablecer después del scroll
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <>
      {/* Botón flotante para abrir el TOC en pantallas pequeñas */}
      <TocToggleButton
        onClick={handleOpen}
        aria-label="Abrir tabla de contenidos"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </TocToggleButton>

      {/* Overlay para cerrar el modal en móvil */}
      {(isOpen || isClosing) && (
        <TocOverlay
          $closing={isClosing}
          onClick={handleClose}
        />
      )}

      {/* Tabla de contenidos */}
      <TableOfContentsContainer className={`${isOpen ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''} ${isFadingIn ? 'fade-in' : 'fade-out'}`}>
        <TocHeader>
          <TocTitle>En este artículo</TocTitle>
          <TocCloseButton
            onClick={handleClose}
            aria-label="Cerrar"
          >
            ✕
          </TocCloseButton>
        </TocHeader>
        <TocList>
          {headings.map((heading) => (
            <TocItem
              key={heading.id}
              $level={heading.level}
            >
              <TocLink
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={activeId === heading.id ? 'active' : ''}
              >
                {heading.text}
              </TocLink>
            </TocItem>
          ))}
        </TocList>
      </TableOfContentsContainer>
    </>
  );
};

export default TableOfContents;
