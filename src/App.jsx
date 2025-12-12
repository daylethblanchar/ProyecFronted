import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { theme } from './styles/theme'
import { ThemeProvider } from 'styled-components'
import { useCallback, useEffect } from 'react'
import useArticles from './hooks/useArticles'
import useAuth from './hooks/useAuth'

/**
 * Componente principal de la aplicación
 * Configura los providers y el router
 */
function App() {
  const { fetchAll } = useArticles()
  const { handleInitializeLogin } = useAuth()

  const initializeArticles = useCallback(() => {
    handleInitializeLogin()
    fetchAll()
  }, [fetchAll, handleInitializeLogin])

  useEffect(() => {
    initializeArticles()
  }, [initializeArticles])

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
