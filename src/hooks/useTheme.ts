import { useEffect } from 'react';
import { ACTIVE_THEME } from '../config/theme';

export function useTheme() {
  useEffect(() => {
    if (ACTIVE_THEME === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', ACTIVE_THEME);
    }
    return () => document.documentElement.removeAttribute('data-theme');
  }, []);
}
