import React from 'react';

interface AuthPageProps {
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto py-20 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-lg rotate-3">
          SN
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Bienvenido a SlideNova</h2>
        <p className="text-slate-500 mb-8 font-medium">Guarda tus presentaciones y accede a funciones premium.</p>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.08 5.44-7.84 5.44-4.8 0-8.72-3.88-8.72-8.64s3.92-8.64 8.72-8.64c2.72 0 4.56 1.12 5.6 2.08l2.56-2.56C19.04 1.2 16 0 12.48 0 5.56 0 0 5.56 0 12.48s5.56 12.48 12.48 12.48c7.2 0 12-5.04 12-12.24 0-.8-.08-1.44-.24-2.08h-11.76z"/>
            </svg>
            Continuar con Google
          </button>
          
          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-slate-100 grow"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">o</span>
            <div className="h-px bg-slate-100 grow"></div>
          </div>
          
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-medium"
          />
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Crear cuenta / Iniciar sesión
          </button>
        </div>
        
        <button 
          onClick={onBack}
          className="mt-8 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
        >
          Volver a SlideNova
        </button>
      </div>
    </div>
  );
};

export default AuthPage;