import styled, { keyframes, css } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideInTopRight = keyframes`
  from {
    transform: translateY(-20px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const slideOutTopRight = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-20px) scale(0.9);
    opacity: 0;
  }
`;

const fadeInTOC = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutTOC = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const TocToggleButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 175, 185, 0.3);
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 175, 185, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1200px) {
    display: flex;
  }
`;

export const TocOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
  display: none;
  animation: ${fadeIn} 0.3s ease-out forwards;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  pointer-events: auto;

  ${props => props.$closing && css`
    animation: ${fadeOut} 0.3s ease-out forwards;
    pointer-events: none;
  `}

  @media (max-width: 1200px) {
    display: block;
  }
`;

export const TableOfContentsContainer = styled.nav`
  width: 100%;
  max-width: 280px;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 175, 185, 0.15);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 129, 167, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 129, 167, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  &.fade-in {
    animation: ${fadeInTOC} 0.6s ease-out forwards;
  }

  &.fade-out {
    animation: ${fadeOutTOC} 0.4s ease-out forwards;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 175, 185, 0.3);
    border-radius: 3px;
    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 175, 185, 0.5);
  }

  @media (max-width: 1200px) {
    position: fixed;
    top: 100px;
    right: 20px;
    left: auto;
    bottom: auto;
    transform: translateY(-20px) scale(0.9);
    width: 320px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 140px);
    border-radius: 12px;
    opacity: 0;
    pointer-events: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    padding: 0;
    margin-bottom: 0;
    animation: none;

    &.fade-in,
    &.fade-out {
      animation: none;
    }

    &.is-open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    &.is-closing {
      transform: translateY(-20px) scale(0.9);
      opacity: 0;
    }
  }
`;

export const TocHeader = styled.div`
  margin: 0;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(0, 175, 185, 0.08) 0%, rgba(0, 175, 185, 0.04) 100%);
  border-bottom: 1px solid rgba(0, 175, 185, 0.15);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    margin-bottom: 16px;
    padding-bottom: 16px;
    flex-shrink: 0;
  }
`;

export const TocCloseButton = styled.button`
  display: none;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  font-size: 22px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  line-height: 1;
  font-weight: 300;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--text-primary);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1200px) {
    display: flex;
  }
`;

export const TocTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: none;
  letter-spacing: 0.3px;

  @media (max-width: 1200px) {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const TocList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px 0;
  overflow-x: hidden;

  @media (max-width: 1200px) {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    margin-right: -8px;
    padding-right: 8px;
  }
`;

export const TocItem = styled.li`
  margin: 0;
  line-height: 1.6;
  transition: background-color 0.2s ease;
  padding-left: ${props => props.$level > 1 ? `${(props.$level - 1) * 12}px` : '0'};

  @media (max-width: 1200px) {
    margin-bottom: 8px;
  }
`;

export const TocLink = styled.a`
  display: block;
  padding: 10px 20px;
  font-size: 13.5px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  line-height: 1.6;
  word-break: break-word;
  font-weight: 500;

  &:hover {
    background-color: rgba(0, 175, 185, 0.06);
    color: var(--primary-color);
    border-left-color: rgba(0, 175, 185, 0.3);
    padding-left: 22px;
  }

  &.active {
    color: var(--primary-color);
    font-weight: 600;
    background-color: rgba(0, 175, 185, 0.1);
    border-left-color: var(--primary-color);
  }

  @media (max-width: 1200px) {
    font-size: 15px;
    padding: 12px 14px;
  }
`;
