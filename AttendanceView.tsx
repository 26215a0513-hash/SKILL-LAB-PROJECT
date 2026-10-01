import React, { useState } from 'react';
import { 
  FileCheck, 
  Download, 
  Plus, 
  ShieldAlert, 
  CalendarCheck, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { SubjectAttendanceSummary, LeaveExemption } from '../../types';
import { AbsenceAppealModal } from '../common/AbsenceAppealModal';

interface AttendanceViewProps {
  attendanceSummaries: SubjectAttendanceSummary[];
  exemptions: LeaveExemption[];
  onRefreshData: () => void;
  onOpenTranscriptModal?: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendanceSummaries,
  exemptions,
  onRefreshData,
  onOpenTranscriptModal
}) => {
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [selectedSubjectForAppeal, setSelectedSubjectForAppeal] = useState<string>('CS-504');
  const [activeLogModal, setActiveLogModal] = useState<SubjectAttendanceSummary | null>(null);
  const [sortBy, setSortBy] = useState<'lowest' | 'highest'>('lowest');

  const sortedSummaries = [...attendanceSummaries].sort((a, b) => {
    return sortBy === 'lowest' ? a.percentage - b.percentage : b.percentage - a.percentage;
  });

  const totalConducted = attendanceSummaries.reduce((sum, s) => sum + s.totalSessions, 0);
  const totalAttended = attendanceSummaries.reduce((sum, s) => sum + s.attended, 0);
  const totalMissed = totalConducted - totalAttended;
  const aggregatePercentage = totalConducted > 0 
    ? parseFloat(((totalAttended / totalConducted) * 100).toFixed(1)) 
    : 86.6;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>ACADEMIC INTELLIGENCE</span>
            <span>•</span>
            <span>Sync: Today at 08:30 AM</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Attendance Tracking & Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Academic Session: <strong className="text-slate-700 dark:text-slate-300">Fall 2024 (Aug – Dec 2024)</strong> • 5th Semester B.Tech Computer Science
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenTranscriptModal ? onOpenTranscriptModal() : alert('Official attendance certificate generated.')}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Official Transcript</span>
          </button>
          <button
            onClick={() => {
              setSelectedSubjectForAppeal('CS-504');
              setAppealModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Exemption</span>
          </button>
        </div>
      </div>

      {/* University Ordinance Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              University Ordinance Sec 14.B
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Minimum <strong>75% attendance</strong> required in each registered subject to qualify for End-Semester Examinations.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-500 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          Policy: Revised 2024
        </span>
      </div>

      {/* 4 Summary Cards (Exact match to Screenshot 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total classes */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Classes Conducted</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{totalConducted}</span>
                <span className="text-xs font-semibold text-slate-400">Sessions</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Across {attendanceSummaries.length} subjects</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">14.2 / wk avg</span>
          </div>
        </div>

        {/* Attended / Missed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Attended / Missed</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{totalAttended}</span>
                <span className="text-base font-bold text-slate-400">/ {totalMissed}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>{totalAttended} Present</span>
            <span>•</span>
            <span>{totalMissed} Abs/OD</span>
          </div>
        </div>

        {/* Aggregate Attendance */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Aggregate Attendance</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{aggregatePercentage}%</span>
                <span className="text-xs font-bold text-emerald-600">+11.6%</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Target: 75.0%</span>
            <span className="text-indigo-600 font-semibold">Rank: Top 15%</span>
          </div>
        </div>

        {/* Safety Buffer */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Safety Buffer</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-rose-600">4</span>
                <span className="text-xs font-bold uppercase text-slate-500">Classes Max</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mt-2">
            You can miss up to <strong>4 more classes</strong> in lowest-attended course without breaching 75%.
          </p>
          <div className="mt-2 text-[10px] font-bold text-rose-600 flex items-center gap-1">
            • Critical Course CS-504
          </div>
        </div>
      </div>

      {/* Curriculum Course Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Curriculum Course Breakdown</h3>
            <p className="text-xs text-slate-500">Live biometric & faculty roll logs cross-referenced with syllabus schedule</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="lowest">Attendance (Lowest First)</option>
              <option value="highest">Attendance (Highest First)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Course & Faculty</th>
                <th className="pb-3 px-2 text-center">Sessions</th>
                <th className="pb-3 px-2 text-center">Attended</th>
                <th className="pb-3 px-2 text-center">Absent</th>
                <th className="pb-3 px-2 text-center">OD / Leave</th>
                <th className="pb-3 px-4">Percentage</th>
                <th className="pb-3 px-2 text-center">Status</th>
                <th className="pb-3 px-2 text-right">Action / Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedSummaries.map((course) => {
                const isWarning = course.percentage <= 75;
                const isExceptional = course.percentage >= 95;

                return (
                  <React.Fragment key={course.code}>
                    <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-start gap-2.5">
                          <span className={`font-mono font-bold ${isWarning ? 'text-rose-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {course.code}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{course.name}</p>
                            <p className="text-[11px] text-slate-400">{course.faculty}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center font-semibold text-slate-700 dark:text-slate-300">
                        {course.totalSessions}
                      </td>
                      <td className="py-4 px-2 text-center font-bold text-slate-900 dark:text-white">
                        {course.attended}
                      </td>
                      <td className={`py-4 px-2 text-center font-bold ${isWarning ? 'text-rose-600' : 'text-slate-500'}`}>
                        {course.absent}
                      </td>
                      <td className="py-4 px-2 text-center font-semibold text-slate-500">
                        {course.odLeave}
                      </td>
                      <td className="py-4 px-4 min-w-[180px]">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className={isWarning ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}>
                              {course.percentage}%
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">Target: 75%</span>
                          </div>
                          {/* Progress line with threshold */}
                          <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isWarning ? 'bg-rose-500' : isExceptional ? 'bg-purple-600' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${course.percentage}%` }}
                            />
                            {/* 75% target marker */}
                            <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-slate-400/80 pointer-events-none" />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isWarning
                              ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                              : isExceptional
                                ? 'bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-950/40 dark:border-purple-900'
                                : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900'
                          }`}
                        >
                          {isWarning ? '⚠ Warning' : isExceptional ? '★ Exceptional' : '✓ Safe'}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        {isWarning ? (
                          <button
                            onClick={() => {
                              setSelectedSubjectForAppeal(course.code);
                              setAppealModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-800 transition-colors"
                          >
                            Absence Appeal
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveLogModal(course)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                          >
                            View Log
                          </button>
                        )}
                      </td>
                    </tr>

                    {/* Strict Warning Alert Banner below course if boundary reached */}
                    {isWarning && (
                      <tr className="bg-rose-50/40 dark:bg-rose-950/20">
                        <td colSpan={8} className="py-2.5 px-4 text-xs text-rose-700 dark:text-rose-300 font-medium">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                              <span>
                                <strong>Strict Warning: At 75.0%.</strong> Any further unexcused absence will immediately trigger Examination Debarment according to Dean Circular #402.
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedSubjectForAppeal(course.code);
                                setAppealModalOpen(true);
                              }}
                              className="font-bold underline hover:text-rose-900 shrink-0 ml-4"
                            >
                              File Medical Exemption →
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Monthly Trend & Exemptions Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Attendance Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Attendance Trend</h3>
              <p className="text-xs text-slate-500">Aggregate progression across active semester timeline</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs">
                All Months
              </button>
              <button className="px-2.5 py-1 text-slate-500 hover:text-slate-800">Last 30 Days</button>
              <button className="px-2.5 py-1 text-slate-500 hover:text-slate-800">Subject-wise</button>
            </div>
          </div>

          {/* Trend Chart Graphic */}
          <div className="h-48 bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 relative flex items-end justify-between">
            {/* 75% threshold guide */}
            <div className="absolute inset-x-4 top-[45%] border-b border-dashed border-rose-300 dark:border-rose-900/60 pointer-events-none flex justify-end">
              <span className="text-[10px] text-rose-500 font-mono -mt-4 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                75% Threshold
              </span>
            </div>

            {[
              { month: 'August', rate: '92.0%', height: '80%' },
              { month: 'September', rate: '88.0%', height: '72%' },
              { month: 'October', rate: '84.0%', height: '64%' },
              { month: 'November', rate: '86.6%', height: '70%', active: true },
            ].map((m, idx) => (
              <div key={idx} className="flex flex-col items-center z-10 w-24">
                <span className={`text-xs font-bold ${m.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {m.rate}
                </span>
                <div 
                  className={`w-10 rounded-t-xl transition-all duration-500 mt-2 ${
                    m.active 
                      ? 'bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-md shadow-indigo-100' 
                      : 'bg-indigo-200 dark:bg-indigo-900/50'
                  }`} 
                  style={{ height: m.height }}
                />
                <span className="text-[11px] font-semibold text-slate-500 mt-2">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              Monthly Average Rate
            </span>
            <span>Calculated over 72 instructional days</span>
          </div>
        </div>

        {/* Exemptions & Leave Portal */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Exemptions & Leave Portal</h3>
            <p className="text-xs text-slate-500">Medical certificates & On-Duty approval</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Need to claim back missed sessions for verified health or university representation reasons?
            </p>
            <button
              onClick={() => {
                setSelectedSubjectForAppeal('CS-504');
                setAppealModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Submit Medical / On-Duty Request</span>
            </button>
          </div>

          {/* Recent Leave History */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recent Leave History</p>
            {exemptions.map((ex) => (
              <div 
                key={ex.id}
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ex.title}</h5>
                  <p className="text-[11px] text-slate-400">{ex.dateRange}</p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    ex.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : ex.status === 'pending'
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                        : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {ex.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Absence Appeal Modal */}
      <AbsenceAppealModal
        isOpen={appealModalOpen}
        onClose={() => setAppealModalOpen(false)}
        defaultSubjectCode={selectedSubjectForAppeal}
        onSuccess={onRefreshData}
      />

      {/* View Log Modal */}
      {activeLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Attendance Log: {activeLogModal.name}
              </h4>
              <button 
                onClick={() => setActiveLogModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Total Lectures Conducted:</span>
                <span className="font-bold">{activeLogModal.totalSessions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Attended Lectures:</span>
                <span className="font-bold text-emerald-600">{activeLogModal.attended}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Unexcused Absences:</span>
                <span className="font-bold text-rose-500">{activeLogModal.absent}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Authorized On-Duty / OD:</span>
                <span className="font-bold text-indigo-500">{activeLogModal.odLeave}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm">
                <span>Net Percentage:</span>
                <span className="text-indigo-600 dark:text-indigo-400">{activeLogModal.percentage}%</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Verified by Department Attendance Scrutiny Committee. Last synced biometrically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
