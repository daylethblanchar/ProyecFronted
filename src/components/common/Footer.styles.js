import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
  padding: var(--spacing-xl) 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
`;

export const Text = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
`;

export const Links = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
`;

export const Link = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary-color);
  }
`;

export const Separator = styled.span`
  color: var(--text-light);
`;
