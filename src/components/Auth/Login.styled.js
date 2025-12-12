import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg);
`

export const FormCard = styled.div`
  width: 100%;
  max-width: var(--max-width-md);
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
`

export const Subtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

export const Label = styled.label`
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
`

export const Input = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--text-base);
  border: 1px solid ${props => (props.$hasError ? 'var(--error-color)' : 'var(--border-color)')};
  border-radius: var(--radius-md);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? 'var(--error-color)' : 'var(--primary-color)')};
    box-shadow: 0 0 0 3px
      ${props => (props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)')};
  }

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const ErrorText = styled.span`
  font-size: var(--text-sm);
  color: var(--error-color);
  margin-top: var(--spacing-xs);
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
  background-color: var(--primary-color);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--spacing-md);

  &:hover:not(:disabled) {
    background-color: var(--primary-color-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Footer = styled.div`
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  text-align: center;
`

export const FooterText = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
`

export const StyledLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-color-dark);
    text-decoration: underline;
  }
`
