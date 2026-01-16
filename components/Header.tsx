
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-100 rotate-3 group hover:rotate-0 transition-transform cursor-pointer">
            SN
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">
            Slide<span className="text-indigo-600">Nova</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Tecnología</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Plantillas</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Blog</a>
        </nav>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-95">
          Prueba Gratis
        </button>
      </div>
    </header>
  );
};

export default Header;
