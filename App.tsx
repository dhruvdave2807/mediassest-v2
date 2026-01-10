
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
import { UserProfile, MedicalRecord, AIAnalysis, Language } from './types';
import { analyzeMedicalReport } from './geminiService';

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

  const handleUserUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Create a base64 from the image for Gemini
      // For this demo, we'll use a placeholder base64 or read if it's an image
      let base64 = "";
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        base64 = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
      } else {
        // Mock base64 for PDF or other files in this demo env
        base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
      }

      const result = await analyzeMedicalReport(base64, user);
      setCurrentAnalysis(result);

      // Add to records
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
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
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
      <Route path="/library" element={<Layout><LibraryScreen records={records} /></Layout>} />
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
