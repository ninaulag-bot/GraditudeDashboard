// Graditude Design System — Mantine-derived tokens
// Drop this file into any project to get the same look and feel.
export const colors = {
  // Primary blue (Mantine blue.6 / blue.7)
  blue: {
    50: '#e7f5ff',
    100: '#d0ebff',
    500: '#228be6',
    600: '#1c7ed6'
  },
  // Neutrals (Mantine gray scale)
  gray: {
    0: '#f8f9fa',
    1: '#f1f3f5',
    2: '#e9ecef',
    3: '#dee2e6',
    4: '#ced4da',
    5: '#adb5bd',
    6: '#868e96',
    7: '#495057',
    9: '#212529'
  },
  // Status
  green: {
    bg: '#dcfce7',
    text: '#16a34a',
    accent: '#2f9e44'
  },
  red: {
    bg: '#ffe3e3',
    text: '#fa5252',
    accent: '#c92a2a'
  },
  yellow: {
    bg: '#fff3bf',
    text: '#92400e',
    accent: '#f59f00'
  },
  white: '#ffffff'
} as const;
export const radii = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px'
} as const;
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px'
} as const;
export const typography = {
  fontFamily:
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  // Display / heading
  title: { size: '20px', weight: 700, color: colors.gray[9] },
  h3: { size: '18px', weight: 700, color: colors.gray[9] },
  h4: { size: '16px', weight: 700, color: colors.gray[9] },
  // Body
  body: { size: '14px', weight: 400, color: colors.gray[7] },
  bodyStrong: { size: '14px', weight: 600, color: colors.gray[9] },
  // Meta
  meta: { size: '13px', weight: 400, color: colors.gray[6] },
  micro: { size: '12px', weight: 400, color: colors.gray[5] },
  // Eyebrow / label
  eyebrow: {
    size: '11px',
    weight: 700,
    color: colors.gray[6],
    transform: 'uppercase',
    tracking: 'wide'
  }
} as const;
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 1px 3px rgba(0,0,0,0.08)',
  lg: '0 4px 12px rgba(0,0,0,0.10)',
  xl: '0 10px 40px rgba(0,0,0,0.15)'
} as const;
// Card surface — every card extends this
export const cardSurface = {
  background: colors.white,
  border: `1px solid ${colors.gray[3]}`,
  radius: radii.md,
  padding: '20px', // p-5
  shadow: shadows.sm
} as const;