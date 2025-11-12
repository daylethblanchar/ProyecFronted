/**
 * Componente de pie de página
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.content}>
          <p style={styles.text}>
            &copy; {currentYear} Mi Aplicación. Todos los derechos reservados.
          </p>
          <div style={styles.links}>
            <a href="#" style={styles.link}>Términos de Servicio</a>
            <span style={styles.separator}>|</span>
            <a href="#" style={styles.link}>Política de Privacidad</a>
            <span style={styles.separator}>|</span>
            <a href="#" style={styles.link}>Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--bg-primary)',
    borderTop: '1px solid var(--border-color)',
    marginTop: 'auto',
    padding: 'var(--spacing-xl) 0',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  text: {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-sm)',
  },
  links: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    alignItems: 'center',
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: 'var(--text-sm)',
    transition: 'color var(--transition-fast)',
  },
  separator: {
    color: 'var(--text-light)',
  },
};

export default Footer;
