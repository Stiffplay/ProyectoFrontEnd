import { navLinks } from '../utils/constants';

export default function Navigation() {
  return (
    <nav className="container" aria-label="Navegación principal">
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
