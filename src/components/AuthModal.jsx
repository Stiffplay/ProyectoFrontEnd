import LoginForm from './Forms/LoginForm';
import RegistroForm from './Forms/RegistroForm';

export default function AuthModal({
  isAuthVisible,
  activeTab,
  setActiveTab,
  handleCloseAuth,
  registro,
  registroMessage,
  handleRegistroChange,
  handleRegistroSubmit,
  login,
  loginMessage,
  handleLoginChange,
  handleLoginSubmit
}) {
  const authWrapperClass = isAuthVisible ? 'auth-modal-backdrop visible' : 'auth-modal-backdrop';

  return (
    <div
      className={authWrapperClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      aria-hidden={!isAuthVisible}
      onClick={(e) => e.target === e.currentTarget && handleCloseAuth()}
    >
      <section className="auth-panel" aria-labelledby="auth-title">
        <button className="auth-close" type="button" aria-label="Cerrar ventana" onClick={handleCloseAuth}>
          ×
        </button>
        <h2 id="auth-title">Accede o crea tu cuenta</h2>

        <div className="auth-tabs" role="tablist" aria-label="Opciones de acceso">
          <button
            className={`auth-tab ${activeTab === 'registro' ? 'active' : ''}`}
            data-tab="registro"
            type="button"
            role="tab"
            aria-selected={activeTab === 'registro'}
            onClick={() => setActiveTab('registro')}
          >
            Registro
          </button>
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            data-tab="login"
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        <div id="registro" className={`auth-content ${activeTab === 'registro' ? 'active' : ''}`} role="tabpanel">
          <RegistroForm
            registro={registro}
            registroMessage={registroMessage}
            handleRegistroChange={handleRegistroChange}
            handleRegistroSubmit={handleRegistroSubmit}
          />
        </div>

        <div id="login" className={`auth-content ${activeTab === 'login' ? 'active' : ''}`} role="tabpanel">
          <LoginForm
            login={login}
            loginMessage={loginMessage}
            handleLoginChange={handleLoginChange}
            handleLoginSubmit={handleLoginSubmit}
          />
        </div>
      </section>
    </div>
  );
}
