import { useEffect, useState, useRef } from 'react';

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);
  const [scaleIndex, setScaleIndex] = useState(2); // middle index
  const [contrast, setContrast] = useState('normal'); // 'normal' | 'high' | 'low'
  const panelRef = useRef(null);

  const scales = [0.85, 1, 1.15, 1.3, 1.5, 2];

  useEffect(() => {
    const handleOutside = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [open]);

  useEffect(() => {
    // Apply font scale on root element
    const scale = scales[scaleIndex] || 1;
    document.documentElement.style.fontSize = `${scale * 100}%`;
  }, [scaleIndex]);

  useEffect(() => {
    // Apply contrast classes on body
    document.body.classList.remove('high-contrast', 'low-contrast');
    if (contrast === 'high') document.body.classList.add('high-contrast');
    if (contrast === 'low') document.body.classList.add('low-contrast');
  }, [contrast]);

  const increaseFont = () => setScaleIndex((i) => Math.min(scales.length - 1, i + 1));
  const decreaseFont = () => setScaleIndex((i) => Math.max(0, i - 1));

  const increaseContrast = () => setContrast((c) => (c === 'high' ? 'high' : 'high'));
  const decreaseContrast = () => setContrast((c) => (c === 'low' ? 'low' : 'low'));

  const resetA11y = () => {
    setScaleIndex(2);
    setContrast('normal');
  };

  return (
    <div className="a11y-root">
      <button
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="a11y-trigger"
        onClick={() => setOpen((s) => !s)}
        title="Opciones de accesibilidad"
      >
        <span className="a11y-icon" aria-hidden="true">{
          /* simple person silhouette SVG */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
            <path d="M4 20c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1H4v-1z" fill="currentColor" />
          </svg>
        }</span>
        <span className="visually-hidden">Accesibilidad</span>
      </button>

      {open && (
        <div id="a11y-panel" role="dialog" aria-label="Opciones de accesibilidad" ref={panelRef} className="a11y-panel">
          <div className="a11y-section">
            <strong>Tamaño de fuente</strong>
            <div className="a11y-controls">
              <button onClick={decreaseFont} aria-label="Disminuir tamaño de fuente">A-</button>
              <div className="a11y-scale" aria-live="polite">{Math.round((scales[scaleIndex] || 1) * 100)}%</div>
              <button onClick={increaseFont} aria-label="Aumentar tamaño de fuente">A+</button>
            </div>
          </div>

          <div className="a11y-section">
            <strong>Contraste</strong>
            <div className="a11y-controls">
              <button onClick={decreaseContrast} aria-pressed={contrast === 'low'} aria-label="Disminuir contraste">Bajo</button>
              <button onClick={() => setContrast('normal')} aria-pressed={contrast === 'normal'} aria-label="Contraste normal">Normal</button>
              <button onClick={increaseContrast} aria-pressed={contrast === 'high'} aria-label="Aumentar contraste">Alto</button>
            </div>
          </div>

          <div className="a11y-actions">
            <button onClick={resetA11y}>Restablecer</button>
          </div>
        </div>
      )}
    </div>
  );
}
