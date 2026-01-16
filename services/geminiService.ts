
import { GoogleGenAI, Type } from "@google/genai";
import { Presentation } from "../types";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("Google Estudio Error: API_KEY no configurada.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generatePresentationFromText = async (input: string): Promise<Presentation> => {
  const ai = getAIClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Actúa como un experto en diseño de presentaciones profesionales (Google Estudio). 
      Analiza el siguiente contenido y transfórmalo en una narrativa visual coherente: "${input}". 
      
      Reglas críticas:
      1. Tono profesional, minimalista y persuasivo.
      2. Máximo 15 palabras por punto clave.
      3. Genera prompts de imagen abstractos y modernos.
      4. El formato debe ser estrictamente JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainTitle: { type: Type.STRING, description: "Título principal impactante" },
            subtitle: { type: Type.STRING, description: "Eslogan descriptivo" },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING, description: "Puntos clave" }
                  },
                  imagePrompt: { type: Type.STRING },
                  accentColor: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["mainTitle", "subtitle", "slides"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Respuesta vacía del motor de Estudio.");
    
    const parsedData = JSON.parse(text);
    
    return {
      ...parsedData,
      id: `estudio_${Date.now()}`,
      createdAt: new Date().toISOString()
    } as Presentation;

  } catch (error) {
    console.error("Critical Failure in Google Estudio Engine:", error);
    throw new Error("El motor Google Estudio tuvo un problema técnico. Reintenta con un texto más corto.");
  }
};
