
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, FileText, Bot, TrendingUp, AlertCircle, ChevronRight, Sparkles, User, Bell } from 'lucide-react';
import { UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Upload Report',
      sub: 'Scan and Analyze',
      icon: FileText,
      color: 'bg-teal-500 text-white',
      path: '/upload'
    },
    {
      label: 'AI Health Chat',
      sub: 'Ask your Companion',
      icon: Bot,
      color: 'bg-indigo-500 text-white',
      path: '/chat'
    },
  ];

  return (
    <div className="p-6 pb-28 space-y-10 hero-gradient min-h-full">
      {/* Header */}
      <header className="flex justify-between items-start pt-4">
        <div>
          <p className="text-lg font-medium text-slate-500 mb-1">Welcome back,</p>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">
            {user.name}
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm relative">
            <Bell size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="w-12 h-12 bg-white rounded-2xl border-2 border-teal-100 flex items-center justify-center overflow-hidden shadow-sm transition-transform active:scale-90"
          >
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Hero Health Card */}
      <section className="medical-gradient rounded-[2.5rem] p-8 text-white shadow-2xl shadow-teal-600/30 relative overflow-hidden group">
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 inline-flex items-center gap-2">
              <Sparkles size={18} className="text-teal-200" />
              <span className="text-sm font-bold tracking-wide">AI Health Score</span>
            </div>
            <div className="text-right">
              <p className="text-teal-100 text-xs font-bold uppercase tracking-widest mb-1">Overall Status</p>
              <p className="text-2xl font-black">EXCELLENT</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs font-bold text-teal-100">
                <span>Monthly Improvement</span>
                <span>+12%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-white rounded-full w-[84%] shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10 group-hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Activity size={20} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-teal-50">Sugar</span>
              </div>
              <p className="text-2xl font-black">98 <span className="text-xs font-normal opacity-70">mg/dL</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10 group-hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-xl">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-teal-50">Weight</span>
              </div>
              <p className="text-2xl font-black">68.5 <span className="text-xs font-normal opacity-70">kg</span></p>
            </div>
          </div>
        </div>

        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
      </section>

      {/* Core Actions */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2 px-1">
          How can I help you?
        </h3>
        <div className="grid gap-6">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-6 group bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-teal-100 transition-all active:scale-[0.98] text-left relative overflow-hidden"
            >
              <div className={`${action.color} p-5 rounded-3xl shadow-lg transition-transform group-hover:scale-110 shrink-0`}>
                <action.icon size={36} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-black text-slate-800 mb-1">{action.label}</h4>
                <p className="text-base text-slate-500 font-medium">{action.sub}</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-teal-500 transition-colors" size={28} />

              {/* Subtle hover indicate */}
              <div className="absolute top-0 left-0 w-2 h-full bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Medical Records */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-2xl font-black text-slate-800">Your Records</h3>
          <button
            className="text-lg text-teal-600 font-black hover:underline underline-offset-4"
            onClick={() => navigate('/library')}
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Blood Routine', date: 'Oct 24, 2024', type: 'Laboratory', status: 'Analysis Done' },
            { title: 'Chest X-Ray', date: 'Sep 12, 2024', type: 'Imaging', status: 'Clean' },
          ].map((report, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center gap-5 hover:border-teal-200 transition-all hover:shadow-md cursor-pointer">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-50">
                <FileText size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-black text-slate-800">{report.title}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-1 rounded-lg border border-teal-100">
                    {report.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-400 capitalize">{report.type.toLowerCase()} • {report.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scientific Disclaimer */}
      <div className="bg-white/50 backdrop-blur-sm border border-slate-100 p-6 rounded-3xl flex gap-4 items-start shadow-inner">
        <div className="bg-slate-200/50 p-2 rounded-xl shrink-0">
          <AlertCircle size={24} className="text-slate-500" />
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
          <strong className="text-slate-700 block mb-1">Medical Disclaimer:</strong>
          MediAssest uses clinical-grade AI to simplify medical concepts. It is an educational tool and does not provide professional medical diagnosis. Please consult with a certified healthcare professional before making any medical decisions.
        </p>
      </div>
    </div>
  );
};
