const { onCall } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithHistory = onCall({ secrets: ["GEMINI_API_KEY"] }, async (request) => {
    const { message, userId } = request.data;
    const db = getFirestore();

    try {
        // 1. Generate an embedding for the user's current question
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(message);
        const queryVector = result.embedding.values;

        // 2. SEARCH: Find the 3 most relevant past reports for this user
        const reportsRef = db.collection("users").doc(userId).collection("reports");

        // Note: Vector search requires the index to be ready.
        const vectorQuery = reportsRef.findNearest("embedding", FieldValue.vector(queryVector), {
            limit: 3,
            distanceMeasure: "COSINE"
        });

        let pastContext = "No prior relevant reports found.";
        let sources = [];

        try {
            const snapshot = await vectorQuery.get();
            if (!snapshot.empty) {
                pastContext = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return `Summary of ${data.fileName}: ${data.summary}`;
                }).join("\n---\n");
                sources = snapshot.docs.map(doc => doc.data().fileName);
            }
        } catch (queryError) {
            console.log("Vector Search skipped or failed (likely no index yet):", queryError.message);
            // Fallback: Proceed without history instead of crashing
        }

        // 3. GENERATE: Send context + question to Gemini
        const chatModel = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            systemInstruction: "You are MediAssest, a compassionate healthcare chatbot. Use the provided history to answer the user question if relevant. Be simple and friendly for an elderly user."
        });

        const finalPrompt = `
      USER HISTORY SEARCH RESULTS (MOST RELEVANT):
      ${pastContext}
      
      CURRENT USER QUESTION: 
      "${message}"
      
      Instructions: Use the history summaries provided above to provide a personalized health summary or answer. If the history is not relevant, answer based on general knowledge but prioritize history.
    `;

        const chatResponse = await chatModel.generateContent(finalPrompt);
        return {
            answer: chatResponse.response.text(),
            answer: chatResponse.response.text(),
            sources: sources.length > 0 ? sources : []
        };
    } catch (error) {
        console.error("Cloud Function RAG Error:", error);
        return { answer: "I'm sorry, I had trouble accessing your medical history. " + error.message };
    }
});
