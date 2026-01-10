
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-sky-600 text-white px-8 text-center">
      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <ShieldCheck size={48} className="text-white" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">MediAssest</h1>
      <p className="text-lg text-teal-50 font-medium max-w-xs">
        Your Secure, AI-Powered Healthcare Companion
      </p>
      
      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-sm opacity-70 italic">Preparing your medical assistant...</p>
      </div>
    </div>
  );
};
