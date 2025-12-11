// eslint.config.js
import neostandard from 'neostandard'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  ...neostandard({
    ignores: ['dist'],
  }),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Indentación
      indent: ['error', 2, { SwitchCase: 1 }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],

      // 🔧 SOLUCIÓN: Deshabilitar reglas de punto y coma
      semi: 'off',
      'no-extra-semi': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/jsx-quotes': 'off',
      '@stylistic/multiline-ternary': 'off',

      // Opcional: Si quieres FORZAR punto y coma
      // semi: ['error', 'always'],
      // 'no-extra-semi': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
