
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronRight, Fingerprint, ShieldCheck, ArrowLeft } from 'lucide-react';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="h-full bg-white flex flex-col hero-gradient px-8 min-h-screen">
      <div className="pt-16 mb-12">
        <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
          <ShieldCheck size={36} className="text-white" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight leading-tight">Secure <br />Login</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">Your medical records are protected and private.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-8 relative z-10">
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Mail size={24} />
            </div>
            <input
              type="email"
              required
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 focus:bg-white outline-none transition-all shadow-sm text-lg font-bold"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Lock size={24} />
            </div>
            <input
              type="password"
              required
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 focus:bg-white outline-none transition-all shadow-sm text-lg font-bold"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98]"
        >
          Sign In <ChevronRight size={28} />
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center gap-6">
        <button className="flex items-center gap-3 text-teal-600 hover:opacity-80 transition-opacity bg-teal-50 px-6 py-3 rounded-2xl border border-teal-100">
          <Fingerprint size={28} />
          <span className="text-lg font-black italic">Use FaceID Access</span>
        </button>
        <p className="text-slate-500 text-lg font-medium">
          New here? <span className="text-teal-600 font-black cursor-pointer hover:underline underline-offset-4" onClick={() => navigate('/signup')}>Create Profile</span>
        </p>
      </div>

      <div className="mt-auto pb-10 text-center">
        <p className="text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-widest opacity-60">
          Privacy Priority Interface <br /> Built with 256-bit AES Encryption
        </p>
      </div>

      {/* Background decoration */}
      <div className="fixed bottom-0 right-0 p-10 opacity-5 pointer-events-none">
        <ShieldCheck size={260} />
      </div>
    </div>
  );
};
