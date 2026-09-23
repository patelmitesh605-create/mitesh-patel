import React, { useState, useEffect } from 'react';
import { Student, InstitutionConfig } from '../types/student';
import { 
  X, 
  Smartphone, 
  Wifi, 
  ShieldCheck, 
  QrCode, 
  Clock, 
  Building2, 
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  institution: InstitutionConfig;
}

export const DigitalPassModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  institution
}) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Top */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-100 text-xs">Digital Student Mobile Pass</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Smartphone Screen Mockup */}
        <div className="p-6 bg-slate-950 flex flex-col items-center">
          {/* Apple / Google Wallet Style Pass Card */}
          <div className="w-full max-w-[340px] rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-black p-5 border border-indigo-500/40 shadow-2xl text-white relative overflow-hidden">
            {/* Ambient NFC waves banner */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs shadow-xs">
                  {institution.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-xs tracking-tight block uppercase truncate max-w-[170px]">
                    {institution.name}
                  </span>
                  <span className="text-[9px] text-indigo-300">STUDENT CAMPUS PASS</span>
                </div>
              </div>

              {/* Live NFC Animation */}
              <div className="flex items-center gap-1 text-indigo-400 text-[10px] font-mono animate-pulse">
                <Wifi className="w-3.5 h-3.5 rotate-90" />
                <span>NFC TAP</span>
              </div>
            </div>

            {/* Student Hero Row */}
            <div className="py-4 flex items-center gap-3">
              <div className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-indigo-400 shadow-md shrink-0">
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-semibold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE ENROLLMENT</span>
                </div>
                <h3 className="font-bold text-sm tracking-tight text-white truncate">
                  {student.name}
                </h3>
                <span className="font-mono text-xs text-indigo-300 block">{student.studentId}</span>
                <span className="text-[10px] text-slate-300 block truncate">{student.course}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/10 text-[10px]">
              <div>
                <span className="text-slate-400 block text-[9px]">BLOOD</span>
                <span className="font-bold text-red-400 text-xs">{student.bloodGroup}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">BATCH</span>
                <span className="font-semibold text-slate-200">{student.academicYear.split(' - ')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">VALID THRU</span>
                <span className="font-semibold text-emerald-400">{student.expiryDate.substring(0, 7)}</span>
              </div>
            </div>

            {/* Barcode & Security QR */}
            <div className="pt-4 flex flex-col items-center justify-center text-center">
              {/* Dynamic QR barcode simulated */}
              <div className="bg-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
                <div className="w-24 h-24 bg-white flex items-center justify-center">
                  <QrCode className="w-22 h-22 text-black" />
                </div>
              </div>

              <span className="font-mono text-[10px] text-slate-400 mt-2 tracking-widest">
                {student.libraryCode}
              </span>

              {/* Dynamic live clock stamp */}
              <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-[10px] text-slate-300 font-mono">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Live Auth Token · {time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Pass'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
