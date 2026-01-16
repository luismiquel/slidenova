
import { GoogleGenAI, Type } from "@google/genai";
import { Presentation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePresentationFromText = async (input: string): Promise<Presentation> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Actúa como un experto en diseño de presentaciones ejecutivas (SlideNova). 
    Analiza este contenido: "${input}". 
    Crea una presentación de alto impacto, minimalista y persuasiva. 
    Usa un tono profesional pero moderno. Asegúrate de que cada diapositiva tenga puntos clave breves y potentes.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mainTitle: { type: Type.STRING, description: "Título principal impactante" },
          subtitle: { type: Type.STRING, description: "Eslogan o breve descripción de la presentación" },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING, description: "Puntos clave breves (máximo 15 palabras cada uno)" }
                },
                imagePrompt: { type: Type.STRING, description: "Descripción para generar una imagen conceptual" },
                accentColor: { type: Type.STRING, description: "Código Hex de un color que combine con el tema" }
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
  if (!text) throw new Error("La señal de SlideNova se perdió. Intenta de nuevo.");
  
  return JSON.parse(text) as Presentation;
};
