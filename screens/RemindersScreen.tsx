
import React, { useState } from 'react';
import { Plus, Bell, Calendar, Pill, Clock, MoreVertical, CheckCircle2 } from 'lucide-react';
import { Reminder } from '../types';

export const RemindersScreen: React.FC<{ reminders: Reminder[] }> = ({ reminders: initialReminders }) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Reminders</h1>
        <button className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
          <Plus size={24} />
        </button>
      </div>

      <div className="flex p-1 bg-slate-100 rounded-2xl">
        {(['Upcoming', 'Past'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 text-slate-400">
           <Calendar size={18} />
           <span className="text-sm font-bold uppercase tracking-wider">Today, Oct 24</span>
        </div>

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div 
              key={reminder.id} 
              className={`bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-all flex items-center gap-4 ${!reminder.isActive ? 'opacity-50' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                reminder.type === 'medication' ? 'bg-orange-50 text-orange-600' : 'bg-sky-50 text-sky-600'
              }`}>
                {reminder.type === 'medication' ? <Pill size={28} /> : <Calendar size={28} />}
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{reminder.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                   <div className="flex items-center gap-1 text-slate-400">
                      <Clock size={14} />
                      <span className="text-xs">{reminder.time}</span>
                   </div>
                   <span className="text-xs text-slate-400 italic">{reminder.frequency}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <button 
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${reminder.isActive ? 'bg-teal-600' : 'bg-slate-200'}`}
                 >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${reminder.isActive ? 'left-7' : 'left-1'}`}></div>
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-teal-50 border border-teal-100 rounded-3xl p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-sm">
                <CheckCircle2 size={32} />
            </div>
            <h4 className="text-teal-900 font-bold mb-1">Stay on Track</h4>
            <p className="text-sm text-teal-700">You've completed 80% of your reminders this week. Keep up the great work!</p>
        </div>
      </div>
    </div>
  );
};
