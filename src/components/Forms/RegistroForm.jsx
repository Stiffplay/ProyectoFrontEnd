import { validarEmail, validarPassword } from '../../utils/validators';
import { initialRegistro } from '../../utils/constants';

export default function RegistroForm({
  registro,
  registroMessage,
  handleRegistroChange,
  handleRegistroSubmit
}) {
  const validarRegistroLocal = () => {
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

  return (
    <form id="registroForm" noValidate onSubmit={handleRegistroSubmit}>
      <h3>Registro</h3>
      <div className="form-field">
        <label htmlFor="reg_usuario">Usuario</label>
        <input
          type="text"
          id="reg_usuario"
          name="usuario"
          value={registro.usuario}
          onChange={handleRegistroChange}
          placeholder="Ej. juan_perez"
          aria-required="true"
        />
        <div className="error-message" id="reg_usuario_error">
          {registro.errors.usuario}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="reg_email">Correo electrónico</label>
        <input
          type="email"
          id="reg_email"
          name="email"
          value={registro.email}
          onChange={handleRegistroChange}
          placeholder="ejemplo@correo.com"
          aria-required="true"
        />
        <div className="error-message" id="reg_email_error">
          {registro.errors.email}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="reg_password">Contraseña</label>
        <input
          type="password"
          id="reg_password"
          name="password"
          value={registro.password}
          onChange={handleRegistroChange}
          placeholder="Mínimo 8 caracteres, una minúscula, mayúscula y carácter especial"
          aria-required="true"
        />
        <div className="helper-text">Debe tener al menos 8 caracteres, una minúscula, una mayúscula y un carácter especial.</div>
        <div className="error-message" id="reg_password_error">
          {registro.errors.password}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="reg_confirm_password">Confirmar Contraseña</label>
        <input
          type="password"
          id="reg_confirm_password"
          name="confirmPassword"
          value={registro.confirmPassword}
          onChange={handleRegistroChange}
          placeholder="Repite tu contraseña"
          aria-required="true"
        />
        <div className="error-message" id="reg_confirm_password_error">
          {registro.errors.confirmPassword}
        </div>
      </div>

      <button type="submit">Registrarse</button>
      <div id="registro_mensaje" className={`form-message ${registroMessage.type}`} role="status" aria-live="polite">
        {registroMessage.text}
      </div>
    </form>
  );
}
