import neostandard from 'neostandard'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  ...neostandard({
    ignores: ['dist'], // Ignora tu build
    eslint: {
      languageOptions: {
        globals: {
          window: 'readonly',
          document: 'readonly',
          console: 'readonly',
        },
      },
    },
  }),

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      indent: ['error', 2, { SwitchCase: 1 }],
      'react/jsx-indent-props': ['error', 2],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      react: {
        version: 'detect', // Detecta tu versión automáticamente (React 19 o 18)
      },
    },
  },
]
