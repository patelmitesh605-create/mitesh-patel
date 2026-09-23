import React, { useState, useEffect } from 'react';
import { Student, InstitutionConfig, CardDesign } from './types/student';
import { 
  SAMPLE_STUDENTS, 
  DEFAULT_INSTITUTION, 
  DEFAULT_DESIGN,
  DEFAULT_PORTRAIT_MALE
} from './data/sampleStudents';
import { CardStage } from './components/CardStage';
import { StudentForm } from './components/StudentForm';
import { WebcamCaptureModal } from './components/WebcamCaptureModal';
import { SignaturePadModal } from './components/SignaturePadModal';
import { VerificationModal } from './components/VerificationModal';
import { PrintSheetModal } from './components/PrintSheetModal';
import { BatchGeneratorModal } from './components/BatchGeneratorModal';
import { CardsGalleryModal } from './components/CardsGalleryModal';
import { DigitalPassModal } from './components/DigitalPassModal';
import { exportStudentsToCSV } from './utils/studentGenerator';
import { 
  Printer, 
  Plus, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles,
  Layers,
  Wand2,
  Smartphone,
  Download
} from 'lucide-react';

const STORAGE_KEY_STUDENTS = 'scholarid_students_v1';
const STORAGE_KEY_INSTITUTION = 'scholarid_institution_v1';
const STORAGE_KEY_DESIGN = 'scholarid_design_v1';

