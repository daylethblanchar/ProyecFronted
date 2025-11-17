import PropTypes from 'prop-types';
import {
  FullScreenContainer,
  Container,
  Content,
  Message
} from './Loading.styles';

/**
 * Componente de carga/spinner
 * @param {Object} props
 * @param {string} props.size - Tamaño del spinner (sm, md, lg)
 * @param {string} props.message - Mensaje opcional a mostrar
 * @param {boolean} props.fullScreen - Si debe ocupar toda la pantalla
 */
const Loading = ({ size = 'md', message = '', fullScreen = false }) => {
  const spinnerClass = `spinner ${size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : ''}`;

  if (fullScreen) {
    return (
      <FullScreenContainer>
        <Content>
          <div className={spinnerClass}></div>
          {message && <Message>{message}</Message>}
        </Content>
      </FullScreenContainer>
    );
  }

  return (
    <Container>
      <div className={spinnerClass}></div>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;
