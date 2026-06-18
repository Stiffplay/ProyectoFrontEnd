import ContactoForm from './Forms/ContactoForm';

export default function Footer({
  contacto,
  contactoMessage,
  handleContactoChange,
  handleContactoSubmit
}) {
  return (
    <footer className="container" role="contentinfo">
      <p>&copy; Enciclopedia no oficial de League of Legends. Contenido informativo.</p>

      <section className="footer-contact" aria-labelledby="contacto-footer-title">
        <h2 id="contacto-footer-title">Formulario de contacto</h2>
        <ContactoForm
          contacto={contacto}
          contactoMessage={contactoMessage}
          handleContactoChange={handleContactoChange}
          handleContactoSubmit={handleContactoSubmit}
        />
      </section>

      <p>
        <a href="#top">Volver arriba</a>
      </p>

      <div className="footer-meta" aria-label="Información del proyecto">
        <div className="footer-credits">
          <p><strong>Alumno:</strong> Stephen Nicolás Rojas Parraguez</p>
          <p><strong>RUT:</strong> 21.460.337-3</p>
          <p><strong>Docente:</strong> Víctor Vázquez</p>
          <p><strong>Asignatura:</strong> Programación FrontEnd — Sección IEI-N3-P2-C1</p>
        </div>
      </div>
    </footer>
  );
}
