// theme.js

/**
 * Application Theme Configuration
 * Complete design system with colors, typography, spacing, and more
 */

export const theme = {
  // ====================================
  // 🎨 COLORS
  // ====================================
  colors: {
    // Brand palette - Fresh and vibrant tones
    sky: '#8ECAE6',
    teal: '#219EBC',
    navy: '#023047',
    yellow: '#FFB703',
    orange: '#FB8500',

    // Secondary palette - Warm and soft tones
    blueDark: '#0081A7',
    cyan: '#00AFB9',
    cream: '#FDFCDC',
    peach: '#FED9B7',
    coral: '#F07167',

    // Primary color (Cyan)
    primary: '#00AFB9',
    primaryDark: '#008a92',
    primaryLight: '#33c2ca',
    primaryLighter: '#66d3db',
    primaryLightest: '#99e4ec',

    // Secondary color (Coral)
    secondary: '#F07167',
    secondaryDark: '#d85a51',
    secondaryLight: '#f59188',
    secondaryLighter: '#f8a9a4',
    secondaryLightest: '#fbc1bf',

    // Accent color (Dark Blue)
    accent: '#0081A7',
    accentDark: '#006684',
    accentLight: '#339bb9',
    accentLighter: '#66ccce',
    accentLightest: '#99dde3',

    // Status colors
    success: '#10b981',
    successLight: '#d1fae5',
    successDark: '#065f46',

    error: '#F07167',
    errorLight: '#ffe5e3',
    errorDark: '#d85a51',

    warning: '#FFB703',
    warningLight: '#fff4e8',
    warningDark: '#d89e02',

    info: '#00AFB9',
    infoLight: '#d4f4f6',
    infoDark: '#008a92',

    // Text colors
    text: {
      primary: '#0081A7',
      secondary: '#006684',
      light: '#00AFB9',
      white: '#ffffff',
      muted: '#6b7280',
      dark: '#1f2937',
      black: '#000000',
      disabled: '#9ca3af',
      placeholder: '#d1d5db',
    },

    // Background colors
    bg: {
      primary: '#ffffff',
      secondary: '#FDFCDC',
      tertiary: '#FED9B7',
      dark: '#0081A7',
      darker: '#006684',
      accent: '#fff9f0',
      light: '#f8feff',
      hover: '#f3f4f6',
      disabled: '#e5e7eb',
      overlay: 'rgba(0, 0, 0, 0.5)',
      overlayLight: 'rgba(0, 0, 0, 0.25)',
    },

    // Border colors
    border: {
      default: '#e8ead0',
      focus: '#00AFB9',
      dark: '#FED9B7',
      light: '#f3f4f6',
      error: '#F07167',
      success: '#10b981',
      transparent: 'transparent',
    },

    // Gradient colors
    gradients: {
      primary: 'linear-gradient(135deg, #00AFB9 0%, #0081A7 100%)',
      secondary: 'linear-gradient(135deg, #F07167 0%, #FFB703 100%)',
      warm: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
      cool: 'linear-gradient(135deg, #8ECAE6 0%, #219EBC 100%)',
      sunset: 'linear-gradient(135deg, #FB8500 0%, #F07167 100%)',
      ocean: 'linear-gradient(135deg, #00AFB9 0%, #8ECAE6 100%)',
    },

    // Social media colors
    social: {
      facebook: '#1877f2',
      twitter: '#1da1f2',
      instagram: '#e4405f',
      linkedin: '#0077b5',
      youtube: '#ff0000',
      github: '#333333',
    },
  },

  // ====================================
  // 🔤 TYPOGRAPHY
  // ====================================
  fonts: {
    primary:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    article: "'Orkney', 'Georgia', 'Times New Roman', serif",
    mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },

  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
  },

  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // ====================================
  // 📏 SPACING & SIZING
  // ====================================
  spacing: {
    0: '0',
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
    '5xl': '8rem', // 128px
  },

  sizes: {
    0: '0',
    xs: '20rem', // 320px
    sm: '24rem', // 384px
    md: '28rem', // 448px
    lg: '32rem', // 512px
    xl: '36rem', // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
    '4xl': '56rem', // 896px
    '5xl': '64rem', // 1024px
    '6xl': '72rem', // 1152px
    '7xl': '80rem', // 1280px
    full: '100%',
    screen: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  maxWidths: {
    xs: '20rem', // 320px
    sm: '24rem', // 384px
    md: '28rem', // 448px
    lg: '32rem', // 512px
    xl: '36rem', // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
    '4xl': '56rem', // 896px
    '5xl': '64rem', // 1024px
    '6xl': '72rem', // 1152px
    '7xl': '80rem', // 1280px
    full: '100%',
    prose: '65ch',
  },

  // ====================================
  // 🎭 VISUAL EFFECTS
  // ====================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    outline: '0 0 0 3px rgba(0, 175, 185, 0.5)',
    colored: {
      primary: '0 4px 14px 0 rgba(0, 175, 185, 0.39)',
      secondary: '0 4px 14px 0 rgba(240, 113, 103, 0.39)',
      success: '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
      error: '0 4px 14px 0 rgba(240, 113, 103, 0.39)',
    },
  },

  radii: {
    none: '0',
    sm: '0.25rem', // 4px
    base: '0.375rem', // 6px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },

  // ====================================
  // ⏱️ ANIMATIONS & TRANSITIONS
  // ====================================
  transitions: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out',
    slower: '700ms ease-in-out',
  },

  durations: {
    fastest: '75ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // ====================================
  // 📱 RESPONSIVE BREAKPOINTS
  // ====================================
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Media query helpers
  media: {
    xs: '@media (min-width: 480px)',
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    '2xl': '@media (min-width: 1536px)',
  },

  // ====================================
  // 📐 Z-INDEX LAYERS
  // ====================================
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    offcanvas: 1045,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
    max: 9999,
  },

  // ====================================
  // 🔲 BORDERS
  // ====================================
  borders: {
    none: '0',
    '1px': '1px solid',
    '2px': '2px solid',
    '4px': '4px solid',
    '8px': '8px solid',
  },

  borderWidths: {
    none: '0',
    thin: '1px',
    base: '2px',
    thick: '4px',
    thicker: '8px',
  },

  // ====================================
  // 💫 OPACITY
  // ====================================
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },

  // ====================================
  // 🎯 COMPONENT SPECIFIC
  // ====================================
  components: {
    button: {
      paddingX: {
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
      },
      paddingY: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
      minHeight: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
    },
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      paddingX: {
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
      },
    },
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
  },
}

export default theme
