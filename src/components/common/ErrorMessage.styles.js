import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
`;

export const Icon = styled.span`
  font-size: var(--text-xl);
  flex-shrink: 0;
`;

export const MessageText = styled.p`
  margin: 0;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: var(--text-xl);
  cursor: pointer;
  padding: var(--spacing-xs);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  color: inherit;

  &:hover {
    opacity: 1;
  }
`;
