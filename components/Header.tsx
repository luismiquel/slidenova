
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 group-hover:rotate-0 transition-transform">
            <span className="text-white font-black text-xl italic">S</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse border-2 border-white"></div>
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Slide<span className="text-indigo-600">Nova</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Mis Diseños</button>
          <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Recursos</button>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md">
            Crear Proyecto
          </button>
        </div>
      </div>
    </header>
  );
}
