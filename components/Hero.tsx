
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col items-center gap-4">
        <div className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          Diseño Inteligente & Manual
        </div>
        <div className="text-slate-400 text-xs font-bold tracking-widest flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200"></span>
          IDEADO POR LUIS MIGUEL GARCIA DE LAS MORENAS
          <span className="w-8 h-px bg-slate-200"></span>
        </div>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
        Tus ideas <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-500">sin límites.</span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
        SlideNova organiza tu contenido para que tú seas el director creativo. Estructura rápida, diseño impecable y control absoluto.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <a href="#create-section" className="group bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2">
          Empezar a Crear
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <button className="bg-white text-slate-600 border-2 border-slate-100 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
          Ver Galería
        </button>
      </div>
    </section>
  );
};

export default Hero;