export default function App() {
  // Load state from local storage or defaults
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      return saved ? JSON.parse(saved) : SAMPLE_STUDENTS;
    } catch {
      return SAMPLE_STUDENTS;
    }
  });

  const [currentStudentId, setCurrentStudentId] = useState<string>(() => {
    return students[0]?.id || SAMPLE_STUDENTS[0].id;
  });

  const [institution, setInstitution] = useState<InstitutionConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INSTITUTION);
      return saved ? JSON.parse(saved) : DEFAULT_INSTITUTION;
    } catch {
      return DEFAULT_INSTITUTION;
    }
  });

  const [design, setDesign] = useState<CardDesign>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DESIGN);
      return saved ? JSON.parse(saved) : DEFAULT_DESIGN;
    } catch {
      return DEFAULT_DESIGN;
    }
  });

  // Modals state
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<'student' | 'signatory' | null>(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [digitalPassStudent, setDigitalPassStudent] = useState<Student | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INSTITUTION, JSON.stringify(institution));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [institution]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DESIGN, JSON.stringify(design));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [design]);

  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0] || SAMPLE_STUDENTS[0];

  const handleUpdateStudent = (updated: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === currentStudent.id ? { ...s, ...updated } : s))
    );
  };

  const handleUpdateInstitution = (updated: Partial<InstitutionConfig>) => {
    setInstitution((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateDesign = (updated: Partial<CardDesign>) => {
    setDesign((prev) => ({ ...prev, ...updated }));
  };

  const handleAddStudent = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      name: 'New Student Name',
      studentId: `STU-2025-${randomNum}`,
      course: 'B.S. Artificial Intelligence',
      department: 'School of Technology',
      academicYear: '2025 - 2029',
      semester: 'Year 1 / Term I',
      dob: '2005-01-15',
      bloodGroup: 'O+',
      phone: '+1 (555) 000-0000',
      email: 'student@institution.edu',
      emergencyContact: '+1 (555) 999-9999 (Parent)',
      guardianName: 'Guardian Name',
      address: '100 University Campus Rd, Academic Block',
      issueDate: '2025-08-25',
      expiryDate: '2029-06-30',
      photoUrl: DEFAULT_PORTRAIT_MALE,
      signatureUrl: '',
      status: 'ACTIVE',
      libraryCode: `LIB-${randomNum}-X`,
      hostelRoom: 'Hall A · 101'
    };

    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudentId(newStudent.id);
  };

  const handleAddMultipleStudents = (newStudents: Student[]) => {
    if (newStudents.length === 0) return;
    setStudents((prev) => [...newStudents, ...prev]);
    setCurrentStudentId(newStudents[0].id);
  };

  const handleAddSingleStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudentId(newStudent.id);
  };

  const handleDuplicateStudent = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const duplicate: Student = {
      ...currentStudent,
      id: `stu-${Date.now()}`,
      name: `${currentStudent.name} (Copy)`,
      studentId: `STU-${randomNum}`,
      libraryCode: `LIB-${randomNum}`
    };
    setStudents((prev) => [duplicate, ...prev]);
    setCurrentStudentId(duplicate.id);
  };

  const handleDeleteStudent = (id: string) => {
    if (students.length <= 1) return;
    const remaining = students.filter((s) => s.id !== id);
    setStudents(remaining);
    if (currentStudentId === id) {
      setCurrentStudentId(remaining[0].id);
    }
  };

  const handleResetDefaults = () => {
    setStudents(SAMPLE_STUDENTS);
    setCurrentStudentId(SAMPLE_STUDENTS[0].id);
    setInstitution(DEFAULT_INSTITUTION);
    setDesign(DEFAULT_DESIGN);
  };

  const handleExportCSV = () => {
    exportStudentsToCSV(students, `students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Universal Top Bar: Zone 1 (Wordmark), Zone 2 (Nav links), Zone 3 (Primary Actions) */}
      <header className="h-16 px-4 sm:px-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between z-30 sticky top-0 no-print">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-serif-brand">
            ScholarID
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            type="button"
            className="hover:text-white transition-colors text-white font-semibold"
          >
            Card Designer
          </button>
          <button
            type="button"
            onClick={() => setIsGeneratorOpen(true)}
            className="hover:text-white transition-colors text-indigo-300 font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Generate I-Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Roster Gallery ({students.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPrintOpen(true)}
            className="hover:text-white transition-colors"
          >
            Cut Sheet & Print
          </button>
          <button
            type="button"
            onClick={() => setIsVerifyOpen(true)}
            className="hover:text-white transition-colors"
          >
            Security Scanner
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsGeneratorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Generate I-Card</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrintOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-750 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Badges</span>
          </button>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 no-print">
        {/* Studio Subheading & Context */}
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Student Identity Card Studio
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Standard ISO/IEC 7810 ID-1 (CR-80) format · Dual-sided preview with digital security verification
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Active: <strong className="text-slate-200">{currentStudent.name}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Batch: <strong className="text-indigo-400">{currentStudent.academicYear}</strong></span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{students.length} Total Cards Generated</span>
            </button>
          </div>
        </div>

        {/* 2-Zone Studio Grid: Card Stage (Left/Primary) + Control Deck (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Card Stage Viewport (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <CardStage
              student={currentStudent}
              institution={institution}
              design={design}
              onOpenPrint={() => setIsPrintOpen(true)}
              onOpenVerify={() => setIsVerifyOpen(true)}
              onOpenDigitalPass={() => setDigitalPassStudent(currentStudent)}
            />
          </div>

          {/* Form & Customization Deck (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <StudentForm
              student={currentStudent}
              institution={institution}
              design={design}
              students={students}
              onUpdateStudent={handleUpdateStudent}
              onUpdateInstitution={handleUpdateInstitution}
              onUpdateDesign={handleUpdateDesign}
              onSelectStudent={(id) => setCurrentStudentId(id)}
              onAddStudent={handleAddStudent}
              onDuplicateStudent={handleDuplicateStudent}
              onDeleteStudent={handleDeleteStudent}
              onResetDefaults={handleResetDefaults}
              onOpenWebcam={() => setIsWebcamOpen(true)}
              onOpenSignaturePad={(target) => setSignatureTarget(target)}
              onOpenGenerator={() => setIsGeneratorOpen(true)}
              onOpenGallery={() => setIsGalleryOpen(true)}
              onExportCSV={handleExportCSV}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <BatchGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onAddStudent={handleAddSingleStudent}
        onAddMultipleStudents={handleAddMultipleStudents}
        currentCount={students.length}
      />

      <CardsGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        students={students}
        currentStudentId={currentStudentId}
        onSelectStudent={(id) => setCurrentStudentId(id)}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenDigitalPass={(st) => setDigitalPassStudent(st)}
        onDeleteStudent={handleDeleteStudent}
      />

      {digitalPassStudent && (
        <DigitalPassModal
          isOpen={digitalPassStudent !== null}
          onClose={() => setDigitalPassStudent(null)}
          student={digitalPassStudent}
          institution={institution}
        />
      )}

      <WebcamCaptureModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={(photoUrl) => handleUpdateStudent({ photoUrl })}
      />

      <SignaturePadModal
        isOpen={signatureTarget !== null}
        onClose={() => setSignatureTarget(null)}
        onSave={(sigUrl) => {
          if (signatureTarget === 'student') handleUpdateStudent({ signatureUrl: sigUrl });
          if (signatureTarget === 'signatory') handleUpdateInstitution({ signatorySignatureUrl: sigUrl });
        }}
        title={signatureTarget === 'student' ? 'Sign Student Signature' : 'Sign Authorized Registrar Signature'}
      />

      <VerificationModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        student={currentStudent}
        institution={institution}
      />

      <PrintSheetModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        students={students}
        currentStudent={currentStudent}
        institution={institution}
        design={design}
      />
    </div>
  );
}
