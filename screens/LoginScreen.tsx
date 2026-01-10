
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronRight, Fingerprint } from 'lucide-react';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="h-full bg-white flex flex-col p-8 pt-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-500">Sign in to access your medical records securely.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 hover:bg-teal-700 transition-all active:scale-95"
        >
          Login <ChevronRight size={20} />
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors">
          <Fingerprint size={24} />
          <span className="text-sm font-medium">Use Biometric Login</span>
        </button>
        <p className="text-slate-500 text-sm">
          Don't have an account? <span className="text-teal-600 font-bold cursor-pointer">Sign up</span>
        </p>
      </div>

      <div className="mt-auto pb-6 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
          By continuing, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>. Your health data is encrypted and secure.
        </p>
      </div>
    </div>
  );
};
