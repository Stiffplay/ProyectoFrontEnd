import { useState, useEffect } from 'react';

export default function FeaturedChampion({ champion }) {
  const [activeAbilityIndex, setActiveAbilityIndex] = useState(0);

  useEffect(() => {
    setActiveAbilityIndex(0);
  }, [champion]);

  if (!champion) {
    return (
      <section id="campeon-destacado" className="featured-champion-section">
        <h3>Detalles de Campeón</h3>
        <p>Selecciona un campeón de la lista superior para explorar su ficha completa.</p>
      </section>
    );
  }

  const activeAbility = champion.abilities[activeAbilityIndex];

  return (
    <section id="campeon-destacado" aria-labelledby="featured-champion-title" className="featured-champion-section">
      <h3 id="featured-champion-title">Ficha de Campeón</h3>
      
      <article className="featured-card">
        <div className="featured-card-header">
          <div className="champion-badge-icon" data-role={champion.role}>
            {champion.name[0]}
          </div>
          <div className="featured-card-title-area">
            <h4>{champion.name}</h4>
            <span className="champion-title-tagline">"{champion.title}"</span>
          </div>
        </div>

        <div className="featured-card-body">
          <div className="champion-meta-grid">
            <div className="meta-item">
              <strong>Rol principal:</strong>
              <span className={`role-badge ${champion.role.toLowerCase()}`}>{champion.role}</span>
            </div>
            <div className="meta-item">
              <strong>Dificultad:</strong>
              <div className="difficulty-meter" aria-label={`Dificultad: ${champion.difficulty}`}>
                <div className="meter-bars">
                  <span className={`meter-bar ${champion.difficultyValue >= 1 ? 'filled' : ''}`} />
                  <span className={`meter-bar ${champion.difficultyValue >= 2 ? 'filled' : ''}`} />
                  <span className={`meter-bar ${champion.difficultyValue >= 3 ? 'filled' : ''}`} />
                </div>
                <span className="difficulty-text">{champion.difficulty}</span>
              </div>
            </div>
          </div>

          <p className="champion-bio">{champion.description}</p>

          <div className="abilities-area">
            <h5>Habilidades Clave</h5>
            <div className="ability-tabs" role="tablist" aria-label="Habilidades del campeón">
              {champion.abilities.map((ability, idx) => (
                <button
                  key={ability.key}
                  type="button"
                  role="tab"
                  aria-selected={activeAbilityIndex === idx}
                  className={`ability-tab-btn ${activeAbilityIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveAbilityIndex(idx)}
                >
                  <span className="ability-key">{ability.key}</span>
                </button>
              ))}
            </div>

            {activeAbility && (
              <div className="ability-description-box" aria-live="polite">
                <h6>{activeAbility.name}</h6>
                <p>{activeAbility.desc}</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
