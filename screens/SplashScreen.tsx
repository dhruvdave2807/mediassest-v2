
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center medical-gradient text-white px-8 text-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-28 h-28 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-8 backdrop-blur-md border border-white/30 shadow-2xl animate-float">
          <ShieldCheck size={56} className="text-white" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={24} className="text-teal-200" />
            <span className="text-teal-100 font-bold tracking-widest uppercase text-sm">Empowering Your Health</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 italic">Medi<span className="text-teal-200">Assest</span></h1>
          <p className="text-xl text-teal-50 font-medium max-w-sm leading-relaxed opacity-90">
            Simple, smart healthcare analysis <br />designed for you.
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="flex gap-1.5 mb-6">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
        <p className="text-sm font-bold tracking-widest uppercase opacity-60">Initializing Medical Engine</p>
      </div>
    </div>
  );
};
