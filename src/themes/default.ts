import type { ColorTokens, DesignTokens } from '../core/theme-utils'

// Light palette (D8): same brand/status hue families as the dark palette
// below, re-balanced for contrast against a white surface. Applied under
// [data-theme="light"] — see src/core/index.ts's generateBaselineCss().
export const lightColors: ColorTokens = {
  primary: '#8a7561',
  bg: {
    primary: '#ffffff',
    secondary: '#f3f4f6',
  },
  text: {
    base: '#1f2937',
    primary: '#6b7280',
  },
  border: {
    base: '#e5e7eb',
    primary: '#c9b8a3',
  },
  status: {
    info: '#57606a',
    danger: '#dc2626',
    warning: '#d97706',
    success: '#16a34a',
  },
}

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

  zIndex: {
    dropdown: '1000',
    sticky: '1020',
    overlay: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    notification: '1080',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 24px rgba(0, 0, 0, 0.35)',
  },

  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },

  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    leave: 'cubic-bezier(0.4, 0, 1, 1)',
  },

  focusRing: '0 0 0 2px var(--sh-primary-fade)',
}

export default defaultTokens
