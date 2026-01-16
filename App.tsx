
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const { session, login, logout } = useAuth();
  const { state, presentation, error, generate, reset, setState, setPresentation } = usePresentation();
  const [showAuth, setShowAuth] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Mock Database for Dashboard (simulating Supabase)
  const [myNovas, setMyNovas] = useState<Presentation[]>([]);

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

  const isUserAuthenticated = useMemo(() => !!session.user, [session.user]);

  // Protection logic: If in DASHBOARD or EDITING and not logged, go to landing or auth
  useProtectedRoute(session, () => setShowAuth(true), (state === AppState.DASHBOARD || state === AppState.EDITING));

  const handleGenerate = async (text: string) => {
    await generate(text);
  };

  const handleSaveToDashboard = (p: Presentation) => {
    setMyNovas(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? p : item);
      return [...prev, { ...p, id: p.id || `nova_${Date.now()}`, createdAt: new Date().toISOString() }];
    });
    setState(AppState.DASHBOARD);
  };

  const deleteNova = (id: string) => {
    setMyNovas(prev => prev.filter(p => p.id !== id));
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
              <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-500" role="status" aria-live="polite">
                <div className="relative w-48 h-48 mb-16">
                  <div className="absolute inset-0 border-[16px] border-indigo-50 rounded-[4rem]"></div>
                  <div className="absolute inset-0 border-[16px] border-t-indigo-600 rounded-[4rem] animate-spin-slow"></div>
                  <div className="absolute inset-4 border-[1px] border-indigo-200 border-dashed rounded-[3rem] animate-reverse-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-indigo-600 text-4xl">SN</div>
                </div>
                <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">SlideNova está creando...</h2>
                <div className="space-y-4 min-h-[6rem] max-w-lg mx-auto">
                  <p className="text-indigo-600 font-black text-2xl transition-all duration-700 animate-pulse">{AI_MESSAGES[loadingStep]}</p>
                  <p className="text-slate-400 font-bold tracking-wide uppercase text-sm">PROCESANDO • {loadingStep + 1}/{AI_MESSAGES.length}</p>
                </div>
              </div>
            )}

            {state === AppState.DASHBOARD && (
              <Dashboard 
                presentations={myNovas} 
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
              <div className="w-full animate-in zoom-in-95 fade-in duration-1000">
                 <PresentationViewer presentation={presentation} onReset={reset} />
                 {isUserAuthenticated && (
                   <div className="mt-12 flex justify-center gap-6">
                      <button 
                        onClick={() => handleSaveToDashboard(presentation)}
                        className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95"
                      >
                        Guardar en mi Biblioteca
                      </button>
                      <button 
                        onClick={() => setState(AppState.EDITING)}
                        className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-black transition-all hover:bg-slate-50"
                      >
                        Refinar en el Editor
                      </button>
                   </div>
                 )}
              </div>
            )}

            {state === AppState.ERROR && (
              <div className="max-w-2xl w-full text-center py-20 bg-rose-50 rounded-[4rem] border-8 border-white shadow-2xl p-16 animate-in zoom-in duration-300">
                <div className="w-28 h-28 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-10" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-rose-900 mb-4 tracking-tight">Error de Generación</h2>
                <p className="text-rose-700 mb-12 text-xl font-bold leading-relaxed">{error}</p>
                <button onClick={reset} className="bg-rose-600 text-white px-14 py-5 rounded-3xl font-black text-xl hover:bg-rose-700 transition-all shadow-2xl shadow-rose-200">Reiniciar SlideNova</button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="py-20 border-t border-slate-100 bg-white" role="contentinfo">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm">SN</div>
                 <span className="text-2xl font-black text-slate-900 tracking-tighter">SlideNova AI</span>
              </div>
              <p className="text-slate-400 text-sm font-bold text-center lg:text-left max-w-sm">La plataforma líder para la automatización de presentaciones de alto impacto.</p>
            </div>
            <div className="text-slate-500 text-sm font-bold text-center">
              &copy; {new Date().getFullYear()} SlideNova AI. <br />
              <span className="text-indigo-600">IA de nivel ejecutivo.</span>
            </div>
            <nav className="flex gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Términos</a>
            </nav>
        </div>
      </footer>
      
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
