
import { GoogleGenAI } from "@google/genai";

const getAIInstance = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProjectConsultation = async (userInput: string) => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: `You are 'Structura AI', a senior architectural consultant for Structura. 
        Be professional, minimal, and highly knowledgeable about construction, engineering, and architectural trends.
        Provide brief, expert insights. Don't use bullet points unless necessary. 
        Focus on structural integrity, sustainable materials, and modern aesthetics.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to my design core. Let's try again in a moment.";
  }
};

export const analyzeBuildingImage = async (base64Image: string) => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: `Identify and analyze the building in this frame. Return a technical structural audit with the following fields:
          - ARCHITECTURAL CLASSIFICATION
          - PRIMARY TECTONICS (Structural System)
          - MATERIAL PALETTE (Extrapolated)
          - ESTIMATED CONSTRUCTION ERA
          - BIM PARITY SIMULATION (%)
          - STRUCTURAL INTEGRITY RATING
          
          Use extremely professional, high-end architectural terminology. Format as a clean, structured report. Return only the report text.`,
        },
      ],
      config: {
        systemInstruction: "You are the Structura AR Field Analysis Engine. Your output is a high-fidelity architectural sensor report.",
        temperature: 0.2,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "SYSTEM ERROR: IMAGE ANALYSIS INTERRUPTED. VISUAL PARITY UNKNOWN.";
  }
};
