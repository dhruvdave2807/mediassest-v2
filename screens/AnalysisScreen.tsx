
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info, ChevronRight, Stethoscope, ArrowLeft, RefreshCcw, Sparkles } from 'lucide-react';
import { UserProfile, AIAnalysis, RiskLevel } from '../types';
import { chatWithReport } from '../geminiService';

interface AnalysisScreenProps {
  analysis: AIAnalysis | null;
  loading: boolean;
  userProfile: UserProfile;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ analysis, loading, userProfile }) => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isSending, setIsSending] = React.useState(false);

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !analysis) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsSending(true);

    try {
      const response = await chatWithReport(userMsg, analysis, userProfile);
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to my medical brain right now." }]);
    } finally {
      setIsSending(false);
    }
  };

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

      {/* Chat with Report */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[500px]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-teal-500" size={20} />
          <h3 className="font-bold text-lg text-slate-800">Ask your Report AI</h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar p-2">
          {chatHistory.length === 0 && (
            <div className="text-center py-10">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info size={32} className="text-teal-600" />
              </div>
              <p className="text-slate-500 text-sm">Ask me anything about these results.<br />I'll explain them simply for you.</p>
            </div>
          )}
          {chatHistory.map((chat, idx) => (
            <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${chat.role === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200'
                }`}>
                {chat.content}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200 flex gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <button
            disabled={isSending}
            onClick={handleSendMessage}
            className="bg-teal-600 text-white p-3 rounded-2xl hover:bg-teal-700 active:scale-95 transition-all shadow-md shadow-teal-200 disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};
