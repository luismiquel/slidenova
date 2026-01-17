import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Corrección para errores de extensiones externas (como background.js / tabs.get)
 * Evita que errores ajenos a la app causen cierres inesperados.
 */
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || '';
    if (reason.includes('extension') || reason.includes('tabs.get')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    if (event.filename?.includes('extension') || event.message?.includes('tabs.get')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("SlideNova Error Crítico: No se encontró el contenedor 'root' en el DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("SlideNova Error durante el renderizado inicial:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <div style="background: white; padding: 48px; border-radius: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; max-width: 400px;">
          <h1 style="color: #1e293b; font-weight: 800; font-size: 24px; margin-bottom: 16px;">Error de Inicio</h1>
          <p style="color: #64748b; font-weight: 500; margin-bottom: 32px;">No se pudo cargar SlideNova. Verifica tu conexión o las variables de entorno.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #4285F4; color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 800; transition: all 0.2s;">
            Reintentar Carga
          </button>
        </div>
      </div>
    `;
  }
}