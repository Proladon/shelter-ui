import type { DesignTokens } from '../core/theme-utils'

const defaultTokens: DesignTokens = {
  colors: {
    primary: '#b1a69a',
    bg: {
      primary: '#22272e',
      secondary: '#1b1f27',
    },
    text: {
      base: '#787f8b',
      primary: '#6b7280',
    },
    border: {
      base: '#3e4451',
      primary: '#E3C9AA',
    },
    status: {
      info: '#d5d5d5',
      danger: '#ed6d7d',
      warning: '#f2c97d',
      success: '#9cc3b4',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },

  radius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
  },

  componentSize: {
    xs: '24px',
    sm: '30px',
    md: '36px',
    lg: '42px',
    xl: '48px',
  },
}

export default defaultTokens
