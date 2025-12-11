import { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllArticles,
  fetchArticleById,
  fetchArticlesByUserId,
  fetchArticlesByCategory,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  clearError,
  clearCurrentArticle,
  clearFilters,
  invalidateCache,
  setFilters,
  setSearchQuery,
  selectAllArticles,
  selectCurrentArticle,
  selectFilteredArticles,
  selectArticlesLoading,
  selectArticlesError,
  selectFilters,
  selectSearchQuery,
} from '../store/slices/articleSlice'

export const useArticles = ({ autoFetch = false } = {}) => {
  const dispatch = useDispatch()

  // Selectors
  const articles = useSelector(selectAllArticles)
  const currentArticle = useSelector(selectCurrentArticle)
  const filteredArticles = useSelector(selectFilteredArticles)
  const loading = useSelector(selectArticlesLoading)
  const error = useSelector(selectArticlesError)
  const filters = useSelector(selectFilters)
  const searchQuery = useSelector(selectSearchQuery)

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && articles.length === 0 && !loading) {
      dispatch(fetchAllArticles())
    }
  }, [autoFetch, articles.length, loading, dispatch])

  // CRUD operations
  const fetchAll = useCallback(() => {
    return dispatch(fetchAllArticles()).unwrap()
  }, [dispatch])

  const fetchAllByUserId = useCallback(() => {
    return dispatch(fetchArticlesByUserId()).unwrap()
  }, [dispatch])

  const fetchById = useCallback(
    id => {
      return dispatch(fetchArticleById(id)).unwrap()
    },
    [dispatch]
  )

  const create = useCallback(
    articleData => {
      return dispatch(createArticle(articleData)).unwrap()
    },
    [dispatch]
  )

  const update = useCallback(
    (id, articleData) => {
      return dispatch(updateArticle({ id, articleData })).unwrap()
    },
    [dispatch]
  )

  const remove = useCallback(
    id => {
      return dispatch(deleteArticle(id)).unwrap()
    },
    [dispatch]
  )

  // Filter & search operations
  const filterByCategory = useCallback(
    category => {
      return dispatch(fetchArticlesByCategory(category)).unwrap()
    },
    [dispatch]
  )

  const search = useCallback(
    query => {
      return dispatch(searchArticles(query)).unwrap()
    },
    [dispatch]
  )

  const updateFilters = useCallback(
    newFilters => {
      dispatch(setFilters(newFilters))
    },
    [dispatch]
  )

  const updateSearchQuery = useCallback(
    query => {
      dispatch(setSearchQuery(query))
    },
    [dispatch]
  )

  const resetFilters = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  // Cache management
  const refreshCache = useCallback(() => {
    dispatch(invalidateCache())
  }, [dispatch])

  // Utilities
  const resetError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const resetCurrentArticle = useCallback(() => {
    dispatch(clearCurrentArticle())
  }, [dispatch])

  // Computed values
  const hasArticles = useMemo(() => articles.length > 0, [articles.length])

  const articlesByCategory = useMemo(() => {
    return articles.reduce((acc, article) => {
      const category = article.categoria || article.category || 'uncategorized'
      if (!acc[category]) acc[category] = []
      acc[category].push(article)
      return acc
    }, {})
  }, [articles])

  const stats = useMemo(() => {
    return {
      total: articles.length,
      categories: Object.keys(articlesByCategory).length,
    }
  }, [articles.length, articlesByCategory])

  return {
    // State
    articles,
    currentArticle,
    filteredArticles,
    loading,
    error,
    filters,
    searchQuery,

    // Counts
    hasArticles,

    // CRUD operations
    fetchAll,
    fetchAllByUserId,
    fetchById,
    create,
    update,
    remove,

    // Filter & search
    filterByCategory,
    search,
    updateFilters,
    updateSearchQuery,
    resetFilters,

    // Cache management
    refreshCache,

    // Utilities
    resetError,
    resetCurrentArticle,

    // Computed data
    articlesByCategory,
    stats,
  }
}

export default useArticles
