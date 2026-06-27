import { useState, useEffect } from 'react';

const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com/cdn/16.13.1';

// URLs de iconos de habilidades
export const getSpellIconUrl = (imageFull) =>
  `${DDRAGON_BASE}/img/spell/${imageFull}`;

export const getPassiveIconUrl = (imageFull) =>
  `${DDRAGON_BASE}/img/passive/${imageFull}`;

/**
 * Limpia el HTML de las descripciones de la API de Riot
 * (elimina tags como <magicDamage>, <trueDamage>, etc.)
 */
const cleanDescription = (html) => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
};

/**
 * Transforma los datos crudos de la API al formato { key, name, desc, iconUrl }
 */
const transformAbilities = (data) => {
  const champion = Object.values(data.data)[0];
  if (!champion) return [];

  const spellKeys = ['Q', 'W', 'E', 'R'];

  const passive = {
    key: 'Pasiva',
    name: champion.passive.name,
    desc: cleanDescription(champion.passive.description),
    iconUrl: getPassiveIconUrl(champion.passive.image.full),
  };

  const spells = champion.spells.map((spell, i) => ({
    key: spellKeys[i] ?? `Habilidad ${i + 1}`,
    name: spell.name,
    desc: cleanDescription(spell.description),
    iconUrl: getSpellIconUrl(spell.image.full),
    cooldown: spell.cooldownBurn,
    cost: spell.costBurn !== '0' ? spell.costBurn : null,
    costType: spell.costType?.trim() ?? '',
  }));

  return [passive, ...spells];
};

/**
 * Hook que carga las habilidades de un campeón bajo demanda.
 * Hace fetch solo cuando cambia el championId y cachea los resultados.
 */
const cache = {};

export function useChampionDetail(championId) {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!championId) {
      setAbilities([]);
      return;
    }

    // Devuelve desde caché si ya fue cargado antes
    if (cache[championId]) {
      setAbilities(cache[championId]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setAbilities([]);

    const url = `${DDRAGON_BASE}/data/es_ES/champion/${championId}.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const transformed = transformAbilities(data);
        cache[championId] = transformed;
        if (!cancelled) {
          setAbilities(transformed);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [championId]);

  return { abilities, loading, error };
}
