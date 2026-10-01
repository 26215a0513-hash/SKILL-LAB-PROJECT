import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ShieldAlert, 
  Plus, 
  CheckCircle2, 
  Search, 
  Award, 
  Calendar,
  Building,
  Sparkles,
  Layers
} from 'lucide-react';
import { Course, Exam } from '../../types';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardViewProps {
  courses: Course[];
  exams: Exam[];
  onRefreshData: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  courses,
  exams,
  onRefreshData
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'students' | 'courses' | 'add-course'>('stats');

  // New course form
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDept, setCourseDept] = useState('School of Computing & AI');
  const [courseCredits, setCourseCredits] = useState(4.0);
  const [courseFaculty, setCourseFaculty] = useState('Dr. Alan Vance');
  const [courseRoom, setCourseRoom] = useState('LH-305');
  const [courseAdded, setCourseAdded] = useState(false);

  // Student directory
  const studentRoster = [
    { id: '#CS-2022-8492', name: 'Elena Vance', email: 'elena.vance@campus.edu', gpa: 3.84, att: '86.4%', standing: 'Good' },
    { id: '#CS-2022-8493', name: 'Marcus Miller', email: 'marcus.m@campus.edu', gpa: 3.65, att: '82.1%', standing: 'Good' },
    { id: '#CS-2022-8494', name: 'Sophia Chen', email: 'sophia.c@campus.edu', gpa: 3.92, att: '94.0%', standing: 'Dean Honors' },
    { id: '#CS-2022-8495', name: 'David Kumar', email: 'david.k@campus.edu', gpa: 3.41, att: '76.2%', standing: 'Warning Boundary' },
    { id: '#CS-2022-8496', name: 'Aaliyah Patel', email: 'aaliyah.p@campus.edu', gpa: 3.79, att: '89.5%', standing: 'Good' },
  ];

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim()) return;

    await dataService.addCourse({
      code: courseCode.trim().toUpperCase(),
      name: courseName.trim(),
      department: courseDept,
      credits: Number(courseCredits),
      semester: 'Fall 2024 (Semester 5)',
      facultyName: courseFaculty,
      facultyEmail: 'faculty@campus.edu',
      room: courseRoom,
      totalSessions: 40
    });

    setCourseAdded(true);
    setCourseCode('');
    setCourseName('');
    onRefreshData();
    setTimeout(() => setCourseAdded(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            University Academic Administration
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Institutional Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Campus-wide registry control, syllabus accreditation, and student records
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {[
            { id: 'stats', label: 'Institutional Metrics' },
            { id: 'students', label: 'Student Directory' },
            { id: 'courses', label: `Accredited Courses (${courses.length})` },
            { id: 'add-course', label: '+ Provision Course' },
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

      {/* METRICS TAB */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Scholars</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2,480</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+140 Fall Intake</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Faculty</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">142 Members</p>
              <p className="text-xs text-indigo-600 font-semibold mt-1">100% Tenured / Visiting</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Campus Attendance Rate</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">87.4%</p>
              <p className="text-xs text-slate-500 mt-1">&gt;75% Statutory Compliance</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Exam Hall Allocation</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">100% Ready</p>
              <p className="text-xs text-purple-600 font-semibold mt-1">Hall Tickets Generated</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Departmental Accreditation Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">School of Computing &amp; AI</h5>
                <p className="text-slate-500 mt-1">6 Accredited Majors • ABET Accredited Tier 1</p>
                <span className="inline-block mt-3 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                  ✓ Verified Standing
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Electrical &amp; Embedded Systems</h5>
                <p className="text-slate-500 mt-1">4 Accredited Majors • IoT &amp; VLSI Laboratories</p>
                <span className="inline-block mt-3 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                  ✓ Verified Standing
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Humanities &amp; IP Law</h5>
                <p className="text-slate-500 mt-1">Ethical Computing &amp; Cyber Jurisdiction</p>
                <span className="inline-block mt-3 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                  ✓ Verified Standing
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDENTS DIRECTORY */}
      {activeTab === 'students' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Student Register</h3>
            <span className="text-xs text-slate-500">School of Computing &amp; AI (Batch 2022)</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  <th className="pb-3 px-2">Student ID</th>
                  <th className="pb-3 px-2">Full Name</th>
                  <th className="pb-3 px-2">Email</th>
                  <th className="pb-3 px-2 text-center">CGPA</th>
                  <th className="pb-3 px-2 text-center">Attendance</th>
                  <th className="pb-3 px-2 text-right">Academic Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {studentRoster.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.id}</td>
                    <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="py-3 px-2 text-slate-500">{s.email}</td>
                    <td className="py-3 px-2 text-center font-bold">{s.gpa}</td>
                    <td className="py-3 px-2 text-center font-bold text-emerald-600">{s.att}</td>
                    <td className="py-3 px-2 text-right">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                        {s.standing}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COURSES TAB */}
      {activeTab === 'courses' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active University Courses</h3>
            <button
              onClick={() => setActiveTab('add-course')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Provision New</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {courses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{c.code}</span>
                  <span className="text-slate-400">{c.credits}.0 Credits</span>
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</h5>
                <p className="text-slate-500">{c.facultyName}</p>
                <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <span>Room: {c.room}</span>
                  <span>{c.totalSessions} Sessions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROVISION COURSE TAB */}
      {activeTab === 'add-course' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 max-w-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Provision New Curriculum Course</h3>
              <p className="text-xs text-slate-500">Adds accredited course code into university syllabus database</p>
            </div>
            {courseAdded && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Course Provisioned!
              </span>
            )}
          </div>

          <form onSubmit={handleAddCourse} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. CS-506"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={courseCredits}
                  onChange={(e) => setCourseCredits(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Title
              </label>
              <input
                type="text"
                placeholder="e.g. Quantum Computing & Cryptography"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Instructor
                </label>
                <input
                  type="text"
                  value={courseFaculty}
                  onChange={(e) => setCourseFaculty(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Lecture Hall / Room
                </label>
                <input
                  type="text"
                  value={courseRoom}
                  onChange={(e) => setCourseRoom(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Save Course to Database</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
