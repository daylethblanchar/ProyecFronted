import useAuth from '../../hooks/useAuth'
import useComments from '../../hooks/useComments'
import { formatDate } from '../../utils/formatters'
import {
  WrapperComment,
  Avatar,
  ContentComment,
  HeaderComment,
  AuthorName,
  TextComment,
  DateComment,
  ActionComment,
} from './CommentItem.styled'

const CommentItem = ({ comentario, user }) => {
  const isOwner = user?._id === comentario.autor?._id

  return (
    <WrapperComment>
      <Avatar
        src={comentario.autor?.avatar || '/default-avatar.png'}
        alt={comentario.autor?.nombre}
      />
      <ContentComment>
        <HeaderComment>
          <AuthorName>{comentario.autor?.nombre || 'Anónimo'}</AuthorName>
          <DateComment>{formatDate(comentario.createdAt, 'relative')}</DateComment>
        </HeaderComment>
        <TextComment>{comentario.contenido}</TextComment>
        {isOwner && (
          <ActionComment>
            <button>Editar</button>
            <button style={{ color: 'var(--danger-color, #ef4444)' }}>Eliminar</button>
          </ActionComment>
        )}
      </ContentComment>
    </WrapperComment>
  )
}

export default CommentItem
