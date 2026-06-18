import AccessibilityButton from './AccessibilityButton';

export default function Header({ onOpenAuth, onCloseAuth, welcome, isAuthVisible }) {
  const handleOpenAuth = (tab) => onOpenAuth(tab);
  const handleCloseAuth = () => onCloseAuth();

  return (
    <header className="container" role="banner">
      <a id="top" />
      <h1>Enciclopedia de League of Legends</h1>

      <form role="search" aria-label="Buscar en la enciclopedia" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="visually-hidden">
          Buscar
        </label>
        <input id="search" name="q" type="search" placeholder="Buscar campeones, objetos, mapas..." />
        <button type="submit">Buscar</button>
      </form>

      <p id="welcome-message" className="welcome-message" hidden={!welcome.visible} aria-live="polite">
        Bienvenido de vuelta <span id="welcome-user">{welcome.username}</span>.
      </p>

      <div className="top-right-controls">
        <AccessibilityButton />
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
      </div>
    </header>
  );
}
