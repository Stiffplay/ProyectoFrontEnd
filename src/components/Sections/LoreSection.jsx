import { useState } from 'react';
import { regionsData } from '../../utils/constants';

export default function LoreSection() {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);

  const activeRegion = regionsData[activeRegionIndex];

  return (
    <section id="historia" aria-labelledby="historia-title" className="lore-section">
      <h3 id="historia-title">Lore de Runaterra</h3>
      <p className="section-intro-text">
        Runaterra está dividida en diversas facciones y territorios en constante cambio. Explora las culturas e ideales de sus regiones más influyentes.
      </p>

      <div className="lore-container">
        <div className="lore-tabs" role="tablist" aria-label="Regiones de Runaterra">
          {regionsData.map((region, idx) => (
            <button
              key={region.name}
              type="button"
              role="tab"
              aria-selected={activeRegionIndex === idx}
              className={`lore-tab-btn ${activeRegionIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveRegionIndex(idx)}
              aria-controls={`lore-panel-${region.name.toLowerCase()}`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {activeRegion && (
          <article
            id={`lore-panel-${activeRegion.name.toLowerCase()}`}
            className="lore-panel"
            role="tabpanel"
            aria-live="polite"
          >
            {activeRegion.image && (
              <img
                src={activeRegion.image}
                alt={`${activeRegion.name} — imagen decorativa`}
                className="region-decor-img"
                aria-hidden="true"
              />
            )}
            <h4>{activeRegion.name}</h4>
            <p className="lore-motto">"{activeRegion.motto}"</p>
            <p className="lore-description">{activeRegion.description}</p>
            <div className="lore-champions">
              <strong>Algunos campeones nativos:</strong> <span>{activeRegion.champions}</span>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
