import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Calendar, 
  FileText, 
  Award, 
  BookOpen, 
  Mail, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  GraduationCap,
  Users,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  unreadMessagesCount?: number;
  unreadNotificationsCount?: number;
  onOpenDigitalId?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab,
  unreadMessagesCount = 1,
  unreadNotificationsCount = 2,
}) => {
  const { currentUser, role, switchDemoRole, logout } = useAuth();

  const studentWorkspaceItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams & Results', icon: Award },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  const facultyWorkspaceItems = [
    { id: 'faculty-dashboard', label: 'Faculty Portal', icon: LayoutDashboard },
    { id: 'faculty-attendance', label: 'Class Attendance', icon: CalendarCheck },
    { id: 'faculty-assignments', label: 'Assignments & Grading', icon: FileText },
    { id: 'courses', label: 'Assigned Courses', icon: BookOpen },
    { id: 'timetable', label: 'Schedule', icon: Calendar },
  ];

  const adminWorkspaceItems = [
    { id: 'admin-dashboard', label: 'Admin Command', icon: ShieldAlert },
    { id: 'admin-students', label: 'Student Roster', icon: Users },
    { id: 'admin-faculty', label: 'Faculty Directory', icon: GraduationCap },
    { id: 'courses', label: 'Departments & Syllabus', icon: BookOpen },
  ];

  const workspaceItems = role === 'faculty' 
    ? facultyWorkspaceItems 
    : role === 'admin' 
      ? adminWorkspaceItems 
      : studentWorkspaceItems;

  const communicationItems = [
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadMessagesCount > 0 ? 'Inbox' : undefined },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined },
    { id: 'profile', label: role === 'faculty' ? 'Faculty Profile' : role === 'admin' ? 'Admin Profile' : 'Student Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 select-none z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none">
          <GraduationCap className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-base">CampusPulse</h1>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">University Student Portal</p>
        </div>
      </div>

      {/* Role Switcher Pill */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl flex items-center justify-between text-xs">
          <button 
            onClick={() => { switchDemoRole('student'); setCurrentTab('dashboard'); }}
            className={`flex-1 py-1 rounded-lg font-semibold transition-all ${role === 'student' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
          >
            Student
          </button>
          <button 
            onClick={() => { switchDemoRole('faculty'); setCurrentTab('faculty-dashboard'); }}
            className={`flex-1 py-1 rounded-lg font-semibold transition-all ${role === 'faculty' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
          >
            Faculty
          </button>
          <button 
            onClick={() => { switchDemoRole('admin'); setCurrentTab('admin-dashboard'); }}
            className={`flex-1 py-1 rounded-lg font-semibold transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Navigation Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
        {/* Academic Workspace */}
        <div>
          <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Academic Workspace
          </h2>
          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200 dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Communication & Prefs */}
        <div>
          <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Communication & Prefs
          </h2>
          <div className="space-y-1">
            {communicationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200 dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Attendance Bottom Widget (Exact match to screenshot 1 & 2) */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
            <span>Overall Attendance</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {currentUser?.attendancePercentage || 86.4}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${currentUser?.attendancePercentage || 86.4}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Healthy Status (&gt;75%)</span>
          </div>
        </div>

        {/* Log Out button */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
