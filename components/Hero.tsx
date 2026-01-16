
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="inline-block px-5 py-2 bg-blue-50 border-2 border-blue-100 rounded-full text-[#4285F4] text-sm font-black mb-4 shadow-sm">
        ✨ Google Estudio: La IA que diseña por ti
      </div>
      <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
        Ideas con <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05]">
          Impacto Global.
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-500 leading-relaxed font-semibold">
        Convierte cualquier guion, documento o nota rápida en una presentación de impacto profesional en segundos con el motor de Google Estudio.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 pt-8">
         <div className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl border border-slate-200 text-base font-bold text-slate-700 shadow-sm hover:shadow-blue-100 transition-all">
           <div className="w-3 h-3 bg-[#34A853] rounded-full animate-pulse shadow-sm shadow-green-200"></div>
           Sin Registro Requerido
         </div>
         <div className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl border border-slate-200 text-base font-bold text-slate-700 shadow-sm hover:shadow-blue-100 transition-all">
           <div className="w-3 h-3 bg-[#4285F4] rounded-full shadow-sm shadow-blue-200"></div>
           Diseño Inteligente Google
         </div>
      </div>
      
      <div className="pt-12">
        <a href="#create-section" className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#4285F4] transition-all shadow-xl hover:-translate-y-1">
          Empezar a Crear Ahora
        </a>
      </div>
    </section>
  );
};

export default Hero;
