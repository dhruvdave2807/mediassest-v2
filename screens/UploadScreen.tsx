
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Camera, X, CheckCircle, Loader2, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';

interface UploadScreenProps {
  onUpload: (file: File) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onUpload(selectedFile);
        setTimeout(() => {
          navigate('/analysis');
        }, 800);
      }
    }, 150);
  };

  return (
    <div className="p-6 h-full flex flex-col hero-gradient min-h-screen">
      <div className="flex items-center gap-4 mb-10 pt-4">
        <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl shadow-sm text-slate-800 flex items-center justify-center border border-slate-100 active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Add Report</h1>
      </div>

      {!isUploading ? (
        <div className="flex-1 flex flex-col space-y-8">
          <div className="bg-white/80 backdrop-blur-xl border-4 border-dashed border-teal-100 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-xl shadow-teal-900/5 relative overflow-hidden group hover:border-teal-300 transition-all">
            <div className="w-24 h-24 medical-gradient text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/40 group-hover:scale-110 transition-transform">
              <Upload size={48} />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3">Choose Your Document</h3>
            <p className="text-lg text-slate-600 font-medium mb-10 max-w-[280px] leading-relaxed">
              Upload a clear photo or PDF of your medical report.
            </p>

            <input
              type="file"
              id="fileInput"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="fileInput"
              className="w-full py-5 bg-teal-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-teal-600/30 cursor-pointer active:scale-95 transition-all text-center mb-6 hover:bg-teal-700"
            >
              Select File
            </label>

            <button className="flex items-center gap-3 text-teal-600 font-black text-lg py-2 hover:opacity-80 transition-opacity">
              <Camera size={24} />
              <span>Use Camera</span>
            </button>

            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={40} className="text-teal-600" />
            </div>
          </div>

          {selectedFile && (
            <div className="bg-white p-6 rounded-3xl border border-teal-200 flex items-center gap-5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-900 truncate text-lg">{selectedFile.name}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => setSelectedFile(null)} className="w-10 h-10 bg-slate-50 text-slate-300 hover:text-rose-500 rounded-full flex items-center justify-center transition-colors">
                <X size={24} />
              </button>
            </div>
          )}

          <div className="mt-auto space-y-6 pt-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-teal-50 rounded-2xl border border-teal-100">
              <ShieldCheck size={20} className="text-teal-500" />
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">SECURE END-TO-END ENCRYPTION</p>
            </div>

            <button
              disabled={!selectedFile}
              onClick={handleUpload}
              className={`w-full py-6 rounded-3xl font-black text-2xl transition-all shadow-2xl relative overflow-hidden ${selectedFile
                  ? 'bg-slate-900 text-white shadow-slate-900/30 active:scale-95'
                  : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                }`}
            >
              Start AI Analysis
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-10">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 scale-110">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#0D9488"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - uploadProgress / 100)}`}
                className="transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <Sparkles className="animate-pulse text-teal-600 mb-2" size={48} />
              <span className="text-3xl font-black text-slate-900">{uploadProgress}%</span>
            </div>
          </div>
          <div className="space-y-4 max-w-sm">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">AI is Thinking...</h3>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              {uploadProgress < 40 ? 'Securing your medical data' :
                uploadProgress < 80 ? 'Reading values and metrics' :
                  'Generating clinical insights'}
            </p>

            <div className="flex justify-center gap-1.5 pt-2">
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-600/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-teal-600/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
