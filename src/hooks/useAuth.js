import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @returns {Object} Contexto de autenticación con métodos y estado
 * @throws {Error} Si se usa fuera del AuthProvider
 */
export const useAuth = () => {
  console.log("🪝 useAuth hook ejecutado");
  const context = useContext(AuthContext);
  console.log("📋 Context obtenido:", context ? "✅ existe" : "❌ null");

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};
