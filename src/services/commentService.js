/**
 * Comments Service - Handles comment-related API operations
 */

import { STORAGE_KEYS, API_BASE_URL } from '../utils/constants.js'
import { logger } from '../utils/Logger.js'

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
 * Fetches all comments for a specific article.
 *
 * @param {string|number} articleId - Article/nota ID
 * @returns {Promise<Array>} Array of comments
 * @throws {Error} If fetch fails or connection error occurs
 */
const getCommentsByArticleId = async articleId => {
  logger.log('🌐 commentService.getCommentsByArticleId initiated with:', articleId)

  if (!articleId) {
    throw new Error('Article ID is required')
  }

  try {
    const url = `${API_BASE_URL}/articles/${articleId}/comments`
    logger.log('📡 Sending request to:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch comments for article ${articleId}`)
    }

    const comments = data.comments || data.data || []
    logger.log(`✅ Found ${comments.length} comments`)

    return comments
  } catch (error) {
    logger.error('❌ Error in commentService.getCommentsByArticleId:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Creates a new comment on an article.
 *
 * @param {string|number} articleId - Article/nota ID
 * @param {Object} commentData - Comment data
 * @param {string} commentData.contenido - Comment content
 * @returns {Promise<Object>} Created comment object
 * @throws {Error} If creation fails or validation error occurs
 */
const createComment = async (articleId, commentData) => {
  logger.log('🌐 commentService.createComment initiated with:', { articleId, commentData })

  if (!articleId) {
    throw new Error('Article ID is required')
  }

  if (!commentData || typeof commentData !== 'object') {
    throw new Error('Invalid comment data')
  }

  if (!commentData.contenido || typeof commentData.contenido !== 'string') {
    throw new Error('Comment content is required')
  }

  if (commentData.contenido.trim().length === 0) {
    throw new Error('Comment content cannot be empty')
  }

  try {
    const url = `${API_BASE_URL}/articles/${articleId}/comments`
    logger.log('📡 Sending request to:', url)

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(commentData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Failed to create comment on article ${articleId}`)
    }

    logger.log('✅ Comment created successfully')
    return data.comment || data.data || data
  } catch (error) {
    logger.error('❌ Error in commentService.createComment:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Updates an existing comment.
 *
 * @param {string|number} articleId - Article/nota ID
 * @param {string|number} commentId - Comment ID
 * @param {Object} commentData - Updated comment data
 * @param {string} commentData.contenido - Updated comment content
 * @returns {Promise<Object>} Updated comment object
 * @throws {Error} If update fails
 */
const updateComment = async (articleId, commentId, commentData) => {
  logger.log('🌐 commentService.updateComment initiated with:', {
    articleId,
    commentId,
    commentData,
  })

  if (!articleId || !commentId) {
    throw new Error('Article ID and Comment ID are required')
  }

  if (!commentData || !commentData.contenido) {
    throw new Error('Comment content is required')
  }

  try {
    const url = `${API_BASE_URL}/comments/${articleId}`
    logger.log('📡 Sending request to:', url)

    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(commentData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update comment')
    }

    logger.log('✅ Comment updated successfully')
    return data.comment || data.data || data
  } catch (error) {
    logger.error('❌ Error in commentService.updateComment:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Deletes a comment.
 *
 * @param {string|number} articleId - Article/nota ID
 * @param {string|number} commentId - Comment ID
 * @returns {Promise<Object>} Deletion confirmation
 * @throws {Error} If deletion fails
 */
const deleteComment = async commentId => {
  logger.log('🌐 commentService.deleteComment initiated with:', { commentId })

  if (!commentId) {
    throw new Error('Article ID and Comment ID are required')
  }

  try {
    const url = `${API_BASE_URL}/comments/${commentId}`
    logger.log('📡 Sending request to:', url)

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete comment')
    }

    logger.log('✅ Comment deleted successfully')
    return data
  } catch (error) {
    logger.error('❌ Error in commentService.deleteComment:', error)
    throw new Error(error.message || 'Connection error')
  }
}

/**
 * Comments service object with all available methods.
 */
const commentService = {
  getByArticleId: getCommentsByArticleId,
  create: createComment,
  update: updateComment,
  delete: deleteComment,
}

export default commentService
