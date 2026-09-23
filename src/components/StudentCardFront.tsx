import React from 'react';
import { Student, InstitutionConfig, CardDesign } from '../types/student';
import { ShieldCheck, Heart, Radio, Sparkles } from 'lucide-react';

interface Props {
  student: Student;
  institution: InstitutionConfig;
  design: CardDesign;
  scale?: number;
  id?: string;
}

export const StudentCardFront: React.FC<Props> = ({
  student,
  institution,
  design,
  scale = 1,
  id = 'student-card-front'
}) => {
  const isVertical = design.orientation === 'vertical';

  // Smart chip SVG simulation
  const renderChip = () => (
    <div className="relative w-9 h-7 rounded-sm bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-500/80 shadow-xs overflow-hidden shrink-0">
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.4)_25%,rgba(0,0,0,0.4)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.4)_75%)] bg-[length:4px_4px]" />
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-800/40" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-amber-800/40" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-amber-800/40" />
      <div className="absolute inset-1 border border-amber-700/30 rounded-xs" />
    </div>
  );

  // Holographic security emblem
  const renderHologram = () => (
    <div className="relative w-8 h-8 rounded-full border border-white/40 overflow-hidden flex items-center justify-center shadow-inner group">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300 via-pink-400 to-yellow-200 opacity-70 animate-pulse" />
      <div className="absolute inset-0 holo-shimmer" />
      <div className="relative z-10 text-[7px] font-bold text-slate-900 text-center uppercase tracking-tighter leading-tight drop-shadow-xs">
        VALID<br />SECURE
      </div>
    </div>
  );

  if (isVertical) {
    return (
      <div
        id={id}
        className="relative bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden select-none border border-slate-200/80"
        style={{
          width: '320px',
          height: '500px',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center'
        }}
      >
        {/* Lanyard punch hole slot */}
        {design.showLanyardSlot && (
          <div className="absolute top-2 inset-x-0 flex justify-center z-30 pointer-events-none">
            <div className="w-12 h-2.5 rounded-full bg-slate-900/90 border border-white/40 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        {/* Card Header with Institution Identity */}
        <div
          className="relative pt-6 pb-4 px-4 text-center text-white overflow-hidden"
          style={{ backgroundColor: design.headerBg }}
        >
          {/* Subtle Guilloche overlay */}
          <div className="absolute inset-0 bg-guilloche opacity-20 pointer-events-none" />
          
          {/* Accent border bar */}
          <div
            className="absolute bottom-0 inset-x-0 h-1.5"
            style={{ backgroundColor: design.accentColor }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Institution Logo / Crest */}
            <div className="w-12 h-12 rounded-full p-0.5 bg-white shadow-md mb-1.5 overflow-hidden flex items-center justify-center">
              {institution.logoUrl ? (
                <img
                  src={institution.logoUrl}
                  alt={institution.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <ShieldCheck className="w-6 h-6 text-slate-800" />
              )}
            </div>

            <h1 className="font-serif-brand font-bold text-xs uppercase tracking-wider text-slate-100 line-clamp-1 max-w-[270px]">
              {institution.name}
            </h1>
            <p className="text-[9px] text-slate-300 font-medium tracking-tight mt-0.5 max-w-[260px] truncate">
              {institution.tagline}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative p-4 flex flex-col h-[382px] justify-between bg-gradient-to-b from-white via-slate-50 to-slate-100">
          {/* Watermark in background */}
          {design.showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-4">
              <span className="text-4xl font-serif-brand font-extrabold uppercase -rotate-45 tracking-widest text-slate-900">
                {institution.name.split(' ')[0] || 'ACADEMIA'}
              </span>
            </div>
          )}

          {/* Photo + Chip Row */}
          <div className="relative flex items-start justify-between gap-3 pt-1">
            <div className="flex flex-col gap-1 items-start">
              {design.showChip && renderChip()}
              <div className="flex items-center gap-1 text-[9px] text-slate-500 font-medium mt-1">
                <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                <span className="uppercase tracking-wider">RFID ACTIVE</span>
              </div>
            </div>

            {/* Student Photo */}
            <div className="relative group">
              <div
                className="w-26 h-32 rounded-lg overflow-hidden border-2 bg-slate-200 shadow-md flex items-center justify-center relative"
                style={{ borderColor: design.accentColor }}
              >
                {student.photoUrl ? (
                  <img
                    src={student.photoUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-xs text-slate-400 font-medium">NO PHOTO</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Blood group indicator attached */}
              {design.showBloodGroup && student.bloodGroup && (
                <div
                  className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white shadow-xs flex items-center gap-0.5"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  <Heart className="w-2 h-2 fill-current" />
                  <span>{student.bloodGroup}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              {design.showHologram && renderHologram()}
              <div className="text-right text-[9px] text-slate-500">
                <span className="block font-mono font-semibold text-slate-700">
                  {student.academicYear.split('-')[0]?.trim() || '2024'}
                </span>
                <span className="text-[8px] uppercase">BATCH</span>
              </div>
            </div>
          </div>

          {/* Student Identity Core Info */}
          <div className="mt-2 text-center">
            <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug line-clamp-1">
              {student.name}
            </h2>
            <div className="inline-flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-800">
                ID: {student.studentId}
              </span>
            </div>
          </div>

          {/* Academic Details Grid */}
          <div className="bg-white/80 backdrop-blur-xs rounded-lg p-2.5 border border-slate-200 text-[10px] space-y-1 shadow-2xs">
            <div className="flex justify-between items-baseline gap-1">
              <span className="text-slate-400 uppercase font-semibold text-[8px]">Course</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[190px]">
                {student.course}
              </span>
            </div>

            <div className="flex justify-between items-baseline gap-1">
              <span className="text-slate-400 uppercase font-semibold text-[8px]">Faculty</span>
              <span className="text-slate-700 text-right truncate max-w-[190px]">
                {student.department}
              </span>
            </div>

            <div className="flex justify-between items-baseline gap-1">
              <span className="text-slate-400 uppercase font-semibold text-[8px]">Term</span>
              <span className="font-mono text-slate-700 text-right">
                {student.semester}
              </span>
            </div>

            <div className="flex justify-between items-baseline gap-1 pt-0.5 border-t border-slate-100">
              <span className="text-slate-400 uppercase font-semibold text-[8px]">Valid Thru</span>
              <span className="font-mono font-semibold text-emerald-700 text-right">
                {student.expiryDate || '2028-06-30'}
              </span>
            </div>
          </div>

          {/* Signatures & Bottom Bar */}
          <div className="pt-1 pb-1 flex items-end justify-between px-1">
            <div className="text-center">
              <div className="w-20 h-6 flex items-center justify-center border-b border-slate-300">
                {student.signatureUrl ? (
                  <img src={student.signatureUrl} alt="Student Signature" className="max-h-5 object-contain" />
                ) : (
                  <span className="font-serif italic text-[11px] text-slate-500">
                    {student.name.split(' ')[0]}
                  </span>
                )}
              </div>
              <span className="text-[7.5px] uppercase text-slate-400 tracking-wider">
                Holder Signature
              </span>
            </div>

            <div className="text-center">
              <div className="w-20 h-6 flex items-center justify-center border-b border-slate-300">
                {institution.signatorySignatureUrl ? (
                  <img src={institution.signatorySignatureUrl} alt="Authorized Signatory" className="max-h-5 object-contain" />
                ) : (
                  <span className="font-serif italic text-[11px] text-indigo-700 font-semibold">
                    {institution.signatoryName.split(' ')[1] || 'Vance'}
                  </span>
                )}
              </div>
              <span className="text-[7.5px] uppercase text-slate-400 tracking-wider">
                Authorized Signatory
              </span>
            </div>
          </div>

          {/* Bottom Security Strip */}
          <div
            className="absolute bottom-0 inset-x-0 h-1.5"
            style={{ backgroundColor: design.primaryColor }}
          />
        </div>
      </div>
    );
  }

  // Horizontal Card (Landscape: 500px x 315px)
  return (
    <div
      id={id}
      className="relative bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden select-none border border-slate-200/80 flex flex-col justify-between"
      style={{
        width: '500px',
        height: '315px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center'
      }}
    >
      {/* Lanyard punch hole slot for landscape */}
      {design.showLanyardSlot && (
        <div className="absolute top-2 inset-x-0 flex justify-center z-30 pointer-events-none">
          <div className="w-12 h-2 rounded-full bg-slate-900/90 border border-white/40 shadow-inner flex items-center justify-center">
            <div className="w-8 h-0.5 rounded-full bg-slate-800" />
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div
        className="relative pt-4 pb-2.5 px-5 text-white flex items-center justify-between"
        style={{ backgroundColor: design.headerBg }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full p-0.5 bg-white shadow-md overflow-hidden flex items-center justify-center shrink-0">
            {institution.logoUrl ? (
              <img
                src={institution.logoUrl}
                alt={institution.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <ShieldCheck className="w-5 h-5 text-slate-800" />
            )}
          </div>
          <div>
            <h1 className="font-serif-brand font-bold text-xs uppercase tracking-wider text-slate-100 max-w-[320px] truncate">
              {institution.name}
            </h1>
            <p className="text-[8.5px] text-slate-300 font-medium tracking-tight">
              {institution.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {design.showHologram && renderHologram()}
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
            STUDENT
          </span>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-1"
          style={{ backgroundColor: design.accentColor }}
        />
      </div>

      {/* Horizontal Body */}
      <div className="relative p-4 flex gap-4 h-[245px] bg-gradient-to-br from-white via-slate-50 to-slate-100">
        {/* Left: Photo Column */}
        <div className="flex flex-col items-center justify-between shrink-0">
          <div
            className="w-24 h-28 rounded-lg overflow-hidden border-2 bg-slate-200 shadow-md relative"
            style={{ borderColor: design.accentColor }}
          >
            {student.photoUrl ? (
              <img
                src={student.photoUrl}
                alt={student.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-medium">
                PHOTO
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            {design.showChip && renderChip()}
            {design.showBloodGroup && student.bloodGroup && (
              <div className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-red-600 shadow-2xs flex items-center gap-0.5">
                <Heart className="w-2 h-2 fill-current" />
                <span>{student.bloodGroup}</span>
              </div>
            )}
          </div>
        </div>

        {/* Center/Right: Student info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {student.name}
              </h2>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-800">
                {student.studentId}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] bg-white/70 p-2 rounded border border-slate-200">
              <div>
                <span className="block text-[8px] uppercase text-slate-400 font-semibold">Course</span>
                <span className="font-medium text-slate-800 truncate block">{student.course}</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase text-slate-400 font-semibold">Department</span>
                <span className="text-slate-700 truncate block">{student.department}</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase text-slate-400 font-semibold">Academic Batch</span>
                <span className="font-mono text-slate-700">{student.academicYear}</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase text-slate-400 font-semibold">Validity</span>
                <span className="font-mono font-semibold text-emerald-700">{student.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Signatures & Status */}
          <div className="flex items-end justify-between pt-1 border-t border-slate-200">
            <div>
              <div className="w-24 h-5 flex items-center border-b border-slate-300">
                <span className="font-serif italic text-[11px] text-slate-600">
                  {student.name.split(' ')[0]}
                </span>
              </div>
              <span className="text-[7px] uppercase text-slate-400 tracking-wider">
                Student Signature
              </span>
            </div>

            <div className="text-right">
              <div className="w-24 h-5 flex items-center justify-end border-b border-slate-300">
                <span className="font-serif italic text-[11px] text-indigo-700 font-semibold">
                  {institution.signatoryName.split(' ')[1] || 'Vance'}
                </span>
              </div>
              <span className="text-[7px] uppercase text-slate-400 tracking-wider">
                Authorized Signatory
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: design.primaryColor }}
      />
    </div>
  );
};
