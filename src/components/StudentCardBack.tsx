import React from 'react';
import { Student, InstitutionConfig, CardDesign } from '../types/student';
import { BarcodeSvg } from '../utils/barcode';
import { QrCodeSvg } from '../utils/qrCode';
import { Phone, Mail, MapPin, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';

interface Props {
  student: Student;
  institution: InstitutionConfig;
  design: CardDesign;
  scale?: number;
  id?: string;
}

export const StudentCardBack: React.FC<Props> = ({
  student,
  institution,
  design,
  scale = 1,
  id = 'student-card-back'
}) => {
  const isVertical = design.orientation === 'vertical';

  // Digital verification URL payload
  const verificationPayload = `SCHOLAR-VERIFY:${student.studentId}|${student.name}|${institution.name}|VALID:${student.expiryDate}`;

  if (isVertical) {
    return (
      <div
        id={id}
        className="relative bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden select-none border border-slate-200/80 flex flex-col justify-between"
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

        {/* Magnetic Stripe simulation */}
        <div className="relative pt-7 bg-slate-900">
          <div className="h-10 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border-y border-neutral-800 flex items-center justify-end px-3">
            <span className="text-[7px] font-mono text-neutral-500 tracking-widest uppercase">
              TRACK 1/2 ENCRYPTED · HIGH-COERCIVITY
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-50 via-white to-slate-100 text-[9.5px]">
          {/* Institutional Regulations */}
          <div className="bg-slate-100/90 p-2 rounded border border-slate-200 text-slate-600 leading-tight">
            <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-800 uppercase tracking-wider mb-1">
              <AlertCircle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
              <span>Terms of Cardholder Possession</span>
            </div>
            <p className="line-clamp-3 text-[8px] text-slate-500">
              {institution.terms}
            </p>
          </div>

          {/* Student Emergency & Resident Info */}
          <div className="space-y-1.5 py-1">
            <div className="flex items-start gap-1.5 text-slate-600">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              <div className="truncate">
                <span className="text-[7.5px] uppercase font-semibold text-slate-400 block">Address</span>
                <span className="font-medium text-slate-700 truncate block">{student.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[7px] uppercase font-semibold text-slate-400 block">Emergency</span>
                  <span className="font-mono text-[8px] text-slate-800 truncate block">{student.emergencyContact}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600">
                <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[7px] uppercase font-semibold text-slate-400 block">Student Email</span>
                  <span className="text-[8px] text-slate-800 truncate block">{student.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Verification & QR Section */}
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
            {design.showQrCode && (
              <div className="flex items-center gap-2">
                <QrCodeSvg value={verificationPayload} size={54} />
                <div>
                  <div className="flex items-center gap-1 text-[8.5px] font-bold text-emerald-800 uppercase">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                  <span className="text-[7px] text-slate-500 leading-tight block mt-0.5">
                    Scan with campus reader to inspect active credentials
                  </span>
                </div>
              </div>
            )}

            <div className="text-right shrink-0">
              <span className="text-[7.5px] font-mono text-slate-400 block uppercase">ISSUE DATE</span>
              <span className="font-mono font-semibold text-[8.5px] text-slate-700">{student.issueDate}</span>
              <span className="text-[7.5px] font-mono text-slate-400 block uppercase mt-0.5">LIBRARY NO</span>
              <span className="font-mono font-bold text-[8.5px] text-slate-800">{student.libraryCode}</span>
            </div>
          </div>

          {/* Barcode Section */}
          {design.showBarcode && (
            <div className="pt-1 flex flex-col items-center">
              <BarcodeSvg
                value={student.libraryCode || student.studentId}
                width={210}
                height={28}
                showText={true}
              />
            </div>
          )}

          {/* Campus Dispatch Return Footer */}
          <div className="pt-1 border-t border-slate-200 text-center text-[7.5px] text-slate-500">
            <div className="flex items-center justify-center gap-1 font-semibold text-slate-700">
              <Building2 className="w-2.5 h-2.5 text-slate-400" />
              <span>{institution.name}</span>
            </div>
            <p className="text-[7px] text-slate-400 mt-0.5 truncate">
              {institution.address} · Helpline: {institution.phone}
            </p>
          </div>
        </div>

        {/* Bottom edge color */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: design.primaryColor }}
        />
      </div>
    );
  }

  // Horizontal Card Back (Landscape: 500px x 315px)
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
      {/* Lanyard slot */}
      {design.showLanyardSlot && (
        <div className="absolute top-2 inset-x-0 flex justify-center z-30 pointer-events-none">
          <div className="w-12 h-2 rounded-full bg-slate-900/90 border border-white/40 shadow-inner flex items-center justify-center">
            <div className="w-8 h-0.5 rounded-full bg-slate-800" />
          </div>
        </div>
      )}

      {/* Magnetic Stripe on top */}
      <div className="pt-6 bg-slate-900">
        <div className="h-10 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border-y border-neutral-800 flex items-center justify-end px-4">
          <span className="text-[7.5px] font-mono text-neutral-500 tracking-widest uppercase">
            CAMPUS ACCESS TRACK · ENCRYPTED DUAL-BAND
          </span>
        </div>
      </div>

      {/* Content Columns */}
      <div className="p-4 flex-1 flex gap-4 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-[9.5px]">
        {/* Left Column: Terms + Contact */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-slate-100/90 p-2 rounded border border-slate-200">
            <span className="text-[8px] font-bold text-slate-800 uppercase block mb-1">
              Regulations & Conditions
            </span>
            <p className="text-[7.5px] text-slate-600 line-clamp-3 leading-snug">
              {institution.terms}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px] py-1">
            <div>
              <span className="text-slate-400 uppercase font-semibold block">Residential Address</span>
              <span className="font-medium text-slate-700 truncate block">{student.address}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold block">Emergency Contact</span>
              <span className="font-mono text-slate-800 truncate block">{student.emergencyContact}</span>
            </div>
          </div>

          {/* Institution Contact */}
          <div className="text-[7.5px] text-slate-500 border-t border-slate-200 pt-1">
            <span className="font-semibold text-slate-700 block">{institution.name}</span>
            <span className="truncate block">{institution.address} · {institution.phone}</span>
          </div>
        </div>

        {/* Right Column: QR Code + Barcode */}
        <div className="w-48 flex flex-col items-center justify-between border-l border-slate-200 pl-4">
          {design.showQrCode && (
            <div className="flex items-center gap-2">
              <QrCodeSvg value={verificationPayload} size={56} />
              <div>
                <span className="text-[8px] font-bold text-emerald-800 uppercase block">Digital Key</span>
                <span className="text-[7px] text-slate-500 block">Instant scanner verify</span>
              </div>
            </div>
          )}

          {design.showBarcode && (
            <div className="w-full flex flex-col items-center">
              <BarcodeSvg
                value={student.libraryCode || student.studentId}
                width={160}
                height={26}
                showText={true}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: design.primaryColor }}
      />
    </div>
  );
};
