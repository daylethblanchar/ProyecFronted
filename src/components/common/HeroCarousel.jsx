import { useState, useEffect, useMemo } from 'react';
import {
  CarouselContainer,
  Slide,
  SlideImage,
  Overlay
} from './HeroCarousel.styles';

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
    <CarouselContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Carrusel de imágenes"
    >
      {/* Imágenes */}
      {images.map((image, index) => (
        <Slide
          key={index}
          $isActive={index === currentIndex}
          aria-hidden={index !== currentIndex}
        >
          <SlideImage
            src={image}
            alt={`Paisaje relajante ${index + 1} - Salud mental y bienestar`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </Slide>
      ))}

      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <Overlay aria-hidden="true" />
    </CarouselContainer>
  );
};

export default HeroCarousel;
