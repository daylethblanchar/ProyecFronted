import {
  FooterContainer,
  Content,
  Text,
  Links,
  Link,
  Separator
} from './Footer.styles';

/**
 * Componente de pie de página
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <div className="container">
        <Content>
          <Text>
            &copy; {currentYear} Mi Aplicación. Todos los derechos reservados.
          </Text>
          <Links>
            <Link href="#">Términos de Servicio</Link>
            <Separator>|</Separator>
            <Link href="#">Política de Privacidad</Link>
            <Separator>|</Separator>
            <Link href="#">Contacto</Link>
          </Links>
        </Content>
      </div>
    </FooterContainer>
  );
};

export default Footer;
