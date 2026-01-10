
import React, { useState } from 'react';
import { Search, Filter, FileText, ChevronRight, Share2, MoreVertical, Plus } from 'lucide-react';
import { MedicalRecord } from '../types';

export const LibraryScreen: React.FC<{ records: MedicalRecord[] }> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredRecords = records.filter(r => 
    (activeTab === 'All' || r.type === activeTab) &&
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Medical Records</h1>
        <button className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
          <Plus size={24} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search reports..."
          className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Blood Test', 'Imaging', 'Prescription', 'Surgery'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-slate-100 text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-3xl border border-slate-100 hover:border-teal-100 transition-all flex items-center gap-4 group">
              <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{record.title}</h4>
                <p className="text-xs text-slate-400 mb-1">{record.type} • {record.date}</p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-bold">Encrypted</span>
                  {record.analysis && <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-bold">AI Analyzed</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-300 hover:text-teal-600 transition-colors">
                  <Share2 size={18} />
                </button>
                <button className="p-2 text-slate-300 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <FileText size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No reports found matching your search</p>
          </div>
        )}
      </div>

      {/* Security Hint */}
      <div className="bg-sky-50 p-4 rounded-2xl flex items-start gap-3">
        <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center shrink-0">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.47 6.84 22.59 12 24C17.16 22.59 21 17.47 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-sky-800">Your data is safe</h4>
          <p className="text-xs text-sky-700 leading-tight">All medical records are stored with AES-256 end-to-end encryption.</p>
        </div>
      </div>
    </div>
  );
};
