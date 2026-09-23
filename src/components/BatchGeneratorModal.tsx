import React, { useState } from 'react';
import { Student } from '../types/student';
import { 
  generateRandomStudent, 
  generateBatchStudents, 
  exportStudentsToCSV, 
  downloadSampleCSVTemplate, 
  parseCSVToStudents,
  PORTRAIT_POOL 
} from '../utils/studentGenerator';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  Users, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Plus, 
  CheckCircle2, 
  Wand2, 
  RefreshCw,
  IdCard,
  Building2,
  GraduationCap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
  onAddMultipleStudents: (newStudents: Student[]) => void;
  currentCount: number;
}

export const BatchGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddStudent,
  onAddMultipleStudents,
  currentCount
}) => {
  const [activeTab, setActiveTab] = useState<'express' | 'bulk' | 'csv'>('express');

  // Express Generator Form state
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState(`STU-2025-${Math.floor(1000 + Math.random() * 9000)}`);
  const [course, setCourse] = useState('B.S. Artificial Intelligence & Computing');
  const [department, setDepartment] = useState('School of Computing & Data Sciences');
  const [academicYear, setAcademicYear] = useState('2025 - 2029');
  const [bloodGroup, setBloodGroup] = useState<Student['bloodGroup']>('O+');
  const [selectedPhoto, setSelectedPhoto] = useState(PORTRAIT_POOL[0]);

  // Bulk Generator State
  const [batchCount, setBatchCount] = useState<number>(5);
  const [batchDepartment, setBatchDepartment] = useState<string>('ALL');

  // CSV Import State
  const [csvText, setCsvText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Student[]>([]);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleGenerateRandomID = () => {
    setStudentId(`STU-2025-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleFillRandomExpress = () => {
    const random = generateRandomStudent();
    setName(random.name);
    setStudentId(random.studentId);
    setCourse(random.course);
    setDepartment(random.department);
    setAcademicYear(random.academicYear);
    setBloodGroup(random.bloodGroup);
    setSelectedPhoto(random.photoUrl);
  };

  const handleExpressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCard: Student = {
      id: `stu-${Date.now()}`,
      name: name.trim(),
      studentId: studentId.trim() || `STU-2025-${randomNum}`,
      course: course.trim(),
      department: department.trim(),
      academicYear,
      semester: 'Year 1 / Term I',
      dob: '2005-04-12',
      bloodGroup,
      phone: '+1 (555) 345-6789',
      email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@univ.edu`,
      emergencyContact: '+1 (555) 999-1234 (Guardian)',
      guardianName: 'Guardian',
      address: '100 University Campus Blvd',
      issueDate: '2025-08-25',
      expiryDate: '2029-06-30',
      photoUrl: selectedPhoto,
      signatureUrl: '',
      status: 'ACTIVE',
      libraryCode: `LIB-${randomNum}-${bloodGroup.replace('+', 'P')}`,
      hostelRoom: 'Block A · Room 204'
    };

    onAddStudent(newCard);
    triggerConfetti();
    onClose();
  };

  const handleGenerateBulk = () => {
    const generated = generateBatchStudents(batchCount, batchDepartment);
    onAddMultipleStudents(generated);
    triggerConfetti();
    onClose();
  };

  const handleCsvTextChange = (text: string) => {
    setCsvText(text);
    setImportError(null);
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }
    try {
      const parsed = parseCSVToStudents(text);
      setParsedPreview(parsed);
      if (parsed.length === 0) {
        setImportError('No valid student rows found. Please check CSV format.');
      }
    } catch (err: any) {
      setImportError('Failed to parse text: ' + err.message);
      setParsedPreview([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      handleCsvTextChange(content);
    };
    reader.readAsText(file);
  };

  const handleImportCsvStudents = () => {
    if (parsedPreview.length === 0) return;
    onAddMultipleStudents(parsedPreview);
    triggerConfetti();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/90 text-white flex items-center justify-center shadow-md">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-100 text-base">Generate Student I-Cards</h2>
              <p className="text-xs text-slate-400">
                Instantly produce individual or batch identity cards with valid barcodes and security credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 bg-slate-950/90 border-b border-slate-800 flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('express')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'express'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Express Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bulk')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'bulk'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bulk Batch Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'csv'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV / Excel Import</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-slate-300">
          {/* TAB 1: EXPRESS GENERATOR */}
          {activeTab === 'express' && (
            <form onSubmit={handleExpressSubmit} className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-200">
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  Quick form: Fill details or use AI Auto-Fill to populate realistic credentials.
                </span>
                <button
                  type="button"
                  onClick={handleFillRandomExpress}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold rounded-md shadow-xs transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Random Fill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Student Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam Christopher Vance"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-medium text-slate-400">
                      Student ID / Roll Number <span className="text-red-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomID}
                      className="text-[10px] text-indigo-400 hover:underline flex items-center gap-0.5"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      Auto-ID
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Course / Major
                  </label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. B.S. Computer Science & AI"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Faculty / Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. School of Computing"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Academic Batch
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="2025 - 2029"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Blood Group
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const).map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setBloodGroup(bg)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                          bloodGroup === bg
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo Selector */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Choose Cardholder Portrait Photo
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {PORTRAIT_POOL.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPhoto(imgUrl)}
                      className={`relative rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedPhoto === imgUrl
                          ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105'
                          : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Avatar ${i}`} className="w-12 h-14 object-cover" />
                      {selectedPhoto === imgUrl && (
                        <div className="absolute top-0.5 right-0.5 bg-indigo-600 rounded-full p-0.5 text-white">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate I-Card Now</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: BULK BATCH GENERATOR */}
          {activeTab === 'bulk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 text-sm">Batch I-Card Production</h3>
                <p className="text-slate-400 text-xs">
                  Generate multiple realistic student identification cards at once. Each card will receive a unique roll number, barcode, library access code, photo, and emergency contacts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Number of Cards to Generate
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 20, 50].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBatchCount(num)}
                          className={`py-2 rounded-lg font-semibold text-xs border transition-colors ${
                            batchCount === num
                              ? 'border-indigo-500 bg-indigo-950/60 text-white'
                              : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          +{num} Cards
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Program / Department Focus
                    </label>
                    <select
                      value={batchDepartment}
                      onChange={(e) => setBatchDepartment(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ALL">All Departments (Mixed Balance)</option>
                      <option value="Computing">School of Computing & Data Science</option>
                      <option value="Engineering">Faculty of Engineering & Robotics</option>
                      <option value="Health">College of Health & Medicine</option>
                      <option value="Business">School of Business & Economics</option>
                      <option value="Design">Institute of Architecture & Design</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Current Directory Count: <strong className="text-slate-200">{currentCount} cards</strong> → After Generation: <strong className="text-emerald-400">{currentCount + batchCount} cards</strong>
                </span>
                <span className="text-[11px] text-slate-500">
                  Auto-formatted to CR-80 Standard
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGenerateBulk}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Generate {batchCount} Student Cards</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CSV & SPREADSHEET IMPORT */}
          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Import from CSV or Spreadsheet</h3>
                  <p className="text-[11px] text-slate-400">Copy & paste rows from Excel / Google Sheets or upload a .csv file</p>
                </div>
                <button
                  type="button"
                  onClick={downloadSampleCSVTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template (.csv)</span>
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-slate-400">
                    Paste CSV or Tab-Separated Data:
                  </label>
                  <label className="text-[11px] text-indigo-400 hover:underline cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload CSV File</span>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  rows={4}
                  value={csvText}
                  onChange={(e) => handleCsvTextChange(e.target.value)}
                  placeholder="Student ID,Full Name,Course,Department,Academic Year,Blood Group,Phone,Email,Emergency Phone,Hostel Room
STU-2025-9011,Marcus Chen,B.S. Artificial Intelligence,School of Computing,2025 - 2029,O+,+1 555-0100,m.chen@univ.edu,+1 555-9999,Block A 201"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-100 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
                />
              </div>

              {importError && (
                <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs">
                  {importError}
                </div>
              )}

              {/* Preview Table */}
              {parsedPreview.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      Parsed Preview ({parsedPreview.length} Student Cards detected)
                    </span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready to generate
                    </span>
                  </div>

                  <div className="max-h-40 overflow-y-auto border border-slate-800 rounded-lg bg-slate-950/80 text-[11px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/80">
                          <th className="p-2">Roll No</th>
                          <th className="p-2">Full Name</th>
                          <th className="p-2">Course</th>
                          <th className="p-2">Blood</th>
                          <th className="p-2">Email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {parsedPreview.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/40">
                            <td className="p-2 font-mono text-indigo-400">{p.studentId}</td>
                            <td className="p-2 font-medium text-slate-200">{p.name}</td>
                            <td className="p-2 text-slate-400 truncate max-w-[150px]">{p.course}</td>
                            <td className="p-2 text-red-300">{p.bloodGroup}</td>
                            <td className="p-2 text-slate-400">{p.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={parsedPreview.length === 0}
                  onClick={handleImportCsvStudents}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Generate {parsedPreview.length} Cards from CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
