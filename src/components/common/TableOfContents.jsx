import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  TocOverlay,
  TableOfContentsContainer,
  TocHeader,
  TocCloseButton,
  TocTitle,
  TocList,
  TocItem,
  TocLink,
} from './TableOfContents.styles'

// Consolidated configuration
const CONFIG = {
  selectors: {
    articleTitle: '[data-article-title], article h1, .article-title, h1',
    markdownContent: '.markdown-content',
    headings: 'h1, h2, h3, h4, h5, h6',
  },
  scroll: {
    offset: 100,
    delay: 1000,
    animationDuration: 300,
  },
  retry: {
    maxAttempts: 5,
    delays: [200, 400, 800, 1600, 2000],
  },
  observer: {
    rootMargin: '-100px 0px -66% 0px',
    threshold: 0.5,
  },
}

const TableOfContents = ({ articleId }) => {
  const { id } = useParams()
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const observerRef = useRef(null)
  const retryAttemptsRef = useRef(0)

  // Extract and process headings from DOM
  const extractHeadings = () => {
    const content = document.querySelector(CONFIG.selectors.markdownContent)
    if (!content) return null

    const headingElements = Array.from(content.querySelectorAll(CONFIG.selectors.headings))
    if (headingElements.length === 0) return null

    const articleTitle = document.querySelector(CONFIG.selectors.articleTitle)
    const headingData = []

    // Add article title as first item
    if (articleTitle) {
      articleTitle.id = articleTitle.id || 'article-title'
      headingData.push({
        id: articleTitle.id,
        text: articleTitle.textContent.trim(),
        level: 0,
      })
    }

    // Add content headings with auto-generated IDs
    headingElements.forEach((heading, index) => {
      heading.id = heading.id || `heading-${index}`
      const text = heading.textContent?.trim()
      if (text) {
        headingData.push({
          id: heading.id,
          text,
          level: parseInt(heading.tagName[1]),
        })
      }
    })

    return {
      headingData,
      elementsToObserve: [articleTitle, ...headingElements].filter(Boolean),
    }
  }

  // Setup intersection observer for active heading tracking
  const setupObserver = elements => {
    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(entries => {
      if (isScrollingRef.current) return

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, CONFIG.observer)

    elements.forEach(el => observerRef.current.observe(el))
  }

  // Initialize headings with retry mechanism
  const initializeHeadings = () => {
    const result = extractHeadings()

    if (result) {
      setHeadings(result.headingData)
      setupObserver(result.elementsToObserve)
      retryAttemptsRef.current = 0
      return
    }

    // Retry with exponential backoff if content not ready
    if (retryAttemptsRef.current < CONFIG.retry.maxAttempts) {
      const delay = CONFIG.retry.delays[retryAttemptsRef.current]
      retryAttemptsRef.current++
      setTimeout(initializeHeadings, delay)
    }
  }

  // Handle article changes
  useEffect(() => {
    if (id !== articleId) return

    // Reset all state
    setActiveId('')
    setHeadings([])
    setIsOpen(false)
    retryAttemptsRef.current = 0

    // Initialize after brief delay for DOM to settle
    const timeoutId = setTimeout(initializeHeadings, 50)

    return () => {
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [articleId, id])

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, CONFIG.scroll.animationDuration)
  }

  // Handle smooth scroll to heading
  const handleHeadingClick = (e, headingId) => {
    e.preventDefault()

    const element = document.getElementById(headingId)
    if (!element) return

    // Manage scrolling state
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    isScrollingRef.current = true
    setActiveId(headingId)

    // Close mobile menu if open
    if (isOpen) handleClose()

    // Smooth scroll with offset
    const top = element.getBoundingClientRect().top + window.pageYOffset - CONFIG.scroll.offset
    window.scrollTo({ top, behavior: 'smooth' })

    // Reset scrolling flag after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, CONFIG.scroll.delay)
  }

  // Don't render if insufficient content
  const hasContent = headings.length > 1 || (headings.length === 1 && headings[0].level !== 0)
  if (!hasContent) return null

  return (
    <>
      {(isOpen || isClosing) && <TocOverlay $closing={isClosing} onClick={handleClose} />}

      <TableOfContentsContainer
        className={`${isOpen ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}
      >
        <TocHeader>
          <TocTitle>En este artículo</TocTitle>
          <TocCloseButton onClick={handleClose} aria-label="Cerrar tabla de contenidos">
            ✕
          </TocCloseButton>
        </TocHeader>

        <TocList>
          {headings.map(heading => (
            <TocItem key={heading.id} $level={heading.level}>
              <TocLink
                href={`#${heading.id}`}
                onClick={e => handleHeadingClick(e, heading.id)}
                className={activeId === heading.id ? 'active' : ''}
                aria-current={activeId === heading.id ? 'location' : undefined}
              >
                {heading.text}
              </TocLink>
            </TocItem>
          ))}
        </TocList>
      </TableOfContentsContainer>
    </>
  )
}

export default TableOfContents
