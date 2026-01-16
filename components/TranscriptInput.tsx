
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ValidationStatus } from '../types';

interface TranscriptInputProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const MIN_CHARS = 100;
const MAX_CHARS = 5000;
const WARNING_THRESHOLD = 4500;

const TranscriptInput: React.FC<TranscriptInputProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateText = useCallback((val: string) => {
    const len = val.length;
    if (len === 0) return 'idle';
    if (len < MIN_CHARS) return 'invalid';
    if (len > MAX_CHARS) return 'invalid';
    if (len > WARNING_THRESHOLD) return 'warning';
    return 'valid';
  }, []);

  useEffect(() => {
    setStatus(validateText(text));
  }, [text, validateText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'invalid' && text.length >= MIN_CHARS && !isLoading) {
      onGenerate(text);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      alert("Solo se admiten archivos .txt o .md");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  const statusColors = {
    idle: 'border-slate-100 focus:border-blue-500',
    valid: 'border-emerald-100 focus:border-emerald-500',
    warning: 'border-amber-200 focus:border-amber-500',
    invalid: 'border-rose-200 focus:border-rose-500',
  };

  return (
    <div 
      id="create-section" 
      role="region" 
      aria-labelledby="form-title"
      className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 transition-all hover:shadow-blue-100/50"
    >
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#4285F4] text-xs font-black uppercase tracking-widest mb-6">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4285F4]"></span>
          </span>
          Estudio Engine v4.0
        </div>
        <h2 id="form-title" className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Panel de Inteligencia</h2>
        <p className="text-slate-500 text-lg font-medium">
          Google Estudio requiere al menos {MIN_CHARS} caracteres para generar una estructura coherente y profesional.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative group">
          <label htmlFor="nova-input" className="sr-only">Escribe o pega el contenido aquí</label>
          <textarea
            id="nova-input"
            className={`w-full h-80 p-8 bg-slate-50 border-2 rounded-[2rem] focus:ring-8 focus:ring-blue-500/5 transition-all outline-none resize-none text-slate-700 text-lg leading-relaxed placeholder:text-slate-300 ${statusColors[status]}`}
            placeholder="Pega aquí el contenido de tu presentación, guion o notas..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            aria-invalid={status === 'invalid'}
            aria-describedby="char-feedback"
          />
          
          <div 
            id="char-feedback"
            role="status"
            className={`absolute bottom-6 right-8 text-sm font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-sm border transition-all ${
              status === 'invalid' ? 'text-rose-600 bg-rose-50 border-rose-100' : 
              status === 'warning' ? 'text-amber-600 bg-amber-50 border-amber-100' :
              status === 'valid' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
              'text-slate-400 bg-white/80 border-slate-100'
            }`}
          >
            {text.length} / {MAX_CHARS} 
            {text.length > 0 && text.length < MIN_CHARS && <span className="ml-2 font-normal text-xs">(Faltan {MIN_CHARS - text.length})</span>}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4 border-t border-slate-50">
          <div className="relative w-full sm:w-auto">
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isLoading}
              title="Cargar archivo .txt o .md"
            />
            <button 
              type="button"
              tabIndex={-1}
              className="w-full flex items-center justify-center gap-3 text-sm font-extrabold text-slate-600 bg-white border-2 border-slate-100 px-6 py-4 rounded-2xl group-hover:border-blue-200 transition-all pointer-events-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Cargar .txt / .md
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || status === 'invalid' || text.length < MIN_CHARS}
            className={`w-full sm:w-auto px-12 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-4 text-xl shadow-xl ${
              isLoading || status === 'invalid' || text.length < MIN_CHARS
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-100 shadow-none' 
              : 'bg-[#4285F4] text-white hover:bg-blue-700 shadow-blue-200 hover:-translate-y-1 active:scale-95'
            }`}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando Estudio...
              </>
            ) : (
              <>
                Crear Estudio
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TranscriptInput;
