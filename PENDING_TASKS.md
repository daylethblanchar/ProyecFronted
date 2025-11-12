# Tareas Pendientes para Completar el Proyecto React

## Estado Actual
Se ha completado la estructura base del proyecto con:
- ✅ Inicialización del proyecto React + Vite con JavaScript
- ✅ Estructura de carpetas según architecture.md
- ✅ Schemas para validación (userSchema, notaSchema, authSchema)
- ✅ Configuración de API con Axios (apiConfig.js)
- ✅ Utilidades (validators.js, formatters.js)
- ✅ Constantes de la aplicación (constants.js)
- ✅ Servicios completos (authService, usuarioService, notaService)
- ✅ Archivos de configuración (package.json, vite.config.js, .eslintrc.cjs, .gitignore)

## Tareas Pendientes

### 1. Context y Hooks
**Archivos a crear:**
- `src/context/AuthContext.jsx` - Context para manejo de autenticación global
- `src/hooks/useAuth.js` - Hook personalizado para acceder al contexto de auth
- `src/hooks/useUsuarios.js` - Hook para operaciones CRUD de usuarios
- `src/hooks/useNotas.js` - Hook para operaciones CRUD de notas

### 2. Componentes Comunes
**Archivos a crear en `src/components/common/`:**
- `Navbar.jsx` - Barra de navegación principal
- `Footer.jsx` - Pie de página
- `Loading.jsx` - Componente de carga/spinner
- `ErrorMessage.jsx` - Componente para mostrar mensajes de error

### 3. Componentes de Autenticación
**Archivos a crear en `src/components/Auth/`:**
- `Login.jsx` - Formulario de inicio de sesión
- `Register.jsx` - Formulario de registro
- `ProtectedRoute.jsx` - HOC para proteger rutas que requieren autenticación

### 4. Componentes de Usuarios
**Archivos a crear en `src/components/Usuarios/`:**
- `UsuariosList.jsx` - Lista de usuarios con paginación
- `UsuarioForm.jsx` - Formulario para crear/editar usuarios
- `UsuarioCard.jsx` - Card para mostrar información de usuario individual

### 5. Componentes de Notas
**Archivos a crear en `src/components/Notas/`:**
- `NotasList.jsx` - Lista de notas con filtros por categoría
- `NotaForm.jsx` - Formulario para crear/editar notas
- `NotaCard.jsx` - Card para mostrar nota individual

### 6. Páginas
**Archivos a crear en `src/pages/`:**
- `HomePage.jsx` - Página principal (contenido del Index.html actual)
- `LoginPage.jsx` - Página de inicio de sesión
- `RegisterPage.jsx` - Página de registro
- `UsuariosPage.jsx` - Página de gestión de usuarios (admin)
- `NotasPage.jsx` - Página de gestión de notas

### 7. Routing
**Archivos a crear:**
- `src/router.jsx` - Configuración de rutas con React Router
- `src/App.jsx` - Componente principal que envuelve la aplicación

### 8. Punto de Entrada
**Archivos a crear:**
- `src/main.jsx` - Punto de entrada de la aplicación
- `index.html` - HTML principal (adaptar el actual)

### 9. Estilos
**Archivos a crear en `src/styles/`:**
- `index.css` - Estilos globales
- `variables.css` - Variables CSS (colores, fuentes, espaciados)

### 10. Archivos de Configuración
- Crear `.env` basado en `.env.example` con las URLs correctas del backend

## Orden Sugerido de Implementación

1. **Crear archivos de entrada y estilos:**
   - index.html
   - src/main.jsx
   - src/styles/variables.css
   - src/styles/index.css

2. **Implementar Context y Hooks:**
   - src/context/AuthContext.jsx
   - src/hooks/useAuth.js
   - src/hooks/useUsuarios.js
   - src/hooks/useNotas.js

3. **Crear componentes comunes:**
   - Navbar, Footer, Loading, ErrorMessage

4. **Implementar autenticación:**
   - Login, Register, ProtectedRoute

5. **Crear componentes de negocio:**
   - Usuarios (List, Form, Card)
   - Notas (List, Form, Card)

6. **Construir páginas:**
   - HomePage, LoginPage, RegisterPage, UsuariosPage, NotasPage

7. **Configurar routing:**
   - router.jsx
   - App.jsx

8. **Testing y ajustes finales**

## Notas Importantes

### Adaptación del Contenido Actual
El contenido actual en los archivos HTML (blog sobre depresión) debe ser adaptado a:
- **HomePage.jsx** - Usar el contenido de Index.html
- Páginas adicionales (pagina2.html, pagina3.html, pagina4.html) pueden convertirse en secciones o rutas

### Buenas Prácticas a Mantener
- ✅ Usar schemas para validación en todos los formularios
- ✅ Implementar manejo de errores en todos los componentes
- ✅ Usar custom hooks para lógica reutilizable
- ✅ Componentes pequeños y enfocados en una sola responsabilidad
- ✅ Comentarios JSDoc en funciones importantes
- ✅ Validación tanto en frontend como backend

### Dependencias Instaladas
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.0",
  "axios": "^1.6.7"
}
```

### Comandos Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de la build
npm run lint     # Ejecuta linter
```

## Para Continuar

Ejecutar:
```bash
npm run dev
```

Y comenzar a crear los archivos en el orden sugerido, comenzando por los archivos de entrada (main.jsx, App.jsx, index.html) y los estilos globales.
