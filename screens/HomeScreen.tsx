
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, FileText, Bot, AlarmClock, TrendingUp, AlertCircle, ChevronRight, Pill } from 'lucide-react';
import { UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Upload', icon: FileText, color: 'bg-teal-100 text-teal-600', path: '/upload' },
    { label: 'AI Chat', icon: Bot, color: 'bg-sky-100 text-sky-600', path: '/chat' },
    { label: 'Set Alert', icon: AlarmClock, color: 'bg-orange-100 text-orange-600', path: '/reminders' },
  ];

  return (
    <div className="p-6 pb-20 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-slate-500">Welcome back,</h2>
          <h1 className="text-2xl font-bold text-slate-800">{user.name} 👋</h1>
        </div>
        <div className="w-12 h-12 bg-teal-50 rounded-full border-2 border-teal-100 flex items-center justify-center overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" />
        </div>
      </header>

      {/* Health Summary Card */}
      <section className="bg-gradient-to-r from-teal-600 to-sky-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-teal-50/80 text-sm font-medium mb-1">Health Status</p>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-2xl font-bold">Great</h3>
            <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-md">Updated Today</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={16} className="text-teal-200" />
                <span className="text-xs text-teal-100">Blood Sugar</span>
              </div>
              <p className="font-bold">98 mg/dL</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-sky-200" />
                <span className="text-xs text-sky-100">Weight</span>
              </div>
              <p className="font-bold">68.5 kg</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Activity size={160} />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`${action.color} p-4 rounded-2xl shadow-sm transition-transform group-active:scale-95`}>
                <action.icon size={28} />
              </div>
              <span className="text-xs font-semibold text-slate-600">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Risk Alert / Next Reminder */}
      <section className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
          <Pill size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-800 text-sm">Next Medication</h4>
          <p className="text-xs text-slate-500">Lisinopril 10mg in 45 mins</p>
        </div>
        <ChevronRight size={18} className="text-slate-400" />
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-slate-800">Recent Reports</h3>
          <button className="text-sm text-teal-600 font-semibold" onClick={() => navigate('/library')}>View All</button>
        </div>
        
        <div className="space-y-3">
          {[
            { title: 'Blood Routine', date: 'Oct 24, 2024', type: 'Laboratory' },
            { title: 'Chest X-Ray', date: 'Sep 12, 2024', type: 'Imaging' },
          ].map((report, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 hover:border-teal-200 transition-colors">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{report.title}</h4>
                <p className="text-xs text-slate-400">{report.type} • {report.date}</p>
              </div>
              <button className="bg-teal-50 text-teal-600 p-2 rounded-lg">
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI Disclaimer Banner */}
      <div className="bg-slate-50 p-4 rounded-2xl flex gap-3 items-start">
        <AlertCircle size={20} className="text-slate-400 shrink-0 mt-1" />
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          Disclaimer: MediAssest uses AI for educational analysis. This is not medical advice. Always contact your doctor for professional diagnosis.
        </p>
      </div>
    </div>
  );
};
