/**
 * Utilidad para encontrar artículos relacionados
 * Usa un algoritmo simple de similitud basado en categoría y palabras clave
 */

/**
 * Calcula la similitud entre dos artículos
 * @param {Object} article1 - Primer artículo
 * @param {Object} article2 - Segundo artículo
 * @returns {number} - Puntuación de similitud (0-100)
 */
const calculateSimilarity = (article1, article2) => {
  let score = 0;

  // 1. Misma categoría: +40 puntos
  if (article1.categoria === article2.categoria) {
    score += 40;
  }

  // 2. Mismo autor: +20 puntos
  if (article1.usuario === article2.usuario) {
    score += 20;
  }

  // 3. Palabras clave en común en título y contenido: +40 puntos máximo
  const keywords1 = extractKeywords(article1);
  const keywords2 = extractKeywords(article2);
  const commonKeywords = keywords1.filter(k => keywords2.includes(k));

  // Cada palabra clave en común suma 10 puntos (máximo 40)
  score += Math.min(commonKeywords.length * 10, 40);

  return score;
};

/**
 * Extrae palabras clave del título y contenido
 * @param {Object} article - Artículo
 * @returns {Array} - Array de palabras clave
 */
const extractKeywords = (article) => {
  // Palabras comunes a ignorar (stop words en español)
  const stopWords = [
    'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'haber',
    'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo', 'todo',
    'pero', 'más', 'hacer', 'o', 'poder', 'decir', 'este', 'ir', 'otro', 'ese',
    'la', 'si', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando', 'él', 'muy',
    'sin', 'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno', 'mismo',
    'yo', 'también', 'hasta', 'año', 'dos', 'querer', 'entre', 'así', 'primero',
    'desde', 'grande', 'eso', 'ni', 'nos', 'llegar', 'pasar', 'tiempo', 'ella',
    'sí', 'día', 'uno', 'bien', 'poco', 'deber', 'entonces', 'poner', 'cosa',
    'tanto', 'hombre', 'parecer', 'nuestro', 'tan', 'donde', 'ahora', 'parte',
    'después', 'vida', 'quedar', 'siempre', 'creer', 'hablar', 'llevar', 'dejar',
    'es', 'son', 'una', 'del', 'los', 'las', 'al', 'esta', 'este', 'estos',
    'estas', 'una', 'unas', 'unos', 'tu', 'tus', 'sus', 'puede', 'pueden',
    'cómo', 'cuándo', 'qué', 'cuál', 'cuáles'
  ];

  // Combinar título y resumen/contenido
  const text = `${article.titulo} ${article.resumen || article.contenido}`.toLowerCase();

  // Extraer palabras (eliminar caracteres especiales y números)
  const words = text
    .replace(/[^a-záéíóúñü\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3) // Palabras de más de 3 letras
    .filter(word => !stopWords.includes(word)); // Filtrar stop words

  // Retornar palabras únicas
  return [...new Set(words)];
};

/**
 * Encuentra artículos relacionados a un artículo dado
 * @param {Object} currentArticle - Artículo actual
 * @param {Array} allArticles - Lista de todos los artículos
 * @param {number} limit - Número máximo de artículos a retornar (default: 3)
 * @returns {Array} - Array de artículos relacionados ordenados por relevancia
 */
export const getRelatedArticles = (currentArticle, allArticles, limit = 3) => {
  if (!currentArticle || !allArticles || allArticles.length === 0) {
    return [];
  }

  // Filtrar el artículo actual
  const otherArticles = allArticles.filter(article => article._id !== currentArticle._id);

  // Calcular similitud para cada artículo
  const articlesWithScore = otherArticles.map(article => ({
    ...article,
    similarityScore: calculateSimilarity(currentArticle, article)
  }));

  // Ordenar por puntuación de similitud (descendente)
  const sortedArticles = articlesWithScore.sort((a, b) => b.similarityScore - a.similarityScore);

  // Retornar los top N artículos
  return sortedArticles.slice(0, limit);
};

export default {
  getRelatedArticles,
  calculateSimilarity,
  extractKeywords
};
