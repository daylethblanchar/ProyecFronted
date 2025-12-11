/**
 * Article Service - Connects to backend API
 * Base URL: http://localhost:5000/api/articles
 */

import { STORAGE_KEYS, API_BASE_URL } from '../utils/constants'
import { logger } from '../utils/Logger'

/**
 * Gets authentication token from localStorage.
 *
 * @returns {string|null} JWT token or null
 */
const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
}

/**
 * Generates common headers for authenticated requests.
 *
 * @returns {Object} Headers object with Content-Type and Authorization
 */
const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

/**
 * Fetches all articles for the current user.
 *
 * @returns {Promise<Array>} Array of articles
 * @throws {Error} If request fails or connection error occurs
 *
 * @example
 * const articles = await getArticles()
 */
const getArticles = async () => {
  logger.log('🌐 articleService.getArticles initiated')
  try {
    logger.log('📡 Sending request to:', `${API_BASE_URL}/articles`)
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch articles')
    }

    return data.articles || data.data || []
  } catch (error) {
    logger.error('❌ Error in articleService.getArticles:', error)
    throw new Error(error.message || 'Connection error')
  }
}

const getArticlesByUserId = async userId => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch articles')
    }

    return data.articles || data.data || []
  } catch (error) {
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Fetches a single article by ID.
 *
 * @param {string|number} id - Article ID
 * @returns {Promise<Object>} Article object
 * @throws {Error} If article not found or connection error occurs
 *
 * @example
 * const article = await getArticleById('123')
 */
const getArticleById = async id => {
  logger.log('🌐 articleService.getArticleById initiated with:', id)

  if (!id) {
    throw new Error('Article ID is required')
  }

  try {
    logger.log('📡 Sending request to:', `${API_BASE_URL}/articles/${id}`)
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Article not found')
    }

    return data.article || data.data || data
  } catch (error) {
    logger.error('❌ Error in articleService.getArticleById:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Filters articles by category.
 *
 * @param {string} categoria - Category name or ID
 * @returns {Promise<Array>} Array of filtered articles
 * @throws {Error} If request fails or connection error occurs
 *
 * @example
 * const articles = await getArticlesByCategoria('technology')
 */
const getArticlesByCategory = async categoria => {
  logger.log('🌐 articleService.getArticlesByCategoria initiated with:', categoria)

  if (!categoria) {
    logger.warn('⚠️ Empty category provided, returning all articles')
    return getArticles()
  }

  try {
    const encodedCategory = encodeURIComponent(categoria)
    const url = `${API_BASE_URL}/articles?categoria=${encodedCategory}`

    logger.log('📡 Sending request to:', url)
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch articles by category')
    }

    return data.articles || data.data || []
  } catch (error) {
    logger.error('❌ Error in articleService.getArticlesByCategoria:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Creates a new article.
 *
 * @param {Object} articleData - Article data
 * @param {string} articleData.titulo - Article title
 * @param {string} articleData.contenido - Article content
 * @returns {Promise<Object>} Created article object
 * @throws {Error} If creation fails or validation error occurs
 *
 * @example
 * const newArticle = await createArticleService({ titulo: 'My Article', contenido: 'Content...' })
 */
const createArticleService = async articleData => {
  logger.log('🌐 articleService.createArticleService initiated with:', articleData)

  if (!articleData || typeof articleData !== 'object') {
    throw new Error('Invalid article data')
  }

  if (!articleData.titulo || !articleData.contenido) {
    throw new Error('Title and content are required')
  }

  try {
    logger.log('📡 Sending request to:', `${API_BASE_URL}/articles`)
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(articleData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create article')
    }

    logger.log('✅ Article created successfully')
    return data.article || data.data || data
  } catch (error) {
    logger.error('❌ Error in articleService.createArticleService:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Updates an existing article.
 *
 * @param {string|number} id - Article ID
 * @param {Object} articleData - Updated article data
 * @param {string} [articleData.titulo] - Article title
 * @param {string} [articleData.contenido] - Article content
 * @returns {Promise<Object>} Updated article object
 * @throws {Error} If update fails or article not found
 *
 * @example
 * const updated = await updateArticle('123', { titulo: 'New Title' })
 */
const updateArticle = async (id, articleData) => {
  logger.log('🌐 articleService.updateArticle initiated with:', { id, articleData })

  if (!id) {
    throw new Error('Article ID is required')
  }

  if (!articleData || typeof articleData !== 'object') {
    throw new Error('Invalid article data')
  }

  try {
    logger.log('📡 Sending request to:', `${API_BASE_URL}/articles/${id}`)
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(articleData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update article')
    }

    logger.log('✅ Article updated successfully')
    return data.article || data.data || data
  } catch (error) {
    logger.error('❌ Error in articleService.updateArticle:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Deletes an article.
 *
 * @param {string|number} id - Article ID
 * @returns {Promise<Object>} Deletion confirmation
 * @throws {Error} If deletion fails or article not found
 *
 * @example
 * await deleteArticle('123')
 */
const deleteArticle = async id => {
  logger.log('🌐 articleService.deleteArticle initiated with:', id)

  if (!id) {
    throw new Error('Article ID is required')
  }

  try {
    logger.log('📡 Sending request to:', `${API_BASE_URL}/articles/${id}`)
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete article')
    }

    logger.log('✅ Article deleted successfully')
    return data
  } catch (error) {
    logger.error('❌ Error in articleService.deleteArticle:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Searches articles by title or description content.
 *
 * @param {string} query - Search term to match against article titles and descriptions
 * @returns {Promise<Array>} Array of matching articles
 * @throws {Error} If search fails or connection error occurs
 *
 * @example
 * const results = await searchArticles('javascript')
 */
const searchArticles = async query => {
  logger.log('🌐 articleService.searchArticles initiated with:', query)

  if (!query || typeof query !== 'string') {
    logger.warn('⚠️ Invalid search query:', query)
    return []
  }

  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    logger.log('ℹ️ Empty search query, returning empty array')
    return []
  }

  try {
    const encodedQuery = encodeURIComponent(trimmedQuery)
    const url = `${API_BASE_URL}/articles/search?q=${encodedQuery}`

    logger.log('📡 Sending request to:', url)
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Search failed')
    }

    const articles = data.articles || data.data || []
    logger.log(`✅ Found ${articles.length} articles`)

    return articles
  } catch (error) {
    logger.error('❌ Error in articleService.searchArticles:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Creates a debounced version of a function to avoid excessive API calls.
 *
 * @param {Function} func - Function to debounce
 * @param {number} [delay=300] - Delay in milliseconds
 * @returns {Function} Debounced function
 *
 * @example
 * const debouncedSearch = debounce(searchArticles, 300)
 * await debouncedSearch('javascript')
 */
export const debounce = (func, delay = 300) => {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

/**
 * Article service object with all available methods.
 *
 * @constant
 * @type {Object}
 */
export const articleService = {
  getAll: getArticles,
  getById: getArticleById,
  getByUserId: getArticlesByUserId,
  getByCategory: getArticlesByCategory,
  create: createArticleService,
  update: updateArticle,
  delete: deleteArticle,
  search: searchArticles,
}

export default articleService
