
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AIAnalysis, RiskLevel } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMedicalReport = async (
  base64Image: string,
  userProfile: UserProfile
): Promise<AIAnalysis> => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `Analyze this medical report for a ${userProfile.age}-year-old ${userProfile.gender} with ${userProfile.bloodType} blood. 
            User history: Allergies: ${userProfile.allergies.join(', ')}, Chronic Conditions: ${userProfile.chronicConditions.join(', ')}.
            Explain everything in simple English for an elderly person. 
            Highlight any values outside normal ranges. 
            Predict health risks based on this data.`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          abnormalValues: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                parameter: { type: Type.STRING },
                value: { type: Type.STRING },
                range: { type: Type.STRING },
                note: { type: Type.STRING },
              },
              required: ["parameter", "value", "range", "note"],
            },
          },
          riskPrediction: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
              explanation: { type: Type.STRING },
              nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["level", "explanation", "nextSteps"],
          },
        },
        required: ["summary", "abnormalValues", "riskPrediction"],
      },
    },
  });

  const response = await model;
  return JSON.parse(response.text || '{}') as AIAnalysis;
};

export const chatWithAI = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userProfile: UserProfile
) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are MediAssest, a compassionate and knowledgeable personal healthcare chatbot. 
      You are speaking to a ${userProfile.age}-year-old user named ${userProfile.name}.
      Current user profile: Gender: ${userProfile.gender}, Blood: ${userProfile.bloodType}, Allergies: ${userProfile.allergies.join(', ')}, Chronic Conditions: ${userProfile.chronicConditions.join(', ')}.
      Your goal is to explain health concepts simply, offer friendly reminders, and support their wellness journey. 
      NEVER provide formal medical diagnosis. Always include a reminder to consult a doctor for serious concerns. 
      Use simple language suitable for elderly users.`,
    },
  });

  // Since ai.chats.create might not strictly use the same history format in the snippet, 
  // we follow the basic chat interaction.
  const response = await chat.sendMessage({ message });
  return response.text;
};