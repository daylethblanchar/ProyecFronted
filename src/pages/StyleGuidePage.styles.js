import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-2xl);
`;

export const PageTitle = styled.h1`
  color: var(--primary-color);
  font-size: var(--text-4xl);
  margin-bottom: var(--spacing-lg);
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: var(--spacing-md);
`;

export const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: var(--text-lg);
  margin-bottom: var(--spacing-3xl);
  line-height: 1.6;
`;

export const Section = styled.section`
  margin-bottom: var(--spacing-3xl);
`;

export const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-size: var(--text-2xl);
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
`;

export const ComponentCard = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 129, 167, 0.15);
    border-color: var(--primary-color);
  }
`;

export const ComponentName = styled.h3`
  color: var(--primary-color);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  font-family: 'Courier New', monospace;
`;

export const ComponentDescription = styled.p`
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
`;

export const ComponentPreview = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CodeBlock = styled.pre`
  background: #2d2d2d;
  color: #f8f8f2;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: var(--text-sm);
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  margin: 0;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }
`;

export const PropsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--spacing-md);
  font-size: var(--text-sm);
`;

export const PropsTableHeader = styled.thead`
  background: var(--bg-secondary);
`;

export const PropsTableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
`;

export const PropsTableHeaderCell = styled.th`
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
`;

export const PropsTableCell = styled.td`
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
`;

export const Badge = styled.span`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: ${props => props.$color || 'var(--primary-color)'};
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  margin-right: var(--spacing-xs);
`;

export const FilePathBadge = styled.code`
  display: inline-block;
  background: rgba(0, 175, 185, 0.1);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: 'Courier New', monospace;
  margin-top: var(--spacing-sm);
`;
