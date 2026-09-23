import React, { useState } from 'react';
import { Student, InstitutionConfig, CardDesign, CardThemeId } from '../types/student';
import { THEME_PRESETS, DEFAULT_PORTRAIT_MALE, DEFAULT_PORTRAIT_FEMALE, DEFAULT_PORTRAIT_ACADEMIC } from '../data/sampleStudents';
import { 
  User, 
  Building2, 
  Palette, 
  Camera, 
  Users, 
  PenTool, 
  Upload, 
  Sparkles, 
  Plus, 
  Copy, 
  Trash2, 
  RotateCcw,
  CheckCircle,
  FileDown
} from 'lucide-react';

interface Props {
  student: Student;
  institution: InstitutionConfig;
  design: CardDesign;
  students: Student[];
  onUpdateStudent: (updated: Partial<Student>) => void;
  onUpdateInstitution: (updated: Partial<InstitutionConfig>) => void;
  onUpdateDesign: (updated: Partial<CardDesign>) => void;
  onSelectStudent: (id: string) => void;
  onAddStudent: () => void;
  onDuplicateStudent: () => void;
  onDeleteStudent: (id: string) => void;
  onResetDefaults: () => void;
  onOpenWebcam: () => void;
  onOpenSignaturePad: (target: 'student' | 'signatory') => void;
  onOpenGenerator?: () => void;
  onOpenGallery?: () => void;
  onExportCSV?: () => void;
}

