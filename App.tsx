
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingScreen } from './screens/LandingScreen';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { UploadScreen } from './screens/UploadScreen';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { ChatScreen } from './screens/ChatScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Layout } from './components/Layout';
import { UserProfile, MedicalRecord, AIAnalysis, Language, RiskLevel } from './types';
import { analyzeMedicalReport } from './geminiService';
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, getDocs, query, orderBy, vector, serverTimestamp, Timestamp } from "firebase/firestore";
import { generateEmbedding } from './geminiService';

const MOCK_USER: UserProfile = {
  name: 'Robert Wilson',
  age: 68,
  gender: 'Male',
  bloodType: 'A+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Type 2 Diabetes', 'Hypertension'],
};

const MOCK_RECORDS: MedicalRecord[] = [
  { id: '1', date: '2024-10-24', type: 'Blood Test', title: 'Annual Checkup', fileName: 'report_1024.pdf' },
  { id: '2', date: '2024-09-12', type: 'Imaging', title: 'Chest X-Ray', fileName: 'chest_xray.jpg' },
  { id: '3', date: '2024-08-05', type: 'Prescription', title: 'Lisinopril Renewal', fileName: 'rx_aug.pdf' },
];

const AppContent = () => {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS);
  const [language, setLanguage] = useState<Language>('en');
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            name: userData.name,
            age: userData.age,
            gender: userData.gender,
            bloodType: userData.bloodType,
            allergies: userData.allergies || [],
            chronicConditions: userData.chronicConditions || [],
          });
        }

        // Fetch User Reports from Firestore
        const reportsRef = collection(db, "users", firebaseUser.uid, "reports");
        const q = query(reportsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedRecords: MedicalRecord[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Handle both serverTimestamp (Timestamp object) and string dates
          let dateStr = new Date().toISOString().split('T')[0];
          if (data.timestamp) {
            if (data.timestamp.toDate) {
              dateStr = data.timestamp.toDate().toISOString().split('T')[0];
            } else if (typeof data.timestamp === 'string') {
              dateStr = new Date(data.timestamp).toISOString().split('T')[0];
            }
          }

          return {
            id: doc.id,
            date: dateStr,
            type: 'AI Analyzed',
            title: data.summary ? 'AI Analysis' : data.fileName,
            fileName: data.fileName,
            analysis: {
              summary: data.summary,
              abnormalValues: data.abnormalValues,
              riskPrediction: {
                level: 'Unknown',
                explanation: 'Retrieved from history.',
                nextSteps: []
              }
            } as any
          } as MedicalRecord;
        });

        if (fetchedRecords.length > 0) {
          setRecords(fetchedRecords);
        }

        console.log("Logged in as:", firebaseUser.uid);
      } else {
        // User logged out
        setUser(MOCK_USER); // Fallback to mock or redirect
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Create a base64 from the image for Gemini
      let base64 = "";
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        base64 = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
      } else {
        base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
      }

      const result = await analyzeMedicalReport(base64, user);

      // Save to Firestore for future RAG retrieval if user is authenticated
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Generate embedding for the summary
        const embedding = await generateEmbedding(result.summary);

        await addDoc(collection(db, "users", currentUser.uid, "reports"), {
          fileName: file.name,
          summary: result.summary,
          embedding: vector(embedding),
          abnormalValues: result.abnormalValues,
          timestamp: serverTimestamp(),
        });
      }

      setCurrentAnalysis(result);

      // Add to local records
      const newRecord: MedicalRecord = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        type: 'AI Analyzed',
        title: file.name.split('.')[0] || 'Medical Report',
        fileName: file.name,
        analysis: result
      };
      setRecords(prev => [newRecord, ...prev]);
    } catch (err) {
      console.error("Analysis or Store failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReportClick = (record: MedicalRecord) => {
    if (record.analysis) {
      // Hydrate the risk prediction if missing (backward compatibility)
      const fullAnalysis: AIAnalysis = {
        summary: record.analysis.summary,
        abnormalValues: record.analysis.abnormalValues || [],
        riskPrediction: record.analysis.riskPrediction || {
          level: RiskLevel.LOW, // Default fallback
          explanation: 'Historical report retrieved.',
          nextSteps: ['Consult your doctor for details.']
        }
      };
      setCurrentAnalysis(fullAnalysis);
      // Use a small timeout to ensure state update before nav? 
      // Actually React Router handles this fine usually.
      // But we need to access 'navigate' here. AppContent renders Routes...
      // We can't navigate from here easily without passing a prop or context.
      // Wait, AppContent is inside Router? Yes.
      // But AppContent doesn't have useHistory/useNavigate hook called.
      // Let's rely on passing this handler to LibraryScreen which calls it then navigates.
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen onSignUp={handleUserUpdate} />} />
      <Route path="/home" element={<Layout><HomeScreen user={user} /></Layout>} />
      <Route path="/upload" element={<UploadScreen onUpload={handleUpload} />} />
      <Route path="/analysis" element={<Layout><AnalysisScreen analysis={currentAnalysis} loading={isAnalyzing} userProfile={user} /></Layout>} />
      <Route path="/chat" element={<Layout><ChatScreen user={user} /></Layout>} />
      <Route path="/library" element={<Layout><LibraryScreen records={records} onSelectReport={(r) => {
        if (r.analysis) {
          const fullAnalysis: AIAnalysis = {
            summary: r.analysis.summary,
            abnormalValues: r.analysis.abnormalValues || [],
            riskPrediction: r.analysis.riskPrediction || {
              level: RiskLevel.LOW,
              explanation: 'Historical report retrieved.',
              nextSteps: []
            }
          };
          setCurrentAnalysis(fullAnalysis);
        }
      }} /></Layout>} />
      <Route path="/profile" element={<Layout><ProfileScreen user={user} language={language} onLanguageChange={setLanguage} onUserUpdate={handleUserUpdate} /></Layout>} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
