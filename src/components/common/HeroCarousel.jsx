import { useState, useEffect, useMemo } from 'react';

/**
 * Componente de carrusel de imágenes para el hero
 * Muestra imágenes de paisajes con transición automática
 */
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Imágenes de paisajes de Unsplash - memorizado para evitar re-renders
  const images = useMemo(() => [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop', // Montañas
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=600&fit=crop', // Naturaleza
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop', // Bosque
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop', // Lago
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&h=600&fit=crop', // Valle
  ], []);

  // Cambiar imagen automáticamente cada 5 segundos (pausar al hacer hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  // Función para ir a una imagen específica
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      style={styles.carouselContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Carrusel de imágenes"
    >
      {/* Imágenes */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image}
            alt={`Paisaje relajante ${index + 1} - Salud mental y bienestar`}
            style={styles.image}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <div style={styles.overlay} aria-hidden="true"></div>

      {/* Indicadores de navegación */}
      <div style={styles.indicators} role="tablist" aria-label="Seleccionar imagen">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles.indicator,
              ...(index === currentIndex ? styles.indicatorActive : {}),
            }}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Ir a imagen ${index + 1} de ${images.length}`}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 'var(--radius-lg)',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  overlay: {
    // Overlay semi-transparente suave y tranquilo para mejorar contraste y legibilidad
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(142, 202, 230, 0.35) 0%, rgba(33, 158, 188, 0.3) 50%, rgba(2, 48, 71, 0.4) 100%)',
    pointerEvents: 'none',
    zIndex: 2,
  },
  indicators: {
    position: 'absolute',
    bottom: 'var(--spacing-xl)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 'var(--spacing-sm)',
    zIndex: 3,
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    padding: 0,
  },
  indicatorActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'scale(1.2)',
    border: '2px solid rgba(255, 255, 255, 1)',
  },
};

export default HeroCarousel;
