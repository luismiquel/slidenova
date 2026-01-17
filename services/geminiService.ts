
import { GoogleGenAI, Type } from "@google/genai";
import { Presentation } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("NO_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Genera una presentación profesional utilizando el motor SlideNova.
 */
export const generatePresentationFromText = async (input: string): Promise<Presentation> => {
  const ai = getAIClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Actúa como el motor inteligente de SlideNova AI, diseñado por Luis Miguel Garcia de las Morenas. 
      Tu misión es transformar este contenido en una narrativa visual coherente y profesional: "${input}". 
      
      Reglas de Diseño SlideNova:
      1. Tono inspirador, directo y profesional.
      2. Crea una estructura de 5-8 diapositivas con flujo lógico.
      3. Cada diapositiva debe tener un título impactante y máximo 4 puntos clave (bullets).
      4. Asigna colores de acento en hexadecimal que combinen con el estilo Indigo/Cyan de la marca.
      5. Devuelve estrictamente un objeto JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainTitle: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
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

    if (response.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error("SAFETY_BLOCK");
    }

    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    
    try {
      const parsedData = JSON.parse(text);
      return {
        ...parsedData,
        slides: parsedData.slides.map((s: any, i: number) => ({
          ...s,
          id: `sn_slide_${Date.now()}_${i}`
        })),
        id: `sn_proj_${Date.now()}`,
        createdAt: new Date().toISOString()
      } as Presentation;
    } catch (e) {
      console.error("JSON Parse Error in SlideNova Engine:", e);
      throw new Error("PARSE_ERROR");
    }

  } catch (error: any) {
    console.error("SlideNova Engine Error:", error);
    throw new Error(error.message || "UNKNOWN_ERROR");
  }
};
