import { useState } from 'react';
import { SEO } from '../components/SEO';
import { MobileNav } from '../components/MobileNav';
import { Navbar } from '../components/Navbar';
import '../styles/bottles.css';

interface Bottle {
  name: string;
  price: number;
}

interface Category {
  name: string;
  bottles: Bottle[];
}

const BOTTLE_MENU: Category[] = [
  {
    name: 'Cognac',
    bottles: [
      { name: 'Hennessy VSOP', price: 400 },
      { name: 'Hennessy', price: 385 },
    ],
  },
  {
    name: 'Tequila',
    bottles: [
      { name: 'Don Julio Blanco', price: 400 },
      { name: 'Don Julio Reposado', price: 420 },
      { name: 'Don Julio Añejo', price: 475 },
      { name: 'Don Julio 70', price: 450 },
      { name: 'Don Julio 1942', price: 780 },
      { name: 'Casamigos', price: 385 },
      { name: 'Patrón Blanco', price: 385 },
      { name: 'Clase Azul', price: 840 },
    ],
  },
  {
    name: 'Champagne',
    bottles: [
      { name: 'Moët & Chandon', price: 420 },
    ],
  },
];

const ALL_FILTER = 'All';

export function BottleList() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const categories = activeFilter === ALL_FILTER
    ? BOTTLE_MENU
    : BOTTLE_MENU.filter((c) => c.name === activeFilter);

  return (
    <>
      <SEO />

      {/* Background elements */}
      <div className="gradient-bg">
        <div className="gradient-blob gradient-blob--gold"></div>
        <div className="gradient-blob gradient-blob--blue"></div>
        <div className="gradient-blob gradient-blob--gold-2"></div>
        <div className="gradient-blob gradient-blob--blue-2"></div>
      </div>
      <div className="ambient-glow"></div>

      <Navbar />

      <div className="bottles-page">
        <header className="bottles-header">
          <span className="bottles-subtitle">Premium Selection</span>
          <h1 className="bottles-title">Bottle Menu</h1>
          <div className="bottles-divider"></div>
        </header>

        {/* Filter tabs */}
        <div className="bottles-filters">
          <button
            className={`filter-tab ${activeFilter === ALL_FILTER ? 'filter-tab--active' : ''}`}
            onClick={() => setActiveFilter(ALL_FILTER)}
          >
            All
          </button>
          {BOTTLE_MENU.map((category) => (
            <button
              key={category.name}
              className={`filter-tab ${activeFilter === category.name ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Bottle grid */}
        <div className="bottles-content">
          {categories.map((category) => (
            <section key={category.name} className="bottle-category">
              <div className="category-header">
                <div className="category-line"></div>
                <h2 className="category-name">{category.name}</h2>
                <div className="category-line"></div>
              </div>

              <div className="bottle-grid">
                {category.bottles.map((bottle, i) => (
                  <div
                    key={bottle.name}
                    className="bottle-card"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="bottle-card-inner">
                      <div className="bottle-card-glow"></div>
                      <div className="bottle-info">
                        <span className="bottle-name">{bottle.name}</span>
                        <span className="bottle-dots"></span>
                        <span className="bottle-price">${bottle.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="bottles-footer">
          <p>Prices are subject to change. Please ask your server for availability.</p>
        </footer>
      </div>

      <MobileNav />
    </>
  );
}
