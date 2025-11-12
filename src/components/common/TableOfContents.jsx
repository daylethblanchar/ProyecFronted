import { useState, useEffect, useRef } from 'react';
import '../../styles/tableOfContents.css';

/**
 * Componente de Tabla de Contenidos (TOC)
 * Muestra un índice fijo a la derecha con los headings del artículo
 * Permite navegación rápida y resalta la sección activa
 * En pantallas pequeñas se convierte en un popup/modal
 */
const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Función para procesar los headings
    const processHeadings = () => {
      // Obtener el título principal del artículo
      const articleTitle = document.querySelector('article h1');

      // Obtener todos los headings del contenido markdown
      const articleContent = document.querySelector('.markdown-content');
      if (!articleContent) {
        console.log('TableOfContents: No se encontró .markdown-content');
        return null;
      }

      const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      console.log('TableOfContents: Encontrados', headingElements.length, 'headings');

      // Si no hay headings aún, retornar null para reintentar
      if (headingElements.length === 0) {
        console.log('TableOfContents: No hay headings todavía, reintentando...');
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
        // Generar ID único si no existe
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        headingData.push({
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
        });
      });

      return { headingData, articleTitle, headingElements };
    };

    // Intentar procesar inmediatamente
    let result = processHeadings();

    // Si no hay headings, esperar un poco y reintentar
    let timeoutId;
    if (!result) {
      timeoutId = setTimeout(() => {
        result = processHeadings();
        if (result) {
          setupObserver(result);
        }
      }, 500); // Esperar 500ms para que el markdown se renderice
    } else {
      setupObserver(result);
    }

    function setupObserver({ headingData, articleTitle, headingElements }) {
      setHeadings(headingData);
      console.log('TableOfContents: Headings procesados:', headingData.length);

      // Observer para detectar qué sección está visible
      const observer = new IntersectionObserver(
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
        observer.observe(articleTitle);
      }

      // Observar los headings del contenido
      headingElements.forEach((heading) => observer.observe(heading));

      // Cleanup function
      return () => {
        if (articleTitle) {
          observer.unobserve(articleTitle);
        }
        headingElements.forEach((heading) => observer.unobserve(heading));
      };
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Scroll suave a la sección
  const handleClick = (e, id) => {
    e.preventDefault();

    // Limpiar timeout anterior si existe
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Marcar que estamos haciendo scroll
    isScrollingRef.current = true;
    setActiveId(id); // Establecer inmediatamente el activeId

    const element = document.getElementById(id);
    if (element) {
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
    }
  };

  // No mostrar si hay menos de 2 headings
  if (headings.length < 2) {
    console.log('TableOfContents: No se muestra porque hay menos de 2 headings');
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

  // Cerrar popup al hacer click en un enlace
  const handleLinkClick = (e, id) => {
    e.preventDefault();

    // Guardar la posición antes de cerrar
    const element = document.getElementById(id);
    if (!element) return;

    // Cerrar el popup inmediatamente
    setIsClosing(true);

    // Hacer scroll de inmediato (sin esperar)
    const offset = 100; // Offset para la navbar fixed
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Limpiar estados después de la animación
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {/* Botón flotante para abrir el TOC en pantallas pequeñas */}
      <button
        className="toc-toggle-button"
        onClick={handleOpen}
        aria-label="Abrir tabla de contenidos"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay para cerrar el modal en móvil */}
      {(isOpen || isClosing) && (
        <div
          className={`toc-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleClose}
        />
      )}

      {/* Tabla de contenidos */}
      <nav className={`table-of-contents ${isOpen ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}>
        <div className="toc-header">
          <h3 className="toc-title">En este artículo</h3>
          <button
            className="toc-close-button"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className="toc-item"
              style={heading.level > 1 ? { paddingLeft: `${(heading.level - 1) * 12}px` } : {}}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`toc-link ${activeId === heading.id ? 'active' : ''}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContents;
