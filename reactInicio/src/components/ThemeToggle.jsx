import { useState, useEffect } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 16px',
        borderRadius: '20px',
        border: '2px solid var(--neon-green)',
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 0 10px var(--glow-color)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {theme === 'dark' ? '🧪 Modo Laboratorio' : '🌌 Modo Espacial'}
    </button>
  );
};