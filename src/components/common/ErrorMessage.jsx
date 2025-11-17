import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Icon,
  MessageText,
  CloseButton
} from './ErrorMessage.styles';

/**
 * Componente para mostrar mensajes de error
 * @param {Object} props
 * @param {string} props.message - Mensaje de error a mostrar
 * @param {Function} props.onClose - Función para cerrar el mensaje
 * @param {string} props.type - Tipo de alerta (error, warning, info, success)
 */
const ErrorMessage = ({ message, onClose, type = 'error' }) => {
  if (!message) return null;

  const alertClass = `alert alert-${type}`;

  return (
    <Container className={alertClass}>
      <Content>
        <Icon>
          {type === 'error' && '⚠️'}
          {type === 'warning' && '⚡'}
          {type === 'info' && 'ℹ️'}
          {type === 'success' && '✓'}
        </Icon>
        <MessageText>{message}</MessageText>
      </Content>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Cerrar">
          ✕
        </CloseButton>
      )}
    </Container>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

export default ErrorMessage;
