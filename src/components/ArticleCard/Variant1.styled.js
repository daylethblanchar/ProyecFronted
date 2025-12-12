// src/components/Notas/Variant1.styled.js
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// =============================================
// TARJETA PRINCIPAL
// =============================================
export const PostCard = styled.article`
  background: var(--bg-primary, #ffffff);
  border-radius: var(--radius-xl, 16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  padding-bottom: 0;
`

export const PostTitle = styled.h3`
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  flex: 1;
`

export const CategoriaBadge = styled.span`
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  color: white;
  background-color: ${props => props.color || 'var(--primary-color)'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
`

export const ExcerptContainer = styled.div`
  position: relative;
  padding: 0 var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  max-height: 110px;
  overflow: hidden;
`

export const PostExcerpt = styled.p`
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: var(--text-base);
`

export const FadeOut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(transparent, var(--bg-primary, #ffffff));
`

export const ReadMoreLink = styled(Link)`
  display: inline-block;
  margin: 0 var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const PostMeta = styled.div`
  padding: 0 var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-light);
  font-size: var(--text-sm);
`

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const AuthorName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`

export const PostDate = styled.time`
  font-size: var(--text-xs);
`

export const FooterActions = styled.div`
  padding: var(--spacing-lg);
  padding-top: 0;
`

export const ToggleCommentsBtn = styled.button`
  background: ${p => (p.active ? 'var(--primary-color)' : 'transparent')};
  color: ${p => (p.active ? 'white' : 'var(--text-secondary)')};
  border: 2px solid ${p => (p.active ? 'var(--primary-color)' : 'var(--border-color)')};
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`

export const CommentCount = styled.span`
  background: ${p => (p.active ? 'rgba(255,255,255,0.3)' : 'var(--primary-color)')};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  min-width: 22px;
  text-align: center;
`

// =============================================
// SECCIÓN DE COMENTARIOS
// =============================================
export const CommentSection = styled.div`
  background: var(--bg-secondary, #f8fafc);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-xl);
  margin-top: var(--spacing-lg);
`

export const ComentariosTitle = styled.h4`
  margin: 0 0 var(--spacing-lg);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
`

export const ComentariosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`

export const NoComments = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-light);
  font-style: italic;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--border-color);
`

export const LoadMoreBtn = styled.button`
  margin: var(--spacing-lg) auto;
  display: block;
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 0.75rem 1.8rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`

export const NuevoComentarioForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px dashed var(--border-color);
`

export const ComentarioTextarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  font-family: inherit;
  font-size: var(--text-base);
  line-height: 1.6;
  resize: vertical;
  min-height: 110px;
  transition: all 0.25s;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  }
`

export const PublishButton = styled.button`
  align-self: flex-end;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--primary-dark, #4f46e5);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const LoginToComment = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  font-size: var(--text-base);

  a {
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: underline;
  }
`
