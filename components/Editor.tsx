
import React, { useState } from 'react';
import { Presentation, Slide } from '../types';

interface EditorProps {
  presentation: Presentation;
  onSave: (p: Presentation) => void;
  onCancel: () => void;
}

const Editor: React.FC<EditorProps> = ({ presentation, onSave, onCancel }) => {
  const [editedP, setEditedP] = useState<Presentation>({ ...presentation });

  const updatePresentation = (fields: Partial<Presentation>) => {
    setEditedP(prev => ({ ...prev, ...fields }));
  };

  const updateSlide = (index: number, fields: Partial<Slide>) => {
    const newSlides = [...editedP.slides];
    newSlides[index] = { ...newSlides[index], ...fields };
    setEditedP(prev => ({ ...prev, slides: newSlides }));
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide_${Math.random()}`,
      title: 'Nueva Diapositiva',
      content: ['Punto clave 1'],
      accentColor: '#4f46e5'
    };
    setEditedP(prev => ({ ...prev, slides: [...prev.slides, newSlide] }));
  };

  const removeSlide = (index: number) => {
    const newSlides = editedP.slides.filter((_, i) => i !== index);
    setEditedP(prev => ({ ...prev, slides: newSlides }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 space-y-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-20 z-40 bg-slate-50/90 backdrop-blur-md py-4 border-b border-slate-200 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Editor SlideNova</h2>
          <p className="text-slate-500 font-medium">Refina el contenido y la estructura de tu proyecto personal.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={onCancel}
            className="flex-1 md:flex-none px-8 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Descartar
          </button>
          <button 
            onClick={() => onSave(editedP)}
            className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 text-white rounded-xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            Guardar SlideNova
          </button>
        </div>
      </div>

      <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
        <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Información Principal</h3>
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Título de Portada</label>
            <input 
              className="w-full text-4xl font-black text-slate-900 border-b-4 border-slate-50 focus:border-indigo-500 outline-none p-2 transition-all bg-transparent"
              value={editedP.mainTitle}
              onChange={(e) => updatePresentation({ mainTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Subtítulo Descriptivo</label>
            <input 
              className="w-full text-xl font-bold text-slate-500 border-b-2 border-slate-50 focus:border-indigo-500 outline-none p-2 transition-all bg-transparent"
              value={editedP.subtitle}
              onChange={(e) => updatePresentation({ subtitle: e.target.value })}
            />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Estructura ({editedP.slides.length})</h3>
          <button 
            onClick={addSlide}
            className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Añadir Diapositiva
          </button>
        </div>

        <div className="space-y-8">
          {editedP.slides.map((slide, index) => (
            <div key={slide.id} className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute -left-4 top-10 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl">
                {index + 1}
              </div>
              
              <button 
                onClick={() => removeSlide(index)}
                className="absolute -right-3 -top-3 p-3 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                title="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="space-y-6">
                <input 
                  className="w-full text-2xl font-black text-slate-800 border-b-2 border-slate-50 focus:border-indigo-500 outline-none p-2 transition-all"
                  value={slide.title}
                  onChange={(e) => updateSlide(index, { title: e.target.value })}
                />
                
                <div className="space-y-4">
                  {slide.content.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <input 
                        className="w-full text-lg font-bold text-slate-600 outline-none focus:text-slate-900 transition-all p-1"
                        value={point}
                        onChange={(e) => {
                          const newContent = [...slide.content];
                          newContent[pIndex] = e.target.value;
                          updateSlide(index, { content: newContent });
                        }}
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newContent = [...slide.content, 'Nuevo punto clave'];
                      updateSlide(index, { content: newContent });
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-indigo-600 ml-6 transition-colors"
                  >
                    + Añadir punto clave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-12 text-center">
         <button 
            onClick={() => onSave(editedP)}
            className="bg-indigo-600 text-white px-16 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95"
         >
           Finalizar y Guardar Proyecto
         </button>
      </div>
    </div>
  );
};

export default Editor;
