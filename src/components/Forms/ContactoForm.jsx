export default function ContactoForm({
  contacto,
  contactoMessage,
  handleContactoChange,
  handleContactoSubmit
}) {
  return (
    <form id="contactoForm" noValidate onSubmit={handleContactoSubmit}>
      <div className="form-field">
        <label htmlFor="contacto_nombre">Nombre</label>
        <input
          type="text"
          id="contacto_nombre"
          name="nombre"
          value={contacto.nombre}
          onChange={handleContactoChange}
          placeholder="Tu nombre completo"
          aria-required="true"
        />
        <div className="error-message" id="contacto_nombre_error">
          {contacto.errors.nombre}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contacto_asunto">Asunto</label>
        <input
          type="text"
          id="contacto_asunto"
          name="asunto"
          value={contacto.asunto}
          onChange={handleContactoChange}
          placeholder="Asunto de tu mensaje"
          aria-required="true"
        />
        <div className="error-message" id="contacto_asunto_error">
          {contacto.errors.asunto}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contacto_mensaje">Mensaje</label>
        <textarea
          id="contacto_mensaje"
          name="mensaje"
          rows="5"
          value={contacto.mensaje}
          onChange={handleContactoChange}
          placeholder="Escribe tu mensaje aquí"
          aria-required="true"
        />
        <div className="char-counter">{contacto.mensaje.length}/500 caracteres</div>
        <div className="error-message" id="contacto_mensaje_error">
          {contacto.errors.mensaje}
        </div>
      </div>

      <button type="submit">Enviar Mensaje</button>
      <div id="contacto_mensaje_status" className={`form-message ${contactoMessage.type}`} role="status" aria-live="polite">
        {contactoMessage.text}
      </div>
    </form>
  );
}
