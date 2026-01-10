
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, ChevronRight, Activity, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface SignUpScreenProps {
    onSignUp: (user: UserProfile) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        bloodType: 'O+',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: UserProfile = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            bloodType: formData.bloodType,
            allergies: [],
            chronicConditions: [],
        };
        onSignUp(newUser);
        navigate('/home');
    };

    return (
        <div className="h-full bg-white flex flex-col hero-gradient px-8 min-h-screen overflow-y-auto">
            <div className="pt-12 mb-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
                    <Activity size={32} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Create Profile</h2>
                <p className="text-lg text-slate-500 font-medium">Let's personalize your healthcare journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                            <User size={24} />
                        </div>
                        <input
                            type="text"
                            required
                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 focus:bg-white outline-none transition-all shadow-sm text-lg font-bold"
                            placeholder="e.g. Robert Wilson"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                            <Calendar size={24} />
                        </div>
                        <input
                            type="number"
                            required
                            min="1"
                            max="120"
                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 focus:bg-white outline-none transition-all shadow-sm text-lg font-bold"
                            placeholder="How old are you?"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                        <select
                            className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 outline-none transition-all shadow-sm text-lg font-bold appearance-none cursor-pointer"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Blood Type</label>
                        <select
                            className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-3xl focus:border-teal-500/50 outline-none transition-all shadow-sm text-lg font-bold appearance-none cursor-pointer"
                            value={formData.bloodType}
                            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                        >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] mt-4"
                >
                    Start Analysis <ChevronRight size={28} />
                </button>

                <div className="text-center">
                    <p className="text-slate-500 text-lg font-medium">
                        Already have access? <span className="text-teal-600 font-black cursor-pointer hover:underline underline-offset-4" onClick={() => navigate('/login')}>Sign In</span>
                    </p>
                </div>
            </form>

            <div className="mt-auto pb-10 text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-teal-600/40">
                    <Heart size={16} fill="currentColor" />
                    <Sparkles size={16} />
                    <Heart size={16} fill="currentColor" />
                </div>
                <p className="text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-widest px-4 opacity-60">
                    Your health records are strictly confidential and analyzed using secure AI protocols.
                </p>
            </div>
        </div>
    );
};
