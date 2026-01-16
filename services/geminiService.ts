
import { GoogleGenAI, Type } from "@google/genai";
import { Presentation } from "../types";

// Fix: Always initialize GoogleGenAI with a direct reference to process.env.API_KEY as per the latest SDK guidelines
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("SlideNova Error: API_KEY no configurada en el entorno.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generatePresentationFromText = async (input: string): Promise<Presentation> => {
  // Fix: Create a new instance right before the generation call to ensure correct state and configuration
  const ai = getAIClient();
  
  try {
    // Fix: Upgraded to 'gemini-3-pro-preview' as it is better suited for complex text structuring and creative tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Actúa como un experto en diseño de presentaciones ejecutivas de élite (SlideNova). 
      Analiza el siguiente contenido y transfórmalo en una narrativa visual coherente: "${input}". 
      
      Reglas críticas:
      1. Tono ejecutivo, minimalista y persuasivo.
      2. Máximo 15 palabras por punto clave.
      3. Genera prompts de imagen abstractos y profesionales.
      4. El formato debe ser estrictamente JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainTitle: { type: Type.STRING, description: "Título principal impactante" },
            subtitle: { type: Type.STRING, description: "Eslogan descriptivo de alto nivel" },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING, description: "Puntos clave breves y potentes" }
                  },
                  imagePrompt: { type: Type.STRING, description: "Descripción para IA generadora de imágenes" },
                  accentColor: { type: Type.STRING, description: "Color Hexadecimal sugerido para la slide" }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["mainTitle", "subtitle", "slides"]
        }
      }
    });

    // Fix: Access the .text property directly (it's a getter, do not call it as a function)
    const text = response.text;
    if (!text) throw new Error("Respuesta vacía del motor Nova.");
    
    const parsedData = JSON.parse(text);
    
    // Aseguramos que la presentación tenga metadatos mínimos si el modelo no los incluyó
    return {
      ...parsedData,
      id: `nova_${Date.now()}`,
      createdAt: new Date().toISOString()
    } as Presentation;

  } catch (error) {
    console.error("Critical Failure in SlideNova Engine:", error);
    throw new Error("El motor SlideNova tuvo una interferencia. Por favor, revisa el contenido e intenta de nuevo.");
  }
};
