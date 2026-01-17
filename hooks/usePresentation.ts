import { useState, useCallback } from 'react';
import { AppState, Presentation } from '../types';
import { generatePresentationFromText } from '../services/geminiService';

const ERROR_MAPPING: Record<string, string> = {
  "NO_API_KEY": "La configuración de SlideNova está incompleta. No se detectó una clave de API válida. Por favor, verifica tus variables de entorno.",
  "SAFETY_BLOCK": "El motor de seguridad de SlideNova ha bloqueado el contenido por considerar que puede incumplir las políticas de uso. Por favor, intenta con un tema diferente.",
  "PARSE_ERROR": "No se pudo procesar la estructura visual de la presentación. El motor generó un formato incompatible. Intenta simplificar el texto original.",
  "RATE_LIMIT": "Se ha superado el límite de velocidad permitido por la API. Por favor, espera unos segundos antes de intentar generar otro proyecto.",
  "SERVER_ERROR": "Los servidores de SlideNova están experimentando dificultades técnicas en este momento. Inténtalo de nuevo en unos minutos.",
  "EMPTY_RESPONSE": "La inteligencia artificial no generó ninguna respuesta válida para tu solicitud. Intenta proporcionar más contexto o detalles en tu texto.",
  "INPUT_TOO_SHORT": "El contenido proporcionado es insuficiente. SlideNova requiere al menos 100 caracteres para garantizar una narrativa de calidad.",
  "UNKNOWN_ERROR": "Ocurrió un error inesperado durante la fase de generación. Por favor, comprueba tu conexión a internet e inténtalo de nuevo."
};

export const usePresentation = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const generate = useCallback(async (text: string) => {
    // Validación previa del lado del cliente
    if (!text.trim() || text.length < 100) {
      const code = "INPUT_TOO_SHORT";
      setErrorCode(code);
      setError(ERROR_MAPPING[code]);
      setState(AppState.ERROR);
      return;
    }

    setState(AppState.GENERATING);
    setError(null);
    setErrorCode(null);

    try {
      const result = await generatePresentationFromText(text);
      setPresentation(result);
      setState(AppState.VIEWING);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Error capturado en hook usePresentation:", err.message);
      const code = err.message || "UNKNOWN_ERROR";
      const message = ERROR_MAPPING[code] || ERROR_MAPPING["UNKNOWN_ERROR"];
      
      setErrorCode(code);
      setError(message);
      setState(AppState.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setState(AppState.IDLE);
    setPresentation(null);
    setError(null);
    setErrorCode(null);
  }, []);

  return { 
    state, 
    presentation, 
    error, 
    errorCode, 
    generate, 
    reset, 
    setState, 
    setPresentation 
  };
};