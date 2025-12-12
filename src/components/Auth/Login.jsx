import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateAuthLogin } from '../../utils/validators'
import ErrorMessage from '../common/ErrorMessage'
import Loading from '../common/Loading'
import {
  Container,
  FormCard,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorText,
  SubmitButton,
  Footer,
  FooterText,
  StyledLink,
} from './Login.styled'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error: authError, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Sync auth error with local state
  useEffect(() => {
    if (authError) {
      setServerError(authError)
    }
  }, [authError])

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear field error on input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }

    // Clear server error when user starts typing
    if (serverError) {
      setServerError('')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setServerError('')

    // Trim values before validation
    const trimmedData = {
      correo: formData.correo.trim(),
      password: formData.password.trim(),
    }

    // Validate form
    const validation = validateAuthLogin(trimmedData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    try {
      await login(trimmedData.correo, trimmedData.password)
      navigate('/notas', { replace: true })
    } catch (error) {
      setServerError(error.message || 'Error al iniciar sesión')
    }
  }

  if (loading) {
    return <Loading fullScreen message="Iniciando sesión..." />
  }

  return (
    <Container>
      <FormCard>
        <Title>Iniciar Sesión</Title>
        <Subtitle>Ingresa tus credenciales para continuar</Subtitle>

        {serverError && (
          <ErrorMessage message={serverError} onClose={() => setServerError('')} type="error" />
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              $hasError={!!errors.correo}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
            {errors.correo && <ErrorText>{errors.correo}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterText>
            ¿No tienes cuenta? <StyledLink to="/register">Regístrate aquí</StyledLink>
          </FooterText>
        </Footer>
      </FormCard>
    </Container>
  )
}

export default Login
