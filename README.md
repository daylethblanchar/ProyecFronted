# Blog de Salud Mental y Bienestar - React

Proyecto de aprendizaje de React - Blog público sobre salud mental donde cualquiera puede leer los artículos, pero solo usuarios autenticados pueden crear posts y comentar.

## Características

- ✅ **Blog público** - Cualquiera puede leer los artículos sin registro
- ✅ Sistema de autenticación (Login/Registro)
- ✅ **Crear posts** (Solo usuarios autenticados)
- ✅ **Comentarios** (Solo usuarios autenticados - próximamente)
- ✅ Filtros por categoría (Trabajo, Personal, Estudio, Otros)
- ✅ Gestión de usuarios (solo administradores)
- ✅ Diseño responsive

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3001/` (o el puerto que esté disponible).

## Cómo Probar la Aplicación

### Datos de Prueba (Mock Data)

Esta aplicación usa datos simulados (mock data) para que puedas probarla sin necesidad de un backend.

#### Usuarios disponibles:

1. **Administrador**
   - Correo: `admin@example.com`
   - Contraseña: cualquier texto de 6+ caracteres (ej: `123456`)

2. **Usuario Normal**
   - Correo: `juan@example.com`
   - Contraseña: cualquier texto de 6+ caracteres (ej: `123456`)

### Funcionalidades por Rol

**Usuario Normal:**
- Ver, crear, editar y eliminar sus propias notas
- Filtrar notas por categoría
- Ver su perfil

**Administrador:**
- Todo lo anterior +
- Ver lista de todos los usuarios
- Crear, editar y eliminar usuarios

### Crear Cuenta Nueva

También puedes registrar una cuenta nueva desde el formulario de registro. Los nuevos usuarios se crean con rol "user" por defecto.

## Estructura del Proyecto

```
src/
├── components/        # Componentes React
│   ├── Auth/         # Login, Register, ProtectedRoute
│   ├── common/       # Navbar, Footer, Loading, ErrorMessage
│   ├── Notas/        # Componentes de notas
│   └── Usuarios/     # Componentes de usuarios
├── context/          # Context API (AuthContext)
├── hooks/            # Custom hooks
├── pages/            # Páginas de la aplicación
├── services/         # Servicios con mock data
├── styles/           # Estilos CSS globales
├── utils/            # Utilidades y validaciones
├── App.jsx           # Componente principal
├── main.jsx          # Punto de entrada
└── router.jsx        # Configuración de rutas
```

## Tecnologías Utilizadas

- **React 18** - Biblioteca principal
- **React Router DOM** - Navegación
- **Vite** - Build tool y dev server
- **CSS Variables** - Estilos personalizables

## Notas Importantes

⚠️ Esta aplicación usa **mock data** (datos simulados) para demostración y aprendizaje. Los datos se guardan en `localStorage` y se reinician al refrescar la página.

⚠️ Las validaciones de password son básicas para propósitos educativos. En una aplicación real, la autenticación debe manejarse con un backend seguro.

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de la build
npm run lint     # Ejecuta linter
```

## Aprendiendo React

Este proyecto es ideal para aprender:
- Componentes funcionales y hooks
- Context API para manejo de estado global
- React Router para navegación
- Formularios y validaciones
- CRUD operations
- Organización de proyectos React
