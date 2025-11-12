import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
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
      const result = await unified()
        .use(remarkParse) // Parsear Markdown
        .use(remarkRehype) // Convertir Markdown a HTML
        .use(rehypeSanitize) // Sanitizar HTML (seguridad)
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
