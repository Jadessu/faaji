import { useState, useCallback, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/*
 * yet-another-react-lightbox was chosen because:
 * - Pure React, no external DOM manipulation
 * - ~12KB gzipped — lightweight
 * - Built-in keyboard navigation, swipe gestures, focus trapping
 * - Active maintenance and strong accessibility (ARIA, focus return)
 */

/* ── Build-time optimized images via vite-imagetools ──
 * Thumbnails: 500px wide, webp — used in grid/carousel
 * Full-size:  1600px wide, webp — loaded only when lightbox opens
 * import.meta.glob with eager:true resolves URLs at build time.
 * Actual image bytes load lazily via browser <img loading="lazy">.
 */
const thumbModules = import.meta.glob<{ default: string }>(
  '../assets/partyImages/DSC*.jpg',
  { query: { w: 500, format: 'webp' }, eager: true }
);

const fullModules = import.meta.glob<{ default: string }>(
  '../assets/partyImages/DSC*.jpg',
  { query: { w: 1600, format: 'webp' }, eager: true }
);

interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
}

/* Build ordered image list from glob results */
const images: GalleryImage[] = Object.keys(thumbModules)
  .sort()
  .map((key, i) => ({
    thumb: thumbModules[key].default,
    full: fullModules[key].default,
    alt: `Faaji party moment ${i + 1}`,
  }));

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [slideIndex, setSlideIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideIndex(i => (i - 1 + images.length) % images.length);
  }, []);

  const nextSlide = useCallback(() => {
    setSlideIndex(i => (i + 1) % images.length);
  }, []);

  function getSlideState(i: number): 'active' | 'prev' | 'next' | 'hidden' {
    if (i === slideIndex) return 'active';
    if (i === (slideIndex - 1 + images.length) % images.length) return 'prev';
    if (i === (slideIndex + 1) % images.length) return 'next';
    return 'hidden';
  }

  /* Respect prefers-reduced-motion */
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="gallery-section" aria-label="Photo gallery">
      {/* Mobile: depth slider */}
      <div className="gallery-slider" role="region" aria-label="Party photos slider">
        <button
          className="gallery-slider-arrow gallery-slider-arrow--prev"
          onClick={prevSlide}
          aria-label="Previous photo"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="gallery-slider-track">
          {images.map((img, i) => {
            const state = getSlideState(i);
            if (state === 'hidden') return null;
            return (
              <div
                key={i}
                className={`gallery-slide gallery-slide--${state}`}
                onClick={() => state === 'active' ? openLightbox(i) : state === 'prev' ? prevSlide() : nextSlide()}
              >
                <div className="gallery-thumb-ratio">
                  <img src={img.thumb} alt={img.alt} loading="lazy" decoding="async" />
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="gallery-slider-arrow gallery-slider-arrow--next"
          onClick={nextSlide}
          aria-label="Next photo"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <p className="gallery-slider-counter">{slideIndex + 1} / {images.length}</p>
      </div>

      {/* Desktop: responsive grid */}
      <div className="gallery-grid" role="list" aria-label="Party photos grid">
        {images.map((img, i) => (
          <button
            key={i}
            className={`gallery-thumb ${!reducedMotion ? 'gallery-thumb--animated' : ''}`}
            style={!reducedMotion ? { animationDelay: `${i * 0.06}s` } : undefined}
            onClick={() => openLightbox(i)}
            aria-label={`View ${img.alt} full size`}
            type="button"
            role="listitem"
          >
            <div className="gallery-thumb-ratio">
              <img
                src={img.thumb}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox — full-size images load only when opened */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={closeLightbox}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.full, alt: img.alt }))}
        styles={{
          container: { backgroundColor: 'rgba(10, 10, 10, 0.96)' },
        }}
        animation={{ fade: reducedMotion ? 0 : 300, swipe: reducedMotion ? 0 : 300 }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