export const StudentForm: React.FC<Props> = ({
  student,
  institution,
  design,
  students,
  onUpdateStudent,
  onUpdateInstitution,
  onUpdateDesign,
  onSelectStudent,
  onAddStudent,
  onDuplicateStudent,
  onDeleteStudent,
  onResetDefaults,
  onOpenWebcam,
  onOpenSignaturePad,
  onOpenGenerator,
  onOpenGallery,
  onExportCSV
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'institution' | 'design' | 'photo' | 'directory'>('student');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'studentPhoto' | 'instLogo' | 'studentSig' | 'signatorySig') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (target === 'studentPhoto') onUpdateStudent({ photoUrl: result });
      if (target === 'instLogo') onUpdateInstitution({ logoUrl: result });
      if (target === 'studentSig') onUpdateStudent({ signatureUrl: result });
      if (target === 'signatorySig') onUpdateInstitution({ signatorySignatureUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const applyThemePreset = (themeId: CardThemeId) => {
    const preset = THEME_PRESETS[themeId];
    if (preset) {
      onUpdateDesign({
        ...preset.design,
        theme: themeId
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/70 p-1.5 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('student')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'student'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Student Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('photo')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'photo'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Photo & Sign</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'design'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Card Theme</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('institution')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'institution'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Institution</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'directory'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Directory ({students.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-slate-300">
        {/* TAB 1: Student Information */}
        {activeTab === 'student' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="font-semibold text-slate-100 text-sm">Student Particulars</h3>
                <p className="text-[11px] text-slate-400">Cardholder identity and academic credentials</p>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
                {student.studentId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => onUpdateStudent({ name: e.target.value })}
                  placeholder="e.g. Ethan M. Walker"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Student ID / Roll Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={student.studentId}
                  onChange={(e) => onUpdateStudent({ studentId: e.target.value })}
                  placeholder="e.g. STU-2024-8841"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Course / Program <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={student.course}
                  onChange={(e) => onUpdateStudent({ course: e.target.value })}
                  placeholder="e.g. B.S. Computer Science"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Department / School
                </label>
                <input
                  type="text"
                  value={student.department}
                  onChange={(e) => onUpdateStudent({ department: e.target.value })}
                  placeholder="e.g. Faculty of Engineering"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Academic Year / Batch
                </label>
                <input
                  type="text"
                  value={student.academicYear}
                  onChange={(e) => onUpdateStudent({ academicYear: e.target.value })}
                  placeholder="e.g. 2024 - 2028"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Semester / Term
                </label>
                <input
                  type="text"
                  value={student.semester}
                  onChange={(e) => onUpdateStudent({ semester: e.target.value })}
                  placeholder="e.g. Year 2 / Term IV"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Blood Group
                </label>
                <select
                  value={student.bloodGroup}
                  onChange={(e) => onUpdateStudent({ bloodGroup: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={student.dob}
                  onChange={(e) => onUpdateStudent({ dob: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Card Issue Date
                </label>
                <input
                  type="date"
                  value={student.issueDate}
                  onChange={(e) => onUpdateStudent({ issueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Card Valid Thru (Expiry)
                </label>
                <input
                  type="date"
                  value={student.expiryDate}
                  onChange={(e) => onUpdateStudent({ expiryDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-semibold text-emerald-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Library / Barcode Code
                </label>
                <input
                  type="text"
                  value={student.libraryCode}
                  onChange={(e) => onUpdateStudent({ libraryCode: e.target.value })}
                  placeholder="e.g. LIB-8841-B"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Hostel / Residence Room
                </label>
                <input
                  type="text"
                  value={student.hostelRoom || ''}
                  onChange={(e) => onUpdateStudent({ hostelRoom: e.target.value })}
                  placeholder="e.g. Block B · Room 412"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Emergency & Contact Details (Printed on Reverse)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="text"
                    value={student.emergencyContact}
                    onChange={(e) => onUpdateStudent({ emergencyContact: e.target.value })}
                    placeholder="e.g. +1 (555) 902-1144"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={student.email}
                    onChange={(e) => onUpdateStudent({ email: e.target.value })}
                    placeholder="e.g. ethan.walker@stjude.edu"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={student.address}
                    onChange={(e) => onUpdateStudent({ address: e.target.value })}
                    placeholder="e.g. 428 University Blvd, Cambridge, MA"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Photo & Signatures */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-semibold text-slate-100 text-sm">Student Photo & Authorizations</h3>
              <p className="text-[11px] text-slate-400">Capture with live webcam or upload crisp passport photo</p>
            </div>

            {/* Photo Box */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-24 h-28 rounded-lg overflow-hidden border-2 border-indigo-500/60 bg-slate-900 shadow-md shrink-0">
                {student.photoUrl ? (
                  <img
                    src={student.photoUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                    No photo
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Student Portrait Photo</span>
                <p className="text-[11px] text-slate-400">
                  Recommended: Sharp front-facing passport photograph with neutral background.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onOpenWebcam}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Webcam Snap</span>
                  </button>

                  <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors border border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'studentPhoto')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Portrait Avatars Selector */}
            <div>
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Sample High-Resolution Academic Portraits
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => onUpdateStudent({ photoUrl: DEFAULT_PORTRAIT_MALE })}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    student.photoUrl === DEFAULT_PORTRAIT_MALE
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <img src={DEFAULT_PORTRAIT_MALE} alt="Male portrait" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-[10px] text-slate-300 font-medium">Undergrad Male</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateStudent({ photoUrl: DEFAULT_PORTRAIT_FEMALE })}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    student.photoUrl === DEFAULT_PORTRAIT_FEMALE
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <img src={DEFAULT_PORTRAIT_FEMALE} alt="Female portrait" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-[10px] text-slate-300 font-medium">Graduate Female</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateStudent({ photoUrl: DEFAULT_PORTRAIT_ACADEMIC })}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    student.photoUrl === DEFAULT_PORTRAIT_ACADEMIC
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <img src={DEFAULT_PORTRAIT_ACADEMIC} alt="Academic portrait" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-[10px] text-slate-300 font-medium">Scholar Senior</span>
                </button>
              </div>
            </div>

            {/* Signature Section */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Signatures & Official Endorsement
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Signature */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-300 block mb-1">Student Signature</span>
                  <div className="h-12 bg-white rounded border border-slate-300 flex items-center justify-center overflow-hidden mb-2">
                    {student.signatureUrl ? (
                      <img src={student.signatureUrl} alt="Signature" className="max-h-10 object-contain" />
                    ) : (
                      <span className="font-serif italic text-slate-400 text-xs">
                        {student.name.split(' ')[0]} (Auto font)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSignaturePad('student')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded text-xs transition-colors"
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Draw</span>
                    </button>
                    <label className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded text-xs cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'studentSig')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Signatory Signature */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-300 block mb-1">Dean / Registrar Signature</span>
                  <div className="h-12 bg-white rounded border border-slate-300 flex items-center justify-center overflow-hidden mb-2">
                    {institution.signatorySignatureUrl ? (
                      <img src={institution.signatorySignatureUrl} alt="Signatory Signature" className="max-h-10 object-contain" />
                    ) : (
                      <span className="font-serif italic text-indigo-800 text-xs font-semibold">
                        {institution.signatoryName.split(' ')[1] || 'Vance'} (Official Seal)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSignaturePad('signatory')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded text-xs transition-colors"
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Draw</span>
                    </button>
                    <label className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded text-xs cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'signatorySig')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Card Theme & Features */}
        {activeTab === 'design' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-semibold text-slate-100 text-sm">Theme & Layout Presets</h3>
              <p className="text-[11px] text-slate-400">Curated institutional aesthetics and physical card options</p>
            </div>

            {/* Orientation */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                Card Format / Orientation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateDesign({ orientation: 'vertical' })}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                    design.orientation === 'vertical'
                      ? 'border-indigo-500 bg-indigo-950/50 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-6 border-2 border-current rounded-xs" />
                  <span>Vertical Portrait (Standard)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateDesign({ orientation: 'horizontal' })}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                    design.orientation === 'horizontal'
                      ? 'border-indigo-500 bg-indigo-950/50 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-6 h-4 border-2 border-current rounded-xs" />
                  <span>Horizontal Landscape</span>
                </button>
              </div>
            </div>

            {/* Presets List */}
            <div>
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Select Institutional Theme
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(THEME_PRESETS).map(([id, preset]) => {
                  const isSelected = design.theme === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => applyThemePreset(id as CardThemeId)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shadow-2xs"
                          style={{ backgroundColor: preset.design.primaryColor }}
                        />
                        <span className="font-semibold text-slate-100">{preset.name}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-indigo-400 ml-auto" />}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        {preset.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Tuning */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Custom Color Adjustments
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Header Bar</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={design.headerBg}
                      onChange={(e) => onUpdateDesign({ headerBg: e.target.value })}
                      className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[10px] text-slate-300 uppercase">{design.headerBg}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Accent Line</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={design.accentColor}
                      onChange={(e) => onUpdateDesign({ accentColor: e.target.value })}
                      className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[10px] text-slate-300 uppercase">{design.accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Base Primary</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={design.primaryColor}
                      onChange={(e) => onUpdateDesign({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-[10px] text-slate-300 uppercase">{design.primaryColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Card Toggles */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Security Badges & Hardware Simulation
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showLanyardSlot}
                    onChange={(e) => onUpdateDesign({ showLanyardSlot: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>Lanyard Punch Hole</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showChip}
                    onChange={(e) => onUpdateDesign({ showChip: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>Smart EMV Chip</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showHologram}
                    onChange={(e) => onUpdateDesign({ showHologram: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>Holographic Foil</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showBloodGroup}
                    onChange={(e) => onUpdateDesign({ showBloodGroup: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>Blood Group Badge</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showBarcode}
                    onChange={(e) => onUpdateDesign({ showBarcode: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>Barcode (Back)</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.showQrCode}
                    onChange={(e) => onUpdateDesign({ showQrCode: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                  />
                  <span>QR Code Verify</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Institution Details */}
        {activeTab === 'institution' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-semibold text-slate-100 text-sm">Institution Identity</h3>
              <p className="text-[11px] text-slate-400">School, college, or university branding details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Institution Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={institution.name}
                  onChange={(e) => onUpdateInstitution({ name: e.target.value })}
                  placeholder="e.g. ST. JUDE INSTITUTE OF TECHNOLOGY"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Motto / Tagline
                </label>
                <input
                  type="text"
                  value={institution.tagline}
                  onChange={(e) => onUpdateInstitution({ tagline: e.target.value })}
                  placeholder="e.g. Truth · Knowledge · Innovation"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Accreditation / Affiliation
                </label>
                <input
                  type="text"
                  value={institution.affiliation}
                  onChange={(e) => onUpdateInstitution({ affiliation: e.target.value })}
                  placeholder="e.g. ISO 9001:2020 Certified"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Campus Address
                </label>
                <input
                  type="text"
                  value={institution.address}
                  onChange={(e) => onUpdateInstitution({ address: e.target.value })}
                  placeholder="e.g. 742 Knowledge Way, Silicon Valley, CA"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Official Phone / Helpline
                </label>
                <input
                  type="text"
                  value={institution.phone}
                  onChange={(e) => onUpdateInstitution({ phone: e.target.value })}
                  placeholder="e.g. +1 (800) 555-8324"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Registrar / Dean Name
                </label>
                <input
                  type="text"
                  value={institution.signatoryName}
                  onChange={(e) => onUpdateInstitution({ signatoryName: e.target.value })}
                  placeholder="e.g. Dr. Marcus Vance, Ph.D."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Signatory Official Title
                </label>
                <input
                  type="text"
                  value={institution.signatoryTitle}
                  onChange={(e) => onUpdateInstitution({ signatoryTitle: e.target.value })}
                  placeholder="e.g. Registrar & Dean of Student Affairs"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Cardholder Possession & Return Terms (Back)
                </label>
                <textarea
                  rows={3}
                  value={institution.terms}
                  onChange={(e) => onUpdateInstitution({ terms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Student Directory & Batch */}
        {activeTab === 'directory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="font-semibold text-slate-100 text-sm">Student Directory</h3>
                <p className="text-[11px] text-slate-400">Manage multiple student cards and batch profiles</p>
              </div>

              <div className="flex items-center gap-2">
                {onOpenGenerator && (
                  <button
                    type="button"
                    onClick={onOpenGenerator}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate I-Cards</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onAddStudent}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                  title="Add empty student record"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Manual</span>
                </button>
              </div>
            </div>

            {/* Quick Generator Shortcut Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-indigo-300 text-xs block">
                  Bulk Provisioning & Cards Gallery
                </span>
                <span className="text-[11px] text-slate-400">
                  Generate 5–50 cards at once or import class rosters via CSV.
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {onOpenGallery && (
                  <button
                    type="button"
                    onClick={onOpenGallery}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-md text-[11px] font-medium border border-slate-700 transition-colors"
                  >
                    View All ({students.length})
                  </button>
                )}
                {onExportCSV && (
                  <button
                    type="button"
                    onClick={onExportCSV}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-md text-[11px] font-medium border border-slate-700 transition-colors"
                    title="Export all students to CSV"
                  >
                    Export CSV
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {students.map((st) => {
                const isActive = st.id === student.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => onSelectStudent(st.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={st.photoUrl}
                        alt={st.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-100 block truncate">{st.name}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="font-mono text-indigo-300">{st.studentId}</span>
                          <span>·</span>
                          <span className="truncate">{st.course}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={onDuplicateStudent}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Duplicate Student"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {students.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteStudent(st.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Sample Students</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
