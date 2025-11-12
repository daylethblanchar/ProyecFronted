import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

/**
 * Layout principal de la aplicación
 * Incluye Navbar, contenido principal y Footer
 */
const Layout = () => {
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <main style={styles.main}>
        <Outlet /> {/* Children */}
      </main>
      <Footer />
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    width: '100%',
    paddingTop: '70px', // Compensar altura de navbar fixed
  },
}

export default Layout
