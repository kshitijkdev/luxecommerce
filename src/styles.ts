import type { CSSProperties } from 'react';

export const colors = {
  emerald: '#064E3B',
  emeraldDark: '#043D2E',
  emeraldLight: '#064E3B10',
  emeraldMid: '#0A7A5C',
  bg: '#F5F4F0',
  sidebar: '#0C1F1A',
  sidebarHover: '#162E27',
  surface: '#FFFFFF',
  surfaceAlt: '#F9F8F5',
  border: 'rgba(0,0,0,0.07)',
  borderMid: 'rgba(0,0,0,0.12)',
  text: '#111111',
  textMuted: '#6B7280',
  textHint: '#9CA3AF',
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
};

export const SIDEBAR_W = 260;

export const styles = {
  appShell: {
    minHeight: '100vh',
    display: 'flex',
    background: colors.bg,
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    color: colors.text,
  } as CSSProperties,

  sidebar: {
    width: SIDEBAR_W,
    minHeight: '100vh',
    background: colors.sidebar,
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  } as CSSProperties,

  mainContent: {
    marginLeft: SIDEBAR_W,
    flex: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,

  topBar: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    background: 'rgba(245,244,240,0.96)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '0 40px',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    borderBottom: '1px solid rgba(0,0,0,0.07)',
  } as CSSProperties,

  pageContent: {
    padding: '36px 40px 60px',
    flex: 1,
  } as CSSProperties,

  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '24px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.07)',
  } as CSSProperties,

  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'inherit',
    background: '#FFFFFF',
    color: '#111111',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s',
  } as CSSProperties,

  label: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 600,
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
  } as CSSProperties,

  stickyFooter: {
    position: 'sticky' as const,
    bottom: 0,
    background: 'rgba(245,244,240,0.97)',
    backdropFilter: 'blur(20px)',
    padding: '16px 40px',
    borderTop: '1px solid rgba(0,0,0,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  } as CSSProperties,
};

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type BtnSize = 'sm' | 'md' | 'lg';

export function btn(variant: BtnVariant = 'primary', size: BtnSize = 'md'): CSSProperties {
  const pad = size === 'lg' ? '13px 32px' : size === 'sm' ? '7px 14px' : '10px 20px';
  const fs = size === 'lg' ? 15 : size === 'sm' ? 12 : 13;
  const base: CSSProperties = {
    border: 'none',
    borderRadius: 10,
    padding: pad,
    fontSize: fs,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: 0.2,
    transition: 'all 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap' as const,
  };
  const variants: Record<BtnVariant, CSSProperties> = {
    primary: { ...base, background: '#064E3B', color: '#fff' },
    secondary: { ...base, background: 'transparent', color: '#064E3B', border: '1.5px solid #064E3B' },
    ghost: { ...base, background: '#064E3B10', color: '#064E3B' },
    danger: { ...base, background: '#FEF2F2', color: '#DC2626' },
  };
  return variants[variant];
}

export function tag(color = '#064E3B'): CSSProperties {
  return {
    background: color + '15',
    color,
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 6,
    letterSpacing: 0.5,
    display: 'inline-block',
    whiteSpace: 'nowrap' as const,
  };
}
