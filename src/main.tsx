import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { BottleList } from './pages/BottleList';
import { Mission } from './pages/Mission';
import { VenueAlert } from './components/VenueAlert';

/* Feature flag — set to false to show the Mission page */
export const HIDE_MISSION = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <VenueAlert />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/bottles" element={<BottleList />} />
          {!HIDE_MISSION && <Route path="/mission" element={<Mission />} />}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
