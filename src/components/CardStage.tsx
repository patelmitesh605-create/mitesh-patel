import React, { useState, useRef } from 'react';
import { Student, InstitutionConfig, CardDesign } from '../types/student';
import { StudentCardFront } from './StudentCardFront';
import { StudentCardBack } from './StudentCardBack';
import { 
  RotateCw, 
  Columns, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Camera,
  Smartphone
} from 'lucide-react';
import html2canvas from 'html2canvas';

interface Props {
  student: Student;
  institution: InstitutionConfig;
  design: CardDesign;
  onOpenPrint: () => void;
  onOpenVerify: () => void;
  onOpenDigitalPass?: () => void;
}

export const CardStage: React.FC<Props> = ({
  student,
  institution,
  design,
  onOpenPrint,
  onOpenVerify,
  onOpenDigitalPass
}) => {
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'side-by-side'>('flip');
  const [showLanyard, setShowLanyard] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (target: 'front' | 'back' | 'both') => {
    setIsExporting(true);
    setExportMessage(`Rendering high-res ${target}...`);

    try {
      const downloadElement = async (elId: string, filename: string) => {
        const el = document.getElementById(elId);
        if (!el) return;
        const canvas = await html2canvas(el, {
          scale: 3, // 300+ DPI sharp export
          useCORS: true,
          backgroundColor: null,
          logging: false
        });
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };

      const safeId = student.studentId.replace(/[^a-zA-Z0-9_-]/g, '_');

      if (target === 'front' || target === 'both') {
        await downloadElement('student-card-front-view', `${safeId}_front.png`);
      }
      if (target === 'back' || target === 'both') {
        await downloadElement('student-card-back-view', `${safeId}_back.png`);
      }

      setExportMessage('Downloaded successfully!');
      setTimeout(() => setExportMessage(null), 2500);
    } catch (err) {
      console.error(err);
      setExportMessage('Export failed. Please try again.');
      setTimeout(() => setExportMessage(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
      {/* Top Viewport Toolbar */}
      <div className="p-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-900/60">
        {/* Left: View Mode Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode('flip')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'flip' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>3D Interactive Flip</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'side-by-side' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>

          {/* Lanyard switch */}
          <button
            type="button"
            onClick={() => setShowLanyard(!showLanyard)}
            className={`ml-2 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors border ${
              showLanyard 
                ? 'bg-slate-800 text-indigo-300 border-indigo-500/40' 
                : 'text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle presentation lanyard strap"
          >
            <Layers className="w-3 h-3" />
            <span>Lanyard</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-850 px-1 py-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setZoom((prev) => Math.max(0.75, prev - 0.1))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-400 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((prev) => Math.min(1.3, prev + 0.1))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Digital Mobile Pass */}
          {onOpenDigitalPass && (
            <button
              type="button"
              onClick={onOpenDigitalPass}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 rounded-lg transition-colors"
              title="View Digital Mobile Wallet Pass"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Mobile Pass</span>
            </button>
          )}

          {/* Verify button */}
          <button
            type="button"
            onClick={onOpenVerify}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Verify Credential</span>
          </button>

          {/* Print button */}
          <button
            type="button"
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print</span>
          </button>

          {/* Export Dropdown / Button */}
          <div className="relative group">
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleDownload('both')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Saving...' : 'Download PNG'}</span>
            </button>
          </div>
        </div>
      </div>

      {exportMessage && (
        <div className="bg-indigo-950/80 border-b border-indigo-800/60 px-4 py-1.5 text-xs text-indigo-200 text-center font-medium animate-pulse">
          {exportMessage}
        </div>
      )}

      {/* Main 3D Card Stage Viewport */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-auto relative min-h-[560px]">
        {/* Ambient Stage Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {viewMode === 'flip' ? (
          <div className="flex flex-col items-center">
            {/* Lanyard Strap visualization */}
            {showLanyard && design.showLanyardSlot && (
              <div className="flex flex-col items-center -mb-3 z-20 pointer-events-none">
                {/* Woven Strap Hanging */}
                <div className="w-8 h-14 lanyard-strap rounded-t-sm shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-full bg-slate-950/40" />
                </div>
                {/* Metal Spring Swivel Hook */}
                <div className="w-5 h-6 rounded-xs bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-2 border-slate-700 bg-transparent" />
                </div>
                {/* Lobster claw through slot */}
                <div className="w-2.5 h-4 bg-slate-400 border border-slate-600 rounded-b-xs" />
              </div>
            )}

            {/* 3D Flip Container */}
            <div
              className="perspective-1000 cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              style={{
                transform: `scale(${zoom})`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div
                className={`relative preserve-3d transition-transform duration-700 ${
                  flipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  width: design.orientation === 'vertical' ? '320px' : '500px',
                  height: design.orientation === 'vertical' ? '500px' : '315px'
                }}
              >
                {/* Front Side */}
                <div
                  ref={frontRef}
                  className="absolute inset-0 backface-hidden"
                >
                  <StudentCardFront
                    student={student}
                    institution={institution}
                    design={design}
                    id="student-card-front-view"
                  />
                </div>

                {/* Back Side */}
                <div
                  ref={backRef}
                  className="absolute inset-0 backface-hidden rotate-y-180"
                >
                  <StudentCardBack
                    student={student}
                    institution={institution}
                    design={design}
                    id="student-card-back-view"
                  />
                </div>
              </div>
            </div>

            {/* Flip hint pill */}
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFlipped(!flipped)}
                className="px-3 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <RotateCw className={`w-3 h-3 ${flipped ? 'text-amber-400' : 'text-indigo-400'}`} />
                <span>Showing: <strong className="text-white">{flipped ? 'Back (Reverse)' : 'Front (Obverse)'}</strong> — Click card to flip</span>
              </button>
            </div>
          </div>
        ) : (
          /* Side by side mode */
          <div
            className="flex flex-wrap items-center justify-center gap-8"
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Front Side</span>
              <StudentCardFront
                student={student}
                institution={institution}
                design={design}
                id="student-card-front-view"
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Back Side</span>
              <StudentCardBack
                student={student}
                institution={institution}
                design={design}
                id="student-card-back-view"
              />
            </div>
          </div>
        )}
      </div>

      {/* Stage Bottom Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300">{student.name}</span>
          <span>·</span>
          <span className="font-mono text-slate-400">{student.studentId}</span>
          <span>·</span>
          <span className="capitalize">{design.orientation} CR-80 Standard</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload('front')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Download Front
          </button>
          <span>·</span>
          <button
            onClick={() => handleDownload('back')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Download Back
          </button>
        </div>
      </div>
    </div>
  );
};
