import { mapsData } from '../../utils/constants';

export default function MapsSection() {
  return (
    <section id="mapas" aria-labelledby="mapas-title" className="maps-section">
      <h3 id="mapas-title">Campos de Batalla (Mapas)</h3>
      <p className="section-intro-text">
        El universo de League of Legends se desenvuelve en campos de batalla diseñados para diferentes dinámicas de juego.
      </p>

      <div className="maps-grid">
        {mapsData.map((map) => (
          <article key={map.name} className="map-card">
            <div className="map-card-header">
              <h4>{map.name}</h4>
              <span className="map-queue-type">{map.queueType}</span>
            </div>
            <div className="map-card-body">
              <div className="map-meta-item">
                <strong>Carriles y zonas:</strong> <span>{map.lanes}</span>
              </div>
              <p className="map-description">{map.description}</p>
              <div className="map-strategy">
                <h5>Enfoque Estratégico</h5>
                <p>{map.strategy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
