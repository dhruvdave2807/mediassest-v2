
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Camera, X, CheckCircle, Loader2 } from 'lucide-react';

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
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onUpload(selectedFile);
        setTimeout(() => {
           navigate('/analysis');
        }, 1000);
      }
    }, 200);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-slate-600">
          <X size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Upload Report</h1>
      </div>

      {!isUploading ? (
        <div className="flex-1 space-y-6">
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6">
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Select a Document</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-[240px]">
              You can upload PDFs or high-quality images of your reports.
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
              className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 cursor-pointer active:scale-95 transition-transform"
            >
              Browse Files
            </label>
            
            <button className="mt-4 flex items-center gap-2 text-teal-600 font-semibold py-2">
              <Camera size={18} />
              <span>Use Camera</span>
            </button>
          </div>

          {selectedFile && (
            <div className="bg-white p-4 rounded-2xl border border-teal-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">{selectedFile.name}</p>
                <p className="text-xs text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-slate-300 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
          )}

          <div className="mt-auto pt-10">
            <button
              disabled={!selectedFile}
              onClick={handleUpload}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
                selectedFile ? 'bg-teal-600 shadow-teal-600/20 active:scale-95' : 'bg-slate-300 shadow-none cursor-not-allowed'
              }`}
            >
              Analyze Report
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="#0D9488"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - uploadProgress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
               <Loader2 className="animate-spin text-teal-600 mb-1" size={32} />
               <span className="text-lg font-bold text-slate-800">{uploadProgress}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Analyzing with AI...</h3>
            <p className="text-sm text-slate-500">
              {uploadProgress < 50 ? 'Uploading your medical data safely' : 'Identifying key metrics and health risks'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
