export function getThemeColors(isDark: boolean) {
  return {
    primary: isDark ? 'var(--sand)' : 'var(--coral)',
    background: isDark ? 'var(--ink)' : 'var(--cream)',
    text: isDark ? 'var(--cream)' : 'var(--ink)',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
}

export function getGlassEffect(isDark: boolean) {
  return {
    background: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
  };
}