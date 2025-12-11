# Frontend Architecture

## Tech Stack
- **React 18** - UI Framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Variables** - Styling system
- **JWT** - Authentication

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Login, Register, ProtectedRoute
│   ├── common/         # Navbar, Footer, Loading, ErrorMessage
│   ├── Notas/          # Note-related components
│   └── Usuarios/       # User management components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── services/           # API service functions
├── schemas/            # Validation schemas
├── styles/             # Global CSS and variables
└── utils/              # Helper functions and constants
```

## Architecture Patterns

### **Component Organization**
- **Pages**: Route-level components
- **Components**: Reusable UI elements organized by feature
- **Common**: Shared components across features

### **State Management**
- **Local State**: `useState` for component-specific data
- **Global State**: Context API for authentication
- **Server State**: Custom hooks with fetch-based data fetching

### **Data Flow**
```
Backend API ↔ Services ↔ Custom Hooks ↔ Components
```

### **Authentication**
- JWT tokens stored in localStorage
- Protected routes via `<ProtectedRoute>` wrapper
- Global auth state via `AuthContext`

### **API Integration**
- RESTful API calls via fetch
- Service layer abstracts API endpoints
- Custom hooks handle loading states and error handling

### **Routing Structure**
```
/                    - HomePage (article feed)
/login               - Login page
/register            - Registration page
/notas               - User's notes management
/articulo/:id        - Individual article view
/usuarios            - User management (admin)
/profile             - User profile page
```

## Key Components

### **Custom Hooks**
- `useAuth()` - Authentication state and methods
- `useNotas()` - Notes CRUD operations
- `useUsuarios()` - User management operations

### **Core Services**
- `authService.js` - Authentication API calls
- `notaService.js` - Notes API integration
- `usuarioService.js` - User management API

### **Context Providers**
- `AuthProvider` - Global authentication state
- `ProtectedRoute` - Route protection for authenticated users

## Styling
- **CSS Variables** for theming and consistency
- **Inline styles** for component-specific styling
- **Responsive design** with mobile-first approach

## Build & Deploy
- **Vite** for fast development and optimized builds
- **Environment variables** for API configuration
- **Production build** outputs to `dist/`

## Data Flow Example
```
User clicks login → AuthService.login() → AuthContext updates → 
ProtectedRoute allows access → useNotas() fetches user notes → 
Components render with real data
```