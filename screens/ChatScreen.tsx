
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertCircle, Loader2 } from 'lucide-react';
import { chatWithAI } from '../geminiService';
import { UserProfile } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatScreen: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hello ${user.name}! I'm your health assistant. How can I help you feel better today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      const response = await chatWithAI(
        userMsg, 
        messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        user
      );
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that. Can you try again?" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to service. Please check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4 z-10 sticky top-0">
        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Health Assistant</h1>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">Always here to help</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {m.role === 'model' && (
              <div className="w-8 h-8 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0 border border-teal-100">
                <Bot size={16} />
              </div>
            )}
            <div 
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
                m.role === 'user' 
                ? 'bg-teal-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center shrink-0 border border-sky-100 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="user" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0 border border-teal-100">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none">
              <Loader2 className="animate-spin text-teal-400" size={18} />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Warning Box */}
      <div className="mx-4 p-3 bg-slate-100 border border-slate-200 rounded-xl flex gap-2 items-start">
        <AlertCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-500 leading-tight">
          MediAssest is an AI. It can provide helpful info but is not a medical professional. Seek doctor advice for specific health issues.
        </p>
      </div>

      {/* Input */}
      <div className="p-4 pt-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-1 flex items-center focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
          <input
            type="text"
            className="flex-1 px-4 py-3 outline-none text-sm bg-transparent"
            placeholder="Type your health concern..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-xl transition-all ${
              input.trim() && !isTyping ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
