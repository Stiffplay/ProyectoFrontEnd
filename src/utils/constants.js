export const carouselImages = [
  { src: '/imagenes/Campeones.jpg', alt: 'Imagen 1 del carrusel: Arte grupal de campeones de League of Legends' },
  { src: '/imagenes/Campeones2.jpg', alt: 'Imagen 2 del carrusel: Guerreros de Runaterra en combate' },
  { src: '/imagenes/Campeones3.jpg', alt: 'Imagen 3 del carrusel: Vista panorámica de la Grieta del Invocador' }
];

export const navLinks = [
  { href: '#campeones', label: 'Campeones' },
  { href: '#objetos', label: 'Objetos' },
  { href: '#mapas', label: 'Mapas' },
  { href: '#historia', label: 'Historia' },
  { href: '#contacto', label: 'Contacto' }
];

export const championsData = [
  {
    id: 'ahri',
    name: 'Ahri',
    title: 'La Vastaya de Nueve Colas',
    role: 'Mago',
    difficulty: 'Media',
    difficultyValue: 2,
    description: 'Ahri es una maga vastaya con una conexión innata con el poder latente de Runaterra. Puede manipular las emociones de sus enemigos antes de consumir sus esencias vitales, y utiliza su movilidad espiritual para posicionarse perfectamente en combate.',
    abilities: [
      { key: 'Pasiva', name: 'Robo de Esencia', desc: 'Después de matar súbditos o campeones, Ahri absorbe fragmentos de esencia. Al acumular suficientes, se cura una parte de su vida faltante.' },
      { key: 'Q', name: 'Orbe del Engaño', desc: 'Lanza y recupera su orbe, infligiendo daño mágico al salir y daño verdadero al regresar.' },
      { key: 'W', name: 'Fuego Zorro', desc: 'Libera tres fuegos zorro que fijan y atacan a los enemigos cercanos, otorgándole un breve aumento de velocidad de movimiento.' },
      { key: 'E', name: 'Hechizo', desc: 'Lanza un beso que inflige daño mágico y provoca que el primer enemigo golpeado camine inofensivamente hacia ella, recibiendo daño aumentado.' },
      { key: 'R', name: 'Impulso Espiritual', desc: 'Se desplaza hacia adelante y lanza rayos de esencia a los enemigos cercanos. Puede usarse hasta tres veces, y se obtienen cargas adicionales al lograr derribos.' }
    ]
  },
  {
    id: 'yasuo',
    name: 'Yasuo',
    title: 'El Imperdonable',
    role: 'Luchador',
    difficulty: 'Alta',
    difficultyValue: 3,
    description: 'Yasuo es un espadachín ágil y determinado de Jonia, acusado falsamente de asesinar a su maestro. Utiliza el poder del viento para destrozar a sus oponentes y proteger a sus aliados de proyectiles enemigos.',
    abilities: [
      { key: 'Pasiva', name: 'Camino del Vagabundo', desc: 'La probabilidad de golpe crítico de Yasuo se duplica. Además, genera un escudo al moverse que se activa al recibir daño.' },
      { key: 'Q', name: 'Tempestad de Acero', desc: 'Estocada hacia adelante que daña a todos los enemigos en línea recta. Al conectar dos golpes, el tercer disparo lanza un tornado que suspende a los enemigos en el aire.' },
      { key: 'W', name: 'Muro de Viento', desc: 'Crea una pared de viento en movimiento que bloquea todos los proyectiles enemigos durante 4 segundos.' },
      { key: 'E', name: 'Hoja Cortante', desc: 'Se desliza a través de un enemigo objetivo, infligiendo daño mágico. No se puede usar sobre el mismo objetivo durante unos segundos.' },
      { key: 'R', name: 'Último Aliento', desc: 'Se teletransporta instantáneamente hacia un campeón enemigo suspendido en el aire, infligiéndole daño físico masivo y manteniéndolo en el aire un poco más.' }
    ]
  },
  {
    id: 'jinx',
    name: 'Jinx',
    title: 'La Bala Perdida',
    role: 'Tirador',
    difficulty: 'Media',
    difficultyValue: 2,
    description: 'Una maníaca e impulsiva criminal de Zaun, Jinx vive para sembrar el caos sin importarle las consecuencias. Armada con un arsenal de juguetes destructivos, desata las explosiones más brillantes y ruidosas.',
    abilities: [
      { key: 'Pasiva', name: '¡A ponerse a salvo!', desc: 'Obtiene un enorme aumento de velocidad de movimiento y velocidad de ataque cuando ayuda a destruir una torreta o a asesinar a un campeón enemigo.' },
      { key: 'Q', name: '¡Cambio de armas!', desc: 'Alterna entre Pumba (su ametralladora, que aumenta la velocidad de ataque) y Carapescado (su lanzacohetes, que inflige daño en área a cambio de maná y rango).' },
      { key: 'W', name: '¡Zap!', desc: 'Dispara un rayo eléctrico con su pistola de choque que ralentiza y revela al primer enemigo golpeado, infligiéndole daño físico.' },
      { key: 'E', name: '¡Mascafuegos!', desc: 'Lanza una fila de granadas trampa que explotan después de 5 segundos, prendiendo fuego a los enemigos o inmovilizando a quienes las pisen.' },
      { key: 'R', name: '¡Supermegacohete mortal!', desc: 'Dispara un cohete global que aumenta su daño a medida que viaja. Detona al golpear a un campeón enemigo, infligiendo daño físico basado en la vida faltante del objetivo.' }
    ]
  },
  {
    id: 'lux',
    name: 'Lux',
    title: 'La Dama Luminosa',
    role: 'Mago',
    difficulty: 'Baja',
    difficultyValue: 1,
    description: 'Luxanna Crownguard proviene de Demacia, un reino donde las habilidades mágicas se ven con temor y desconfianza. Capaz de manipular la luz a su antojo, creció ocultando su don para proteger la nobleza de su familia.',
    abilities: [
      { key: 'Pasiva', name: 'Iluminación', desc: 'Los hechizos de Lux cargan de energía al objetivo durante 6 segundos. El siguiente ataque básico de Lux detona la energía, infligiendo daño mágico adicional.' },
      { key: 'Q', name: 'Hechizo Luminoso', desc: 'Dispara una esfera de luz que encadena e inmoviliza hasta a dos enemigos, infligiendo daño mágico.' },
      { key: 'W', name: 'Barrera Prismática', desc: 'Lanza su varita y crea un escudo protector para ella y todos los aliados que toque en su trayectoria de ida y vuelta.' },
      { key: 'E', name: 'Singularidad Brillante', desc: 'Envía una anomalía de luz a una zona que ralentiza a los enemigos cercanos. Lux puede detonarla para infligir daño mágico en área.' },
      { key: 'R', name: 'Chispa Final', desc: 'Tras canalizar un rayo de luz gigante, Lux inflige daño mágico masivo en línea recta a todos los enemigos en el área de efecto.' }
    ]
  },
  {
    id: 'garen',
    name: 'Garen',
    title: 'El Poder de Demacia',
    role: 'Luchador',
    difficulty: 'Baja',
    difficultyValue: 1,
    description: 'Un guerrero orgulloso y noble, Garen combate al frente de la Vanguardia Invalorable. Es adorado por sus hombres y respetado por sus enemigos como la encarnación misma de la fuerza de Demacia.',
    abilities: [
      { key: 'Pasiva', name: 'Perseverancia', desc: 'Si Garen no ha recibido daño de monstruos o campeones enemigos recientemente, regenera un porcentaje de su vida máxima por segundo.' },
      { key: 'Q', name: 'Golpe Decisivo', desc: 'Se libera de todas las ralentizaciones y obtiene un aumento de velocidad de movimiento. Su siguiente ataque silencia al objetivo y le inflige daño físico.' },
      { key: 'W', name: 'Coraje', desc: 'Aumenta pasivamente su armadura y resistencia mágica al asesinar enemigos. Al activarse, obtiene un escudo temporal y reducción de daño.' },
      { key: 'E', name: 'Juicio', desc: 'Garen gira rápidamente con su espada, infligiendo daño físico a los enemigos cercanos y reduciendo la armadura de los alcanzados por múltiples giros.' },
      { key: 'R', name: 'Justicia Demaciana', desc: 'Invoca el poder de Demacia para asestar un golpe de gracia a un campeón enemigo, infligiendo daño verdadero basado en la vida faltante del objetivo.' }
    ]
  },
  {
    id: 'zed',
    name: 'Zed',
    title: 'El Maestro de las Sombras',
    role: 'Asesino',
    difficulty: 'Alta',
    difficultyValue: 3,
    description: 'Zed es el líder de la Orden de las Sombras, una organización que fundó con la intención de militarizar las tradiciones mágicas de Jonia para repeler a los invasores noxianos. Utiliza técnicas prohibidas de sombras espirituales.',
    abilities: [
      { key: 'Pasiva', name: 'Desprecio por los Débiles', desc: 'Los ataques básicos de Zed contra objetivos con menos del 50% de vida máxima infligen daño mágico adicional basado en la vida máxima del enemigo.' },
      { key: 'Q', name: 'Navaja Shuriken', desc: 'Tanto Zed como sus sombras lanzan sus shurikens, infligiendo daño físico a todos los enemigos atravesados.' },
      { key: 'W', name: 'Sombra Viviente', desc: 'Lanza una sombra que imita sus habilidades. Zed puede reactivar la habilidad para intercambiar posiciones con esta sombra.' },
      { key: 'E', name: 'Cuchillada de las Sombras', desc: 'Zed y sus sombras realizan un giro con sus cuchillas, dañando a los enemigos cercanos. Los golpes de las sombras ralentizan al enemigo.' },
      { key: 'R', name: 'Marca de la Muerte', desc: 'Se vuelve inalcanzable y salta hacia un campeón enemigo para marcarlo. Después de 3 segundos, la marca detona, infligiendo daño basado en el daño infligido mientras estaba marcada.' }
    ]
  }
];

