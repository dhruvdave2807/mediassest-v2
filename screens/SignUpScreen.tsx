
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, ChevronRight, Activity } from 'lucide-react';
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
        <div className="h-full bg-white flex flex-col p-8 pt-16 overflow-y-auto">
            <div className="mb-10">
                <div className="bg-teal-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200">
                    <Activity className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
                <p className="text-slate-500 text-sm">Join MediAssest to manage your medical vault with AI.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 ml-1">Age</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="number"
                            required
                            min="1"
                            max="120"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            placeholder="e.g. 25"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Gender</label>
                        <select
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Blood Type</label>
                        <select
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full mt-4 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 hover:bg-teal-700 transition-all active:scale-95"
                >
                    Complete Registration <ChevronRight size={20} />
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <span
                    className="text-teal-600 font-bold cursor-pointer hover:underline"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </span>
            </div>

            <p className="mt-auto pt-6 text-[10px] text-slate-400 text-center leading-relaxed">
                By signing up, you agree to our Terms and recognize that MediAssest uses AI for information purposes only.
            </p>
        </div>
    );
};
