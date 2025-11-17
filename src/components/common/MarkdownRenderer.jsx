import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import '../../styles/markdown.css';

/**
 * Componente para renderizar Markdown de forma segura
 * Usa remark para parsear Markdown y rehype para procesar HTML
 */
const MarkdownRenderer = ({ content }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const processMarkdown = async () => {
      // Configuración de sanitize que permite IDs en headings
      const sanitizeSchema = {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          h1: [...(defaultSchema.attributes?.h1 || []), 'id'],
          h2: [...(defaultSchema.attributes?.h2 || []), 'id'],
          h3: [...(defaultSchema.attributes?.h3 || []), 'id'],
          h4: [...(defaultSchema.attributes?.h4 || []), 'id'],
          h5: [...(defaultSchema.attributes?.h5 || []), 'id'],
          h6: [...(defaultSchema.attributes?.h6 || []), 'id'],
        }
      };

      const result = await unified()
        .use(remarkParse) // Parsear Markdown
        .use(remarkRehype) // Convertir Markdown a HTML
        .use(rehypeSlug) // Agregar IDs automáticos a los headings
        .use(rehypeSanitize, sanitizeSchema) // Sanitizar HTML (seguridad) pero mantener IDs
        .use(rehypeStringify) // Convertir a string HTML
        .process(content);

      setHtml(String(result));
    };

    if (content) {
      processMarkdown();
    }
  }, [content]);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
