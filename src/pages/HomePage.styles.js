import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageWrapper = styled.div`
  width: 100%;
`

export const Container = styled.div`
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
`

export const Hero = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`

export const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 100%;
  max-width: 900px;
  padding: var(--spacing-xl);
`

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: var(--spacing-lg);
  color: var(--text-white);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3);
`

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-white);
  max-width: 700px;
  margin: 0 auto var(--spacing-2xl) auto;
  line-height: 1.7;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4);
`

export const CtaButtons = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--spacing-2xl);
`

export const HeroButtonLink = styled(Link)`
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-lg);
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  display: inline-block;
  transition: all var(--transition-fast);
  cursor: pointer;

  ${props => props.variant === 'primary' ? `
    background-color: var(--primary-color);
    color: var(--text-white);
    border: 2px solid var(--primary-color);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 175, 185, 0.4);

    &:hover {
      background-color: var(--primary-dark);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 3px 10px rgba(0, 175, 185, 0.5);
      color: var(--text-white);
      transform: translateY(-2px);
    }
  ` : `
    background-color: rgba(255, 255, 255, 0.15);
    color: var(--text-white);
    border: 2px solid rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: rgba(255, 255, 255, 0.95);
      color: var(--primary-color);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }
  `}
`

export const PostsSection = styled.section`
  margin-bottom: var(--spacing-3xl);
`

export const PostsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: var(--text-3xl);
`

export const InfoSection = styled.section`
  margin-bottom: var(--spacing-3xl);
`

export const InfoSectionTitle = styled.h2`
  margin: 0;
  margin-bottom: var(--spacing-xl);
  font-size: var(--text-3xl);
  color: var(--text-primary);
`

export const FeatureTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
`

export const FeatureText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`

export const FinalCta = styled.div`
  text-align: center;
  padding: var(--spacing-3xl);
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--spacing-md);
`

export const CtaTitle = styled.h2`
  margin: 0;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
`

export const CtaText = styled.p`
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl) auto;
  line-height: 1.6;
`
