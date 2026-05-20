function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function limpiarErrores(form) {
    const errorDivs = form.querySelectorAll('.error-message');
    errorDivs.forEach(div => {
        div.textContent = '';
        div.style.display = 'none';
    });
}

function mostrarError(elementId, errorId, mensaje) {
    const input = document.getElementById(elementId);
    const errorDiv = document.getElementById(errorId);
    if (input && errorDiv) {
        input.setAttribute('aria-invalid', 'true');
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }
}

function limpiarError(elementId, errorId) {
    const input = document.getElementById(elementId);
    const errorDiv = document.getElementById(errorId);
    if (input && errorDiv) {
        input.removeAttribute('aria-invalid');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function mostrarMensajeEstado(mensajeId, texto, tipo) {
    const elemento = document.getElementById(mensajeId);
    if (elemento) {
        elemento.textContent = texto;
        elemento.className = `form-message ${tipo}`;
        elemento.style.display = texto ? 'block' : 'none';
    }
}

let currentSessionEmail = null;
let currentSessionUsername = null;

function setWelcomeMessage(username) {
    const welcome = document.getElementById('welcome-message');
    const welcomeUser = document.getElementById('welcome-user');
    if (welcome && welcomeUser) {
        welcomeUser.textContent = username;
        welcome.hidden = false;
    }
}

function clearWelcomeMessage() {
    const welcome = document.getElementById('welcome-message');
    const welcomeUser = document.getElementById('welcome-user');
    if (welcome && welcomeUser) {
        welcomeUser.textContent = '';
        welcome.hidden = true;
    }
}

function activateUsernameFromEmail(email) {
    if (currentSessionEmail && email === currentSessionEmail && currentSessionUsername) {
        return currentSessionUsername;
    }
    return email.split('@')[0];
}

function activarTab(tabName) {
    const tabButtons = document.querySelectorAll('.auth-tab');
    const tabContents = document.querySelectorAll('.auth-content');

    tabButtons.forEach(button => {
        const isActive = button.getAttribute('data-tab') === tabName;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
}

function mostrarPanelAuth(tabName) {
    const backdrop = document.querySelector('.auth-modal-backdrop');
    if (!backdrop) return;
    backdrop.classList.add('visible');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    activarTab(tabName);
}

function ocultarPanelAuth() {
    const backdrop = document.querySelector('.auth-modal-backdrop');
    if (!backdrop) return;
    backdrop.classList.remove('visible');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function resetAuthForms() {
    const registroForm = document.getElementById('registroForm');
    const loginForm = document.getElementById('loginForm');
    if (registroForm) {
        registroForm.reset();
        limpiarErrores(registroForm);
        mostrarMensajeEstado('registro_mensaje', '', '');
    }
    if (loginForm) {
        loginForm.reset();
        limpiarErrores(loginForm);
        mostrarMensajeEstado('login_mensaje', '', '');
    }
}

const btnMostrarRegistro = document.getElementById('btnMostrarRegistro');
const btnMostrarLogin = document.getElementById('btnMostrarLogin');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const authTabs = document.querySelectorAll('.auth-tab');

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const dots = document.querySelectorAll('.carousel-dot');
let currentCarouselIndex = 0;
let carouselInterval = null;

function showCarouselSlide(index) {
    if (!slides.length) return;
    currentCarouselIndex = (index + slides.length) % slides.length;
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    }
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentCarouselIndex);
    });
}

function nextCarouselSlide() {
    showCarouselSlide(currentCarouselIndex + 1);
}

function prevCarouselSlide() {
    showCarouselSlide(currentCarouselIndex - 1);
}

function startCarouselRotation() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    carouselInterval = setInterval(nextCarouselSlide, 5000);
}

function resetCarouselRotation() {
    startCarouselRotation();
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        prevCarouselSlide();
        resetCarouselRotation();
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        nextCarouselSlide();
        resetCarouselRotation();
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        showCarouselSlide(index);
        resetCarouselRotation();
    });
});

showCarouselSlide(0);
startCarouselRotation();

if (carousel) {
    carousel.addEventListener('mouseover', () => {
        clearInterval(carouselInterval);
    });
    carousel.addEventListener('mouseleave', () => {
        resetCarouselRotation();
    });
}

if (btnMostrarRegistro) {
    btnMostrarRegistro.addEventListener('click', () => mostrarPanelAuth('registro'));
}

if (btnMostrarLogin) {
    btnMostrarLogin.addEventListener('click', () => mostrarPanelAuth('login'));
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
        ocultarPanelAuth();
        resetAuthForms();
        clearWelcomeMessage();
        currentSessionEmail = null;
        currentSessionUsername = null;
        mostrarMensajeEstado('login_mensaje', 'Has cerrado sesión correctamente.', 'success');
        mostrarMensajeEstado('registro_mensaje', '', '');
    });
}

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activarTab(tab.getAttribute('data-tab'));
    });
});

const backdrop = document.querySelector('.auth-modal-backdrop');
const closeButton = document.querySelector('.auth-close');

if (backdrop) {
    backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
            ocultarPanelAuth();
            resetAuthForms();
        }
    });
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        ocultarPanelAuth();
        resetAuthForms();
    });
}

