import { Student } from '../types/student';
import { 
  DEFAULT_PORTRAIT_MALE, 
  DEFAULT_PORTRAIT_FEMALE, 
  DEFAULT_PORTRAIT_ACADEMIC 
} from '../data/sampleStudents';

// Curated academic portrait pool with diverse students
export const PORTRAIT_POOL = [
  DEFAULT_PORTRAIT_MALE,
  DEFAULT_PORTRAIT_FEMALE,
  DEFAULT_PORTRAIT_ACADEMIC,
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80'
];

const FIRST_NAMES = [
  'Aarav', 'Olivia', 'Liam', 'Sophia', 'Ethan', 'Emma', 'Noah', 'Ava', 
  'Lucas', 'Mia', 'Mateo', 'Isabella', 'Alexander', 'Chloe', 'Daniel', 
  'Priya', 'Marcus', 'Elena', 'Kaito', 'Zara', 'Julian', 'Amara', 'Rohan'
];

const LAST_NAMES = [
  'Walker', 'Patel', 'Chen', 'Rodriguez', 'Kim', 'Johnson', 'Gupta', 
  'Smith', 'Yamamoto', 'Osei', 'Al-Mansoor', 'Silva', 'Taylor', 'Dubois',
  'Sharma', 'Kowalski', 'Nakamura', 'O’Connor', 'Vance', 'Hernandez'
];

const DEPARTMENTS_AND_COURSES = [
  {
    department: 'School of Computing & Data Sciences',
    courses: ['B.S. Computer Science', 'B.S. Artificial Intelligence', 'M.S. Data Science & Machine Learning', 'B.S. Software Engineering']
  },
  {
    department: 'Faculty of Engineering & Robotics',
    courses: ['B.Tech Mechanical Engineering', 'B.S. Electrical & Electronics', 'B.S. Mechatronics & Autonomous Systems', 'B.S. Aerospace Engineering']
  },
  {
    department: 'College of Health & Life Sciences',
    courses: ['Doctor of Medicine (M.D.)', 'B.S. Biomedical Sciences', 'B.S. Biotechnology', 'B.S. Nursing Practice']
  },
  {
    department: 'School of Business & Economics',
    courses: ['B.B.A. International Business', 'B.S. Financial Technology', 'M.B.A. Technology Management', 'B.S. Quantitative Economics']
  },
  {
    department: 'Institute of Architecture & Design',
    courses: ['Bachelor of Architecture (B.Arch)', 'B.F.A. Interactive Media & UI/UX', 'B.Des Industrial Product Design', 'B.A. Urban Planning']
  }
];

const BLOOD_GROUPS: Array<Student['bloodGroup']> = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const HOSTEL_ROOMS = [
  'Block A · Room 102',
  'Block B · Room 412',
  'East Wing · Rm 304',
  'Scholar Quad · 210',
  'Newton Hall · 508',
  'Day Scholar / Commuter',
  'North Tower · 318',
  'Residency Hall · 112'
];

