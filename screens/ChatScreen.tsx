
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertCircle, Loader2, Sparkles, ArrowLeft, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatWithAI } from '../geminiService';
import { UserProfile } from '../types';
import { auth, functions } from '../firebase';
import { httpsCallable } from "firebase/functions";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatScreen: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hello ${user.name}! I'm your health assistant. I can help you understand medical terms, healthy habits, or general wellness. What's on your mind?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const chatWithHistory = httpsCallable(functions, 'chatWithHistory');

      const result = await chatWithHistory({
        message: userMsg,
        userId: auth.currentUser?.uid || "mock-user"
      });

      const data = result.data as { answer: string };
      setMessages(prev => [...prev, { role: 'model', text: data.answer || "I'm sorry, I couldn't process that. Can you try again?" }]);
    } catch (err) {
      console.error("Cloud Function Error:", err);
      // Fallback to direct AI if cloud function fails (e.g. not deployed yet)
      try {
        const response = await chatWithAI(
          userMsg,
          messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          user,
          auth.currentUser?.uid
        );
        setMessages(prev => [...prev, { role: 'model', text: response || "Direct AI fallback error." }]);
      } catch (fallbackErr) {
        setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to both our cloud and AI services." }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col hero-gradient relative min-h-screen">
      {/* Header */}
      <div className="p-6 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between z-50 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl shadow-sm text-slate-800 flex items-center justify-center border border-slate-100 active:scale-90 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 medical-gradient text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none mb-1">Health Bot</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Assistant</span>
              </div>
            </div>
          </div>
        </div>
        <Sparkles size={24} className="text-teal-500 opacity-40" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div
              className={`max-w-[85%] px-6 py-5 rounded-[2.5rem] shadow-xl text-lg font-medium leading-relaxed ${m.role === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none shadow-slate-900/10'
                : 'bg-white text-slate-800 border-2 border-slate-50 rounded-tl-none shadow-teal-900/5'
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-slate-50 px-6 py-5 rounded-[2.5rem] rounded-tl-none shadow-md flex gap-2">
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 pt-2 space-y-4">
        {/* Warning Box */}
        <div className="p-4 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-3xl flex gap-3 items-start shadow-inner">
          <AlertCircle size={20} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-tight font-black uppercase tracking-wider opacity-60">
            MediAssest AI provides information only. Seek professional medical advice for specific conditions.
          </p>
        </div>

        {/* Input area */}
        <div className="relative group">
          <input
            type="text"
            className="w-full pl-8 pr-24 py-6 bg-white border-2 border-transparent rounded-[2.5rem] shadow-2xl shadow-teal-900/10 outline-none focus:border-teal-500/50 text-xl font-black placeholder:text-slate-300 transition-all"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-3 top-3 bottom-3 px-6 rounded-[2rem] flex items-center justify-center gap-2 transition-all ${input.trim() && !isTyping
              ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/30 active:scale-95'
              : 'bg-slate-100 text-slate-300'
              }`}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
