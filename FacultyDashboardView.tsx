import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  CalendarCheck, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Send, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Course, Assignment, Submission, SubjectAttendanceSummary } from '../../types';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';

interface FacultyDashboardViewProps {
  courses: Course[];
  assignments: Assignment[];
  submissions: Submission[];
  attendanceSummaries: SubjectAttendanceSummary[];
  onRefreshData: () => void;
}

export const FacultyDashboardView: React.FC<FacultyDashboardViewProps> = ({
  courses,
  assignments,
  submissions,
  attendanceSummaries,
  onRefreshData
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'grading' | 'new-assignment'>('overview');

  // Attendance management state
  const [selectedCourseCode, setSelectedCourseCode] = useState('CS-501');
  const [attDeltaPresent, setAttDeltaPresent] = useState(1);
  const [attDeltaAbsent, setAttDeltaAbsent] = useState(0);
  const [attSaved, setAttSaved] = useState(false);

  // New assignment form state
  const [assignTitle, setAssignTitle] = useState('');
  const [assignCourse, setAssignCourse] = useState('CS-501');
  const [assignDueDate, setAssignDueDate] = useState('Nov 28, 2024 • 11:59 PM');
  const [assignMaxMarks, setAssignMaxMarks] = useState(100);
  const [assignWeight, setAssignWeight] = useState('15% Grade');
  const [assignDesc, setAssignDesc] = useState('');
  const [assignSubmitting, setAssignSubmitting] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);

  // Grading state
  const [selectedSubForGrading, setSelectedSubForGrading] = useState<Submission | null>(null);
  const [gradeScore, setGradeScore] = useState(95);
  const [gradeLetter, setGradeLetter] = useState('A+');
  const [gradeFeedback, setGradeFeedback] = useState('Excellent algorithmic rigor and thorough test suite coverage.');
  const [gradingSuccess, setGradingSuccess] = useState(false);

  // Announcements state
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMsg, setAnnouncementMsg] = useState('');
  const [announcementPosted, setAnnouncementPosted] = useState(false);

  // Handle record attendance
  const handleRecordAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.updateSubjectAttendance(selectedCourseCode, attDeltaPresent, attDeltaAbsent);
    setAttSaved(true);
    onRefreshData();
    setTimeout(() => setAttSaved(false), 2000);
  };

  // Handle create assignment
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim()) return;
    setAssignSubmitting(true);

    const c = courses.find(item => item.code === assignCourse) || courses[0];
    await dataService.addAssignment({
      code: assignCourse,
      title: assignTitle,
      subjectCode: assignCourse,
      subjectName: c.name,
      facultyId: currentUser?.uid || 'faculty_alan_vance',
      facultyName: currentUser?.displayName || 'Dr. Alan Vance',
      description: assignDesc,
      dueDate: assignDueDate,
      maxMarks: Number(assignMaxMarks),
      gradeWeightage: assignWeight,
      priority: 'normal',
      completionStage: 'Not Started',
      completionPercent: 0
    });

    setAssignSubmitting(false);
    setAssignSuccess(true);
    setAssignTitle('');
    setAssignDesc('');
    onRefreshData();
    setTimeout(() => setAssignSuccess(false), 2000);
  };

  // Handle grade submission
  const handleGradeSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubForGrading) return;

    await dataService.gradeSubmission(
      selectedSubForGrading.id,
      Number(gradeScore),
      gradeLetter,
      gradeFeedback
    );

    // Also notify student
    await dataService.addNotification({
      recipientId: selectedSubForGrading.studentId,
      title: `Assignment Graded: ${selectedSubForGrading.assignmentTitle}`,
      message: `Score awarded: ${gradeScore}/100 (${gradeLetter}). Feedback: "${gradeFeedback}"`,
      category: 'assignment',
      priority: 'medium'
    });

    setGradingSuccess(true);
    onRefreshData();
    setTimeout(() => {
      setGradingSuccess(false);
      setSelectedSubForGrading(null);
    }, 1500);
  };

  // Handle broadcast announcement
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim()) return;

    await dataService.addNotification({
      recipientId: 'all',
      title: announcementTitle,
      message: announcementMsg,
      category: 'announcement',
      priority: 'high'
    });

    setAnnouncementPosted(true);
    setAnnouncementTitle('');
    setAnnouncementMsg('');
    onRefreshData();
    setTimeout(() => setAnnouncementPosted(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            Instructor Management Hub
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Faculty Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Logged in as <strong>{currentUser?.displayName || 'Dr. Alan Vance'}</strong> • School of Computing &amp; AI
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'attendance', label: 'Record Attendance' },
            { id: 'grading', label: `Evaluate Submissions (${submissions.length})` },
            { id: 'new-assignment', label: '+ New Assignment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Courses</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2 Courses</p>
              <p className="text-xs text-slate-500 mt-1">CS-501 (Distributed Systems), CS-504</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Students</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">128 Scholars</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Avg Attendance: 88.2%</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Review</span>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {submissions.filter(s => s.status !== 'graded').length} Submissions
              </p>
              <p className="text-xs text-slate-500 mt-1">Due for grading before Nov 10</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Next Scheduled Lecture</span>
              <p className="text-base font-black text-slate-900 dark:text-white mt-1">10:30 AM (LH-302)</p>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Topic: Raft Consensus</p>
            </div>
          </div>

          {/* Quick Broadcast Announcement */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Broadcast Announcement to Course Scholars</h3>
                <p className="text-xs text-slate-500">Sends high-priority bulletin to student dashboard feed</p>
              </div>
              {announcementPosted && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Announcement Broadcasted!
                </span>
              )}
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-3">
              <input
                type="text"
                placeholder="Announcement Title (e.g. Mid-Term Review Session Slides Posted)"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
              />
              <textarea
                rows={2}
                placeholder="Message body, zoom link, or office hours adjustments..."
                value={announcementMsg}
                onChange={(e) => setAnnouncementMsg(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD ATTENDANCE TAB */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Record Lecture Attendance</h3>
              <p className="text-xs text-slate-500">Update session tallies directly in university Firestore database</p>
            </div>
            {attSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Attendance Saved to Cloud!
              </span>
            )}
          </div>

          <form onSubmit={handleRecordAttendance} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Select Course
              </label>
              <select
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-semibold"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} • {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Students Present (Add Sessions)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={attDeltaPresent}
                  onChange={(e) => setAttDeltaPresent(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Unexcused Absences (Add Sessions)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={attDeltaAbsent}
                  onChange={(e) => setAttDeltaAbsent(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Save Attendance Log</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GRADING TAB */}
      {activeTab === 'grading' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Evaluate Student Deliverables</h3>
              <p className="text-xs text-slate-500">Grade code submissions, assign letter grades, and write rubrics feedback</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{sub.subjectCode}</span>
                    <span className="text-slate-400">•</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">{sub.assignmentTitle}</h5>
                  </div>
                  <p className="text-slate-500 text-xs">
                    Scholar: <strong>{sub.studentName} ({sub.studentNumber})</strong> • Submitted {sub.submittedAt}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Package: {sub.fileName} ({sub.fileSize})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {sub.score !== undefined && (
                    <div className="text-right">
                      <span className="font-black text-slate-900 dark:text-white text-sm">{sub.score}/100</span>
                      <span className="ml-1.5 font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                        {sub.letterGrade}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedSubForGrading(sub);
                      setGradeScore(sub.score || 95);
                      setGradeLetter(sub.letterGrade || 'A+');
                      setGradeFeedback(sub.feedback || 'Good work on distributed failover edge cases.');
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    {sub.status === 'graded' ? 'Update Grade' : 'Grade Submission'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grading Modal */}
          {selectedSubForGrading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedSubForGrading.subjectCode} • {selectedSubForGrading.studentName}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedSubForGrading.assignmentTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedSubForGrading(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>

                {gradingSuccess ? (
                  <div className="py-6 text-center text-emerald-600 font-bold text-sm">
                    Grade recorded and notification transmitted to scholar!
                  </div>
                ) : (
                  <form onSubmit={handleGradeSubmission} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Score (out of 100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeScore}
                          onChange={(e) => setGradeScore(Number(e.target.value))}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Letter Grade
                        </label>
                        <select
                          value={gradeLetter}
                          onChange={(e) => setGradeLetter(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
                        >
                          <option value="A+">A+ (Outstanding)</option>
                          <option value="A">A (Excellent)</option>
                          <option value="A-">A- (Very Good)</option>
                          <option value="B+">B+ (Good)</option>
                          <option value="B">B (Satisfactory)</option>
                          <option value="C">C (Pass)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        TA Evaluator Feedback
                      </label>
                      <textarea
                        rows={3}
                        value={gradeFeedback}
                        onChange={(e) => setGradeFeedback(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSubForGrading(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                      >
                        Submit Evaluation
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* NEW ASSIGNMENT TAB */}
      {activeTab === 'new-assignment' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 max-w-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Publish Coursework Assignment</h3>
              <p className="text-xs text-slate-500">Students will receive instant pipeline notifications and git templates</p>
            </div>
            {assignSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Assignment Published!
              </span>
            )}
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Selection
              </label>
              <select
                value={assignCourse}
                onChange={(e) => setAssignCourse(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-semibold"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Assignment Title
              </label>
              <input
                type="text"
                placeholder="e.g. Distributed Key-Value Store with Multi-Paxos"
                value={assignTitle}
                onChange={(e) => setAssignTitle(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Deadline
                </label>
                <input
                  type="text"
                  value={assignDueDate}
                  onChange={(e) => setAssignDueDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Grade Weightage
                </label>
                <input
                  type="text"
                  value={assignWeight}
                  onChange={(e) => setAssignWeight(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project Prompt &amp; Specification
              </label>
              <textarea
                rows={3}
                placeholder="Detailed instructions, required test suites, git repository links..."
                value={assignDesc}
                onChange={(e) => setAssignDesc(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={assignSubmitting}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{assignSubmitting ? 'Publishing...' : 'Publish to Students'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
