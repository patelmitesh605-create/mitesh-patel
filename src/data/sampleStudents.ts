import { Student, InstitutionConfig, CardDesign } from '../types/student';

// Default generated high-res portraits and official seal
export const DEFAULT_PORTRAIT_MALE = '/src/assets/images/student_portrait_male_1790154925700.jpg';
export const DEFAULT_PORTRAIT_FEMALE = '/src/assets/images/student_portrait_female_1790154948464.jpg';
export const DEFAULT_PORTRAIT_ACADEMIC = '/src/assets/images/student_portrait_academic_1790154965396.jpg';
export const DEFAULT_UNIVERSITY_SEAL = '/src/assets/images/university_campus_seal_1790154990422.jpg';

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: 'stu-001',
    name: 'Ethan M. Walker',
    studentId: 'STU-2024-8841',
    course: 'B.S. Computer Science & AI',
    department: 'School of Computing & Engineering',
    academicYear: '2024 - 2028',
    semester: 'Year 2 / Term IV',
    dob: '2004-05-18',
    bloodGroup: 'O+',
    phone: '+1 (555) 234-8901',
    email: 'ethan.walker@stjude.edu',
    emergencyContact: '+1 (555) 902-1144 (Father)',
    guardianName: 'Robert Walker',
    address: '428 University Blvd, Apt 3B, Cambridge, MA',
    issueDate: '2024-09-01',
    expiryDate: '2028-06-30',
    photoUrl: DEFAULT_PORTRAIT_MALE,
    signatureUrl: '',
    status: 'ACTIVE',
    libraryCode: 'LIB-8841-B',
    hostelRoom: 'Block B · Room 412'
  },
  {
    id: 'stu-002',
    name: 'Dr. Sarah K. Jenkins',
    studentId: 'MED-2023-1092',
    course: 'Doctor of Medicine (M.D.)',
    department: 'Faculty of Health & Clinical Sciences',
    academicYear: '2023 - 2027',
    semester: 'Clinical Phase III',
    dob: '2001-11-04',
    bloodGroup: 'B+',
    phone: '+1 (555) 678-1234',
    email: 's.jenkins@oxford-med.edu',
    emergencyContact: '+1 (555) 432-8765 (Spouse)',
    guardianName: 'David Jenkins',
    address: '15 Radcliffe Square, Oxford, OX1 3BG',
    issueDate: '2023-08-15',
    expiryDate: '2027-07-31',
    photoUrl: DEFAULT_PORTRAIT_FEMALE,
    signatureUrl: '',
    status: 'ACTIVE',
    libraryCode: 'MED-LIB-1092',
    hostelRoom: 'Residency Quad 108'
  },
  {
    id: 'stu-003',
    name: 'Aarav V. Patel',
    studentId: 'APX-2025-4420',
    course: 'Advanced STEM Honors Scholar',
    department: 'Apex International Senior College',
    academicYear: '2024 - 2026',
    semester: 'Grade 12 (Senior Batch)',
    dob: '2007-03-22',
    bloodGroup: 'A+',
    phone: '+1 (555) 889-4321',
    email: 'aarav.patel@apex-stem.org',
    emergencyContact: '+1 (555) 776-9012 (Mother)',
    guardianName: 'Pooja Patel',
    address: '92 Blossom Hill Rd, San Jose, CA',
    issueDate: '2024-08-20',
    expiryDate: '2026-05-30',
    photoUrl: DEFAULT_PORTRAIT_ACADEMIC,
    signatureUrl: '',
    status: 'ACTIVE',
    libraryCode: 'APX-LIB-4420',
    hostelRoom: 'Day Scholar'
  },
  {
    id: 'stu-004',
    name: 'Maya Lin Chen',
    studentId: 'DES-2024-6519',
    course: 'B.F.A. Interactive Media & Design',
    department: 'Institute of Architecture & Visual Arts',
    academicYear: '2024 - 2028',
    semester: 'Foundation Studio 3',
    dob: '2005-08-14',
    bloodGroup: 'AB+',
    phone: '+1 (555) 321-7654',
    email: 'maya.chen@bauhaus-arts.edu',
    emergencyContact: '+1 (555) 654-3210 (Sister)',
    guardianName: 'Grace Chen',
    address: '710 Grand Concourse, Brooklyn, NY',
    issueDate: '2024-09-10',
    expiryDate: '2028-06-15',
    photoUrl: DEFAULT_PORTRAIT_FEMALE,
    signatureUrl: '',
    status: 'ACTIVE',
    libraryCode: 'ART-LIB-6519',
    hostelRoom: 'Studio Hall 204'
  }
];

