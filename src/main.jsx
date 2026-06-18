import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

console.log('src/main.jsx cargado');
const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('Elemento #root no encontrado en el DOM. Asegúrate de que public/index.html tenga <div id="root"></div>');
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
