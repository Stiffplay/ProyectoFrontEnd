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
      <p> Nombre alumno: Stephen Nicolás Rojas Parraguez </p>
      <p> Rut: 21.460.337-3 </p>
      <p> Nombre Docente: Víctor Vázquez</p>
      <p> Asignatura: Programación FrontEnd</p>
      <p> Sección: IEI-N3-P2-C1</p>

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
    </footer>
  );
}