export function generateRandomStudent(overrides?: Partial<Student>): Student {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const fullName = `${firstName} ${lastName}`;

  const deptObj = DEPARTMENTS_AND_COURSES[Math.floor(Math.random() * DEPARTMENTS_AND_COURSES.length)];
  const course = deptObj.courses[Math.floor(Math.random() * deptObj.courses.length)];
  const bloodGroup = BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)];
  const hostel = HOSTEL_ROOMS[Math.floor(Math.random() * HOSTEL_ROOMS.length)];
  const photo = PORTRAIT_POOL[Math.floor(Math.random() * PORTRAIT_POOL.length)];

  const currentYear = 2025;
  const gradYear = currentYear + 4;
  const randomIdNum = Math.floor(1000 + Math.random() * 9000);
  const studentId = `STU-${currentYear}-${randomIdNum}`;
  const libraryCode = `LIB-${randomIdNum}-${bloodGroup.replace('+', 'P').replace('-', 'M')}`;

  const cleanEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomIdNum % 100}@university.edu`;

  const student: Student = {
    id: `stu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: fullName,
    studentId,
    course,
    department: deptObj.department,
    academicYear: `${currentYear} - ${gradYear}`,
    semester: 'Year 1 / Term I',
    dob: `200${Math.floor(Math.random() * 4) + 4}-0${Math.floor(Math.random() * 8) + 1}-1${Math.floor(Math.random() * 8)}`,
    bloodGroup,
    phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    email: cleanEmail,
    emergencyContact: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)} (Guardian)`,
    guardianName: `${lastName} Family`,
    address: `${Math.floor(100 + Math.random() * 900)} University Campus Ave, Cambridge, MA`,
    issueDate: `${currentYear}-08-25`,
    expiryDate: `${gradYear}-06-30`,
    photoUrl: photo,
    signatureUrl: '',
    status: 'ACTIVE',
    libraryCode,
    hostelRoom: hostel,
    ...overrides
  };

  return student;
}

export function generateBatchStudents(count: number, departmentFilter?: string): Student[] {
  const results: Student[] = [];
  for (let i = 0; i < count; i++) {
    let overrides: Partial<Student> = {};
    if (departmentFilter && departmentFilter !== 'ALL') {
      const match = DEPARTMENTS_AND_COURSES.find(d => d.department.toLowerCase().includes(departmentFilter.toLowerCase()));
      if (match) {
        overrides.department = match.department;
        overrides.course = match.courses[Math.floor(Math.random() * match.courses.length)];
      }
    }
    // ensure unique timestamps
    overrides.id = `stu-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`;
    results.push(generateRandomStudent(overrides));
  }
  return results;
}

// CSV Export
export function exportStudentsToCSV(students: Student[], filename = 'students_id_roster.csv') {
  const headers = [
    'Student ID',
    'Full Name',
    'Course / Major',
    'Department',
    'Academic Batch',
    'Semester',
    'Blood Group',
    'Date of Birth',
    'Phone',
    'Email',
    'Emergency Contact',
    'Hostel Room',
    'Library Barcode Code',
    'Issue Date',
    'Expiry Date',
    'Status'
  ];

  const escapeCsv = (val: string | undefined) => {
    if (!val) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = students.map(s => [
    escapeCsv(s.studentId),
    escapeCsv(s.name),
    escapeCsv(s.course),
    escapeCsv(s.department),
    escapeCsv(s.academicYear),
    escapeCsv(s.semester),
    escapeCsv(s.bloodGroup),
    escapeCsv(s.dob),
    escapeCsv(s.phone),
    escapeCsv(s.email),
    escapeCsv(s.emergencyContact),
    escapeCsv(s.hostelRoom || 'N/A'),
    escapeCsv(s.libraryCode),
    escapeCsv(s.issueDate),
    escapeCsv(s.expiryDate),
    escapeCsv(s.status)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Download Sample CSV Template
export function downloadSampleCSVTemplate() {
  const sampleData = `Student ID,Full Name,Course,Department,Academic Year,Blood Group,Phone,Email,Emergency Phone,Hostel Room
STU-2025-5012,Marcus Sterling,B.S. Artificial Intelligence,School of Computing,2025 - 2029,O+,+1 555-401-2299,marcus.s@univ.edu,+1 555-900-1122,Block A · 204
STU-2025-5013,Emily R. Watson,Doctor of Medicine (M.D.),Faculty of Health,2025 - 2029,A+,+1 555-401-2300,emily.w@univ.edu,+1 555-900-1123,Block B · 310
STU-2025-5014,Devendra K. Nair,B.Tech Mechanical Robotics,Faculty of Engineering,2025 - 2029,B+,+1 555-401-2301,devendra.n@univ.edu,+1 555-900-1124,Day Scholar`;

  const blob = new Blob([sampleData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'scholarid_student_import_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Parse CSV text to Student objects
export function parseCSVToStudents(text: string): Student[] {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    // detect delimiter (tab or comma)
    const delim = line.includes('\t') ? '\t' : ',';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delim && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const parsedStudents: Student[] = [];
  const rows = lines.slice(1); // skip header

  rows.forEach((rowStr, idx) => {
    const cols = parseLine(rowStr);
    if (!cols[0] && !cols[1]) return;

    const studentId = cols[0] || `STU-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const name = cols[1] || 'Registered Student';
    const course = cols[2] || 'Undergraduate Program';
    const department = cols[3] || 'Academic Department';
    const academicYear = cols[4] || '2025 - 2029';
    const bloodGroupRaw = cols[5] || 'O+';
    const bloodGroup = (BLOOD_GROUPS.includes(bloodGroupRaw as any) ? bloodGroupRaw : 'O+') as Student['bloodGroup'];
    const phone = cols[6] || '+1 (555) 000-0000';
    const email = cols[7] || `${name.toLowerCase().replace(/[^a-z]/g, '')}@univ.edu`;
    const emergencyContact = cols[8] || '+1 (555) 999-9999 (Guardian)';
    const hostelRoom = cols[9] || 'Day Scholar';

    const randomPhoto = PORTRAIT_POOL[idx % PORTRAIT_POOL.length];
    const randNum = Math.floor(1000 + Math.random() * 9000);

    parsedStudents.push({
      id: `stu-csv-${Date.now()}-${idx}-${randNum}`,
      name,
      studentId,
      course,
      department,
      academicYear,
      semester: 'Year 1 / Term I',
      dob: '2005-06-15',
      bloodGroup,
      phone,
      email,
      emergencyContact,
      guardianName: 'Guardian',
      address: '100 University Campus Blvd',
      issueDate: '2025-08-25',
      expiryDate: '2029-06-30',
      photoUrl: randomPhoto,
      signatureUrl: '',
      status: 'ACTIVE',
      libraryCode: `LIB-${randNum}-${bloodGroup.replace('+', 'P')}`,
      hostelRoom
    });
  });

  return parsedStudents;
}
