
import React from 'react';
import TranscriptInput from './TranscriptInput';

interface CreatePageProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const CreatePage: React.FC<CreatePageProps> = ({ onGenerate, isLoading }) => {
  return (
    <div id="create-section" className="w-full py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Crea tu próxima SlideNova</h2>
        <p className="text-slate-500 text-lg mt-2 font-medium">Elige tu punto de partida para una presentación inolvidable.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-indigo-100/50 transition-all flex items-start gap-4 group">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-slate-800">Desde Guion</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Transforma un texto estructurado en diapositivas.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-indigo-100/50 transition-all flex items-start gap-4 group">
          <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-slate-800">Transcripción</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Resume grabaciones o notas de voz automáticamente.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-indigo-100/50 transition-all flex items-start gap-4 group">
          <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-slate-800">Documento</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Sube un PDF o TXT y extrae lo más relevante.</p>
          </div>
        </div>
      </div>
      
      <TranscriptInput onGenerate={onGenerate} isLoading={isLoading} />
    </div>
  );
};

export default CreatePage;
