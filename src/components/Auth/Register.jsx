import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateAuthRegister } from '../../utils/validators'
import ErrorMessage from '../common/ErrorMessage'
import Loading from '../common/Loading'

/**
 * Componente de formulario de registro
 */
const Register = () => {
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setServerError('')

    // Validar datos del formulario
    const validation = validateAuthRegister(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    try {
      // No enviar confirmPassword al backend
      const { confirmPassword, ...dataToSend } = formData
      await register(dataToSend)
      navigate('/notas')
    } catch (error) {
      setServerError(error.message || 'Error al registrar usuario')
    }
  }

  if (loading) {
    return <Loading fullScreen message="Registrando usuario..." />
  }

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Crear Cuenta</h2>
        <p style={styles.subtitle}>Completa el formulario para registrarte</p>

        {serverError && (
          <ErrorMessage message={serverError} onClose={() => setServerError('')} type="error" />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'input-error' : ''}
              placeholder="Tu nombre completo"
              autoComplete="name"
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'input-error' : ''}
              placeholder="tu@email.com"
              autoComplete="email"
            />
            {errors.correo && <span className="error-message">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitButton}>
            Registrarse
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={styles.link}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'var(--spacing-lg)',
  },
  formCard: {
    width: '100%',
    maxWidth: 'var(--max-width-md)',
    backgroundColor: 'var(--bg-primary)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-sm)',
  },
  subtitle: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--spacing-xl)',
  },
  submitButton: {
    width: '100%',
  },
  footer: {
    marginTop: 'var(--spacing-lg)',
    paddingTop: 'var(--spacing-lg)',
    borderTop: '1px solid var(--border-color)',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-sm)',
  },
  link: {
    color: 'var(--primary-color)',
    fontWeight: 500,
  },
}

export default Register
