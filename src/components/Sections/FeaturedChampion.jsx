import { useState, useEffect } from 'react';
import { useChampionDetail } from '../../hooks/useChampionDetail';

export default function FeaturedChampion({ champion }) {
  const [activeAbilityIndex, setActiveAbilityIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Carga las habilidades reales del campeón seleccionado desde la API
  const { abilities, loading: abilitiesLoading, error: abilitiesError } = useChampionDetail(
    champion?.id ?? null
  );

  // Resetea el tab activo cuando cambia el campeón
  useEffect(() => {
    setActiveAbilityIndex(0);
    setImgLoaded(false);
  }, [champion]);

  if (!champion) {
    return (
      <section id="campeon-destacado" className="featured-champion-section">
        <h3>Detalles de Campeón</h3>
        <p>Selecciona un campeón de la lista superior para explorar su ficha completa.</p>
      </section>
    );
  }

  const activeAbility = abilities[activeAbilityIndex];

  return (
    <section id="campeon-destacado" aria-labelledby="featured-champion-title" className="featured-champion-section">
      <h3 id="featured-champion-title">Ficha de Campeón</h3>

      <article className="featured-card">

        {/* ─── Splash art panorámico (Data Dragon) ─── */}
        <div className="featured-champion-img-container">
          {!imgLoaded && (
            <div className="featured-img-skeleton" aria-hidden="true">
              <span className="champion-badge-icon" data-role={champion.role}>
                {champion.name[0]}
              </span>
            </div>
          )}
          <img
            src={champion.imageUrl}
            alt={`Splash art de ${champion.name}`}
            className={`featured-champion-img ${imgLoaded ? 'loaded' : 'hidden'}`}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="featured-img-overlay" aria-hidden="true">
            <div className="featured-card-title-area">
              <h4>{champion.name}</h4>
              <span className="champion-title-tagline">"{champion.title}"</span>
            </div>
          </div>
        </div>

        <div className="featured-card-body">

          {/* ─── Meta (rol + dificultad) ─── */}
          <div className="champion-meta-grid">
            <div className="meta-item">
              <strong>Rol principal:</strong>
              <span className={`role-badge ${champion.role?.toLowerCase()}`}>{champion.role}</span>
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

          {/* ─── Descripción ─── */}
          <p className="champion-bio">{champion.description}</p>

          {/* ─── Habilidades cargadas desde la API ─── */}
          <div className="abilities-area">
            <h5>Habilidades Clave</h5>

            {abilitiesLoading && (
              <div className="api-status loading" role="status" aria-live="polite">
                <span className="spinner" aria-hidden="true" />
                Cargando habilidades…
              </div>
            )}

            {abilitiesError && !abilitiesLoading && (
              <div className="api-status error" role="alert">
                ⚠️ No se pudieron cargar las habilidades: {abilitiesError}
              </div>
            )}

            {!abilitiesLoading && !abilitiesError && abilities.length > 0 && (
              <>
                {/* Tabs con icono de cada habilidad */}
                <div className="ability-tabs" role="tablist" aria-label="Habilidades del campeón">
                  {abilities.map((ability, idx) => (
                    <button
                      key={ability.key}
                      type="button"
                      role="tab"
                      aria-selected={activeAbilityIndex === idx}
                      className={`ability-tab-btn ${activeAbilityIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveAbilityIndex(idx)}
                      title={ability.name}
                    >
                      <img
                        src={ability.iconUrl}
                        alt={ability.name}
                        className="ability-icon"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="ability-key">{ability.key}</span>
                    </button>
                  ))}
                </div>

                {/* Descripción de la habilidad activa */}
                {activeAbility && (
                  <div className="ability-description-box" aria-live="polite">
                    <div className="ability-desc-header">
                      <img
                        src={activeAbility.iconUrl}
                        alt={activeAbility.name}
                        className="ability-icon-large"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div>
                        <h6>{activeAbility.name}</h6>
                        <div className="ability-meta-pills">
                          <span className="ability-key-pill">{activeAbility.key}</span>
                          {activeAbility.cooldown && (
                            <span className="ability-stat-pill" title="Enfriamiento">
                              ⏱ {activeAbility.cooldown}s
                            </span>
                          )}
                          {activeAbility.cost && (
                            <span className="ability-stat-pill" title="Coste">
                              💧 {activeAbility.cost} {activeAbility.costType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p>{activeAbility.desc}</p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </article>
    </section>
  );
}
