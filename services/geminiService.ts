
import { GoogleGenAI, Type } from "@google/genai";
import { NodeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeArchitecture = async (repoUrl: string, intent: string) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Analyze the following repository URL: ${repoUrl}
    Context/Intent: ${intent}
    
    Tasks:
    1. Propose a high-level file architecture (max 12 key files/modules).
    2. Assign health statuses (healthy, violation, warning, optimized) based on common patterns for the given intent.
    3. Generate architectural thoughts/reasoning logs.
    4. Propose a refactor blueprint.

    Return the data as JSON matching the requested schema.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nodes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                health: { type: Type.STRING, description: "One of: healthy, violation, warning, optimized" },
                type: { type: Type.STRING },
                imports: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["id", "label", "health", "type", "imports"]
            }
          },
          thoughts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                level: { type: Type.STRING, description: "One of: info, warning, error, success" },
                message: { type: Type.STRING },
                details: { type: Type.STRING }
              },
              required: ["level", "message"]
            }
          },
          blueprint: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          }
        },
        required: ["nodes", "thoughts", "blueprint"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw e;
  }
};
