import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
`;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
  opacity: ${props => props.$isActive ? 1 : 0};
  z-index: ${props => props.$isActive ? 1 : 0};
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(142, 202, 230, 0.35) 0%, rgba(33, 158, 188, 0.3) 50%, rgba(2, 48, 71, 0.4) 100%);
  pointer-events: none;
  z-index: 2;
`;
