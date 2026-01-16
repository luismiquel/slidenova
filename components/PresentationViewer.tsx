
import React, { useState, useEffect, useMemo } from 'react';
import { Presentation } from '../types';

interface PresentationViewerProps {
  presentation: Presentation;
  onReset: () => void;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ presentation, onReset }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(-1);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, showSummary]);

  const nextSlide = () => {
    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const prevSlide = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    if (currentSlideIndex > -1) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const isLast = currentSlideIndex === presentation.slides.length - 1;
  const isFirst = currentSlideIndex === -1;
  const currentSlide = currentSlideIndex === -1 ? null : presentation.slides[currentSlideIndex];

  const progressPercentage = useMemo(() => {
    const total = presentation.slides.length + 1; // +1 for title
    const current = currentSlideIndex + 2;
    return (current / total) * 100;
  }, [currentSlideIndex, presentation.slides.length]);

  if (showSummary) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-200 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">¡Proyecto Finalizado!</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              SlideNova ha transformado exitosamente tus ideas en una narrativa visual de {presentation.slides.length + 1} diapositivas.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-left">
             <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Resumen del Proyecto</h3>
             <p className="text-slate-700 font-bold leading-relaxed">
               Esta presentación aborda "{presentation.mainTitle}" con un enfoque en {presentation.subtitle.toLowerCase()}. 
               Se han incluido {presentation.slides.length} secciones clave optimizadas para retención ejecutiva.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={onReset}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-95"
            >
              Crear Nueva Nova
            </button>
            <button className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
              Exportar a PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" role="main" aria-label="Visor de presentación SlideNova">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onReset}
          className="group text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-2 transition-colors focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1"
          aria-label="Cerrar presentación y volver al inicio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Nueva Creación
        </button>
        <div className="flex items-center gap-4">
          <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="px-4 py-1.5 bg-indigo-50 rounded-full text-xs font-black text-indigo-700 border border-indigo-100" aria-live="polite">
            SLIDE {currentSlideIndex + 2} / {presentation.slides.length + 1}
          </div>
        </div>
      </div>

      <div 
        className="relative aspect-video w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 group/viewer outline-none focus:ring-4 focus:ring-indigo-500/10"
        tabIndex={0}
      >
        <div className="absolute inset-0 p-16 flex flex-col justify-center transition-all duration-700">
          {isFirst ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-1000">
              <h1 className="text-7xl font-black text-slate-900 tracking-tight leading-tight">
                {presentation.mainTitle}
              </h1>
              <p className="text-3xl text-indigo-600 font-bold opacity-90 max-w-3xl mx-auto">
                {presentation.subtitle}
              </p>
              <div className="pt-12 flex justify-center" aria-hidden="true">
                <div className="w-32 h-2.5 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div key={currentSlideIndex} className="animate-in slide-in-from-right fade-in duration-500 flex h-full items-center">
              <div className="flex-1 pr-12">
                <div className="flex items-center gap-6 mb-10">
                  <div 
                    className="w-5 h-20 rounded-3xl shrink-0 shadow-lg shadow-indigo-100" 
                    style={{ backgroundColor: currentSlide?.accentColor || '#4f46e5' }}
                    aria-hidden="true"
                  />
                  <h2 className="text-6xl font-black text-slate-900 tracking-tight">
                    {currentSlide?.title}
                  </h2>
                </div>
                <ul className="space-y-8" role="list">
                  {currentSlide?.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-6 group/item">
                      <div className="mt-3 w-4 h-4 rounded-full bg-indigo-500 shrink-0 shadow-sm group-hover/item:scale-125 transition-transform" aria-hidden="true" />
                      <p className="text-3xl text-slate-700 font-bold leading-snug">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden lg:block w-2/5 aspect-[3/4] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative border-[12px] border-white">
                 <img 
                    src={`https://picsum.photos/seed/nova-${currentSlideIndex}/1200/1600`} 
                    alt={`Visualización para: ${currentSlide?.title}`} 
                    className="object-cover w-full h-full grayscale-[5%] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-10 right-10 flex gap-4">
          <button
            onClick={prevSlide}
            disabled={isFirst}
            className={`p-5 rounded-2xl shadow-xl transition-all border-2 ${
              isFirst ? 'bg-slate-50 text-slate-200 border-transparent' : 'bg-white text-indigo-700 border-indigo-50 hover:bg-indigo-50 hover:scale-105 active:scale-95'
            }`}
            aria-label="Diapositiva anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`p-5 rounded-2xl shadow-2xl transition-all ${
              isLast ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-200'
            }`}
            aria-label={isLast ? "Ver Resumen Final" : "Siguiente diapositiva"}
          >
            {isLast ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;
