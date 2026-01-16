import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CreatePage from './components/CreatePage';
import AuthPage from './components/AuthPage';
import PresentationViewer from './components/PresentationViewer';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';

import { useAuth } from './hooks/useAuth';
import { usePresentation } from './hooks/usePresentation';
import { useProtectedRoute } from './hooks/useProtectedRoute';

import { AppState, Presentation } from './types';

import {
  getPresentationsForUser,
  savePresentation,
  deletePresentation as deletePresentationFromDB
} from './services/supabaseService';

const AI_MESSAGES = [
  "Iniciando el motor de inteligencia SlideNova...",
  "Estructurando tu narrativa visual estratégica...",
  "Destilando los puntos clave de mayor impacto...",
  "Diseñando la jerarquía visual perfecta para ejecutivos...",
  "Seleccionando paletas de acento de alta retención...",
  "Generando activos conceptuales únicos...",
  "Casi listo para tu nueva obra maestra..."
];

const App: React.FC = () => {
  const { session, logout } = useAuth();
  const { state, presentation, error, generate, reset, setState, setPresentation } = usePresentation();
  const [showAuth, setShowAuth] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const isUserAuthenticated = useMemo(() => !!session.user, [session.user]);

  // Presentaciones reales desde Supabase
  const [presentations, setPresentations] = useState<Presentation[]>([]);

  useEffect(() => {
    let interval: number | undefined;
    if (state === AppState.GENERATING) {
      interval = window.setInterval(() => {
        setLoadingStep(prev => (prev + 1) % AI_MESSAGES.length);
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [state]);

  // Protege rutas (Dashboard / Editor) si no hay sesión
  useProtectedRoute(session, () => setShowAuth(true), (state === AppState.DASHBOARD || state === AppState.EDITING));

  // Cargar presentaciones cuando cambia la sesión o entramos a DASHBOARD
  useEffect(() => {
    const load = async () => {
      try {
        if (session.user) {
          const data = await getPresentationsForUser();
          setPresentations(data);
        } else {
          setPresentations([]);
        }
      } catch (err) {
        console.error("Error loading presentations:", err);
      }
    };
    load();
  }, [session.user, state]);

  const handleGenerate = async (text: string) => {
    await generate(text);
  };

  const handleSaveToDashboard = async (p: Presentation) => {
    try {
      await savePresentation(p);
      // recargar después de guardar
      const data = await getPresentationsForUser();
      setPresentations(data);
      setState(AppState.DASHBOARD);
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const deleteNova = async (id: string) => {
    try {
      await deletePresentationFromDB(id);
      setPresentations(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const startEdit = (p: Presentation) => {
    setPresentation(p);
    setState(AppState.EDITING);
  };

  const viewNova = (p: Presentation) => {
    setPresentation(p);
    setState(AppState.VIEWING);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <Header />

      {/* Dynamic Header Actions */}
      <div className="absolute top-4 right-40 z-[60] hidden lg:flex items-center gap-6">
        {isUserAuthenticated && state !== AppState.DASHBOARD && (
          <button 
            onClick={() => setState(AppState.DASHBOARD)}
            className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-all uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl"
          >
            Mis Proyectos
          </button>
        )}
        {!isUserAuthenticated && !showAuth && (
          <button 
            onClick={() => setShowAuth(true)}
            className="text-xs font-black text-slate-500 hover:text-indigo-600 transition-all focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-1 bg-white shadow-sm border border-slate-100"
          >
            ACCESO MIEMBROS
          </button>
        )}
        {isUserAuthenticated && (
          <button 
            onClick={logout}
            className="text-xs font-black text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest"
          >
            Cerrar Sesión
          </button>
        )}
      </div>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center">
        {showAuth ? (
          <AuthPage onBack={() => setShowAuth(false)} />
        ) : (
          <>
            {state === AppState.IDLE && (
              <div className="w-full space-y-28">
                <Hero />
                <CreatePage onGenerate={handleGenerate} isLoading={false} />
              </div>
            )}

            {state === AppState.GENERATING && (
              /* … tu pantalla de loading (igual que antes) … */
              <div>GENERANDO...</div>
            )}

            {state === AppState.DASHBOARD && (
              <Dashboard
                presentations={presentations}
                onCreateNew={() => setState(AppState.IDLE)}
                onSelect={viewNova}
                onEdit={startEdit}
                onDelete={deleteNova}
              />
            )}

            {state === AppState.EDITING && presentation && (
              <Editor 
                presentation={presentation}
                onSave={handleSaveToDashboard}
                onCancel={() => setState(AppState.DASHBOARD)}
              />
            )}

            {state === AppState.VIEWING && presentation && (
              <PresentationViewer
                presentation={presentation}
                onReset={reset}
              />
            )}
          </>
        )}
      </main>

      {/* … tu footer igual que antes … */}
    </div>
  );
};

export default App;
