
import React, { useState } from 'react';
import { Search, Filter, FileText, ChevronRight, Share2, MoreVertical, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MedicalRecord } from '../types';

export const LibraryScreen: React.FC<{ records: MedicalRecord[] }> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const filteredRecords = records.filter(r =>
    (activeTab === 'All' || r.type === activeTab) &&
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pb-28 space-y-8 hero-gradient min-h-full">
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl shadow-sm text-slate-800 flex items-center justify-center border border-slate-100 active:scale-90 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">Records</h1>
        </div>
        <button className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-teal-600/20 active:scale-95 transition-transform hover:bg-teal-700">
          <Plus size={32} />
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={24} />
        <input
          type="text"
          placeholder="Search reports..."
          className="w-full pl-14 pr-14 py-5 bg-white border-2 border-slate-50 rounded-[2rem] focus:border-teal-500/50 outline-none transition-all shadow-sm text-lg font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
        {['All', 'AI Analyzed', 'Laboratory', 'Imaging', 'Prescription'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-2xl text-base font-black whitespace-nowrap transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-white border-2 border-slate-50 text-slate-400'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 hover:border-teal-100 transition-all flex items-center gap-5 group shadow-sm hover:shadow-xl cursor-pointer">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center shrink-0 border border-slate-50 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                <FileText size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xl font-black text-slate-800 truncate leading-tight">{record.title}</h4>
                  <button className="text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">{record.type} • {record.date}</p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1 rounded-lg font-black uppercase tracking-wider border border-teal-100 italic">Encrypted</span>
                  {record.analysis && (
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-black uppercase tracking-wider border border-indigo-100 italic">AI Ready</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white/50 backdrop-blur-md rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={48} className="text-slate-200" />
            </div>
            <p className="text-xl font-black text-slate-400">No matching reports found</p>
          </div>
        )}
      </div>

      {/* Security Hint */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-white/10 text-teal-400 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V12C3 17.47 6.84 22.59 12 24C17.16 22.59 21 17.47 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1 relative z-10">
          <h4 className="text-lg font-black text-white italic mb-1">Vault Privacy</h4>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">Medical reports are encrypted with AES-256 military standards.</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};
