const theme = {
  colors: {
    // Cores principais
    primary: '#7251b5',
    primaryLight: '#8862d6',
    primaryDark: '#5a3d99',
    
    // Cores secundárias
    secondary: '#4361ee',
    secondaryLight: '#4895ef',
    secondaryDark: '#3f37c9',
    
    // Accent colors
    accent1: '#f72585',
    accent2: '#4cc9f0',
    
    // Cores de fundo
    background: '#1a1a2e',
    backgroundDark: '#16213e',
    backgroundLight: '#1f1f3d',
    card: 'rgba(255, 255, 255, 0.05)',
    cardHover: 'rgba(255, 255, 255, 0.1)',
    
    // Cores de texto
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    textDisabled: 'rgba(255, 255, 255, 0.4)',
    
    // Cores de estado
    success: '#2cb67d',
    error: '#ef476f',
    warning: '#ffd166',
    info: '#118ab2',
    
    // Cores de navegação
    navActive: '#7251b5',
    navInactive: 'rgba(255, 255, 255, 0.6)',
  },
  
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  radii: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
  
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  transitions: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
  },
};

export default theme;
