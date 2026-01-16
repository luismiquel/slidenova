
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  const errorMsg = "SlideNova Error Crítico: No se encontró el contenedor 'root'. Revisa el index.html.";
  console.error(errorMsg);
  // En producción podríamos mostrar un fallback básico aquí
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
