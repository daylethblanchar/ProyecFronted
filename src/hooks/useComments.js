/**
 * Custom hook for managing comments state and operations.
 * Provides a clean API for fetching, creating, updating, and deleting comments.
 *
 * @param {string} [articleId] - Article ID to manage comments for
 * @returns {Object} Comments state and operations
 *
 * @example
 * // Basic usage
 * const { comments, loading, addComment } = useComments(articleId)
 *
 * @example
 * // With auto-fetch disabled
 * const { comments, fetchComments } = useComments(articleId, { autoFetch: false })
 */

import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCommentsByArticleId,
  createComment,
  updateComment,
  deleteComment,
  clearError,
  clearComments,
  clearCommentsForArticle,
  resetCommentsState,
  selectCommentsByArticleId,
  selectCommentsLoading,
  selectCommentsError,
  selectCurrentArticleId,
  selectCommentCount,
} from '../store/slices/commentsSlice'

export const useComments = (articleId = null, options = {}) => {
  const { autoFetch = true } = options

  const dispatch = useDispatch()

  // ====================================
  // 📊 STATE SELECTORS
  // ====================================

  const comments = useSelector(selectCommentsByArticleId(articleId))
  const loading = useSelector(selectCommentsLoading)
  const error = useSelector(selectCommentsError)
  const currentArticleId = useSelector(selectCurrentArticleId)
  const commentCount = useSelector(selectCommentCount(articleId))

  // ====================================
  // 🔄 FETCH OPERATIONS
  // ====================================

  /**
   * Fetches comments for the specified article.
   *
   * @returns {Promise<Array>} Array of comments
   * @throws {Error} If article ID is not provided
   *
   * @example
   * await fetchComments()
   */
  const fetchComments = useCallback(() => {
    if (!articleId) {
      const error = new Error('Article ID is required to fetch comments')
      console.warn('⚠️ useComments: No article ID provided')
      return Promise.reject(error)
    }

    return dispatch(fetchCommentsByArticleId(articleId)).unwrap()
  }, [dispatch, articleId])

  // ====================================
  // ✏️ CREATE OPERATIONS
  // ====================================

  /**
   * Creates a new comment on the article.
   *
   * @param {string|Object} commentData - Comment content string or data object
   * @returns {Promise<Object>} Created comment
   * @throws {Error} If article ID is not provided or content is empty
   *
   * @example
   * // Simple string
   * await addComment('Great article!')
   *
   * @example
   * // With object
   * await addComment({ contenido: 'Great article!' })
   */
  const addComment = useCallback(
    commentData => {
      if (!articleId) {
        const error = new Error('Article ID is required to create comment')
        console.warn('⚠️ useComments: No article ID provided')
        return Promise.reject(error)
      }

      // Normalize input: accept both string and object
      const normalizedData =
        typeof commentData === 'string' ? { contenido: commentData } : commentData

      if (!normalizedData.contenido || normalizedData.contenido.trim() === '') {
        const error = new Error('Comment content cannot be empty')
        return Promise.reject(error)
      }

      return dispatch(createComment({ articleId, commentData: normalizedData })).unwrap()
    },
    [dispatch, articleId]
  )

  // ====================================
  // 🔄 UPDATE OPERATIONS
  // ====================================

  /**
   * Updates an existing comment.
   *
   * @param {string} commentId - Comment ID to update
   * @param {string|Object} commentData - Updated content string or data object
   * @returns {Promise<Object>} Updated comment
   * @throws {Error} If required parameters are missing
   *
   * @example
   * await editComment('comment-123', 'Updated content')
   */
  const editComment = useCallback(
    (commentId, commentData) => {
      if (!articleId) {
        const error = new Error('Article ID is required to update comment')
        return Promise.reject(error)
      }

      if (!commentId) {
        const error = new Error('Comment ID is required to update comment')
        return Promise.reject(error)
      }

      const normalizedData =
        typeof commentData === 'string' ? { contenido: commentData } : commentData

      if (!normalizedData.contenido || normalizedData.contenido.trim() === '') {
        const error = new Error('Comment content cannot be empty')
        return Promise.reject(error)
      }

      return dispatch(updateComment({ articleId, commentId, commentData: normalizedData })).unwrap()
    },
    [dispatch, articleId]
  )

  // ====================================
  // 🗑️ DELETE OPERATIONS
  // ====================================

  /**
   * Deletes a comment.
   *
   * @param {string} commentId - Comment ID to delete
   * @returns {Promise<Object>} Deletion result
   * @throws {Error} If comment ID is not provided
   *
   * @example
   * await removeComment('comment-123')
   */
  const removeComment = useCallback(
    commentId => {
      if (!commentId) {
        const error = new Error('Comment ID is required to delete comment')
        return Promise.reject(error)
      }

      return dispatch(deleteComment({ commentId })).unwrap()
    },
    [dispatch]
  )

  // ====================================
  // 🧹 UTILITY OPERATIONS
  // ====================================

  /**
   * Clears the current error message.
   *
   * @example
   * resetError()
   */
  const resetError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  /**
   * Clears all comments from state.
   *
   * @example
   * clearAllComments()
   */
  const clearAllComments = useCallback(() => {
    dispatch(clearComments())
  }, [dispatch])

  /**
   * Clears comments for the current article only.
   *
   * @example
   * clearArticleComments()
   */
  const clearArticleComments = useCallback(() => {
    if (articleId) {
      dispatch(clearCommentsForArticle(articleId))
    }
  }, [dispatch, articleId])

  /**
   * Resets entire comments state to initial values.
   *
   * @example
   * resetState()
   */
  const resetState = useCallback(() => {
    dispatch(resetCommentsState())
  }, [dispatch])

  // ====================================
  // 🔍 COMPUTED VALUES
  // ====================================

  /**
   * Checks if there are any comments.
   */
  const hasComments = useMemo(() => comments.length > 0, [comments])

  /**
   * Checks if comments are loaded for the current article.
   */
  const isLoaded = useMemo(
    () => articleId === currentArticleId && comments.length >= 0,
    [articleId, currentArticleId, comments]
  )

  /**
   * Checks if this is the first load.
   */
  const isFirstLoad = useMemo(() => !isLoaded && !loading && !error, [isLoaded, loading, error])

  // ====================================
  // ⚡ SIDE EFFECTS
  // ====================================

  /**
   * Auto-fetch comments when article ID changes.
   */
  useEffect(() => {
    if (autoFetch && articleId && !isLoaded && !loading) {
      fetchComments().catch(err => {
        console.error('Failed to auto-fetch comments:', err)
      })
    }
  }, [articleId, autoFetch, isLoaded, loading, fetchComments])

  /**
   * Cleanup: Clear comments when component unmounts (optional).
   * Uncomment if you want to clear on unmount.
   */
  useEffect(() => {
    return () => {
      if (articleId) {
        clearArticleComments()
      }
    }
  }, [articleId, clearArticleComments])

  // ====================================
  // 📤 RETURN API
  // ====================================

  return {
    // State
    comments,
    loading,
    error,
    commentCount,
    currentArticleId,

    // Computed
    hasComments,
    isLoaded,
    isFirstLoad,

    // CRUD operations
    fetchComments,
    addComment,
    editComment,
    removeComment,

    // Utilities
    resetError,
    clearAllComments,
    clearArticleComments,
    resetState,
  }
}

export default useComments
