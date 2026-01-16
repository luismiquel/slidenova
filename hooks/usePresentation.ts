
import { useState, useCallback } from 'react';
import { AppState, Presentation } from '../types';
import { generatePresentationFromText } from '../services/geminiService';

export const usePresentation = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (text: string) => {
    if (!text.trim() || text.length < 50) {
      setError("El texto es demasiado corto para generar una presentación de calidad.");
      return;
    }

    setState(AppState.GENERATING);
    setError(null);

    try {
      const result = await generatePresentationFromText(text);
      setPresentation(result);
      setState(AppState.VIEWING);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("SlideNova Generation Error:", err);
      setError("No pudimos procesar tu solicitud. Prueba con un texto más claro o revisa tu conexión.");
      setState(AppState.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setState(AppState.IDLE);
    setPresentation(null);
    setError(null);
  }, []);

  return { state, presentation, error, generate, reset };
};
