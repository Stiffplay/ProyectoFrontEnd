export default function LoginForm({
  login,
  loginMessage,
  handleLoginChange,
  handleLoginSubmit
}) {
  return (
    <form id="loginForm" noValidate onSubmit={handleLoginSubmit}>
      <h3>Login</h3>

      <div className="form-field">
        <label htmlFor="login_email">Correo electrónico</label>
        <input
          type="email"
          id="login_email"
          name="email"
          value={login.email}
          onChange={handleLoginChange}
          placeholder="ejemplo@correo.com"
          aria-required="true"
        />
        <div className="error-message" id="login_email_error">
          {login.errors.email}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="login_password">Contraseña</label>
        <input
          type="password"
          id="login_password"
          name="password"
          value={login.password}
          onChange={handleLoginChange}
          placeholder="Tu contraseña"
          aria-required="true"
        />
        <div className="error-message" id="login_password_error">
          {login.errors.password}
        </div>
      </div>

      <button type="submit">Ingresar</button>
      <div id="login_mensaje" className={`form-message ${loginMessage.type}`} role="status" aria-live="polite">
        {loginMessage.text}
      </div>
    </form>
  );
}
