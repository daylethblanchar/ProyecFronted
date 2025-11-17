import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xl);

  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-xs);
  }
`;

export const BackButton = styled.button`
  margin-bottom: var(--spacing-xl);
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: var(--spacing-2xl);
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const TocSidebar = styled.aside`
  flex: 0 0 280px;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotFound = styled.div`
  text-align: center;
  padding: var(--spacing-3xl);
`;

export const ArticleCard = styled.article`
  margin-bottom: var(--spacing-2xl);
`;

export const ArticleHeader = styled.div`
  padding: var(--spacing-2xl);
  border-bottom: 1px solid var(--border-color);
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

export const CategoriaBadge = styled.span`
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  color: #ffffff;
  background-color: ${props => props.$color};
`;

export const Fecha = styled.span`
  font-size: var(--text-sm);
  color: var(--text-light);
`;

export const Titulo = styled.h1`
  font-size: var(--text-4xl);
  margin-bottom: var(--spacing-xl);
  line-height: 1.2;
  color: var(--text-primary);
`;

export const AutorSection = styled.div`
  margin-top: var(--spacing-xl);
`;

export const AutorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

export const AvatarLarge = styled.span`
  font-size: 48px;
  line-height: 1;
`;

export const AutorNombre = styled.p`
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
`;

export const AutorBio = styled.p`
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
`;

export const ArticleContent = styled.div`
  padding: var(--spacing-2xl);
`;

export const ComentariosCard = styled.div`
  padding: var(--spacing-xl);
`;

export const ComentariosHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`;

export const ComentariosTitle = styled.h2`
  margin: 0;
  font-size: var(--text-2xl);
`;

export const ComentariosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

export const NoComentarios = styled.p`
  text-align: center;
  color: var(--text-secondary);
  padding: var(--spacing-xl);
  font-style: italic;
`;

export const NuevoComentarioForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
`;

export const FormTitle = styled.h3`
  margin: 0;
  font-size: var(--text-lg);
  color: var(--text-primary);
`;

export const ComentarioInput = styled.textarea`
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  font-size: var(--text-md);
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
`;

export const LoginPrompt = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
`;

export const RelatedArticlesCard = styled.div`
  padding: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
`;

export const RelatedTitle = styled.h2`
  margin: 0;
  margin-bottom: var(--spacing-xl);
  font-size: var(--text-2xl);
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: var(--spacing-md);
`;

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
`;

export const RelatedCard = styled.a`
  padding: var(--spacing-lg);
  text-decoration: none;
  display: block;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: pointer;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 129, 167, 0.1);
  }
`;

export const RelatedHeader = styled.div`
  margin-bottom: var(--spacing-md);
`;

export const RelatedBadge = styled.span`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  color: #ffffff;
  display: inline-block;
  background-color: ${props => props.$color};
`;

export const RelatedCardTitle = styled.h3`
  margin: 0;
  margin-bottom: var(--spacing-sm);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
`;

export const RelatedExcerpt = styled.p`
  margin: 0;
  margin-bottom: var(--spacing-md);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
`;

export const RelatedMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
`;

export const RelatedAuthor = styled.span`
  color: var(--text-light);
`;

export const RelatedReadMore = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;
