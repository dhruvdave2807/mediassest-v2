import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Activity,
  Apple,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  Heart,
  ScanLine,
  BrainCircuit,
  Lock,
  BarChart,
  Users,
  Clock,
  ChevronRight,
  Shield,
  Zap,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight
} from 'lucide-react';


export const LandingScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 800
    });
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-body">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-sky-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-800">Medi<span className="text-sky-500">Assest</span></span>
            </div>
            <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-sky-500 transition-colors">Features</a>
              <a href="#analytics" className="hover:text-sky-500 transition-colors">Analytics</a>
              <a href="#security" className="hover:text-sky-500 transition-colors">Security</a>
              <button
                onClick={handleGetStarted}
                className="bg-sky-500 text-white px-7 py-3 rounded-xl hover:bg-sky-600 transition shadow-lg shadow-sky-200 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden hero-gradient">
        {/* Floating shapes for background */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-sky-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-flex items-center gap-2 bg-sky-100/50 border border-sky-200 px-4 py-2 rounded-full text-sky-700 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                AI Health Revolution
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-8">
                Your Health Data, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Finally Clear.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl mb-10">
                The smart medical companion that turns complex lab reports into plain English and identifies early health risks using advanced clinical AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="#get-started"
                  className="flex items-center justify-center gap-3 bg-sky-500 text-white px-10 py-5 rounded-2xl hover:bg-sky-600 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-xl font-black animate-button-pulse">
                  <span className="text-lg">Get Started Now</span>
                  <ArrowRight className="w-5 h-5 animate-arrow-slide" />
                </a>
                <button
                  onClick={() => { alert('Demo video will open here.'); }}
                  className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl hover:border-sky-300 hover:bg-sky-50 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-md group">
                  <PlayCircle className="w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Animated AI Interface */}
            <div className="relative" data-aos="zoom-in-up" data-aos-duration="1200">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 border border-white/50 relative z-10 animate-float">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200">
                      <Sparkles className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">MediBot AI</h4>
                      <p className="text-xs text-sky-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-sky-500 rounded-full ai-status-pulse"></span> Analyzing Data
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-100/50 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[85%] border border-slate-100">
                    "I see your Vitamin D is at 18 ng/mL. This is clinically low (Deficient)."
                  </div>
                  <div className="bg-sky-500 p-4 rounded-2xl rounded-tr-none text-sm text-white max-w-[70%] ml-auto shadow-md">
                    "What should I do?"
                  </div>
                  <div className="bg-sky-50 p-5 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[95%] border border-sky-100 space-y-3">
                    <p className="font-semibold text-sky-800">Recommendation Engine:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-500" /> 2,000 IU Supplement daily</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-500" /> 15 min Sun exposure</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Floating Data Cards */}
              <div className="absolute -top-10 -right-10 bg-white p-5 rounded-2xl shadow-xl border border-sky-50 z-20 animate-float" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center gap-4">
                  <div className="bg-rose-100 p-2 rounded-xl">
                    <Heart className="text-rose-500 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Resting BPM</p>
                    <p className="text-xl font-black text-slate-800">72</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Features Section */}
      < section id="features" className="py-32 bg-white relative" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
            <h2 className="text-sky-500 font-black tracking-widest uppercase text-xs mb-4">Features</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 italic">Engineering a Healthier You.</h3>
            <p className="text-slate-500 text-lg">We combine decentralized storage with proprietary health LLMs to give you total control over your medical destiny.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="feature-card p-10 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                <ScanLine className="text-sky-600 w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Smart Scanning</h4>
              <p className="text-slate-600 leading-relaxed">Just snap a photo of your paper report. Our OCR engine extracts data with 99.8% clinical accuracy.</p>
            </div>
            {/* Card 2 */}
            <div className="feature-card p-10 rounded-[2rem] bg-sky-500 border border-sky-400 text-white transition-all duration-500 shadow-2xl shadow-sky-200" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                <BrainCircuit className="text-white w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">Risk Prediction</h4>
              <p className="text-sky-100 leading-relaxed font-medium">Predicting chronic onset up to 2 years earlier by analyzing biometric trends and historical reports.</p>
            </div>
            {/* Card 3 */}
            <div className="feature-card p-10 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-500" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <Lock className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Encrypted Assets</h4>
              <p className="text-slate-600 leading-relaxed">Your data is yours. End-to-end encryption ensures that even we can't see your personal medical files.</p>
            </div>
          </div>
        </div>
      </section >

      {/* Analytics Showcase */}
      < section id="analytics" className="py-24 bg-slate-900 overflow-hidden relative" >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-right">
              <h3 className="text-sky-400 font-bold mb-4">DASHBOARD PREVIEW</h3>
              <h4 className="text-4xl font-extrabold text-white mb-8 leading-tight">Monitor Your Vital Assets <br /> In Real-Time.</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-sky-500/20 p-3 rounded-xl border border-sky-500/30">
                    <BarChart className="text-sky-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Visual Health Trends</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Watch your cholesterol, sugar, and hormone levels move over time with beautiful, clear charts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
                    <Users className="text-indigo-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Family Health Circles</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Manage assets for your parents and children from a single switchable account profile.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="bg-slate-800 p-2 rounded-[2rem] border border-slate-700 shadow-3xl">
                <div className="bg-slate-900 rounded-[1.8rem] overflow-hidden p-6 space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase mb-1">Health Score</p>
                      <h5 className="text-white text-3xl font-black italic">84/100</h5>
                    </div>
                    <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold">EXCELLENT</div>
                  </div>
                  <div className="h-32 flex items-end gap-2 px-1">
                    <div className="w-full bg-slate-800 rounded-t-lg h-1/2"></div>
                    <div className="w-full bg-slate-800 rounded-t-lg h-2/3"></div>
                    <div className="w-full bg-sky-500 rounded-t-lg h-full shadow-lg shadow-sky-500/50"></div>
                    <div className="w-full bg-slate-800 rounded-t-lg h-3/4"></div>
                    <div className="w-full bg-slate-800 rounded-t-lg h-1/2"></div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="text-sky-400 w-4 h-4" />
                      <span className="text-xs text-slate-300">Next checkup in 12 days</span>
                    </div>
                    <ChevronRight className="text-slate-500 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="py-32 relative overflow-hidden" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="zoom-in">
          <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Sparkle background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 relative z-10 italic">Your New Medical <br /> Life Awaits.</h2>
            <p className="text-sky-100 text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed opacity-90">
              Stop fearing your medical records. Start using them to live longer, better, and smarter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <button
                onClick={handleGetStarted}
                className="bg-white text-sky-600 px-12 py-5 rounded-[1.5rem] font-black text-lg hover:bg-sky-50 transition shadow-xl transform hover:scale-105 active:scale-95"
              >
                GET STARTED NOW
              </button>
              <button className="bg-sky-500/20 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-[1.5rem] font-black text-lg hover:bg-white/10 transition transform hover:scale-105 active:scale-95">
                CONTACT SALES
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 relative z-10">
              <div className="flex items-center gap-2 text-white/70 text-sm font-bold">
                <Shield className="w-4 h-4" /> Encrypted
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm font-bold">
                <Zap className="w-4 h-4" /> Instant
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-white py-20 border-t border-slate-100" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-sky-500 p-1.5 rounded-lg">
                  <Activity className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-800 uppercase italic">Medi<span className="text-sky-500">Assest</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 font-medium">Empowering patients through intelligent asset management and proactive health insights.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6">Platform</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-sky-500 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-sky-500 transition">AI Technology</a></li>
                <li><a href="#" className="hover:text-sky-500 transition">For Doctors</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6">Company</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-sky-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-sky-500 transition">Contact</a></li>
                <li><a href="#" className="hover:text-sky-500 transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 MediAssest Inc.</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Built with Heart & AI</p>
          </div>
        </div>
      </footer >
    </div >
  );
};
