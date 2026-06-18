import { championList } from '../../utils/constants';

export default function ChampionsSection() {
  return (
    <section id="campeones-slide" aria-labelledby="campeones-slide-title" className="slide">
      <h3 id="campeones-slide-title">Lista de Campeones</h3>
      <div className="slide-content">
        <aside className="champ-list" aria-label="Listado de campeones">
          <ol>
            {championList.map((champion) => (
              <li key={champion}>{champion}</li>
            ))}
          </ol>
        </aside>

        <article className="champ-detail" aria-labelledby="ejemplo-campeon">
          <h4 id="ejemplo-campeon">Ejemplo: Ahri</h4>
          <p>Rol: Mago / Asesino. Dificultad: Media.</p>
          <p>Resumen: Ahri es una maga móvil que inflige daño mágico con habilidades que rehacen su posición y seducen a los enemigos.</p>
        </article>
      </div>
    </section>
  );
}
