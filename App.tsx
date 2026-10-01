import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StudentDashboardView } from './components/student/StudentDashboardView';
import { AttendanceView } from './components/student/AttendanceView';
import { AssignmentsView } from './components/student/AssignmentsView';
import { ExamsAndResultsView } from './components/student/ExamsAndResultsView';
import { TimetableView } from './components/student/TimetableView';
import { CoursesView } from './components/student/CoursesView';
import { MessagesView } from './components/student/MessagesView';
import { NotificationsView } from './components/student/NotificationsView';
import { ProfileView } from './components/student/ProfileView';
import { SettingsView } from './components/student/SettingsView';
import { FacultyDashboardView } from './components/faculty/FacultyDashboardView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { DigitalIdModal } from './components/common/DigitalIdModal';
import { HallTicketModal } from './components/common/HallTicketModal';
import { dataService } from './services/dataService';
import { 
  Course, 
  SubjectAttendanceSummary, 
  Assignment, 
  Submission, 
  Exam, 
  SemesterTranscript, 
  NotificationItem, 
  MessageItem, 
  LeaveExemption, 
  TimetableSlot 
} from './types';

function MainApp() {
  const { currentUser, role } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('campuspulse_dark') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [digitalIdOpen, setDigitalIdOpen] = useState(false);
  const [hallTicketOpen, setHallTicketOpen] = useState(false);

  // App datasets
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendanceSummaries, setAttendanceSummaries] = useState<SubjectAttendanceSummary[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [transcripts, setTranscripts] = useState<SemesterTranscript[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [exemptions, setExemptions] = useState<LeaveExemption[]>([]);
  const [timetable, setTimetable] = useState<Record<string, TimetableSlot[]>>({});

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('campuspulse_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('campuspulse_dark', 'false');
    }
  }, [darkMode]);

  // Load all initial portal data
  const refreshData = async () => {
    const [c, att, assign, subs, ex, tr, notif, msg, exempt, tt] = await Promise.all([
      dataService.getCourses(),
      dataService.getAttendanceSummaries(),
      dataService.getAssignments(),
      dataService.getSubmissions(),
      dataService.getExams(),
      dataService.getTranscripts(),
      dataService.getNotifications(),
      dataService.getMessages(),
      dataService.getExemptions(),
      dataService.getWeeklyTimetable()
    ]);

    setCourses(c);
    setAttendanceSummaries(att);
    setAssignments(assign);
    setSubmissions(subs);
    setExams(ex);
    setTranscripts(tr);
    setNotifications(notif);
    setMessages(msg);
    setExemptions(exempt);
    setTimetable(tt);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Sync tab if user role changes
  useEffect(() => {
    if (role === 'faculty' && currentTab === 'dashboard') {
      setCurrentTab('faculty-dashboard');
    } else if (role === 'admin' && currentTab === 'dashboard') {
      setCurrentTab('admin-dashboard');
    } else if (role === 'student' && (currentTab.startsWith('faculty-') || currentTab.startsWith('admin-'))) {
      setCurrentTab('dashboard');
    }
  }, [role]);

  // Reset demo data handler
  const handleResetData = () => {
    localStorage.removeItem('campuspulse_courses');
    localStorage.removeItem('campuspulse_attendance');
    localStorage.removeItem('campuspulse_assignments');
    localStorage.removeItem('campuspulse_submissions');
    localStorage.removeItem('campuspulse_exemptions');
    localStorage.removeItem('campuspulse_notifications');
    localStorage.removeItem('campuspulse_messages');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        unreadMessagesCount={messages.filter(m => !m.read && m.recipientId === currentUser?.uid).length || 1}
        unreadNotificationsCount={notifications.filter(n => !n.read).length}
        onOpenDigitalId={() => setDigitalIdOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenNotifications={() => setCurrentTab('notifications')}
          onOpenMessages={() => setCurrentTab('messages')}
          notifications={notifications}
          onOpenProfile={() => setCurrentTab('profile')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Tab View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Student Tabs */}
          {currentTab === 'dashboard' && (
            <StudentDashboardView
              onOpenDigitalId={() => setDigitalIdOpen(true)}
              onOpenHallTicket={() => setHallTicketOpen(true)}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              assignments={assignments}
              exams={exams}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceView
              attendanceSummaries={attendanceSummaries}
              exemptions={exemptions}
              onRefreshData={refreshData}
              onOpenTranscriptModal={() => setCurrentTab('exams')}
            />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              submissions={submissions}
              onRefreshData={refreshData}
            />
          )}

          {currentTab === 'exams' && (
            <ExamsAndResultsView
              exams={exams}
              transcripts={transcripts}
              user={currentUser}
            />
          )}

          {currentTab === 'timetable' && (
            <TimetableView timetable={timetable} />
          )}

          {currentTab === 'courses' && (
            <CoursesView courses={courses} />
          )}

          {currentTab === 'messages' && (
            <MessagesView
              messages={messages}
              onRefreshData={refreshData}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onRefreshData={refreshData}
              onOpenHallTicket={() => setHallTicketOpen(true)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView onOpenDigitalId={() => setDigitalIdOpen(true)} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onResetData={handleResetData}
            />
          )}

          {/* Faculty Tabs */}
          {(currentTab === 'faculty-dashboard' || currentTab === 'faculty-attendance' || currentTab === 'faculty-assignments') && (
            <FacultyDashboardView
              courses={courses}
              assignments={assignments}
              submissions={submissions}
              attendanceSummaries={attendanceSummaries}
              onRefreshData={refreshData}
            />
          )}

          {/* Admin Tabs */}
          {(currentTab === 'admin-dashboard' || currentTab === 'admin-students' || currentTab === 'admin-faculty') && (
            <AdminDashboardView
              courses={courses}
              exams={exams}
              onRefreshData={refreshData}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <DigitalIdModal
        isOpen={digitalIdOpen}
        onClose={() => setDigitalIdOpen(false)}
        user={currentUser}
      />

      <HallTicketModal
        isOpen={hallTicketOpen}
        onClose={() => setHallTicketOpen(false)}
        exams={exams}
        user={currentUser}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
