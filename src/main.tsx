import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { BottleList } from './pages/BottleList';
import { Mission } from './pages/Mission';
import { Tickets } from './pages/Tickets';
import { useTheme } from './hooks/useTheme';

import './styles/themes/valentines.css';

/* Feature flags — set to false to enable */
export const HIDE_MISSION = true;
export const HIDE_TICKETS_PAGE = true;

/** When the tickets page is off, nav links use this external URL instead */
export const TICKET_URL =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile';

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
            {!HIDE_TICKETS_PAGE && <Route path="/tickets" element={<Tickets />} />}
            <Route path="/bottles" element={<BottleList />} />
            {!HIDE_MISSION && <Route path="/mission" element={<Mission />} />}
          </Routes>
        </BrowserRouter>
      </ThemeLoader>
    </HelmetProvider>
  </StrictMode>
);
