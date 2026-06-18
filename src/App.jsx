import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import HeroSection from './components/Sections/HeroSection';
import ChampionsSection from './components/Sections/ChampionsSection';
import FeaturedChampion from './components/Sections/FeaturedChampion';
import ItemsSection from './components/Sections/ItemsSection';
import MapsSection from './components/Sections/MapsSection';
import LoreSection from './components/Sections/LoreSection';
import {
  validarEmail,
  validarPassword,
  obtenerUsuarioDesdeEmail
} from './utils/validators';
import {
  initialRegistro,
  initialLogin,
  initialContacto
} from './utils/constants';


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
      setCarouselIndex((current) => (current + 1) % 3);
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

  return (
    <div>
      <Header
        onOpenAuth={handleOpenAuth}
        onCloseAuth={handleCloseAuth}
        welcome={welcome}
        isAuthVisible={isAuthVisible}
      />

      <Carousel
        carouselIndex={carouselIndex}
        setCarouselIndex={setCarouselIndex}
        startCarouselRotation={startCarouselRotation}
        stopCarouselRotation={stopCarouselRotation}
      />

      <Navigation />

      <main className="container" role="main">
        <HeroSection />
        <ChampionsSection />
        <FeaturedChampion />
        <ItemsSection />
        <MapsSection />
        <LoreSection />
      </main>

      <AuthModal
        isAuthVisible={isAuthVisible}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleCloseAuth={handleCloseAuth}
        registro={registro}
        registroMessage={registroMessage}
        handleRegistroChange={handleRegistroChange}
        handleRegistroSubmit={handleRegistroSubmit}
        login={login}
        loginMessage={loginMessage}
        handleLoginChange={handleLoginChange}
        handleLoginSubmit={handleLoginSubmit}
      />

      <Footer
        contacto={contacto}
        contactoMessage={contactoMessage}
        handleContactoChange={handleContactoChange}
        handleContactoSubmit={handleContactoSubmit}
      />
    </div>
  );
}

export default App;
