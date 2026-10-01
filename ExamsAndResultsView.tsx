import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Printer, 
  Download, 
  FileText, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  Send,
  Star
} from 'lucide-react';
import { Exam, SemesterTranscript, UserProfile } from '../../types';
import { HallTicketModal } from '../common/HallTicketModal';

interface ExamsAndResultsViewProps {
  exams: Exam[];
  transcripts: SemesterTranscript[];
  user: UserProfile | null;
}

export const ExamsAndResultsView: React.FC<ExamsAndResultsViewProps> = ({
  exams,
  transcripts,
  user
}) => {
  const [hallTicketOpen, setHallTicketOpen] = useState(false);
  const [activeSemIndex, setActiveSemIndex] = useState(0);
  const [gradeSheetModalOpen, setGradeSheetModalOpen] = useState(false);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);

  const currentTranscript = transcripts[activeSemIndex] || transcripts[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Mid-Semester Cycle Active</span>
            <span>•</span>
            <span>Updated Today, 08:30 AM</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Examinations &amp; Academic Records
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fall 2024 Mid-Semester &amp; End-Semester Examination Schedules &amp; Official Transcripts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHallTicketOpen(true)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exam Hall Ticket (PDF)</span>
          </button>
          <button
            onClick={() => setGradeSheetModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Grade Sheet</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards (Screenshot 4 match) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cumulative CGPA */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cumulative CGPA</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">3.84</span>
                <span className="text-xs font-semibold text-slate-400">/ 4.00</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            ↗ Top 3% Batch Rank
          </div>
        </div>

        {/* Card 2: Earned Credits */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Earned Credits</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">98</span>
                <span className="text-xs font-semibold text-slate-400">/ 160 Total</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium">
            Term 5 Progression On Track
          </div>
        </div>

        {/* Card 3: Honors Division */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Honors Division</p>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                Dean's List Awardee
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium truncate">
            Top 5% School of Computing &amp; AI
          </div>
        </div>

        {/* Card 4: Academic Standing */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Academic Standing</p>
              <h3 className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                Good Standing
              </h3>
              <p className="text-[10px] text-slate-400">(No Backlogs)</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium">
            Eligible for Capstone Track
          </div>
        </div>
      </div>

      {/* Mid-Semester Examination Schedule Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Mid-Semester Examination Schedule
            </h3>
            <p className="text-xs text-slate-500">Fall 2024 Official Invigilation &amp; Seating Allocations</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Exam Hall: <strong>Block A &amp; Computing Hub</strong>
          </span>
        </div>

        {/* Candidate Protocol Banner */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <AlertCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <p>
            <strong>Mandatory Candidate Protocol:</strong> Mid-Term Examinations commence promptly on Nov 14, 2024. Reporting time is exactly 30 minutes prior to exam start. Physical Student ID Card and stamped Hall Ticket are compulsory for entry. No electronic wearable devices permitted.
          </p>
        </div>

        {/* 4 Paper Cards (Screenshot 4 match) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold">
                  <span className="text-indigo-600 dark:text-indigo-400 uppercase font-mono">{exam.paperCode}</span>
                  <span className="text-slate-400">{exam.durationMinutes} Mins</span>
                </div>

                <div className="mt-3">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {exam.subjectName}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {exam.subjectCode} • {exam.credits}.0 Credits
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{exam.date} • {exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{exam.venue} • Desk: <strong>{exam.seatDesk}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Invigilator: {exam.invigilator}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  {exam.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semester Grade Breakdown & Performance History */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Semester Grade Breakdown &amp; Performance History
            </h3>
            <p className="text-xs text-slate-500">Verified institutional Examination Board records and credit transcripts</p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>

        {/* Semester Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          {transcripts.map((t, idx) => (
            <button
              key={t.semesterId}
              onClick={() => setActiveSemIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSemIndex === idx
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{t.semesterName}</span>
              <span className="ml-2 font-mono font-semibold opacity-75">SGPA: {t.sgpa}</span>
            </button>
          ))}
        </div>

        {/* Official Results Ledger Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {currentTranscript.semesterName} Official Results Ledger
            </span>
            <span>•</span>
            <span>{currentTranscript.publishedDate}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            Academic Controller Hash: {currentTranscript.controllerHash}
          </span>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Course Code</th>
                <th className="pb-3 px-2">Course Title</th>
                <th className="pb-3 px-2 text-center">Credits</th>
                <th className="pb-3 px-2 text-center">Internal (40)</th>
                <th className="pb-3 px-2 text-center">End-Sem (60)</th>
                <th className="pb-3 px-2 text-center">Total (100)</th>
                <th className="pb-3 px-2 text-center">Grade Point</th>
                <th className="pb-3 px-2 text-center">Letter</th>
                <th className="pb-3 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentTranscript.courses.length > 0 ? (
                currentTranscript.courses.map((course) => (
                  <tr key={course.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {course.code}
                    </td>
                    <td className="py-3 px-2">
                      <p className="font-bold text-slate-900 dark:text-white">{course.title}</p>
                      <p className="text-[11px] text-slate-400">{course.faculty}</p>
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {course.credits.toFixed(1)}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {course.internalMarks}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {course.endSemMarks}
                    </td>
                    <td className="py-3 px-2 text-center font-extrabold text-slate-900 dark:text-white">
                      {course.totalMarks}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800 dark:text-slate-200">
                      {course.gradePoint.toFixed(1)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="font-black px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {course.letterGrade}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600 text-[11px]">
                        ✓ {course.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                    Detailed archive ledger loaded for earlier semester record. SGPA: {currentTranscript.sgpa}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Ledger Summary Footer */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Registered</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {currentTranscript.creditsRegistered} Credit Units
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Earned Credits</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {currentTranscript.creditsEarned} Credit Units
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Semester GPA</span>
              <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                {currentTranscript.sgpa} / 4.00
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
            <Award className="w-4 h-4" />
            <span>Dean's Honor Roll Standard</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Cumulative Grade Distribution & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cumulative Grade Distribution */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Cumulative Grade Distribution</h3>
              <p className="text-xs text-slate-500">Breakdown across all 98 completed credits</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">98 / 98 Credits Graded</span>
          </div>

          {/* Segmented bar */}
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div className="bg-indigo-600 h-full" style={{ width: '45%' }} title="Grade A+ (45%)" />
            <div className="bg-blue-500 h-full" style={{ width: '35%' }} title="Grade A (35%)" />
            <div className="bg-purple-500 h-full" style={{ width: '20%' }} title="Grade B+ (20%)" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">• Grade A+</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">45%</p>
              <p className="text-[10px] text-slate-400">44 Credits earned</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/60">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">• Grade A</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">35%</p>
              <p className="text-[10px] text-slate-400">34 Credits earned</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/60">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">• Grade B+</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">20%</p>
              <p className="text-[10px] text-slate-400">20 Credits earned</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Academic Trend Trajectory: Steady climb 3.65 (Sem 1) → 3.76 (Sem 4)
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-4 rounded-xs bg-indigo-200" />
              <span className="w-2 h-4 rounded-xs bg-indigo-300" />
              <span className="w-2 h-4 rounded-xs bg-indigo-400" />
              <span className="w-2 h-4 rounded-xs bg-indigo-600" />
            </div>
          </div>
        </div>

        {/* Right (1 Col): Transcripts & Re-evaluation Actions */}
        <div className="space-y-4">
          {/* Order Official Transcripts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Order Official Transcripts / WES Evaluation
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generate encrypted, tamper-evident digital transcripts directly dispatched to global universities, WES, or employer verification engines.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Turnaround: 24-48 Hours</span>
              <button
                onClick={() => alert('WES Transcript Request submitted to Academic Registrar.')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Request Packet</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Apply for Grade Re-evaluation */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Apply for Grade Re-evaluation
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dispute a final grade or request second-evaluator review for Term IV coursework within the 14-day academic appeals window.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-rose-500 font-semibold">Deadline: Nov 25, 2024</span>
              <button
                onClick={() => alert('Grievance & Scrutiny portal opened for Spring 2024.')}
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1"
              >
                <span>File Grievance</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hall Ticket Modal */}
      <HallTicketModal
        isOpen={hallTicketOpen}
        onClose={() => setHallTicketOpen(false)}
        exams={exams}
        user={user}
      />

      {/* Grade Sheet Modal */}
      {gradeSheetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Official Grade Sheet &amp; Transcripts
                </h4>
              </div>
              <button
                onClick={() => setGradeSheetModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Cryptographically signed official grade records for candidate <strong>{user?.displayName} ({user?.studentId})</strong>. Validated by autonomous university board.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span>Total Accumulated Credits:</span>
                <strong>98 / 160</strong>
              </div>
              <div className="flex justify-between">
                <span>Cumulative Grade Point Average (CGPA):</span>
                <strong className="text-indigo-600 dark:text-indigo-400">3.84 / 4.00</strong>
              </div>
              <div className="flex justify-between">
                <span>Academic Honors:</span>
                <strong className="text-emerald-600">Dean's Honor Roll List</strong>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Transcripts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
