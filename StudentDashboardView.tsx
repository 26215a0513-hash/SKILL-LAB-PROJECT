import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  CreditCard, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Award, 
  ChevronRight, 
  BookOpen, 
  Terminal,
  ExternalLink,
  Download,
  CalendarCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Assignment, Exam } from '../../types';

interface StudentDashboardViewProps {
  onOpenDigitalId: () => void;
  onOpenHallTicket: () => void;
  onNavigateTab: (tab: string) => void;
  assignments: Assignment[];
  exams: Exam[];
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  onOpenDigitalId,
  onOpenHallTicket,
  onNavigateTab,
  assignments,
  exams,
}) => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Semester 5 • School of Computing & AI • {currentUser?.studentId || '#CS-2022-8492'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good Morning, {currentUser?.displayName?.split(' ')[0] || 'Elena'}! 👋
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              You're on track for Dean's Academic Honors this term. Keep your momentum going into midterms.
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>Current CGPA: <strong className="text-indigo-600 dark:text-indigo-400">3.84</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                <span>Term Credits: <strong>22/24</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Next: <strong>Distributed Systems @ 10:30 AM (LH-302)</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDigitalId}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
            >
              <UserCheck className="w-4 h-4 text-slate-500" />
              <span>Digital Student ID</span>
            </button>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Full Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Attendance */}
        <div 
          onClick={() => onNavigateTab('attendance')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Attendance</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">86.4%</h2>
            </div>
            {/* Radial indicator */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +1.2% this month
            </span>
            <span className="text-slate-400 text-[11px]">Min 75% req.</span>
          </div>
        </div>

        {/* Card 2: Cumulative CGPA */}
        <div 
          onClick={() => onNavigateTab('exams')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cumulative CGPA</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">3.84</span>
                <span className="text-xs font-semibold text-slate-400">/ 4.0</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.08 vs Sem 4
            </span>
            <span className="text-slate-500 font-medium text-[11px]">Dean's Honor List</span>
          </div>
        </div>

        {/* Card 3: Coursework */}
        <div 
          onClick={() => onNavigateTab('assignments')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Coursework</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">3 Due Soon</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-rose-500 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> 1 urgent (18 hrs)
            </span>
            <span className="text-slate-400 text-[11px]">2 next week</span>
          </div>
        </div>

        {/* Card 4: Mid-Semester Exams */}
        <div 
          onClick={() => onNavigateTab('exams')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mid-Semester Exams</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">In 12 Days</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[140px]">
              First: Distributed Systems
            </span>
            <span className="text-slate-400 text-[11px]">Nov 14 • LH-101</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 2 Cols, Right 1 Col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* GPA Trajectory & Academic Progress Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">GPA Trajectory</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Semester Academic Progress</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                • Projected Sem 5: 3.84
              </span>
            </div>

            {/* Trajectory Graphic Line */}
            <div className="h-44 relative flex items-end justify-between px-4 pb-4 pt-6 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
              {/* Background horizontal guide lines */}
              <div className="absolute inset-x-4 top-8 border-b border-dashed border-slate-200 dark:border-slate-700 pointer-events-none" />
              <div className="absolute inset-x-4 top-20 border-b border-dashed border-slate-200 dark:border-slate-700 pointer-events-none" />
              <div className="absolute inset-x-4 top-32 border-b border-dashed border-slate-200 dark:border-slate-700 pointer-events-none" />

              {/* Data points */}
              {[
                { sem: 'Sem 1', gpa: '3.65', height: '62%' },
                { sem: 'Sem 2', gpa: '3.72', height: '70%' },
                { sem: 'Sem 3', gpa: '3.78', height: '78%' },
                { sem: 'Sem 4', gpa: '3.76', height: '75%' },
                { sem: 'Sem 5 (P)', gpa: '3.84', height: '88%', active: true },
              ].map((pt, idx) => (
                <div key={idx} className="flex flex-col items-center z-10 space-y-2">
                  <span className={`text-xs font-bold ${pt.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {pt.gpa}
                  </span>
                  <div className="w-12 flex flex-col items-center">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        pt.active 
                          ? 'bg-indigo-600 border-white shadow-md ring-4 ring-indigo-100 dark:ring-indigo-950 scale-125' 
                          : 'bg-white dark:bg-slate-900 border-indigo-500'
                      }`} 
                    />
                    <div className="w-1 bg-indigo-200 dark:bg-indigo-900/60 mt-1 rounded-full" style={{ height: '35px' }} />
                  </div>
                  <span className={`text-[11px] font-semibold ${pt.active ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                    {pt.sem}
                  </span>
                </div>
              ))}
            </div>

            {/* Current Course Grades Row */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Current Course Grades</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { title: 'Algorithms', code: 'CS-301', grade: 'A', bg: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
                  { title: 'Operating Systems', code: 'CS-303', grade: 'A-', bg: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
                  { title: 'Distributed Systems', code: 'CS-305', grade: 'A+', bg: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
                  { title: 'Compiler Design', code: 'CS-307', grade: 'B+', bg: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' },
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.code}</p>
                    </div>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${item.bg}`}>
                      {item.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Work in Progress: Coursework & Submissions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Work in Progress</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Coursework & Submissions</h3>
              </div>
              <button 
                onClick={() => onNavigateTab('assignments')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View All ({assignments.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Assignment Card 1: Urgent Raft */}
              <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Distributed Consensus Algorithm Implementation
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        • Urgent
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">Distributed Systems</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due Tomorrow, 11:59 PM
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('assignments')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 shadow-sm transition-colors"
                >
                  Submit Work
                </button>
              </div>

              {/* Assignment Card 2: Compiler Lexical */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Lexical Analyzer in C/Flex
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        Medium
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>Compiler Design</span>
                      <span>•</span>
                      <span>Due Nov 12, 5:00 PM</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('assignments')}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shrink-0 transition-colors"
                >
                  View Brief
                </button>
              </div>

              {/* Assignment Card 3: Transfer Learning */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Convolutional Neural Network Case Study
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        Normal
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>Machine Learning</span>
                      <span>•</span>
                      <span>Due Nov 16, 11:59 PM</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0">
                  In Progress (60%)
                </span>
              </div>
            </div>
          </div>

          {/* Innovation Lab Card (as featured in Screenshot 1) */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Computing Center Innovation Lab
              </span>
              <h3 className="text-lg font-extrabold text-white">
                GPU Cluster Access Open for Mid-Term Projects
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Elena, your reservation for the 8x A100 Tensor Core node is approved for next Tuesday from 02:00 PM to 06:00 PM. High-throughput storage access configured.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert('SSH Token & Access Key copied to clipboard: ssh student@hpc.campus.edu -p 2222')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
                >
                  Launch SSH Session Guide
                </button>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80"
              alt="Computing cluster"
              className="w-48 h-32 rounded-2xl object-cover ring-2 ring-white/20 shadow-md shrink-0"
            />
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Today's Timeline (Thursday, Nov 2) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Timeline</p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Thursday, Nov 2</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                4 Sessions
              </span>
            </div>

            <div className="relative pl-6 space-y-5 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
              {/* Session 1 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">09:00 – 10:15 AM</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Attended
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Advanced Algorithms</h4>
                <p className="text-[11px] text-slate-400">Prof. Dr. Sarah Jenkins • CS-204</p>
              </div>

              {/* Session 2 (NOW) */}
              <div className="relative group">
                <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950 animate-pulse" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">10:30 – 11:45 AM</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-600 text-white shadow-2xs">
                    NOW
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Distributed Systems</h4>
                <p className="text-[11px] text-slate-500">Dr. Alan Vance • Lecture Hall LH-302</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    📍 In Person
                  </span>
                  <span className="text-[10px] font-medium text-slate-500">Topic: Raft Consensus</span>
                </div>
              </div>

              {/* Session 3 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">01:30 – 03:30 PM</span>
                  <span className="text-[10px] font-semibold text-slate-500">Lab Session</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Machine Learning Lab</h4>
                <p className="text-[11px] text-slate-400">Prof. Kevin Zhang • Computing Lab 3</p>
              </div>

              {/* Session 4 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">04:00 – 05:00 PM</span>
                  <span className="text-[10px] font-semibold text-slate-400">Optional</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Faculty Office Hours</h4>
                <p className="text-[11px] text-slate-400">Dr. Sarah Jenkins • Faculty Tower 4B</p>
              </div>
            </div>
          </div>

          {/* Campus Bulletin / Notices & Alerts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Campus Bulletin</p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Notices & Alerts</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
            </div>

            <div className="space-y-3">
              {/* Notice 1: Hall Ticket with download button */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                  <Download className="w-4 h-4" />
                  <span>Mid-Term Hall Tickets Released</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Exam Hall Tickets for Fall 2024 Mid-Terms are now ready for validation. Please print a physical copy prior to Nov 14.
                </p>
                <button
                  onClick={onOpenHallTicket}
                  className="w-full py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-2xs transition-colors"
                >
                  Download Hall Ticket (PDF)
                </button>
              </div>

              {/* Notice 2: Guest Lecture */}
              <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">Guest Lecture</span>
                  <span className="text-[10px] text-slate-400">This Friday • 3 PM</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Cloud Infrastructure at Hyperscale</h4>
                <p className="text-[11px] text-slate-500">
                  Delivered by AWS Principal Solutions Architect. Venue: University Main Auditorium A.
                </p>
              </div>

              {/* Notice 3: Library Renewal */}
              <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Library System</span>
                  <span className="text-[10px] font-semibold text-rose-500">Due in 3 days</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Book Renewal Reminder</h4>
                <p className="text-[11px] text-slate-500">
                  "Introduction to Algorithms" (Cormen et al.) is due Nov 5. Auto-renew enabled once.
                </p>
                <button 
                  onClick={() => alert('Book renewed for 14 days.')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1 inline-block"
                >
                  Renew for 14 More Days →
                </button>
              </div>

              {/* Academic Advisor Desk */}
              <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Academic Advisor Desk</h5>
                    <p className="text-[10px] text-slate-400">Dr. Robert Sterling</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Appointment slot requested with Dr. Robert Sterling.')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
