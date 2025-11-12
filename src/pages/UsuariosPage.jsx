import UsuariosList from '../components/Usuarios/UsuariosList';

/**
 * Página de gestión de usuarios (solo admin)
 */
const UsuariosPage = () => {
  return (
    <div className="container">
      <UsuariosList />
    </div>
  );
};

export default UsuariosPage;
