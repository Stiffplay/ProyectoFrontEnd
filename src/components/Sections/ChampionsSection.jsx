import { useState, useMemo } from 'react';

// Roles disponibles en español — se derivan dinámicamente de los datos de la API
const STATIC_ROLES = ['Todos', 'Luchador', 'Tanque', 'Mago', 'Asesino', 'Tirador', 'Soporte'];

export default function ChampionsSection({ champions, loading, error, selectedChampion, onSelectChampion }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');

  // Calcula los roles presentes en los datos recibidos
  const availableRoles = useMemo(() => {
    const rolesInData = new Set(champions.map((c) => c.role));
    return STATIC_ROLES.filter((r) => r === 'Todos' || rolesInData.has(r));
  }, [champions]);

  const filteredChampions = useMemo(() =>
    champions.filter((champ) => {
      const matchesSearch = champ.name.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'Todos' || champ.role === roleFilter;
      return matchesSearch && matchesRole;
    }),
    [champions, search, roleFilter]
  );

  return (
    <section id="campeones" aria-labelledby="campeones-title" className="slide">
      <h3 id="campeones-title">Explorador de Campeones</h3>

      <div className="champions-controls">
        <div className="search-box">
          <label htmlFor="champ-search" className="visually-hidden">Buscar campeón por nombre</label>
          <input
            id="champ-search"
            type="search"
            placeholder="Buscar campeón..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="role-filters" role="group" aria-label="Filtrar por rol">
          {availableRoles.map((role) => (
            <button
              key={role}
              type="button"
              className={`filter-btn ${roleFilter === role ? 'active' : ''}`}
              onClick={() => setRoleFilter(role)}
              disabled={loading}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="slide-content">
        {/* ─── Panel izquierdo: lista de campeones ─── */}
        <aside className="champ-list" aria-label="Listado interactivo de campeones">
          {loading && (
            <div className="api-status loading" role="status" aria-live="polite">
              <span className="spinner" aria-hidden="true" />
              Cargando campeones desde la API…
            </div>
          )}

          {error && !loading && (
            <div className="api-status error" role="alert">
              ⚠️ No se pudo cargar la API: {error}
            </div>
          )}

          {!loading && !error && (
            <ul className="champ-list-interactive">
              {filteredChampions.map((champion) => (
                <li key={champion.id}>
                  <button
                    type="button"
                    className={`champ-item-btn ${selectedChampion?.id === champion.id ? 'active' : ''}`}
                    onClick={() => onSelectChampion(champion)}
                    aria-label={`Seleccionar ${champion.name}, rol ${champion.role}`}
                    aria-pressed={selectedChampion?.id === champion.id}
                  >
                    {/* Icono cuadrado oficial (48×48) de Data Dragon */}
                    <img
                      src={champion.iconUrl}
                      alt={champion.name}
                      className="champ-avatar-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    {/* Fallback con inicial si la imagen falla */}
                    <span
                      className="champ-avatar-placeholder"
                      data-role={champion.role}
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    >
                      {champion.name[0]}
                    </span>

                    <div className="champ-item-info">
                      <span className="champ-name">{champion.name}</span>
                      <span className="champ-role-badge">{champion.role}</span>
                    </div>
                  </button>
                </li>
              ))}
              {!loading && filteredChampions.length === 0 && (
                <li className="no-results">No se encontraron campeones.</li>
              )}
            </ul>
          )}
        </aside>

        {/* ─── Panel derecho: vista rápida del campeón seleccionado ─── */}
        <article className="champ-detail" aria-labelledby="quick-view-title">
          {selectedChampion ? (
            <>
              <div className="champ-detail-img-wrapper">
                <img
                  src={selectedChampion.imageUrl}
                  alt={`Arte de carga de ${selectedChampion.name}`}
                  className="champ-detail-img"
                  loading="lazy"
                />
                <div className="champ-detail-img-gradient" aria-hidden="true" />
              </div>
              <h4 id="quick-view-title">{selectedChampion.name}</h4>
              <p className="champ-title-italic">"{selectedChampion.title}"</p>
              <div className="champ-quick-stats">
                <span className="stat-badge">Rol: {selectedChampion.role}</span>
                <span className="stat-badge">Dificultad: {selectedChampion.difficulty}</span>
              </div>
              <p className="champ-quick-desc">{selectedChampion.description}</p>
              <a href="#campeon-destacado" className="view-more-link">Ver detalles y habilidades ↓</a>
            </>
          ) : (
            <p className="champ-placeholder-text">Selecciona un campeón de la lista para ver su información.</p>
          )}
        </article>
      </div>
    </section>
  );
}
