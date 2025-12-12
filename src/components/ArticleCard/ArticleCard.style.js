import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PostCard = styled.div`
  /* Estilos adicionales específicos de la tarjeta si son necesarios */
`

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
  width: 100%;
`

export const PostTitle = styled.h3`
  font-size: var(--text-2xl);
  margin-bottom: 0;
  flex: 1;
`

export const CategoriaBadge = styled.span`
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  color: #ffffff;
  flex-shrink: 0;
  background-color: ${props => props.color || 'var(--primary-color)'};
`

export const ExcerptContainer = styled.div`
  position: relative;
  max-height: 100px;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
`

export const PostExcerpt = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
`

export const FadeOut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to bottom, transparent, var(--bg-primary));
  pointer-events: none;
`

export const ReadMoreButton = styled.button`
  margin-bottom: var(--spacing-lg);
`

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

export const AuthorName = styled.span`
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
`

export const PostDate = styled.span`
  font-size: var(--text-xs);
  color: var(--text-light);
`

export const CommentCount = styled.span`
  font-size: var(--text-sm);
  color: var(--text-secondary);
`

export const CommentSection = styled.div`
  ${({ theme }) => {
    const { spacing, colors } = theme
    return `
      padding: ${spacing.md};
      margin: 2em;
      background-color: ${colors.bg.secondary};
      border-top: 0px solid ${colors.border.default};
  `
  }}
`

export const ComentariosTitle = styled.h4`
  font-size: var(--text-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
`

export const ComentariosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`

export const NuevoComentarioForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`

export const ComentarioInput = styled.textarea`
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  font-size: var(--text-sm);
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
`

export const PublishCommentButton = styled.button`
  padding: 6px 12px;
  font-size: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const LoginToCommentLink = styled(Link)`
  padding: 6px 12px;
  font-size: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius-sm);
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const LoginPrompt = styled.div`
  text-align: center;
  padding: var(--spacing-md);
`

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
`

export const NoCommentsFounded = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-size: 18px;
  color: #666;
  text-align: center;
  padding: 40px;
`

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding: 20px;
`

export const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: ${props => (props.disabled ? '#f5f5f5' : '#fff')};
  color: ${props => (props.disabled ? '#999' : '#333')};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f0f0f0;
    border-color: #999;
  }
`

export const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
  min-width: 120px;
  text-align: center;
`
