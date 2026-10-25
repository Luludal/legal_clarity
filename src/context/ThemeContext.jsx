import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Helper to apply theme to DOM immediately and synchronously
const applyThemeToDOM = (themeName) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', themeName);
  if (themeName === 'light') {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  } else {
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('legal_app_theme') || 'dark';
    applyThemeToDOM(saved);
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('legal_app_theme', theme);
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      // Apply synchronously so all CSS rules take effect in the exact same frame
      applyThemeToDOM(nextTheme);
      localStorage.setItem('legal_app_theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