export const itemsData = [
  {
    name: 'Filo de la Infinito',
    cost: 3400,
    stats: '+80 Daño de Ataque, +25% Probabilidad de Golpe Crítico',
    passive: 'Perfección: Aumenta el daño de los golpes críticos en un 40%.',
    category: 'Físico'
  },
  {
    name: 'Sombrero Mortal de Rabadon',
    cost: 3600,
    stats: '+140 Poder de Habilidad',
    passive: 'Magia Pura: Incrementa el poder de habilidad total en un 35%.',
    category: 'Mágico'
  },
  {
    name: 'Reloj de Arena de Zhonya',
    cost: 3250,
    stats: '+120 Poder de Habilidad, +50 Armadura',
    passive: 'Estasis (Activa): Te vuelves invulnerable e inalcanzable durante 2.5 segundos, pero no puedes realizar ninguna acción (120s de enfriamiento).',
    category: 'Mágico'
  },
  {
    name: 'Fuerza de la Trinidad',
    cost: 3333,
    stats: '+45 Daño de Ataque, +33% Velocidad de Ataque, +300 Vida, +20 Aceleración de Habilidad',
    passive: 'Hoja Encantada: Tras usar una habilidad, tu siguiente ataque básico inflige daño físico adicional equivalente al 200% del daño de ataque base.',
    category: 'Físico'
  },
  {
    name: 'Sanguinaria',
    cost: 3400,
    stats: '+80 Daño de Ataque, +18% Robo de Vida',
    passive: 'Escudo de Sangre: El robo de vida puede curarte en exceso, generando un escudo protector de hasta 450 de daño si tienes la vida al máximo.',
    category: 'Físico'
  },
  {
    name: 'Armadura de Warmog',
    cost: 3100,
    stats: '+1000 Vida, +100% Regeneración de Vida Base, +10% Aceleración de Habilidad',
    passive: 'Corazón de Warmog: Si tienes al menos 3000 de vida máxima, regeneras un 5% de tu vida máxima por segundo si no has recibido daño en los últimos 6 segundos.',
    category: 'Defensivo'
  }
];