export const DEFAULT_INSTITUTION: InstitutionConfig = {
  name: 'ST. JUDE INSTITUTE OF TECHNOLOGY',
  tagline: 'Truth · Knowledge · Innovation',
  affiliation: 'Accredited by Higher Academic Commission · ISO 9001:2020',
  logoUrl: DEFAULT_UNIVERSITY_SEAL,
  sealUrl: DEFAULT_UNIVERSITY_SEAL,
  address: '742 Knowledge Way, Silicon Valley Campus, CA 94025',
  website: 'www.stjude-tech.edu',
  phone: '+1 (800) 555-8324',
  email: 'registrar@stjude-tech.edu',
  terms: 'This identity card is the official property of the Institution and is strictly non-transferable. The holder must carry and present this card upon request by university faculty or security personnel. If lost or misplaced, notify the Campus Security Desk immediately. Lost cards returned to campus security will be restored to the cardholder.',
  signatoryTitle: 'Registrar & Dean of Student Affairs',
  signatoryName: 'Dr. Marcus Vance, Ph.D.',
  signatorySignatureUrl: ''
};

export const THEME_PRESETS: Record<string, {
  name: string;
  description: string;
  design: Partial<CardDesign>;
}> = {
  'modern-navy': {
    name: 'Modern STEM & Tech',
    description: 'Deep navy with electric cyan accents and structured technical grid',
    design: {
      theme: 'modern-navy',
      primaryColor: '#0f172a',
      secondaryColor: '#1e293b',
      accentColor: '#0ea5e9',
      textColor: '#ffffff',
      headerBg: '#0b1120',
      layoutStyle: 'modern'
    }
  },
  'ivy-crimson': {
    name: 'Classical Academy',
    description: 'Prestigious deep crimson and gold foil aesthetic for traditional universities',
    design: {
      theme: 'ivy-crimson',
      primaryColor: '#881337',
      secondaryColor: '#4c0519',
      accentColor: '#fbbf24',
      textColor: '#ffffff',
      headerBg: '#4c0519',
      layoutStyle: 'academic'
    }
  },
  'emerald-minimal': {
    name: 'Clean International',
    description: 'Contemporary European Swiss design with bold forest emerald and crisp white',
    design: {
      theme: 'emerald-minimal',
      primaryColor: '#064e3b',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      textColor: '#ffffff',
      headerBg: '#064e3b',
      layoutStyle: 'minimal'
    }
  },
  'teal-medical': {
    name: 'Medical & Life Sciences',
    description: 'Clinical teal and silver palette with prominent emergency and blood group badge',
    design: {
      theme: 'teal-medical',
      primaryColor: '#115e59',
      secondaryColor: '#0f766e',
      accentColor: '#2dd4bf',
      textColor: '#ffffff',
      headerBg: '#134e4a',
      layoutStyle: 'corporate'
    }
  },
  'cyber-polytechnic': {
    name: 'Polytechnic & Arts',
    description: 'High-contrast violet and cobalt gradient with vibrant modern typography',
    design: {
      theme: 'cyber-polytechnic',
      primaryColor: '#312e81',
      secondaryColor: '#4338ca',
      accentColor: '#818cf8',
      textColor: '#ffffff',
      headerBg: '#1e1b4b',
      layoutStyle: 'modern'
    }
  },
  'obsidian-gold': {
    name: 'Executive & Honors',
    description: 'Luxurious matte obsidian black with warm brushed brass and gold accents',
    design: {
      theme: 'obsidian-gold',
      primaryColor: '#18181b',
      secondaryColor: '#27272a',
      accentColor: '#f59e0b',
      textColor: '#ffffff',
      headerBg: '#09090b',
      layoutStyle: 'corporate'
    }
  }
};

export const DEFAULT_DESIGN: CardDesign = {
  theme: 'modern-navy',
  orientation: 'vertical',
  primaryColor: '#0f172a',
  secondaryColor: '#1e293b',
  accentColor: '#0ea5e9',
  textColor: '#ffffff',
  headerBg: '#0b1120',
  cardRadius: 'lg',
  showLanyardSlot: true,
  showChip: true,
  showBarcode: true,
  showQrCode: true,
  showHologram: true,
  showSignature: true,
  showBloodGroup: true,
  showWatermark: true,
  watermarkText: 'VERIFIED CREDENTIAL',
  layoutStyle: 'modern'
};
