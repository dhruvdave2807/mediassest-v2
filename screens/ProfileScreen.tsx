
import React from 'react';
import { User, Shield, Bell, Languages, LogOut, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import { UserProfile, Language } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, language, onLanguageChange }) => {
  const sections = [
    { title: 'Personal Info', icon: User, color: 'text-sky-600 bg-sky-50' },
    { title: 'Privacy & Security', icon: Shield, color: 'text-teal-600 bg-teal-50' },
    { title: 'Notifications', icon: Bell, color: 'text-orange-600 bg-orange-50' },
    { title: 'Help & Support', icon: HelpCircle, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="p-6 pb-24 space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-24 h-24 bg-teal-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" />
          <div className="absolute bottom-0 right-0 p-1.5 bg-teal-600 text-white rounded-full border-2 border-white translate-x-1/4 translate-y-1/4">
             <ChevronRight size={12} className="-rotate-90" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
          <p className="text-slate-400 text-sm">Member since Oct 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Blood Type</p>
           <p className="text-xl font-bold text-red-500">{user.bloodType}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Age</p>
           <p className="text-xl font-bold text-slate-800">{user.age} yrs</p>
        </div>
      </div>

      <section className="space-y-3">
        {sections.map(section => (
          <button 
            key={section.title}
            className="w-full bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-teal-100 transition-all active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${section.color}`}>
              <section.icon size={24} />
            </div>
            <span className="flex-1 text-left font-bold text-slate-700">{section.title}</span>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        ))}

        <div className="w-full bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
            <Languages size={24} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-slate-700">Language</p>
            <p className="text-xs text-slate-400">Current: {language.toUpperCase()}</p>
          </div>
          <select 
            className="bg-slate-50 border-none text-sm font-bold text-slate-600 rounded-lg p-2 outline-none"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </section>

      <section className="pt-4 space-y-4">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
           <div className="flex items-center gap-2 mb-3 text-slate-400">
              <FileText size={16} />
              <h4 className="text-xs font-bold uppercase tracking-widest">Medical Disclaimer</h4>
           </div>
           <p className="text-[10px] text-slate-400 leading-relaxed text-justify italic">
             MediAssest is an AI-powered informative platform. It is not intended to replace medical advice from a qualified healthcare provider. Do not disregard professional medical advice or delay seeking it because of something you have read here. In case of emergency, call 911 immediately.
           </p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold rounded-2xl border-2 border-red-50 border-dashed hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </section>
      
      <p className="text-center text-slate-300 text-[10px] font-medium">MediAssest v1.0.24 • Built with ❤️ for Wellness</p>
    </div>
  );
};
