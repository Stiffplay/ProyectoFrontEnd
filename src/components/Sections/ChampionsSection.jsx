import { useState } from 'react';
import { championsData } from '../../utils/constants';

export default function ChampionsSection({ selectedChampion, onSelectChampion }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');

  const roles = ['Todos', 'Mago', 'Asesino', 'Tirador', 'Luchador'];

  const filteredChampions = championsData.filter((champ) => {
    const matchesSearch = champ.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'Todos' || champ.role === roleFilter;
    return matchesSearch && matchesRole;
  });

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
          />
        </div>
        <div className="role-filters" role="group" aria-label="Filtrar por rol">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              className={`filter-btn ${roleFilter === role ? 'active' : ''}`}
              onClick={() => setRoleFilter(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="slide-content">
        <aside className="champ-list" aria-label="Listado interactivo de campeones">
          <ul className="champ-list-interactive">
            {filteredChampions.map((champion) => (
              <li key={champion.id}>
                <button
                  type="button"
                  className={`champ-item-btn ${selectedChampion?.id === champion.id ? 'active' : ''}`}
                  onClick={() => onSelectChampion(champion)}
                  aria-label={`Seleccionar ${champion.name}, rol ${champion.role}`}
                >
                  <span className="champ-avatar-placeholder" data-role={champion.role}>
                    {champion.name[0]}
                  </span>
                  <div className="champ-item-info">
                    <span className="champ-name">{champion.name}</span>
                    <span className="champ-role-badge">{champion.role}</span>
                  </div>
                </button>
              </li>
            ))}
            {filteredChampions.length === 0 && (
              <li className="no-results">No se encontraron campeones.</li>
            )}
          </ul>
        </aside>

        <article className="champ-detail" aria-labelledby="quick-view-title">
          <h4 id="quick-view-title">Vista Rápida: {selectedChampion?.name}</h4>
          <p className="champ-title-italic">"{selectedChampion?.title}"</p>
          <div className="champ-quick-stats">
            <span className="stat-badge">Rol: {selectedChampion?.role}</span>
            <span className="stat-badge">Dificultad: {selectedChampion?.difficulty}</span>
          </div>
          <p className="champ-quick-desc">{selectedChampion?.description}</p>
          <a href="#campeon-destacado" className="view-more-link">Ver detalles y habilidades ↓</a>
        </article>
      </div>
    </section>
  );
}
