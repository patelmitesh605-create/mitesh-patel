export type StudentStatus = 'ACTIVE' | 'GRADUATED' | 'ON_LEAVE' | 'PROBATION';

export interface Student {
  id: string;
  name: string;
  studentId: string;
  course: string;
  department: string;
  academicYear: string;
  semester: string;
  dob: string;
  bloodGroup: string;
  phone: string;
  email: string;
  emergencyContact: string;
  guardianName?: string;
  address: string;
  issueDate: string;
  expiryDate: string;
  photoUrl: string;
  signatureUrl: string;
  status: StudentStatus;
  libraryCode: string;
  hostelRoom?: string;
}

export interface InstitutionConfig {
  name: string;
  tagline: string;
  affiliation: string;
  logoUrl: string;
  sealUrl: string;
  address: string;
  website: string;
  phone: string;
  email: string;
  terms: string;
  signatoryTitle: string;
  signatoryName: string;
  signatorySignatureUrl: string;
}

export type CardThemeId = 
  | 'modern-navy' 
  | 'ivy-crimson' 
  | 'emerald-minimal' 
  | 'teal-medical' 
  | 'cyber-polytechnic' 
  | 'obsidian-gold';

export interface CardDesign {
  theme: CardThemeId;
  orientation: 'vertical' | 'horizontal';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  headerBg: string;
  cardRadius: 'sm' | 'md' | 'lg' | 'xl';
  showLanyardSlot: boolean;
  showChip: boolean;
  showBarcode: boolean;
  showQrCode: boolean;
  showHologram: boolean;
  showSignature: boolean;
  showBloodGroup: boolean;
  showWatermark: boolean;
  watermarkText: string;
  layoutStyle: 'corporate' | 'academic' | 'modern' | 'minimal';
}
