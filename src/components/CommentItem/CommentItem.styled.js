import styled from 'styled-components'

export const WrapperComment = styled.div`
  display: flex;
  gap: var(--spacing-md);
  background: var(--bg-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
`

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #e2e8f0;
  flex-shrink: 0;
`

export const ContentComment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

export const HeaderComment = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--text-sm);
`
export const AuthorName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`

export const TextComment = styled.p`
  margin: 0;
  color: var(--text-primary);
  line-height: 1.6;
  font-size: var(--text-base);
`

export const DateComment = styled.span`
  color: var(--text-light);
  font-size: var(--text-xs);
`

export const ActionComment = styled.div`
  margin-top: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--text-xs);
  button {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`
