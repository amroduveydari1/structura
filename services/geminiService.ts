
import { GoogleGenAI } from "@google/genai";

// Fix: Refactored to follow @google/genai best practices and mandatory environment variable usage
export const getProjectConsultation = async (userInput: string) => {
  // Always use a new instance with the API key from process.env directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    
    // Correctly accessing the text property directly on the response object
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my design core. Let's try again in a moment.";
  }
};
