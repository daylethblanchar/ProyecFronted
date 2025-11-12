## FRONT END
```
frontend/
│
├── src/
│   │
│   ├── config/
│   │   └── apiConfig.js              # Configuración base de Axios
│   │
│   ├── services/
│   │   ├── authService.js            # Servicios de autenticación
│   │   ├── usuarioService.js         # Servicios CRUD usuarios
│   │   └── notaService.js            # Servicios CRUD notas
│   │
│   ├── components/
│   │   ├── common/                   # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx    # HOC para rutas protegidas
│   │   │
│   │   ├── Usuarios/
│   │   │   ├── UsuariosList.jsx
│   │   │   ├── UsuarioForm.jsx       # Crear/Editar usuario
│   │   │   └── UsuarioCard.jsx       # Card individual usuario
│   │   │
│   │   └── Notas/
│   │       ├── NotasList.jsx
│   │       ├── NotaForm.jsx          # Crear/Editar nota
│   │       └── NotaCard.jsx          # Card individual nota
│   │
│   ├── pages/
│   │   ├── HomePage.jsx              # Página principal
│   │   ├── LoginPage.jsx             # Página de login
│   │   ├── RegisterPage.jsx          # Página de registro
│   │   ├── UsuariosPage.jsx          # Página gestión usuarios
│   │   └── NotasPage.jsx             # Página gestión notas
│   │
│   ├── context/
│   │   └── AuthContext.jsx           # Contexto global autenticación
│   │
│   ├── hooks/
│   │   ├── useAuth.js                # Hook personalizado auth
│   │   ├── useUsuarios.js            # Hook personalizado usuarios
│   │   └── useNotas.js               # Hook personalizado notas
│   │
│   ├── utils/
│   │   ├── validators.js             # Funciones validación
│   │   ├── formatters.js             # Funciones formato datos
│   │   └── constants.js              # Constantes de la app
│   │
│   ├── styles/
│   │   ├── index.css                 # Estilos globales
│   │   └── variables.css             # Variables CSS
│   │
│   ├── App.jsx                       # Componente principal
│   ├── main.jsx                      # Punto de entrada
│   └── router.jsx                    # Configuración rutas
│
├── public/
│   ├── favicon.ico
│   └── assets/                       # Imágenes, íconos, etc.
│
├── .env                              # Variables de entorno
├── .env.example                      # Ejemplo variables
├── index.html
├── vite.config.js
└── package.json
```

Ventajas de esta estructura:

1. Separación clara de responsabilidades: Cada carpeta tiene un propósito específico
2. Escalabilidad: Fácil agregar nuevas entidades (Proyectos, Tareas, etc.)
3. Mantenibilidad: Los archivos están organizados por funcionalidad
4. Reutilización: Componentes comunes centralizados
5. Documentación: Estructura paralela al backend facilita la comprensión