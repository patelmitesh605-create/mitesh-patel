import React, { useState } from 'react';
import { Student, InstitutionConfig, CardDesign } from '../types/student';
import { StudentCardFront } from './StudentCardFront';
import { StudentCardBack } from './StudentCardBack';
import { Printer, X, FileText, Check, Scissors } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  currentStudent: Student;
  institution: InstitutionConfig;
  design: CardDesign;
}

export const PrintSheetModal: React.FC<Props> = ({
  isOpen,
  onClose,
  students,
  currentStudent,
  institution,
  design
}) => {
  const [printMode, setPrintMode] = useState<'current' | 'all'>('current');
  const [showCutGuides, setShowCutGuides] = useState(true);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const targetStudents = printMode === 'all' ? students : [currentStudent];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-semibold text-slate-100 text-sm">Print ID Badges & Cut Sheet</h3>
              <p className="text-[11px] text-slate-400">
                Standard CR-80 card dimensions (85.6mm × 54mm) with crop marks
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

        {/* Print Settings Toolbar */}
        <div className="p-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Batch:</span>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setPrintMode('current')}
                className={`px-3 py-1 rounded-md transition-colors ${printMode === 'current' ? 'bg-indigo-600 text-white font-medium shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                Current Student ({currentStudent.name.split(' ')[0]})
              </button>
              <button
                type="button"
                onClick={() => setPrintMode('all')}
                className={`px-3 py-1 rounded-md transition-colors ${printMode === 'all' ? 'bg-indigo-600 text-white font-medium shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                All Students ({students.length})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={showCutGuides}
                onChange={(e) => setShowCutGuides(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-slate-400" />
                Cutting Marks & Fold Guides
              </span>
            </label>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Now (Ctrl+P)</span>
            </button>
          </div>
        </div>

        {/* Printable Viewport / Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900/50 flex flex-col items-center">
          <div className="w-full max-w-[850px] bg-white rounded-xl shadow-xl p-8 text-black print-sheet-container">
            {/* Sheet header */}
            <div className="mb-6 pb-4 border-b border-neutral-300 flex justify-between items-center text-xs text-neutral-600">
              <div>
                <span className="font-bold text-neutral-900 uppercase tracking-wider">{institution.name}</span>
                <span className="block text-[10px] text-neutral-500">Official Student Identity Badges · Print Resolution Standard</span>
              </div>
              <div className="text-right text-[10px] text-neutral-400 font-mono">
                {targetStudents.length} {targetStudents.length === 1 ? 'Card Set' : 'Card Sets'} · {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="space-y-12">
              {targetStudents.map((st) => (
                <div key={st.id} className="relative pb-8 border-b border-dashed border-neutral-300 last:border-b-0">
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    {/* Front */}
                    <div className="relative">
                      {showCutGuides && (
                        <div className="absolute -top-3.5 -left-3 text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                          <Scissors className="w-2.5 h-2.5" />
                          <span>FRONT</span>
                        </div>
                      )}
                      <div className={`p-1 bg-white ${showCutGuides ? 'border-2 border-dashed border-neutral-300' : ''}`}>
                        <StudentCardFront
                          student={st}
                          institution={institution}
                          design={design}
                          scale={0.95}
                          id={`print-front-${st.id}`}
                        />
                      </div>
                    </div>

                    {/* Back */}
                    <div className="relative">
                      {showCutGuides && (
                        <div className="absolute -top-3.5 -left-3 text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                          <Scissors className="w-2.5 h-2.5" />
                          <span>BACK</span>
                        </div>
                      )}
                      <div className={`p-1 bg-white ${showCutGuides ? 'border-2 border-dashed border-neutral-300' : ''}`}>
                        <StudentCardBack
                          student={st}
                          institution={institution}
                          design={design}
                          scale={0.95}
                          id={`print-back-${st.id}`}
                        />
                      </div>
                    </div>
                  </div>

                  {showCutGuides && (
                    <div className="text-center text-[10px] text-neutral-400 font-mono mt-4">
                      ✂ Cut along dashed lines · Standard CR80 badge laminate slot fits standard lanyard clip
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 no-print">
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4 text-slate-500" />
            Tip: In print preview, set "Margins: None" and check "Background Graphics" for optimal color.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
