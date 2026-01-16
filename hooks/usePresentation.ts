import { useState, useCallback, useEffect } from 'react';
import { AppState, Presentation } from '../types';
import { generatePresentationFromText } from '../services/geminiService';
import { getPresentationsForUser, savePresentation, deletePresentation as deleteFromDb } from '../services/supabaseService';

export const usePresentation = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allPresentations, setAllPresentations] = useState<Presentation[]>([]);

  // Cargar presentaciones al iniciar sesión
  const loadPresentations = useCallback(async () => {
    try {
      const data = await getPresentationsForUser();
      setAllPresentations(data);
    } catch (err) {
      console.error("Error al cargar presentaciones:", err);
    }
  }, []);

  useEffect(() => {
    loadPresentations();
  }, [loadPresentations]);

  const generate = useCallback(async (text: string) => {
    if (!text.trim() || text.length < 50) {
      setError("El texto es demasiado corto para generar una presentación de calidad.");
      return;
    }

    setState(AppState.GENERATING);
    setError(null);

    try {
      const result = await generatePresentationFromText(text);
      const completeResult: Presentation = {
        ...result,
        id: result.id || `nova_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setPresentation(completeResult);
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

  const saveToDashboard = useCallback(async (p: Presentation) => {
    try {
      await savePresentation(p);
      await loadPresentations();
      setState(AppState.DASHBOARD);
    } catch (err) {
      console.error("Error al guardar presentación:", err);
      setError("Error al guardar. Intenta de nuevo.");
    }
  }, [loadPresentations]);

  const deletePresentation = useCallback(async (id: string) => {
    try {
      await deleteFromDb(id);
      await loadPresentations();
    } catch (err) {
      console.error("Error al eliminar presentación:", err);
      setError("Error al eliminar. Intenta de nuevo.");
    }
  }, [loadPresentations]);

  return {
    state,
    presentation,
    error,
    generate,
    reset,
    setState,
    setPresentation,
    allPresentations,
    saveToDashboard,
    deletePresentation
  };
};
