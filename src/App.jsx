import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { theme } from './styles/theme'
import { ThemeProvider } from 'styled-components'
import { useCallback, useEffect } from 'react'
import useArticles from './hooks/useArticles'

/**
 * Componente principal de la aplicación
 * Configura los providers y el router
 */
function App() {
  const { fetchAll } = useArticles()

  const initializeArticles = useCallback(() => {
    fetchAll()
  }, [fetchAll])

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
