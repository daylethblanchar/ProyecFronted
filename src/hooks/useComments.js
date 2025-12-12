/**
 * Hook for managing comments per article
 * @param {string} articleId - Article ID to manage comments for
 * @returns {Object} Comments state and operations
 */
import { useCallback, useEffect, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getByArticleId,
  createComment,
  updateComment,
  deleteComment,
  clearError,
  selectCommentsByArticleId,
  selectCommentsLoading,
  selectCommentsError,
  selectCommentCount,
} from '../store/slices/commentSlice'

export const useComments = articleId => {
  const dispatch = useDispatch()

  // Selectors
  const comments = useSelector(selectCommentsByArticleId(articleId))
  const loading = useSelector(selectCommentsLoading)
  const error = useSelector(selectCommentsError)
  const commentCount = useSelector(selectCommentCount(articleId))
  const hasComments = useMemo(() => comments.length > 0, [comments.length])

  // Ref para el polling
  const intervalRef = useRef(null)

  // Fetch comments (con soporte para limit)
  const fetchComments = useCallback(
    (options = {}) => {
      if (!articleId) {
        return Promise.reject(new Error('Article ID is required'))
      }
      const limit = options.limit ?? 5
      return dispatch(getByArticleId(articleId, limit)).unwrap()
    },
    [dispatch, articleId]
  )

  // Carga inicial (solo los últimos 5)
  useEffect(() => {
    if (articleId) {
      fetchComments({ limit: 5 }).catch(e => {
        // Silenciar errores en carga inicial
        console.log(e)
      })
    }
  }, [articleId, fetchComments])

  // Polling: actualizar cada 20 segundos cuando está visible
  const startPolling = useCallback(() => {
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      fetchComments({ limit: 5 }).catch(() => {
        // Fallar en silencio durante polling
      })
    }, 20000) // 20 segundos
  }, [fetchComments])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Limpiar polling al desmontar el componente
  useEffect(() => {
    return () => stopPolling()
  }, [stopPolling])

  // Crear comentario
  const addComment = useCallback(
    commentData => {
      if (!articleId) {
        return Promise.reject(new Error('Article ID is required'))
      }
      const normalizedData =
        typeof commentData === 'string' ? { contenido: commentData } : commentData

      if (!normalizedData.contenido || !normalizedData.contenido.trim()) {
        return Promise.reject(new Error('Comment content cannot be empty'))
      }

      return dispatch(createComment({ articleId, commentData: normalizedData })).unwrap()
    },
    [dispatch, articleId]
  )

  // Editar comentario
  const editComment = useCallback(
    (commentId, commentData) => {
      if (!commentId) {
        return Promise.reject(new Error('Comment ID is required'))
      }
      const normalizedData =
        typeof commentData === 'string' ? { contenido: commentData } : commentData

      if (!normalizedData.contenido || !normalizedData.contenido.trim()) {
        return Promise.reject(new Error('Comment content cannot be empty'))
      }

      return dispatch(updateComment({ articleId, commentId, commentData: normalizedData })).unwrap()
    },
    [dispatch, articleId]
  )

  // Eliminar comentario
  const removeComment = useCallback(
    commentId => {
      if (!commentId) {
        return Promise.reject(new Error('Comment ID is required'))
      }
      return dispatch(deleteComment({ commentId })).unwrap()
    },
    [dispatch]
  )

  // Limpiar error
  const resetError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    // Estado
    comments,
    loading,
    error,
    commentCount,
    hasComments,

    // Operaciones
    fetchComments: () => fetchComments({ limit: 5 }),
    loadAllComments: () => fetchComments({ limit: null }), // útil para "ver más"
    addComment,
    editComment,
    removeComment,
    resetError,

    // Control de polling (para usar en el componente)
    startPolling,
    stopPolling,
  }
}

export default useComments
