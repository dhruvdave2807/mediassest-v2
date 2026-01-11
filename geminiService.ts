
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AIAnalysis, RiskLevel } from "./types";

import { db } from "./firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// Note: Client-side vector search might require 'vector-search' preview or Cloud Functions.
// For this demo, we will implement a simplified 'recent reports' context retrieval as a baseline for RAG.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

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

export const chatWithReport = async (
  message: string,
  analysis: AIAnalysis,
  userProfile: UserProfile
) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            text: `
              You are MediAssest AI, a medical assistant. You are helping ${userProfile.name} understand their medical report.
              
              REPORT DATA:
              Summary: ${analysis.summary}
              Abnormal Values: ${JSON.stringify(analysis.abnormalValues)}
              Risk Assessment: ${analysis.riskPrediction.level} - ${analysis.riskPrediction.explanation}
              Next Steps: ${analysis.riskPrediction.nextSteps.join(', ')}
              
              User Profile: ${userProfile.age} year old ${userProfile.gender}, Blood ${userProfile.bloodType}, Allergies: ${userProfile.allergies.join(', ')}, Chronic Conditions: ${userProfile.chronicConditions.join(', ')}.
              
              USER QUESTION: ${message}
              
              INSTRUCTIONS:
              - Answer the user's question based on the report data provided.
              - Use SHORT, SIMPLE, and friendly language suitable for an elderly person.
              - Do NOT provide medical diagnosis.
              - Always advise to consult a doctor for clinical decisions.
            `,
          },
        ],
      },
    ],
  });

  const response = await model;
  return response.text;
};

export const generateEmbedding = async (text: string) => {
  try {
    const result = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: [{ parts: [{ text }] }]
    });

    // Support both @google/genai and @google/generative-ai formats
    if (result.embeddings && result.embeddings.length > 0) {
      return result.embeddings[0].values;
    }
    if ((result as any).embedding) {
      return (result as any).embedding.values;
    }

    return [];
  } catch (error) {
    console.error("Frontend Embedding Error:", error);
    return [];
  }
};

export const getRelevantContext = async (uid: string, queryText: string) => {
  try {
    // Generate query embedding
    const queryVector = await generateEmbedding(queryText);

    // FETCHING CONTEXT: 
    // In a full production app, you'd use Firestore Vector Search (VectorQuery) here.
    // For this implementation, we fetch the last 3 reports to provide historical context.
    const reportsRef = collection(db, "users", uid, "reports");
    const q = query(reportsRef, orderBy("timestamp", "desc"), limit(3));
    const querySnapshot = await getDocs(q);

    let context = "PAST MEDICAL HISTORY & PREVIOUS ANALYSES:\n";
    if (querySnapshot.empty) return "No prior reports found.";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      context += `- Report (${data.fileName}, ${new Date(data.timestamp).toLocaleDateString()}): ${data.summary}\n`;
    });

    return context;
  } catch (error) {
    console.error("RAG Retrieval Error:", error);
    return "Error retrieving past medical context.";
  }
};

export const chatWithAI = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userProfile: UserProfile,
  uid?: string
) => {
  // 1. Retrieve Context if user is logged in
  let medicalContext = "";
  if (uid) {
    medicalContext = await getRelevantContext(uid, message);
  }

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are MediAssest, a compassionate healthcare chatbot. 
      USER INFO: ${userProfile.name}, ${userProfile.age}y/o, Blood ${userProfile.bloodType}, Allergies: ${userProfile.allergies.join(', ')}.
      
      ${medicalContext ? `RELEVANT CONTEXT FROM USER'S PAST REPORTS:\n${medicalContext}` : ""}
      
      INSTRUCTIONS:
      - Use the provided context from past reports to answer question if relevant (e.g., if they ask about trends).
      - Explain concepts simply for an elderly person.
      - NEVER diagnose. Always advise consulting a doctor.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return (response as any).text;
};