export const mapsData = [
  {
    name: 'La Grieta del Invocador',
    queueType: '5v5 Clásico',
    lanes: '3 Carriles (Superior, Medio, Inferior) y Jungla',
    description: 'El mapa competitivo estándar de League of Legends. Dos equipos de cinco jugadores luchan por destruir el Nexo enemigo. Cuenta con monstruos neutrales épicos como el Barón Nashor y los Dragones Elementales que otorgan mejoras definitivas a quienes los derrotan.',
    strategy: 'Requiere una distribución coordinada de roles: un carrilero superior, un jungler para el control de objetivos, un carrilero central de alto impacto y un dúo en el carril inferior (tirador y soporte).'
  },
  {
    name: 'El Abismo de los Lamentos',
    queueType: '5v5 ARAM (All Random All Mid)',
    lanes: '1 Carril Único sin Jungla',
    description: 'Un mapa de combate constante situado en un puente helado de Freljord. Los jugadores reciben campeones completamente al azar y no pueden curarse en la base ni comprar objetos a menos que hayan muerto. Esto fomenta batallas en equipo caóticas y rápidas.',
    strategy: 'El juego en equipo y el control de masas son fundamentales. La curación colectiva y el daño de desgaste a larga distancia son altamente efectivos debido a la imposibilidad de volver a la base.'
  }
];

