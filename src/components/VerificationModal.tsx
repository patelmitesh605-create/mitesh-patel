import React from 'react';
import { Student, InstitutionConfig } from '../types/student';
import { CheckCircle2, ShieldAlert, X, Building, Calendar, BookOpen, KeyRound, Bus, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  institution: InstitutionConfig;
}

export const VerificationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  institution
}) => {
  if (!isOpen) return null;

  const isExpired = new Date(student.expiryDate) < new Date();
  const verifyTime = new Date().toLocaleString();
  const checksum = `SHA256:${student.studentId.replace(/[^A-Z0-9]/gi, '')}-${Math.floor(Date.now() / 10000).toString(16).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Verification Status Header */}
        <div className={`p-4 border-b ${isExpired ? 'bg-red-950/40 border-red-900' : 'bg-emerald-950/40 border-emerald-900'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isExpired ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'} shadow-md`}>
              {isExpired ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-sm">
                  {isExpired ? 'EXPIRED CREDENTIAL' : 'STUDENT IDENTITY VERIFIED'}
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${isExpired ? 'bg-red-900/80 text-red-200' : 'bg-emerald-900/80 text-emerald-200'}`}>
                  {isExpired ? 'INACTIVE' : 'STATUS: ACTIVE'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Official Campus Verification Registry · {verifyTime}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verified Student Details */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4 bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-16 h-16 rounded-lg object-cover border border-slate-600 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-100 text-base truncate">{student.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                  {student.studentId}
                </span>
                <span className="text-xs text-slate-400 truncate">
                  {student.course}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-1">
                {institution.name}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Valid Until</span>
              <span className="font-mono font-bold text-xs text-slate-200 mt-0.5 block">{student.expiryDate}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Blood Group</span>
              <span className="font-bold text-xs text-red-400 mt-0.5 block">{student.bloodGroup || 'N/A'}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Library Barcode</span>
              <span className="font-mono font-bold text-xs text-indigo-300 mt-0.5 block">{student.libraryCode}</span>
            </div>
          </div>

          {/* Campus Facility Permissions Checklist */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Campus Clearances & Privileges
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-1.5 truncate">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Main Campus Turnstiles</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-1.5 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Library Borrowing</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-1.5 truncate">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lab & Computing Facility</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-1.5 truncate">
                  <Bus className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inter-Campus Transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic audit string */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[9.5px] font-mono text-slate-500 break-all">
            <span className="text-slate-400 block mb-0.5">Cryptographic Checksum:</span>
            {checksum}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Authorized by {institution.signatoryName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
