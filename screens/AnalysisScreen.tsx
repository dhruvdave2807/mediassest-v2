
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info, ChevronRight, Stethoscope, ArrowLeft, RefreshCcw, Sparkles, Send, Bot, User, Brain } from 'lucide-react';
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
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isSending]);

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
      setChatHistory(prev => [...prev, { role: 'ai', content: "I'm sorry, I'm having a little trouble connecting to my medical database. Could you try asking again?" }]);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center medical-gradient text-white p-10 text-center space-y-10">
        <div className="relative">
          <div className="w-32 h-32 border-8 border-white/20 border-t-white rounded-full animate-spin shadow-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-3xl flex items-center justify-center animate-pulse shadow-xl">
            <Brain size={40} className="text-teal-600" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black italic tracking-tight">Reading Results...</h2>
          <p className="text-xl text-teal-50 opacity-90 font-medium max-w-sm">
            Please wait while MediAssest AI simplifies your medical data.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center bg-slate-50 space-y-8">
        <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
          <RefreshCcw size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Analysis Pending</h2>
          <p className="text-lg text-slate-500 font-medium">Please upload a document to get started.</p>
        </div>
        <button
          onClick={() => navigate('/upload')}
          className="w-full max-w-xs py-5 bg-teal-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-teal-600/20 active:scale-95 transition-transform"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  const riskColor =
    analysis.riskPrediction.level === RiskLevel.LOW ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
      analysis.riskPrediction.level === RiskLevel.MEDIUM ? 'text-amber-600 bg-amber-50 border-amber-100' :
        'text-rose-600 bg-rose-50 border-rose-100';

  return (
    <div className="pb-32 hero-gradient min-h-full">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 glass-morphism px-6 py-4 flex items-center gap-4 mb-6 shadow-sm border-b border-white/50">
        <button onClick={() => navigate('/')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-slate-800 flex items-center justify-center border border-slate-100 active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-slate-900 leading-tight">AI Insights</h1>
      </div>

      <div className="px-6 space-y-10">
        {/* Summary Card */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-teal-900/5 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6 text-teal-600">
            <div className="bg-teal-50 p-2 rounded-xl">
              <CheckCircle size={28} />
            </div>
            <h3 className="font-black text-2xl">Simplified Summary</h3>
          </div>
          <p className="text-xl text-slate-700 leading-[1.6] font-medium">
            {analysis.summary}
          </p>

          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles size={100} />
          </div>
        </section>

        {/* Abnormal Values */}
        {analysis.abnormalValues.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2 px-1">
              <AlertTriangle className="text-amber-500" size={32} />
              Important Findings
            </h3>
            <div className="space-y-6">
              {analysis.abnormalValues.map((val, idx) => (
                <div key={idx} className="bg-white p-7 rounded-[2rem] border-l-[10px] border-amber-500 shadow-xl shadow-amber-900/5 hover:scale-[1.02] transition-transform cursor-default">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black text-2xl text-slate-900">{val.parameter}</h4>
                    <span className="text-amber-700 font-black bg-amber-100 px-4 py-2 rounded-2xl text-lg border border-amber-200">
                      {val.value}
                    </span>
                  </div>
                  <p className="text-base font-bold text-slate-400 mb-4 uppercase tracking-widest">Normal Range: {val.range}</p>
                  <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 italic">
                    <p className="text-lg text-slate-700 font-medium leading-relaxed">
                      <strong className="text-amber-800 not-italic block mb-1">What this means:</strong>
                      {val.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Risk Prediction Card */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 space-y-6 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-2 rounded-xl">
              <Info className="text-sky-600" size={28} />
            </div>
            <h3 className="font-black text-2xl text-slate-900">Health Health Risk</h3>
          </div>

          <div className={`p-8 rounded-[2rem] text-center flex flex-col items-center border ${riskColor}`}>
            <span className="text-sm font-black uppercase tracking-[0.2em] opacity-60 mb-2">Analysis Result</span>
            <span className="text-5xl font-black italic tracking-tighter">{analysis.riskPrediction.level}</span>
          </div>

          <p className="text-lg font-medium text-slate-600 leading-relaxed px-1">
            {analysis.riskPrediction.explanation}
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Recommended Next Steps</p>
            <div className="space-y-3">
              {analysis.riskPrediction.nextSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 text-lg text-slate-800 font-black bg-slate-50 p-5 rounded-3xl border border-slate-100">
                  <span className="w-8 h-8 bg-teal-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-600/20 font-black text-sm">{idx + 1}</span>
                  <span className="leading-tight">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chat Feature */}
        <section className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden flex flex-col">
          <div className="medical-gradient p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Bot size={36} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-2xl leading-none mb-1">Report Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase opacity-80">AI Online</span>
                </div>
              </div>
            </div>
            <Sparkles size={32} className="opacity-40" />
          </div>

          <div className="h-[450px] overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Info size={40} className="text-teal-600" />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-2">Have a question?</h4>
                <p className="text-base text-slate-500 font-medium leading-relaxed italic">
                  "What does my sugar level mean?" or<br />"What should I do next?"
                </p>
              </div>
            )}

            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-5 text-lg font-medium leading-relaxed ${chat.role === 'user'
                    ? 'bg-slate-900 text-white rounded-[2rem] rounded-tr-none shadow-xl'
                    : 'bg-white text-slate-800 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-md'
                  }`}>
                  {chat.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-5 rounded-[2rem] rounded-tl-none shadow-md flex gap-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex gap-4 relative">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question here..."
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 text-lg font-black focus:outline-none focus:border-teal-500/50 focus:bg-white transition-all pr-20"
              />
              <button
                disabled={isSending || !chatMessage.trim()}
                onClick={handleSendMessage}
                className="absolute right-2 top-2 bottom-2 w-14 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 active:scale-90 transition-all shadow-lg shadow-teal-600/20 disabled:opacity-30"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
