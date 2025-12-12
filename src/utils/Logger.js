/**
 * Logger Utility
 *
 * Controlled by VITE_DEBUG_MODE environment variable
 */

// const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true'
const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'false'

export const logger = {
  log: (...args) => {
    if (isDebugMode) console.log(...args)
  },
  error: (...args) => {
    if (isDebugMode) console.error(...args)
  },
  warn: (...args) => {
    if (isDebugMode) console.warn(...args)
  },
}
