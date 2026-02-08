import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { BottleList } from './pages/BottleList';
import { Mission } from './pages/Mission';
import { useTheme } from './hooks/useTheme';

import './styles/themes/valentines.css';

/* Feature flag — set to false to show the Mission page */
export const HIDE_MISSION = true;

function ThemeLoader({ children }: { children: ReactNode }) {
  useTheme();
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeLoader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/bottles" element={<BottleList />} />
            {!HIDE_MISSION && <Route path="/mission" element={<Mission />} />}
          </Routes>
        </BrowserRouter>
      </ThemeLoader>
    </HelmetProvider>
  </StrictMode>
);
