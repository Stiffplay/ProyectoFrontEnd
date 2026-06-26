import { useState } from 'react';
import { itemsData } from '../../utils/constants';

export default function ItemsSection() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const categories = ['Todos', 'Físico', 'Mágico', 'Defensivo'];

  const filteredItems = itemsData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="objetos" aria-labelledby="objetos-title" className="items-section">
      <h3 id="objetos-title">Objetos Representativos</h3>
      <p className="section-intro-text">
        Explora algunos de los objetos legendarios más emblemáticos de la Grieta del Invocador, sus estadísticas y su coste de adquisición.
      </p>

      <div className="items-controls">
        <div className="search-box">
          <label htmlFor="item-search" className="visually-hidden">Buscar objeto por nombre</label>
          <input
            id="item-search"
            type="search"
            placeholder="Buscar objeto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="category-filters" role="group" aria-label="Filtrar por categoría de objeto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <article key={item.name} className="item-card">
            <div className="item-card-header">
              <span className={`item-category-tag ${item.category.toLowerCase()}`}>{item.category}</span>
              <span className="item-gold" aria-label={`Coste de oro: ${item.cost}`}>🪙 {item.cost} g</span>
            </div>
            <h4>{item.name}</h4>
            <div className="item-stats" aria-label="Estadísticas">
              {item.stats}
            </div>
            <p className="item-passive">{item.passive}</p>
          </article>
        ))}
        {filteredItems.length === 0 && (
          <div className="no-results">No se encontraron objetos.</div>
        )}
      </div>
    </section>
  );
}
