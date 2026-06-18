import { useEffect, useMemo, useRef, useState } from 'react';

const carouselImages = [
  { src: '/imagenes/Campeones.jpg', alt: 'Imagen 1 del carrusel' },
  { src: '/imagenes/Campeones2.jpg', alt: 'Imagen 2 del carrusel' },
  { src: '/imagenes/Campeones3.jpg', alt: 'Imagen 3 del carrusel' }
];

const championList = ['Ahri', '...'];
const navLinks = [
  { href: 'campeones.html', label: 'Campeones' },
  { href: '#objetos', label: 'Objetos' },
  { href: '#mapas', label: 'Mapas' },
  { href: '#historia', label: 'Historia' },
  { href: '#guías', label: 'Guías' }
];

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(password);
};

const obtenerUsuarioDesdeEmail = (email) => {
  if (!email) return '';
  return email.split('@')[0];
};

const initialRegistro = {
  usuario: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {}
};

const initialLogin = {
  email: '',
  password: '',
  errors: {}
};

const initialContacto = {
  nombre: '',
  asunto: '',
  mensaje: '',
  errors: {}
};

function App() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('registro');
  const [welcome, setWelcome] = useState({ visible: false, username: '' });
  const [registro, setRegistro] = useState(initialRegistro);
  const [login, setLogin] = useState(initialLogin);
  const [contacto, setContacto] = useState(initialContacto);
  const [registroMessage, setRegistroMessage] = useState({ text: '', type: '' });
  const [loginMessage, setLoginMessage] = useState({ text: '', type: '' });
  const [contactoMessage, setContactoMessage] = useState({ text: '', type: '' });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselInterval = useRef(null);

  useEffect(() => {
    startCarouselRotation();
    return () => stopCarouselRotation();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('modal-open', isAuthVisible);
    return () => document.body.classList.remove('modal-open');
  }, [isAuthVisible]);

  const startCarouselRotation = () => {
    stopCarouselRotation();
    carouselInterval.current = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % carouselImages.length);
    }, 5000);
  };

  const stopCarouselRotation = () => {
    if (carouselInterval.current) {
      window.clearInterval(carouselInterval.current);
      carouselInterval.current = null;
    }
  };

  const handleOpenAuth = (tab) => {
    setActiveTab(tab);
    setIsAuthVisible(true);
  };

  const handleCloseAuth = () => {
    setIsAuthVisible(false);
    setActiveTab('registro');
    setRegistro(initialRegistro);
    setLogin(initialLogin);
    setRegistroMessage({ text: '', type: '' });
    setLoginMessage({ text: '', type: '' });
  };

  const handleRegistroChange = (event) => {
    const { name, value } = event.target;
    setRegistro((prev) => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: '' } }));
  };

  const validarRegistro = () => {
    const errors = {};

    if (!registro.usuario.trim()) {
      errors.usuario = 'El usuario es obligatorio';
    } else if (registro.usuario.trim().length < 3) {
      errors.usuario = 'El usuario debe tener al menos 3 caracteres';
    }

    if (!registro.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!validarEmail(registro.email.trim())) {
      errors.email = 'Ingresa un email válido (ej: usuario@ejemplo.com)';
    }

    if (!registro.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (!validarPassword(registro.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un carácter especial';
    }

    if (!registro.confirmPassword) {
      errors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (registro.confirmPassword !== registro.password) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
  };

  const handleRegistroSubmit = (event) => {
    event.preventDefault();
    const errors = validarRegistro();

    if (Object.keys(errors).length > 0) {
      setRegistro((prev) => ({ ...prev, errors }));
      setRegistroMessage({ text: '✗ Por favor, completa correctamente todos los campos', type: 'error' });
      return;
    }

    setWelcome({ visible: true, username: registro.usuario.trim() });
    setRegistroMessage({ text: `✓ Registro exitoso. ¡Bienvenido ${registro.usuario.trim()}!`, type: 'success' });
    setRegistro(initialRegistro);
    setTimeout(() => {
      handleCloseAuth();
    }, 800);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: '' } }));
  };

  const validarLogin = () => {
    const errors = {};

    if (!login.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!validarEmail(login.email.trim())) {
      errors.email = 'Ingresa un email válido';
    }

    if (!login.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (!validarPassword(login.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un carácter especial';
    }

    return errors;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const errors = validarLogin();

    if (Object.keys(errors).length > 0) {
      setLogin((prev) => ({ ...prev, errors }));
      setLoginMessage({ text: '✗ Verifica que hayas ingresado datos correctos', type: 'error' });
      return;
    }

    const username = obtenerUsuarioDesdeEmail(login.email.trim());
    setWelcome({ visible: true, username });
    setLoginMessage({ text: `✓ ¡Inicio de sesión exitoso! Bienvenido de vuelta ${username}.`, type: 'success' });
    setLogin(initialLogin);
    setTimeout(() => {
      handleCloseAuth();
    }, 800);
  };

  const handleContactoChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = name === 'mensaje' ? value.slice(0, 500) : value;
    setContacto((prev) => ({ ...prev, [name]: trimmedValue, errors: { ...prev.errors, [name]: '' } }));
  };

  const validarContacto = () => {
    const errors = {};

    if (!contacto.nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio';
    } else if (contacto.nombre.trim().length < 3) {
      errors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!contacto.asunto.trim()) {
      errors.asunto = 'El asunto es obligatorio';
    } else if (contacto.asunto.trim().length < 5) {
      errors.asunto = 'El asunto debe tener al menos 5 caracteres';
    }

    if (!contacto.mensaje.trim()) {
      errors.mensaje = 'El mensaje es obligatorio';
    } else if (contacto.mensaje.trim().length < 10) {
      errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    return errors;
  };

  const handleContactoSubmit = (event) => {
    event.preventDefault();
    const errors = validarContacto();

    if (Object.keys(errors).length > 0) {
      setContacto((prev) => ({ ...prev, errors }));
      setContactoMessage({ text: '✗ Por favor, completa correctamente todos los campos', type: 'error' });
      return;
    }

    setContacto(initialContacto);
    setContactoMessage({ text: '✓ Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.', type: 'success' });
    setTimeout(() => setContactoMessage({ text: '', type: '' }), 5000);
  };

  const carouselTransform = useMemo(
    () => ({ transform: `translateX(-${carouselIndex * 100}%)` }),
    [carouselIndex]
  );

  const authWrapperClass = isAuthVisible ? 'auth-modal-backdrop visible' : 'auth-modal-backdrop';

  return (
    <div>
      <header className="container" role="banner">
        <a id="top" />
        <h1>Enciclopedia de League of Legends</h1>

        <form role="search" aria-label="Buscar en la enciclopedia" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="search" className="visually-hidden">
            Buscar
          </label>
          <input id="search" name="q" type="search" placeholder="Buscar campeones, objetos, mapas..." />
          <button type="submit">Buscar</button>
        </form>

        <p id="welcome-message" className="welcome-message" hidden={!welcome.visible} aria-live="polite">
          Bienvenido de vuelta <span id="welcome-user">{welcome.username}</span>.
        </p>

        <div className="auth-buttons">
          <button type="button" onClick={() => handleOpenAuth('registro')}>
            Registro
          </button>
          <button type="button" onClick={() => handleOpenAuth('login')}>
            Login
          </button>
          <button type="button" onClick={handleCloseAuth}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <section className="carousel-section" aria-label="Carrusel de imágenes">
        <div
          className="carousel"
          aria-roledescription="carousel"
          onMouseEnter={stopCarouselRotation}
          onMouseLeave={startCarouselRotation}
        >
          <div className="carousel-track" style={carouselTransform}>
            {carouselImages.map((slide, index) => (
              <div className="carousel-slide" key={slide.src} data-index={index}>
                <img src={slide.src} alt={slide.alt} />
              </div>
            ))}
          </div>

          <button className="carousel-button prev" type="button" aria-label="Imagen anterior" onClick={() => setCarouselIndex((index) => (index - 1 + carouselImages.length) % carouselImages.length)}>
            ‹
          </button>
          <button className="carousel-button next" type="button" aria-label="Imagen siguiente" onClick={() => setCarouselIndex((index) => (index + 1) % carouselImages.length)}>
            ›
          </button>

          <div className="carousel-dots" role="tablist" aria-label="Seleccionar imagen">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === carouselIndex ? 'active' : ''}`}
                type="button"
                aria-label={`Ver imagen ${index + 1}`}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <nav className="container" aria-label="Navegación principal">
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container" role="main">
        <section className="hero" aria-labelledby="intro-title">
          <h2 id="intro-title">Bienvenido a la enciclopedia</h2>
          <p>Repositorio informativo y neutral sobre campeones, objetos, mapas y la historia del universo de League of Legends.</p>
        </section>

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

        <section id="campeones" aria-labelledby="campeones-title">
          <h3 id="campeones-title">Campeón destacado</h3>
          <article>
            <h4>Nombre del campeón</h4>
            <p>Descripción breve del campeón: rol, dificultad y resumen de habilidades.</p>
            <ul>
              <li>Rol: (ej. Asesino / Tirador / Mago)</li>
              <li>Dificultad: (baja / media / alta)</li>
            </ul>
          </article>
        </section>

        <section id="objetos" aria-labelledby="objetos-title">
          <h3 id="objetos-title">Objetos representativos</h3>
          <p>Lista y descripción corta de objetos clave y su propósito en las partidas.</p>
        </section>

        <section id="mapas" aria-labelledby="mapas-title">
          <h3 id="mapas-title">Mapas</h3>
          <p>Resumen de los mapas jugables (grieta, ARAM, otros modos) y sus características.</p>
        </section>

        <section id="historia" aria-labelledby="historia-title">
          <h3 id="historia-title">Lore y cronología</h3>
          <p>Sinopsis del trasfondo del universo, facciones y eventos importantes.</p>
        </section>
      </main>

      <div className={authWrapperClass} role="dialog" aria-modal="true" aria-labelledby="auth-title" aria-hidden={!isAuthVisible} onClick={(event) => event.target === event.currentTarget && handleCloseAuth()}>
        <section className="auth-panel" aria-labelledby="auth-title">
          <button className="auth-close" type="button" aria-label="Cerrar ventana" onClick={handleCloseAuth}>
            ×
          </button>
          <h2 id="auth-title">Accede o crea tu cuenta</h2>

          <div className="auth-tabs" role="tablist" aria-label="Opciones de acceso">
            <button className={`auth-tab ${activeTab === 'registro' ? 'active' : ''}`} data-tab="registro" type="button" role="tab" aria-selected={activeTab === 'registro'} onClick={() => setActiveTab('registro')}>
              Registro
            </button>
            <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} data-tab="login" type="button" role="tab" aria-selected={activeTab === 'login'} onClick={() => setActiveTab('login')}>
              Login
            </button>
          </div>

          <div id="registro" className={`auth-content ${activeTab === 'registro' ? 'active' : ''}`} role="tabpanel">
            <form id="registroForm" noValidate onSubmit={handleRegistroSubmit}>
              <h3>Registro</h3>
              <div className="form-field">
                <label htmlFor="reg_usuario">Usuario</label>
                <input type="text" id="reg_usuario" name="usuario" value={registro.usuario} onChange={handleRegistroChange} placeholder="Ej. juan_perez" aria-required="true" />
                <div className="error-message" id="reg_usuario_error">{registro.errors.usuario}</div>
              </div>

              <div className="form-field">
                <label htmlFor="reg_email">Correo electrónico</label>
                <input type="email" id="reg_email" name="email" value={registro.email} onChange={handleRegistroChange} placeholder="ejemplo@correo.com" aria-required="true" />
                <div className="error-message" id="reg_email_error">{registro.errors.email}</div>
              </div>

              <div className="form-field">
                <label htmlFor="reg_password">Contraseña</label>
                <input type="password" id="reg_password" name="password" value={registro.password} onChange={handleRegistroChange} placeholder="Mínimo 8 caracteres, una minúscula, mayúscula y carácter especial" aria-required="true" />
                <div className="helper-text">Debe tener al menos 8 caracteres, una minúscula, una mayúscula y un carácter especial.</div>
                <div className="error-message" id="reg_password_error">{registro.errors.password}</div>
              </div>

              <div className="form-field">
                <label htmlFor="reg_confirm_password">Confirmar Contraseña</label>
                <input type="password" id="reg_confirm_password" name="confirmPassword" value={registro.confirmPassword} onChange={handleRegistroChange} placeholder="Repite tu contraseña" aria-required="true" />
                <div className="error-message" id="reg_confirm_password_error">{registro.errors.confirmPassword}</div>
              </div>

              <button type="submit">Registrarse</button>
              <div id="registro_mensaje" className={`form-message ${registroMessage.type}`} role="status" aria-live="polite">
                {registroMessage.text}
              </div>
            </form>
          </div>

          <div id="login" className={`auth-content ${activeTab === 'login' ? 'active' : ''}`} role="tabpanel">
            <form id="loginForm" noValidate onSubmit={handleLoginSubmit}>
              <h3>Login</h3>

              <div className="form-field">
                <label htmlFor="login_email">Correo electrónico</label>
                <input type="email" id="login_email" name="email" value={login.email} onChange={handleLoginChange} placeholder="ejemplo@correo.com" aria-required="true" />
                <div className="error-message" id="login_email_error">{login.errors.email}</div>
              </div>

              <div className="form-field">
                <label htmlFor="login_password">Contraseña</label>
                <input type="password" id="login_password" name="password" value={login.password} onChange={handleLoginChange} placeholder="Tu contraseña" aria-required="true" />
                <div className="error-message" id="login_password_error">{login.errors.password}</div>
              </div>

              <button type="submit">Ingresar</button>
              <div id="login_mensaje" className={`form-message ${loginMessage.type}`} role="status" aria-live="polite">
                {loginMessage.text}
              </div>
            </form>
          </div>
        </section>
      </div>

      <footer className="container" role="contentinfo">
        <p>&copy; Enciclopedia no oficial de League of Legends. Contenido informativo.</p>

        <section className="footer-contact" aria-labelledby="contacto-footer-title">
          <h2 id="contacto-footer-title">Formulario de contacto</h2>
          <form id="contactoForm" noValidate onSubmit={handleContactoSubmit}>
            <div className="form-field">
              <label htmlFor="contacto_nombre">Nombre</label>
              <input type="text" id="contacto_nombre" name="nombre" value={contacto.nombre} onChange={handleContactoChange} placeholder="Tu nombre completo" aria-required="true" />
              <div className="error-message" id="contacto_nombre_error">{contacto.errors.nombre}</div>
            </div>

            <div className="form-field">
              <label htmlFor="contacto_asunto">Asunto</label>
              <input type="text" id="contacto_asunto" name="asunto" value={contacto.asunto} onChange={handleContactoChange} placeholder="Asunto de tu mensaje" aria-required="true" />
              <div className="error-message" id="contacto_asunto_error">{contacto.errors.asunto}</div>
            </div>

            <div className="form-field">
              <label htmlFor="contacto_mensaje">Mensaje</label>
              <textarea id="contacto_mensaje" name="mensaje" rows="5" value={contacto.mensaje} onChange={handleContactoChange} placeholder="Escribe tu mensaje aquí" aria-required="true" />
              <div className="char-counter">{contacto.mensaje.length}/500 caracteres</div>
              <div className="error-message" id="contacto_mensaje_error">{contacto.errors.mensaje}</div>
            </div>

            <button type="submit">Enviar Mensaje</button>
            <div id="contacto_mensaje_status" className={`form-message ${contactoMessage.type}`} role="status" aria-live="polite">
              {contactoMessage.text}
            </div>
          </form>
        </section>

        <p>
          <a href="#top">Volver arriba</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