export const regionsData = [
  {
    name: 'Jonia',
    motto: 'Armonía y Equilibrio Espiritual',
    description: 'Conocida como las Tierras Primigenias, Jonia es un archipiélago de belleza salvaje donde la magia fluye por la tierra misma. Sus habitantes buscan vivir en armonía con la naturaleza y los espíritus, aunque la reciente invasión de Noxus ha forzado a muchos a adoptar el camino de la guerra y la autodefensa.',
    champions: 'Ahri, Yasuo, Zed, Irelia, Karma, Lee Sin'
  },
  {
    name: 'Demacia',
    motto: 'Justicia, Honor y Deber',
    description: 'Un reino noble y militar con una historia orgullosa de protección de su pueblo. Fundada como un refugio contra las guerras mágicas, Demacia valora el orden, el sacrificio personal y el honor. Sin embargo, su extrema hostilidad hacia los magos ha generado tensiones internas y levantamientos civiles en los últimos tiempos.',
    champions: 'Garen, Lux, Jarvan IV, Galio, Shyvana'
  },
  {
    name: 'Noxus',
    motto: 'Fuerza por Encima de Todo',
    description: 'Un imperio brutal y expansionista que se extiende por el centro del continente. Noxus es una sociedad meritocrática: no importa el linaje, la riqueza o el estatus social; cualquier persona puede ascender al poder si demuestra tener la fuerza y la determinación necesarias para servir al imperio.',
    champions: 'Darius, Katarina, Swain, Draven, Riven'
  },
  {
    name: 'Freljord',
    motto: 'Sobrevivir a la Tormenta',
    description: 'Una tierra helada y despiadada donde solo los más fuertes sobreviven. Dividida por una guerra civil milenaria entre tres tribus principales lideradas por Ashe, Sejuani y Lissandra, el Freljord es hogar de criaturas colosales, guerreros indómitos y antiguos semidioses del hielo y la forja.',
    champions: 'Ashe, Sejuani, Braum, Olaf, Anivia, Ornn'
  }
];

export const initialRegistro = {
  usuario: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {}
};

export const initialLogin = {
  email: '',
  password: '',
  errors: {}
};

export const initialContacto = {
  nombre: '',
  asunto: '',
  mensaje: '',
  errors: {}
};
