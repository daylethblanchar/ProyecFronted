import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
console.log("📥 AuthProvider importado correctamente");
import { router } from './router';

/**
 * Componente principal de la aplicación
 * Configura los providers y el router
 */
function App() {
  console.log("🎯 App component renderizado");
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
