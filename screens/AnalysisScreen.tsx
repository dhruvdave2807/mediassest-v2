
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info, ChevronRight, Stethoscope, ArrowLeft, RefreshCcw } from 'lucide-react';
import { AIAnalysis, RiskLevel } from '../types';

interface AnalysisScreenProps {
  analysis: AIAnalysis | null;
  loading: boolean;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ analysis, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 bg-white">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
          <Stethoscope size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Report</h2>
          <p className="text-slate-500">Our AI is reading your results and preparing a simple explanation.</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <RefreshCcw size={48} className="text-slate-200 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">No Analysis Available</h2>
        <p className="text-slate-500 mt-2 mb-6">Please upload a report to see insights here.</p>
        <button onClick={() => navigate('/upload')} className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold">Go to Upload</button>
      </div>
    );
  }

  const riskColor =
    analysis.riskPrediction.level === RiskLevel.LOW ? 'text-green-600 bg-green-50' :
      analysis.riskPrediction.level === RiskLevel.MEDIUM ? 'text-orange-600 bg-orange-50' :
        'text-red-600 bg-red-50';

  return (
    <div className="p-6 pb-24 space-y-8 bg-slate-50">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">AI Report Summary</h1>
      </div>

      {/* Summary Card */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 text-teal-600">
          <CheckCircle size={20} />
          <h3 className="font-bold text-lg">Overall Summary</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          {analysis.summary}
        </p>
      </section>

      {/* Abnormal Values */}
      {analysis.abnormalValues.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={20} />
            Focus Areas
          </h3>
          <div className="space-y-3">
            {analysis.abnormalValues.map((val, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800">{val.parameter}</h4>
                  <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded text-xs">{val.value}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Normal: {val.range}</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg italic">
                  Note: {val.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Risk Prediction */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="text-sky-600" size={20} />
          <h3 className="font-bold text-lg text-slate-800">Health Risk Level</h3>
        </div>

        <div className={`p-6 rounded-2xl text-center flex flex-col items-center ${riskColor}`}>
          <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Estimated Risk</span>
          <span className="text-3xl font-black">{analysis.riskPrediction.level}</span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {analysis.riskPrediction.explanation}
        </p>

        <div className="space-y-2 mt-4">
          <p className="text-xs font-bold text-slate-400 uppercase">Suggested Next Steps</p>
          <ul className="space-y-2">
            {analysis.riskPrediction.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">{idx + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Consult Doctor Banner */}
      <section className="bg-teal-600 p-6 rounded-3xl text-white shadow-lg shadow-teal-600/20">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <Stethoscope size={28} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Consult a Professional</h4>
            <p className="text-xs text-teal-50/80">Schedule a review with your doctor.</p>
          </div>
        </div>
        <button className="w-full py-3 bg-white text-teal-600 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
          Find Specialist <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
};
