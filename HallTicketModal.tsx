import React from 'react';
import { X, Printer, ShieldCheck, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Exam, UserProfile } from '../../types';

interface HallTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  exams: Exam[];
  user: UserProfile | null;
}

export const HallTicketModal: React.FC<HallTicketModalProps> = ({ isOpen, onClose, exams, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Official Examination Hall Ticket (PDF)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Hall Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Body */}
        <div className="p-8 space-y-6 text-slate-800 dark:text-slate-200">
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 text-center space-y-1">
            <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Campus University Institute of Technology
            </h2>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-widest">
              OFFICE OF THE CONTROLLER OF EXAMINATIONS • AUTONOMOUS
            </p>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              HALL TICKET • FALL 2024 MID-SEMESTER EXAMINATIONS
            </p>
          </div>

          {/* Candidate Profile Details */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Candidate Name</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{user?.displayName || 'Elena Vance'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Student Roll / ID</span>
              <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                {user?.studentId || '#CS-2022-8492'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Course & Branch</span>
              <p className="font-semibold text-slate-900 dark:text-white">B.Tech Computer Science (Sem 5)</p>
            </div>
          </div>

          {/* Exam Timetable Ledger */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Invigilation Schedule</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">Paper / Code</th>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Date & Time</th>
                    <th className="p-2.5">Seating Venue</th>
                    <th className="p-2.5">Invigilator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {exams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-2.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">
                        {exam.subjectCode}
                      </td>
                      <td className="p-2.5 font-semibold text-slate-900 dark:text-white">
                        {exam.subjectName}
                      </td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">
                        {exam.date} • {exam.time}
                      </td>
                      <td className="p-2.5 font-medium text-slate-700 dark:text-slate-300">
                        {exam.venue} ({exam.seatDesk})
                      </td>
                      <td className="p-2.5 text-slate-500">
                        {exam.invigilator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Candidate Rules Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              <strong>Mandatory Protocol:</strong> Candidates must report 30 minutes prior to exam commencement. Physical Student ID Card along with this stamped Hall Ticket is compulsory. Smartwatches and electronic wearable devices are strictly prohibited.
            </p>
          </div>

          {/* Signature / Validation Strip */}
          <div className="pt-6 flex items-end justify-between border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="space-y-1">
              <div className="w-40 border-b border-dashed border-slate-400 h-8" />
              <p className="text-[10px] uppercase font-bold text-slate-400">Candidate Signature</p>
            </div>
            <div className="text-right space-y-1">
              <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                DR. ROBERT V. STERLING
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Controller of Examinations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
