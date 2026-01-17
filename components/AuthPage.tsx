import React from 'react';

interface AuthPageProps {
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto py-20 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-[#4285F4] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-lg rotate-3">
          SN
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Bienvenido a SlideNova</h2>
        <p className="text-slate-500 mb-8 font-medium">Guarda tus presentaciones y accede a funciones premium de diseño.</p>
        
        <div className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase ml-1">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="usuario@slidenova.com" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#4285F4] outline-none font-medium transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#4285F4] outline-none font-medium transition-all"
            />
          </div>
          <button className="w-full py-5 mt-4 bg-[#4285F4] text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
            Acceder al Estudio
          </button>
          
          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-slate-100 grow"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">o</span>
            <div className="h-px bg-slate-100 grow"></div>
          </div>
          
          <button className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Crear cuenta nueva
          </button>
        </div>
        
        <button 
          onClick={onBack}
          className="mt-8 text-sm font-bold text-slate-400 hover:text-[#4285F4] transition-colors"
        >
          Volver a SlideNova
        </button>
      </div>
    </div>
  );
};

export default AuthPage;