const registroForm = document.getElementById('registroForm');
if (registroForm) {
    registroForm.addEventListener('submit', (event) => {
        event.preventDefault();
        limpiarErrores(registroForm);

        const usuario = document.getElementById('reg_usuario').value.trim();
        const email = document.getElementById('reg_email').value.trim();
        const password = document.getElementById('reg_password').value.trim();
        const confirmPassword = document.getElementById('reg_confirm_password').value.trim();

        let esValido = true;

        if (!usuario) {
            mostrarError('reg_usuario', 'reg_usuario_error', 'El usuario es obligatorio');
            esValido = false;
        } else if (usuario.length < 3) {
            mostrarError('reg_usuario', 'reg_usuario_error', 'El usuario debe tener al menos 3 caracteres');
            esValido = false;
        }

        if (!email) {
            mostrarError('reg_email', 'reg_email_error', 'El email es obligatorio');
            esValido = false;
        } else if (!validarEmail(email)) {
            mostrarError('reg_email', 'reg_email_error', 'Ingresa un email válido (ej: usuario@ejemplo.com)');
            esValido = false;
        }

        if (!password) {
            mostrarError('reg_password', 'reg_password_error', 'La contraseña es obligatoria');
            esValido = false;
        } else if (password.length < 8) {
            mostrarError('reg_password', 'reg_password_error', 'La contraseña debe tener al menos 8 caracteres');
            esValido = false;
        }

        if (!confirmPassword) {
            mostrarError('reg_confirm_password', 'reg_confirm_password_error', 'Debes confirmar la contraseña');
            esValido = false;
        } else if (confirmPassword !== password) {
            mostrarError('reg_confirm_password', 'reg_confirm_password_error', 'Las contraseñas no coinciden');
            esValido = false;
        }

        if (esValido) {
            currentSessionEmail = email;
            currentSessionUsername = usuario;
            setWelcomeMessage(usuario);
            mostrarMensajeEstado('registro_mensaje', `✓ Registro exitoso. ¡Bienvenido ${usuario}!`, 'success');
            registroForm.reset();
            setTimeout(() => {
                ocultarPanelAuth();
            }, 800);
        } else {
            mostrarMensajeEstado('registro_mensaje', '✗ Por favor, completa correctamente todos los campos', 'error');
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        limpiarErrores(loginForm);

        const email = document.getElementById('login_email').value.trim();
        const password = document.getElementById('login_password').value.trim();

        let esValido = true;

        if (!email) {
            mostrarError('login_email', 'login_email_error', 'El email es obligatorio');
            esValido = false;
        } else if (!validarEmail(email)) {
            mostrarError('login_email', 'login_email_error', 'Ingresa un email válido');
            esValido = false;
        }

        if (!password) {
            mostrarError('login_password', 'login_password_error', 'La contraseña es obligatoria');
            esValido = false;
        }

        if (esValido) {
            const usuarioAMostrar = activateUsernameFromEmail(email);
            setWelcomeMessage(usuarioAMostrar);
            mostrarMensajeEstado('login_mensaje', `✓ ¡Inicio de sesión exitoso! Bienvenido de vuelta ${usuarioAMostrar}.`, 'success');
            setTimeout(() => {
                loginForm.reset();
                mostrarMensajeEstado('login_mensaje', '', '');
            }, 2000);
            setTimeout(() => {
                ocultarPanelAuth();
            }, 800);
        } else {
            mostrarMensajeEstado('login_mensaje', '✗ Verifica que hayas ingresado datos correctos', 'error');
        }
    });
}

const contactoForm = document.getElementById('contactoForm');
const mensajeTextarea = document.getElementById('contacto_mensaje');
const charCount = document.getElementById('char_count');
const MAX_CHARS = 500;

if (mensajeTextarea && charCount) {
    mensajeTextarea.addEventListener('input', () => {
        if (mensajeTextarea.value.length > MAX_CHARS) {
            mensajeTextarea.value = mensajeTextarea.value.substring(0, MAX_CHARS);
        }
        charCount.textContent = mensajeTextarea.value.length;
    });
}

if (contactoForm) {
    contactoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        limpiarErrores(contactoForm);

        const nombre = document.getElementById('contacto_nombre').value.trim();
        const asunto = document.getElementById('contacto_asunto').value.trim();
        const mensaje = document.getElementById('contacto_mensaje').value.trim();

        let esValido = true;

        if (!nombre) {
            mostrarError('contacto_nombre', 'contacto_nombre_error', 'El nombre es obligatorio');
            esValido = false;
        } else if (nombre.length < 3) {
            mostrarError('contacto_nombre', 'contacto_nombre_error', 'El nombre debe tener al menos 3 caracteres');
            esValido = false;
        }

        if (!asunto) {
            mostrarError('contacto_asunto', 'contacto_asunto_error', 'El asunto es obligatorio');
            esValido = false;
        } else if (asunto.length < 5) {
            mostrarError('contacto_asunto', 'contacto_asunto_error', 'El asunto debe tener al menos 5 caracteres');
            esValido = false;
        }

        if (!mensaje) {
            mostrarError('contacto_mensaje', 'contacto_mensaje_error', 'El mensaje es obligatorio');
            esValido = false;
        } else if (mensaje.length < 10) {
            mostrarError('contacto_mensaje', 'contacto_mensaje_error', 'El mensaje debe tener al menos 10 caracteres');
            esValido = false;
        }

        if (esValido) {
            mostrarMensajeEstado('contacto_mensaje_status', '✓ Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.', 'success');
            contactoForm.reset();
            if (charCount) charCount.textContent = '0';
            setTimeout(() => {
                mostrarMensajeEstado('contacto_mensaje_status', '', '');
            }, 5000);
        } else {
            mostrarMensajeEstado('contacto_mensaje_status', '✗ Por favor, completa correctamente todos los campos', 'error');
        }
    });
}
