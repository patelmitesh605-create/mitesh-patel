import React, { useState } from 'react';
import { Student, InstitutionConfig, CardDesign } from '../types/student';
import { exportStudentsToCSV } from '../utils/studentGenerator';
import { 
  X, 
  Search, 
  Download, 
  Printer, 
  Plus, 
  Filter, 
  Smartphone, 
  Eye, 
  Trash2, 
  GraduationCap, 
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  currentStudentId: string;
  onSelectStudent: (id: string) => void;
  onOpenGenerator: () => void;
  onOpenPrint: () => void;
  onOpenDigitalPass: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

export const CardsGalleryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  students,
  currentStudentId,
  onSelectStudent,
  onOpenGenerator,
  onOpenPrint,
  onOpenDigitalPass,
  onDeleteStudent
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedBlood, setSelectedBlood] = useState<string>('ALL');

  if (!isOpen) return null;

  // Extract unique departments and blood groups
  const departments = Array.from(new Set(students.map(s => s.department)));
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredStudents = students.filter(s => {
    const query = search.toLowerCase();
    const matchesSearch = 
      s.name.toLowerCase().includes(query) ||
      s.studentId.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query) ||
      (s.hostelRoom && s.hostelRoom.toLowerCase().includes(query));

    const matchesDept = selectedDept === 'ALL' || s.department === selectedDept;
    const matchesBlood = selectedBlood === 'ALL' || s.bloodGroup === selectedBlood;

    return matchesSearch && matchesDept && matchesBlood;
  });

  const handleExportCSV = () => {
    exportStudentsToCSV(students, `scholarid_roster_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-100 text-base">
                Generated Student I-Cards Roster ({students.length})
              </h2>
              <p className="text-xs text-slate-400">
                Browse, search, edit in 3D, and bulk export all active institutional cards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPrint();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Print All</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenGenerator();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate More</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, roll ID, course, hostel..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 max-w-[200px]"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Blood Filter */}
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">Blood: All</option>
              {bloodGroups.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/40">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-slate-200 font-semibold text-sm">No Student Cards Match Query</h3>
              <p className="text-xs text-slate-400 mt-1">Try clearing filters or generate new student cards</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((st) => {
                const isSelected = st.id === currentStudentId;
                return (
                  <div
                    key={st.id}
                    className={`rounded-xl border p-3.5 flex flex-col justify-between transition-all bg-slate-900/90 hover:border-slate-600 ${
                      isSelected
                        ? 'border-indigo-500 ring-1 ring-indigo-500/50 bg-indigo-950/20'
                        : 'border-slate-800'
                    }`}
                  >
                    <div>
                      {/* Top Student Header */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                          <img
                            src={st.photoUrl}
                            alt={st.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[10px] text-indigo-400 font-semibold truncate">
                              {st.studentId}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-800/40 text-[9px] font-bold shrink-0">
                              {st.bloodGroup}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-100 text-sm truncate leading-tight mt-0.5">
                            {st.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {st.course}
                          </p>
                        </div>
                      </div>

                      {/* Info Pills */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                        <span className="bg-slate-850 px-2 py-0.5 rounded border border-slate-800">
                          {st.academicYear}
                        </span>
                        <span className="bg-slate-850 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[150px]">
                          {st.department}
                        </span>
                        {st.hostelRoom && (
                          <span className="bg-slate-850 px-2 py-0.5 rounded border border-slate-800 text-emerald-400">
                            {st.hostelRoom}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectStudent(st.id);
                          onClose();
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>{isSelected ? 'Active on Stage' : 'Load in 3D'}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenDigitalPass(st)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-indigo-300 hover:bg-slate-850 transition-colors"
                          title="View Digital Mobile Wallet Pass"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>

                        {students.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onDeleteStudent(st.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-850 transition-colors"
                            title="Delete Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{filteredStudents.length}</strong> of{' '}
            <strong className="text-slate-200">{students.length}</strong> total generated I-cards
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
