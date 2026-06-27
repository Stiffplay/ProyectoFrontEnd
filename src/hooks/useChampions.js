import { useState, useEffect } from 'react';

const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com/cdn/16.13.1';
const CHAMPION_DATA_URL = `${DDRAGON_BASE}/data/es_ES/champion.json`;

// Icono cuadrado (48x48) — para la lista del explorador
export const getChampionIconUrl = (championId) =>
  `${DDRAGON_BASE}/img/champion/${championId}.png`;

// Splash art panorámico — para la ficha destacada
export const getChampionSplashUrl = (championId) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;

// Alias mantenido por compatibilidad con FeaturedChampion
export const getChampionImageUrl = getChampionSplashUrl;

// Mapea las etiquetas de la API al idioma español
const TAG_MAP = {
  Fighter: 'Luchador',
  Tank: 'Tanque',
  Mage: 'Mago',
  Assassin: 'Asesino',
  Marksman: 'Tirador',
  Support: 'Soporte',
};

// Convierte el número de dificultad (0-10) de la API a una escala de 1-3
const mapDifficulty = (value) => {
  if (value <= 3) return { difficulty: 'Baja', difficultyValue: 1 };
  if (value <= 6) return { difficulty: 'Media', difficultyValue: 2 };
  return { difficulty: 'Alta', difficultyValue: 3 };
};

// Transforma la entrada de la API al formato que usan los componentes
const transformChampion = (key, champ) => {
  const { difficulty, difficultyValue } = mapDifficulty(champ.info?.difficulty ?? 0);
  const roleTag = champ.tags?.[0] ?? 'Fighter';
  const role = TAG_MAP[roleTag] ?? roleTag;

  return {
    id: key,              // id exacto de la API (ej: "Ahri", "AurelionSol")
    name: champ.name,     // nombre localizado en es_ES
    title: champ.title,
    role,
    difficulty,
    difficultyValue,
    description: champ.blurb,
    // Las habilidades se cargan a demanda en FeaturedChampion via useChampionDetail
    abilities: [],
    imageUrl: getChampionSplashUrl(key),  // splash art para la ficha
    iconUrl: getChampionIconUrl(key),     // icono cuadrado para la lista
  };
};

export function useChampions() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchChampions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CHAMPION_DATA_URL);
        if (!response.ok) {
          throw new Error(`Error al cargar la API: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        const champArray = Object.entries(json.data).map(([key, champ]) =>
          transformChampion(key, champ)
        );

        // Ordena alfabéticamente por nombre
        champArray.sort((a, b) => a.name.localeCompare(b.name));

        if (!cancelled) {
          setChampions(champArray);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchChampions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { champions, loading, error };
}
