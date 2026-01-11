
import React from 'react';
import { User, Shield, Languages, LogOut, ChevronRight, HelpCircle, FileText, Camera, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Language } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onUserUpdate: (user: UserProfile) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, language, onLanguageChange, onUserUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editUser, setEditUser] = React.useState(user);
  const navigate = useNavigate();

  const handleSave = () => {
    onUserUpdate(editUser);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Clear user data and redirect to landing
    localStorage.clear();
    navigate('/');
  };

  const sections = [
    { title: 'Privacy & Security', sub: 'Control your vault', icon: Shield, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Help & Support', sub: 'Guides and FAQ', icon: HelpCircle, color: 'text-sky-600 bg-sky-50' },
  ];

  return (
    <div className="p-6 pb-28 space-y-10 hero-gradient min-h-full">
      <div className="flex items-center gap-4 pt-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl shadow-sm text-slate-800 flex items-center justify-center border border-slate-100 active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-black text-slate-900 leading-tight">My Profile</h1>
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-[3rem] border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden medical-gradient p-1">
            <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-slate-900 text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <Camera size={18} />
          </button>
        </div>

        <div className="w-full space-y-2">
          {isEditing ? (
            <input
              type="text"
              className="text-3xl font-black text-slate-900 text-center bg-white border-b-4 border-teal-500 outline-none w-full px-4 py-2 rounded-2xl shadow-inner italic"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
          ) : (
            <h2 className="text-3xl font-black text-slate-900 italic tracking-tight">{user.name}</h2>
          )}
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Verified Shield Member</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 text-center shadow-xl shadow-slate-900/5 group hover:border-rose-100 transition-all">
          <div className="bg-rose-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Heart size={24} className="text-rose-500" fill="currentColor" />
          </div>
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Blood</p>
          {isEditing ? (
            <input
              type="text"
              className="text-2xl font-black text-rose-600 text-center bg-rose-50 rounded-xl w-full outline-none p-1"
              value={editUser.bloodType}
              onChange={(e) => setEditUser({ ...editUser, bloodType: e.target.value })}
            />
          ) : (
            <p className="text-2xl font-black text-rose-600 italic">{user.bloodType}</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 text-center shadow-xl shadow-slate-900/5 group hover:border-sky-100 transition-all">
          <div className="bg-sky-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <User size={24} className="text-sky-500" />
          </div>
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Age</p>
          {isEditing ? (
            <input
              type="number"
              className="text-2xl font-black text-slate-900 text-center bg-sky-50 rounded-xl w-full outline-none p-1"
              value={editUser.age}
              onChange={(e) => setEditUser({ ...editUser, age: parseInt(e.target.value) || 0 })}
            />
          ) : (
            <p className="text-2xl font-black text-slate-800 italic">{user.age} <span className="text-sm font-medium not-italic opacity-50">yrs</span></p>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`w-full p-6 rounded-[2rem] flex items-center justify-center gap-3 font-black text-xl transition-all active:scale-[0.98] shadow-2xl ${isEditing
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-slate-900 text-white shadow-slate-900/30'
            }`}
        >
          {isEditing ? <CheckCircle size={24} /> : <Sparkles size={24} />}
          {isEditing ? 'Save Profile' : 'Edit My Profile'}
        </button>

        <div className="space-y-4 pt-4">
          {sections.map(section => (
            <button
              key={section.title}
              className="w-full bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 flex items-center gap-5 hover:border-teal-100 transition-all active:scale-[0.98] shadow-sm hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${section.color} border border-white`}>
                <section.icon size={28} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-black text-xl text-slate-800 leading-tight">{section.title}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{section.sub}</p>
              </div>
              <ChevronRight size={24} className="text-slate-300" />
            </button>
          ))}

          <div className="w-full bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 flex items-center gap-5 shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-white">
              <Languages size={28} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-black text-xl text-slate-800 leading-tight">Language</p>
              <p className="text-sm font-bold text-slate-400 capitalize">Currently: {language}</p>
            </div>
            <select
              className="bg-slate-50 border-2 border-slate-100 text-lg font-black text-slate-700 rounded-2xl px-4 py-2 outline-none focus:border-teal-500 appearance-none cursor-pointer"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </section>

      <section className="pt-6 space-y-6">
        <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4 text-teal-400 relative z-10">
            <FileText size={24} />
            <h4 className="text-sm font-black uppercase tracking-[0.2em] italic">Full Disclaimer</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-medium relative z-10">
            MediAssest uses clinical-grade AI for educational purposes. It does not replace professional medical diagnosis. Always consult with a doctor before making medical decisions. In case of a medical emergency, please contact your local emergency services immediately.
          </p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <button className="w-full h-16 flex items-center justify-center gap-3 text-rose-500 font-black text-xl rounded-[2rem] border-4 border-rose-50 border-dashed hover:bg-rose-50/50 transition-all active:scale-95" onClick={handleSignOut}>
          <LogOut size={24} />
          Sign Out of Vault
        </button>
      </section>

      <div className="flex flex-col items-center gap-2 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-teal-500" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">MediAssest v2.0.1 Premium</p>
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Encrypted healthcare companion</p>
      </div>
    </div>
  );
};
