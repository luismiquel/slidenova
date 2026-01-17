
import React, { useState, useMemo } from 'react';
import { ValidationStatus } from '../types';

interface TranscriptInputProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const MIN_CHARS = 50; 
const MAX_CHARS = 5000;

const TranscriptInput: React.FC<TranscriptInputProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');

  const validation = useMemo(() => {
    const len = text.length;
    if (len === 0) return { status: 'idle' as ValidationStatus, message: 'Escribe tu idea...' };
    if (len < MIN_CHARS) return { status: 'invalid' as ValidationStatus, message: `Faltan ${MIN_CHARS - len} caracteres` };
    return { status: 'valid' as ValidationStatus, message: 'Listo para brillar con SlideNova' };
  }, [text]);

  const { status, message } = validation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'invalid' && text.length >= MIN_CHARS && !isLoading) {
      onGenerate(text);
    }
  };

  return (
    <div id="create-section" className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-indigo-100/50"></div>
      
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Área de Creación</h2>
        <p className="text-slate-500 font-medium">Introduce tu guion o notas. SlideNova las transformará en una narrativa profesional.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <textarea
          className="w-full h-72 p-8 bg-slate-50 border-2 border-transparent focus:border-indigo-400 rounded-[2rem] outline-none resize-none text-slate-800 text-lg leading-relaxed placeholder:text-slate-300 transition-all shadow-inner"
          placeholder="Escribe o pega aquí tu contenido para empezar..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full ${status === 'invalid' ? 'bg-rose-400' : 'bg-emerald-400'} animate-pulse`}></div>
            <span className={`text-xs font-black uppercase tracking-wider ${status === 'invalid' ? 'text-rose-500' : 'text-slate-500'}`}>
              {text.length} / {MAX_CHARS} • {message}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading || status === 'invalid'}
            className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
              isLoading || status === 'invalid'
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:-translate-y-1'
            }`}
          >
            {isLoading ? (
               <>
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Generando...
               </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.28a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 00.442 3.322l1.61.805a2 2 0 001.583 0l1.61-.805a2 2 0 00.442-3.322l-1.16-1.16zm0 0L19 14.5a3 3 0 00-3-3h-2.5m-9 0L4.5 11.5a3 3 0 003-3H10m-3 0V5a2 2 0 012-2h2a2 2 0 012 2v2.5M10 11.5v3" />
                </svg>
                Crear SlideNova
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TranscriptInput;
