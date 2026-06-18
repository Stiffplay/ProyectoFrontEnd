export const carouselImages = [
  { src: '/imagenes/Campeones.jpg', alt: 'Imagen 1 del carrusel' },
  { src: '/imagenes/Campeones2.jpg', alt: 'Imagen 2 del carrusel' },
  { src: '/imagenes/Campeones3.jpg', alt: 'Imagen 3 del carrusel' }
];

export const championList = ['Ahri', '...'];

export const navLinks = [
  { href: 'campeones.html', label: 'Campeones' },
  { href: '#objetos', label: 'Objetos' },
  { href: '#mapas', label: 'Mapas' },
  { href: '#historia', label: 'Historia' },
  { href: '#guías', label: 'Guías' }
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
