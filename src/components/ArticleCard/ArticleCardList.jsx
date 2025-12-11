import { memo } from 'react'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../common/ErrorMessage'
import { Variant1 as ArticleCard } from './Variant1'
import { PostsGrid, NoCommentsFounded } from './ArticleCard.style'
import useArticles from '../../hooks/useArticles'

const MemoizedVariant1 = memo(ArticleCard)

function ArticleCardList() {
  const { articles, loading, error, hasArticles } = useArticles()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!hasArticles) return <NoCommentsFounded>No articles found</NoCommentsFounded>

  return (
    <PostsGrid>
      {articles.map(article => (
        <MemoizedVariant1 key={article._id} post={article} />
      ))}
    </PostsGrid>
  )
}

export default memo(ArticleCardList)
